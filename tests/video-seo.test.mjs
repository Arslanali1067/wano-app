import test from 'node:test';
import assert from 'node:assert/strict';
import { videoJsonLd, videoName, creatorUrl, toIsoDate, serializeJsonLd, parsePublicVideo } from '../src/lib/video-seo.ts';

const post = {
  _id: '6b0178d7dd0ec3e87b6f3060', title: 'A creator’s story', description: '',
  remoteUrl_CF: 'https://videodelivery.net/45ccdc7615c392a589c2e503b8d1a4a3/manifest/video.m3u8',
  urls: { thumbnail: 'https://example.com/thumb.jpg' }, created_at: '2026-11-21T10:56:23.368000',
  duration: 38.011, user: { display_name: 'Creator', username: 'creator.one' },
};

test('watch schema agrees with canonical and supplies creator identity, media and UTC date', () => {
  const ld = videoJsonLd(post);
  assert.equal(ld.url, 'https://wanoafrica.com/pages/feed/' + post._id);
  assert.equal(ld.mainEntityOfPage, ld.url);
  assert.equal(ld.creator.url, 'https://wanoafrica.com/@creator.one');
  assert.equal(ld.contentUrl, post.remoteUrl_CF);
  assert.equal(ld.uploadDate, '2026-11-21T10:56:23.368Z');
  assert.match(ld.description, /A creator’s story/);
});

test('restricted, unlisted, photo and non-playable posts do not emit video schema', () => {
  for (const overrides of [{ limited: true }, { unlisted: true }, { photo: true }, { remoteUrl_CF: null }]) {
    assert.equal(videoJsonLd({ ...post, ...overrides }), null);
  }
});

test('JSON-LD cannot be broken out of by a creator caption', () => {
  const caption = '</script><script>alert(1)</script> 🌍';
  const serialized = serializeJsonLd(videoJsonLd({ ...post, description: caption }));
  assert.equal(serialized.includes('</script>'), false);
  assert.equal(JSON.parse(serialized).description, caption);
});

test('title truncation preserves emoji at the truncation boundary', () => {
  const name = videoName({ ...post, title: '', description: 'a'.repeat(99) + '🌍end' });
  assert.equal(name, 'a'.repeat(99) + '🌍');
});

test('profile URLs never expose email addresses or phone numbers', () => {
  for (const value of [null, '', 'person@example.com', '+255678821956', '255678821956', '123-456-7890', '123.456.7890', 'bad/handle']) {
    assert.equal(creatorUrl(value), undefined);
  }
});

test('date normalization preserves offsets and rejects invalid dates', () => {
  assert.equal(toIsoDate('2026-11-21T12:56:23.368000+02:00'), '2026-11-21T10:56:23.368Z');
  assert.equal(toIsoDate('2026-11-21'), '2026-11-21T00:00:00.000Z');
  assert.equal(toIsoDate('not-a-date'), undefined);
  assert.equal(toIsoDate(null), undefined);
});

test('impossible calendar dates are omitted instead of silently changed to another day', () => {
  for (const raw of ['2026-02-30', '2026-02-30T12:00:00Z', '2025-02-29T00:00:00Z', '2026-04-31T09:00:00+02:00']) {
    assert.equal(toIsoDate(raw), undefined, raw);
  }
  assert.equal(toIsoDate('2024-02-29T23:59:59.999999-02:00'), '2024-03-01T01:59:59.999Z');
});

test('malformed successful API responses fail closed, including wrong-post payloads', () => {
  for (const value of [null, [], {}, { detail: 'error' }, { ...post, _id: 'different' },
    { ...post, limited: 'false' }, { ...post, title: {} }, { ...post, user: 'bad' },
    { ...post, remoteUrl_CF: null }, { ...post, remoteUrl_CF: 'javascript:alert(1)' },
    { ...post, remoteUrl_CF: 'https://user:secret@example.com/video' },
    { ...post, duration: Infinity }, { ...post, views_count: -1 }]) {
    assert.throws(() => parsePublicVideo(value, post._id), /Invalid public video response/);
  }
  assert.deepEqual(parsePublicVideo({ ...post, limited: true }, post._id), { _id: post._id, limited: true });
});

test('500 generated captions survive safe JSON-LD round trips', () => {
  const snippets = ['</script>', '<!--', '🌍', '🇺🇬', '\u2028', '\u2029', '\\', '"', '&', 'ñ', 'مرحبا'];
  for (let i = 0; i < 500; i++) {
    const caption = Array.from({ length: 20 }, (_, j) => snippets[(i * 7 + j * 3) % snippets.length]).join('') + i;
    const encoded = serializeJsonLd(videoJsonLd({ ...post, description: caption }));
    assert.equal(JSON.parse(encoded).description, caption.trim());
    assert.equal(encoded.includes('<'), false);
  }
});
