// Prueba de manejadores y HTML generado, con DOM reducido. No es un navegador.
import fs from 'node:fs';
import vm from 'node:vm';
import assert from 'node:assert/strict';
import path from 'node:path';
const root=process.argv[2]||process.cwd();
const source=fs.readFileSync(path.join(root,'assets/app.js'),'utf8');
const scenarios=fs.readFileSync(path.join(root,'assets/scenarios.js'),'utf8');
function load(version='v2') {
 const listeners={},elements=new Map(),regions=[{inert:false},{inert:false}];
 let html='';
 const doc={readyState:'loading',body:{dataset:{version}},activeElement:null,addEventListener:(n,f)=>listeners[n]=f,
  getElementById:id=>id==='app'?app:elements.get(id)||null,
  querySelectorAll:()=>[],querySelector:q=>q==='[role="dialog"]'?html.includes('role="dialog"')?{contains:e=>['remove-ok','remove-cancel'].includes(e?.id)}:null:q.startsWith('main ')?[...elements.values()].find(e=>e.dataset.action==='goto'&&e.dataset.go==='menu')||null:null};
 const app={querySelectorAll:()=>regions,get innerHTML(){return html},set innerHTML(value){
  html=value;elements.clear();doc.activeElement=null;
  for(const m of value.matchAll(/<(button|select|input|textarea)\b([^>]*)>/g)){
   const attrs=Object.fromEntries([...m[2].matchAll(/([\w-]+)="([^"]*)"/g)].map(x=>[x[1],x[2]]));
   const dataset=Object.fromEntries(Object.entries(attrs).filter(([k])=>k.startsWith('data-')).map(([k,v])=>[k.slice(5),v]));
   const e={id:attrs.id||'',dataset,attrs,focus(){doc.activeElement=e},addEventListener(){},closest(){return e}};
   elements.set(e.id||'anonymous-'+elements.size,e);
  }
 }};
 const ctx={document:doc,console,localStorage:{getItem:()=>null,setItem(){}},setTimeout:()=>0};ctx.window=ctx;vm.createContext(ctx);vm.runInContext(scenarios,ctx);vm.runInContext(source,ctx);
 const state=ctx.App.state;state.cardId='IHC-A-02';state.view='cart';state.cart=[{id:'cafe',qty:1},{id:'sanduche',qty:1}];ctx.App.render();
 return {state,doc,regions,elements,render:ctx.App.render,click(id){const e=elements.get(id);assert(e,'Control ausente: '+id);listeners.click({target:e})},key(key,shiftKey=false){let prevented=false;listeners.keydown({key,shiftKey,preventDefault(){prevented=true}});return prevented},html:()=>html};
}
const results=[];
function test(name,fn){try{fn();results.push({name,status:'OK'})}catch(e){results.push({name,status:'FALLO',detail:String(e)})}}
test('Nombre descriptivo por producto',()=>{const a=load();assert.match(a.elements.get('remove-cafe').attrs['aria-label'],/Quitar.*del pedido/);assert.match(a.elements.get('remove-sanduche').attrs['aria-label'],/Quitar.*del pedido/)});
test('Abrir no borra; foco inicial en Cancelar',()=>{const a=load();a.click('remove-sanduche');assert.equal(a.state.cart.length,2);assert.equal(a.doc.activeElement.id,'remove-cancel');assert(a.regions.every(x=>x.inert))});
test('Escape restaura foco al segundo producto',()=>{const a=load();a.click('remove-sanduche');assert(a.key('Escape'));assert.equal(a.doc.activeElement.id,'remove-sanduche');assert.equal(a.state.cart.length,2);assert(a.regions.every(x=>!x.inert))});
test('Cancelar restaura foco al disparador',()=>{const a=load();a.click('remove-sanduche');a.click('remove-cancel');assert.equal(a.doc.activeElement.id,'remove-sanduche');assert.equal(a.state.cart.length,2)});
test('Confirmar quita solo el elegido y enfoca el restante',()=>{const a=load();a.click('remove-cafe');a.click('remove-ok');assert.equal(a.state.cart.length,1);assert.equal(a.state.cart[0].id,'sanduche');assert.equal(a.doc.activeElement.id,'remove-sanduche')});
test('Último producto deja foco en volver al menú',()=>{const a=load();a.state.cart=[{id:'cafe',qty:1}];a.render();a.click('remove-cafe');a.click('remove-ok');assert.equal(a.state.cart.length,0);assert.equal(a.doc.activeElement.dataset.go,'menu')});
test('Tab cierra ciclo al último control',()=>{const a=load();a.click('remove-cafe');a.doc.getElementById('remove-ok').focus();assert(a.key('Tab'));assert.equal(a.doc.activeElement.id,'remove-cancel')});
test('Shift+Tab cierra ciclo al primero',()=>{const a=load();a.click('remove-cafe');assert(a.key('Tab',true));assert.equal(a.doc.activeElement.id,'remove-ok')});
test('Reducir a cero en A02 también exige confirmación',()=>{const a=load();a.click('qty-minus-cafe');assert(a.state.dialogOpen);assert.equal(a.state.cart[0].qty,1);a.key('Escape');assert.equal(a.doc.activeElement.id,'qty-minus-cafe')});
test('Un clic de fondo no abre otro diálogo',()=>{const a=load();a.click('remove-sanduche');a.click('remove-cafe');assert.equal(a.state.itemToRemove,'sanduche')});
test('La variante v1 compartida mantiene eliminación directa',()=>{const a=load('v1');const e=[...a.elements.values()].find(e=>e.dataset.action==='remove');a.click(e.id||[...a.elements.entries()].find(([,x])=>x===e)[0]);assert.equal(a.state.cart.length,1);assert.equal(a.state.dialogOpen,false)});
const report={scope:'Manejadores y HTML con DOM reducido. Sin layout nativo ni tecnologías de asistencia.',generatedAt:new Date().toISOString(),passed:results.filter(x=>x.status==='OK').length,total:results.length,results};
console.log(JSON.stringify(report,null,2));if(report.passed!==report.total)process.exitCode=1;
