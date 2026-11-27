const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const Module = require('node:module');
const ts = require('typescript');
const React = require('react');
const { create, act } = require('react-test-renderer');
const root = path.resolve(__dirname,'..');
const originalLoad = Module._load;
Module._load = function(request, parent, main) {
 if(request.endsWith('.module.css'))return {__esModule:true,default:new Proxy({},{get:(_,name)=>String(name)})};
 if(request==='next/link')return {__esModule:true,default:props=>React.createElement('a',props,props.children)};
 if(request.startsWith('@/')) request=path.join(root,'src',request.slice(2));
 return originalLoad.call(this,request,parent,main);
};
for(const extension of ['.ts','.tsx'])Module._extensions[extension]=function(module,filename){module._compile(ts.transpileModule(fs.readFileSync(filename,'utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,jsx:ts.JsxEmit.ReactJSX,esModuleInterop:true,target:ts.ScriptTarget.ES2022}}).outputText,filename);};
const Form=require('../src/components/PartnershipInquiryForm.tsx').default;
function setup(onFocus=()=>{}){let view;act(()=>{view=create(React.createElement(Form),{createNodeMock:()=>({focus(){onFocus();}})});});return view;}
function change(view,name,value){act(()=>view.root.findByProps({name}).props.onChange({target:{value}}));}
function fill(view,type='funding'){
 change(view,'inquiryType',type);
 for(const [name,value] of Object.entries({name:'Amina',email:'amina@example.org',profile:'@community',role:'Coordinator',participation:'Original stories.',communityBenefit:'Community connections.',message:'A proposal 🌍'}))change(view,name,value);
 act(()=>view.root.findByProps({id:'partner-acknowledgment'}).props.onChange({target:{checked:true}}));
}
const event={preventDefault(){}};
const oldFetch=global.fetch;
test.afterEach(()=>{global.fetch=oldFetch;});

test('type selection reveals only relevant fields, required gates and correct destination links',()=>{
 const v=setup();assert.equal(v.root.findAllByType('input').length,0);
 for(const [type,destination] of [['advertise','/advertise'],['press','/press'],['support','/help']]){
  change(v,'inquiryType',type);assert.equal(v.root.findAllByType('input').length,0);assert.ok(v.root.findByProps({href:destination}));
  assert.equal(v.root.findAllByType('button').length,0);
 }
 change(v,'inquiryType','funding');assert.equal(v.root.findByProps({name:'profile'}).props.required,true);assert.equal(v.root.findByProps({name:'role'}).props.required,true);
 change(v,'inquiryType','sponsor-wano');assert.equal(v.root.findByProps({name:'profile'}).props.required,false);assert.equal(v.root.findAllByProps({name:'role'}).length,0);
 act(()=>v.unmount());
});
test('100 rapid category switches clear stale financial fields and acknowledgments',()=>{
 const v=setup();fill(v);
 for(let i=0;i<100;i++){
  change(v,'inquiryType','community');assert.equal(v.root.findAllByProps({name:'participation'}).length,0);
  change(v,'inquiryType','funding');assert.equal(v.root.findByProps({name:'participation'}).props.value,'');assert.equal(v.root.findByProps({id:'partner-acknowledgment'}).props.checked,false);
 }
 act(()=>v.unmount());
});
test('100 rapid submits issue exactly one in-flight request and disable fields',async()=>{
 const v=setup();fill(v);let calls=0,release,pending;
 global.fetch=()=>{calls++;return new Promise(resolve=>{release=resolve;});};
 const submit=v.root.findByType('form').props.onSubmit;
 act(()=>{pending=submit(event);for(let i=0;i<99;i++)void submit(event);});
 assert.equal(calls,1);assert.equal(v.root.findByType('fieldset').props.disabled,true);
 await act(async()=>{release({ok:true,json:async()=>({received:true,ref:'test-reference'})});await pending;});
 assert.ok(v.root.findByProps({role:'status'}));assert.equal(v.root.findAllByType('form').length,0);
 assert.match(JSON.stringify(v.toJSON()),/Submission does not create a partnership/);
 act(()=>v.root.findByType('button').props.onClick());assert.equal(v.root.findAllByType('input').length,0);
 act(()=>v.unmount());
});
test('invalid financial requests never send; field errors expose accessible associations',async()=>{
 const v=setup();change(v,'inquiryType','funding');let calls=0;global.fetch=async()=>{calls++;throw Error('should not send');};
 await act(async()=>v.root.findByType('form').props.onSubmit(event));
 assert.equal(calls,0);assert.ok(v.root.findByProps({role:'alert'}));
 const profile=v.root.findByProps({name:'profile'});assert.equal(profile.props['aria-invalid'],true);assert.match(profile.props['aria-describedby'],/partner-profile-error/);
 act(()=>v.unmount());
});
test('network, validation and malformed-success failures preserve answers and permit intentional retry',async()=>{
 for(const outcome of [()=>Promise.reject(Error('offline')),async()=>({ok:false,json:async()=>({detail:'Please review.',errors:{profile:'Check profile'}})}),async()=>({ok:true,json:async()=>({})}),async()=>({ok:true,json:async()=>({received:true,ref:'  '})})]){
  const v=setup();fill(v);global.fetch=outcome;
  await act(async()=>v.root.findByType('form').props.onSubmit(event));
  assert.ok(v.root.findByProps({role:'alert'}));assert.equal(v.root.findByProps({name:'message'}).props.value,'A proposal 🌍');assert.equal(v.root.findByType('fieldset').props.disabled,false);
  global.fetch=async()=>({ok:true,json:async()=>({received:true,ref:'saved'})});
  await act(async()=>v.root.findByType('form').props.onSubmit(event));assert.ok(v.root.findByProps({role:'status'}));
  act(()=>v.unmount());
 }
});
test('sponsors submit without a profile and hidden funding answers are absent',async()=>{
 const v=setup();fill(v);change(v,'inquiryType','sponsor-wano');change(v,'profile','');let sent;
 global.fetch=async(_,options)=>{sent=JSON.parse(options.body);return {ok:true,json:async()=>({received:true,ref:'saved'})};};
 await act(async()=>v.root.findByType('form').props.onSubmit(event));
 assert.equal(sent.profile,'');assert.equal(sent.participation,'');assert.equal(sent.acknowledgment,false);assert.equal(sent.inquiryType,'sponsor-wano');
 act(()=>v.unmount());
});

test('correcting a field after validation does not steal focus back to the error summary',async()=>{
 let focusCalls=0;const v=setup(()=>focusCalls++);fill(v);change(v,'profile','https://example.org/wrong');
 await act(async()=>v.root.findByType('form').props.onSubmit(event));
 const afterError=focusCalls;assert.ok(afterError>0);
 change(v,'profile','@');
 assert.equal(focusCalls,afterError,'typing must keep focus in the field being corrected');
 act(()=>v.unmount());
});
