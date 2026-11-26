// Run after npm run build. This exercises the built Next app against a local
// public-API fixture, never production accounts or analytics endpoints.
import test from 'node:test';
import assert from 'node:assert/strict';
import http from 'node:http';
import { spawn } from 'node:child_process';
import { once } from 'node:events';

test('built watch pages retain media, canonical, visibility and correct failure status', { timeout: 60000 }, async () => {
  const prefix = 'aaaaaaaaaaaaaaaaaaaaaaa';
  const fixture = {
    _id: prefix + '1', title: 'A test story 🌍', description: '</script><script>injected()</script>',
    remoteUrl_CF: 'https://videodelivery.net/dddddddddddddddddddddddddddddddd/manifest/video.m3u8',
    urls: { thumbnail: 'https://example.com/video-poster.jpg' },
    created_at: '2026-11-21T10:56:23.368000', duration: 38,
    user: { display_name: 'Test Creator', username: 'testcreator' },
  };
  const api = http.createServer((req, res) => {
    const id = req.url.split('/').at(-1);
    res.setHeader('Content-Type', 'application/json');
    if (id === prefix + '4') { res.statusCode = 404; return res.end('{"detail":"Not found"}'); }
    if (id === prefix + '5') { res.statusCode = 503; return res.end('{"detail":"Temporary outage"}'); }
    if (id === prefix + '2') return res.end(JSON.stringify({ _id: id, limited: true }));
    if (req.url.startsWith('/api/v1/public/videos/')) {
      return res.end(JSON.stringify({ ...fixture, _id: id, unlisted: id === prefix + '3', photo: id === prefix + '6' }));
    }
    res.end('{"items":[]}');
  });
  api.listen(0, '127.0.0.1');
  await once(api, 'listening');
  const probe = http.createServer();
  probe.listen(0, '127.0.0.1');
  await once(probe, 'listening');
  const port = probe.address().port;
  await new Promise(resolve => probe.close(resolve));
  const server = spawn(process.execPath, ['node_modules/next/dist/bin/next', 'start', '--hostname', '127.0.0.1', '--port', String(port)], {
    env: { ...process.env, WANO_API_URL: `http://127.0.0.1:${api.address().port}`, NEXT_TELEMETRY_DISABLED: '1' },
    stdio: ['ignore', 'pipe', 'pipe'],
  });
  let logs = '';
  server.stdout.on('data', x => { logs += x; });
  server.stderr.on('data', x => { logs += x; });
  try {
    await new Promise((resolve, reject) => {
      const timer = setTimeout(() => reject(new Error('Next startup timed out: ' + logs)), 15000);
      const check = x => { if (String(x).includes('Ready')) { clearTimeout(timer); resolve(); } };
      server.stdout.on('data', check);
      server.once('exit', code => { clearTimeout(timer); reject(new Error(`Next exited ${code}: ${logs}`)); });
    });
    const get = async n => {
      const response = await fetch(`http://127.0.0.1:${port}/pages/feed/${prefix}${n}`);
      return { status: response.status, html: await response.text() };
    };
    const publicPage = await get(1);
    assert.equal(publicPage.status, 200);
    assert.match(publicPage.html, /<video[^>]*src="https:\/\/videodelivery\.net\//);
    assert.match(publicPage.html, /<video[^>]*poster="https:\/\/example\.com\/video-poster.jpg"/);
    assert.match(publicPage.html, /<h1[^>]*>A test story 🌍<\/h1>/);
    assert.match(publicPage.html, new RegExp(`rel="canonical" href="https://wanoafrica.com/pages/feed/${prefix}1"`));
    const schemas = [...publicPage.html.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/gs)].map(x => JSON.parse(x[1]));
    const video = schemas.find(x => x['@type'] === 'VideoObject');
    assert.equal(video.creator.url, 'https://wanoafrica.com/@testcreator');
    assert.equal(video.description, fixture.description);
    assert.equal(publicPage.html.includes('<script>injected()</script>'), false);
    const legacy = await fetch(`http://127.0.0.1:${port}/pages/feed?videoId=${prefix}1&single=true`, { redirect: 'manual' });
    assert.equal(legacy.status, 308);
    assert.equal(legacy.headers.get('location'), `/pages/feed/${prefix}1`);
    for (const n of [2, 3]) {
      const page = await get(n);
      assert.equal(page.status, 200);
      assert.match(page.html, /name="robots" content="noindex, nofollow"/);
      assert.equal(page.html.includes('"@type":"VideoObject"'), false);
      if (n === 2) {
        assert.equal(page.html.includes('video-poster.jpg'), false);
        assert.equal(page.html.includes('Test Creator'), false);
      }
    }
    assert.equal((await get(4)).status, 404);
    assert.equal((await get(5)).status, 500);
    const photo = await get(6);
    assert.equal(photo.html.includes('"@type":"VideoObject"'), false);
    assert.equal(photo.html.includes('<video'), false);
  } finally {
    server.kill('SIGTERM');
    await new Promise(resolve => api.close(resolve));
  }
});
