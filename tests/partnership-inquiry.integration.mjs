// Built Next HTTP tests against a local-only Admin fixture; never sends a real inquiry/email.
import test from 'node:test';
import assert from 'node:assert/strict';
import http from 'node:http';
import { spawn } from 'node:child_process';
import { once } from 'node:events';
const valid = { inquiryType: 'funding', name: 'Test representative', email: 'test@example.org', company: 'Fixture project', profile: '@testcommunity', role: 'Coordinator', participation: 'Original stories and genuine engagement.', communityBenefit: 'Community storytelling.', message: 'Request contribution of UGX 100000 for a workshop.', acknowledgment: true };

test('built partnership flow validates, persists all fields, handles failures, and protects existing routes', { timeout: 90000 }, async () => {
  let mode = 'ok'; const saved = [];
  const api = http.createServer(async (req,res) => {
    if (req.url !== '/api/v1/public/enquiries') { res.writeHead(404, {'Content-Type':'application/json'}); res.end('{}'); return; }
    const chunks=[]; for await (const chunk of req) chunks.push(chunk);
    const body=JSON.parse(Buffer.concat(chunks)); saved.push(body);
    res.setHeader('Content-Type','application/json');
    if (mode==='rate') {res.writeHead(429);res.end(JSON.stringify({detail:'private upstream message'}));return;}
    if (mode==='down') {res.writeHead(503);res.end(JSON.stringify({detail:'secret backend stack'}));return;}
    if (mode==='malformed') {res.end('{}');return;}
    res.end(JSON.stringify({ref:'fixture-'+saved.length}));
  });
  api.listen(0,'127.0.0.1'); await once(api,'listening');
  const probe=http.createServer();probe.listen(0,'127.0.0.1');await once(probe,'listening'); const port=probe.address().port;await new Promise(r=>probe.close(r));
  const child=spawn(process.execPath,['node_modules/next/dist/bin/next','start','-p',String(port)],{env:{...process.env,WANO_API_URL:`http://127.0.0.1:${api.address().port}`,RESEND_API_KEY:'',NEXT_TELEMETRY_DISABLED:'1'},stdio:['ignore','pipe','pipe']});
  let logs='';child.stdout.on('data',x=>logs+=x);child.stderr.on('data',x=>logs+=x);
  const base=`http://127.0.0.1:${port}`;
  const send=(body,headers={'Content-Type':'application/json'})=>fetch(base+'/api/partnership-inquiry',{method:'POST',headers,body:typeof body==='string'?body:JSON.stringify(body)});
  try {
    await new Promise((resolve,reject)=>{const interval=setInterval(()=>{if(logs.includes('Ready')){clearInterval(interval);resolve();} else if(child.exitCode!==null){clearInterval(interval);reject(new Error(logs));}},100);setTimeout(()=>{clearInterval(interval);reject(new Error('Next did not start: '+logs));},12000).unref();});
    const page=await fetch(base+'/partnerships');assert.equal(page.status,200);const html=await page.text();
    assert.match(html,/Build your presence on Wano/);assert.match(html,/partner-type/);assert.doesNotMatch(html,/budget|limited financial|no income/i);
    assert.doesNotMatch(html,/name="profile"/,'no irrelevant hidden required inputs before selection');
    let before=saved.length;
    for (const input of [{...valid,profile:''},{...valid,acknowledgment:false},{...valid,inquiryType:'advertise'},[],null,{...valid,name:{}},{...valid,profile:'https://127.0.0.1/private'},{...valid,message:'x'.repeat(1201)}]) assert.equal((await send(input)).status,400);
    assert.equal(saved.length,before,'invalid requests never reach Admin');
    assert.equal((await send('{broken')).status,400);
    assert.equal((await send(valid,{'Content-Type':'text/plain'})).status,415);
    assert.equal((await send('x'.repeat(33000))).status,413);
    const streamedStatus=await new Promise((resolve,reject)=>{
      const request=http.request(base+'/api/partnership-inquiry',{method:'POST',headers:{'Content-Type':'application/json','Transfer-Encoding':'chunked'}},response=>{response.resume();response.on('end',()=>resolve(response.statusCode));});
      request.on('error',reject);request.write('x'.repeat(16000));request.end('x'.repeat(17000));
    });
    assert.equal(streamedStatus,413,'body limit also applies without a Content-Length header');
    const response=await send(valid);assert.equal(response.status,200);assert.equal((await response.json()).received,true);
    const document=saved.at(-1);assert.equal(document.kind,'partner');assert.equal(document.name,valid.name);
    for(const key of ['profile','role','participation','communityBenefit','message'])assert.ok(document.message.includes(valid[key]),key);
    assert.match(document.message,/not verified/);assert.ok(document.who);assert.ok(document.message.length<=3000);
    for(const inquiryType of ['sponsor-wano','strategic','community','other'])assert.equal((await send({name:'Visitor',email:'visitor@example.org',message:'An ordinary proposal.',inquiryType})).status,200);
    mode='rate';const limited=await send(valid);assert.equal(limited.status,429);assert.doesNotMatch(JSON.stringify(await limited.json()),/private upstream/);
    mode='down';const down=await send(valid);assert.equal(down.status,503);assert.doesNotMatch(JSON.stringify(await down.json()),/secret backend/);
    mode='malformed';assert.equal((await send(valid)).status,503,'empty successful upstream response is not receipt');
    mode='ok';
    const batch=Array.from({length:100},(_,i)=>({...valid,name:`Test ${i}`,message:`Unicode 🌍 propuesta ${i}`,profile:i%2?'@community':'https://devbe.wanoafrica.com/u/6845fdb76cd85e35c8f722f6'}));
    for(let i=0;i<batch.length;i+=10){const replies=await Promise.all(batch.slice(i,i+10).map(item=>send(item)));for(const r of replies)assert.equal(r.status,200);}
    for(const url of ['/creators','/advertise','/press','/help','/community-guidelines'])assert.equal((await fetch(base+url)).status,200,url);
    for(const kind of ['advertise','press']){
      const result=await fetch(base+'/api/enquiry',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({kind,name:'Existing route',email:'existing@example.org',message:'Regression fixture'})});assert.equal(result.status,200);assert.equal(saved.at(-1).kind,kind);
    }
    console.log('100 varied HTTP requests at concurrency 10 passed against a local fixture. No production capacity claim.');
  } finally {child.kill('SIGTERM');api.closeAllConnections();await new Promise(r=>api.close(r));}
});
