'use strict';
// Prueba de integración de estados sobre assets/app.js (DOM simulado, NO navegador real).
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const root = path.resolve(__dirname, '..');
const source = fs.readFileSync(path.join(root,'assets/app.js'),'utf8');
const scenarios = fs.readFileSync(path.join(root,'assets/scenarios.js'),'utf8');

function boot(version,sharedStorage) {
  const values = sharedStorage || new Map();
  const handlers = {};
  const inputs = {};
  const checks = {};
  let focused = '';
  const timers = [];
  const app = {innerHTML:'',querySelectorAll:()=>[]};
  const doc = {
    body:{dataset:{version}},
    readyState:'loading',
    addEventListener(type,fn){(handlers[type] ||= []).push(fn);},
    getElementById(id){
      if(id==='app')return app;
      if(!app.innerHTML.includes('id="'+id+'"'))return null;
      return {addEventListener(type,fn){inputs[id+':'+type]=fn;},focus(){focused=id;}};
    },
    querySelectorAll(selector) {
      if(selector!=='[data-check-index]')return [];
      const rows=[...app.innerHTML.matchAll(/data-check-index="(\d+)"/g)];
      return rows.map(m=>({dataset:{checkIndex:m[1]},addEventListener(type,fn){checks[m[1]]=fn;}}));
    },
    querySelector(selector) {
      if(selector==='button[data-action="confirm"]'&&app.innerHTML.includes('data-action="confirm"'))
        return {focus(){focused='confirm';}};
      return null;
    }
  };
  const sandbox={document:doc,window:{},localStorage:{
    getItem(k){return values.has(k)?values.get(k):null;},
    setItem(k,v){values.set(k,String(v));},
    removeItem(k){values.delete(k);}
  },setTimeout(fn){timers.push(fn);return timers.length;},console};
  vm.runInNewContext(scenarios,sandbox);
  vm.runInNewContext(source,sandbox);
  handlers.DOMContentLoaded[0]();
  const state=sandbox.window.App.state;
  return {
    state,values,timers,app,
    click(action,props={}){const btn={dataset:{action,...props}};handlers.click[0]({target:{closest(){return btn;}}});},
    select(id){const fn=inputs['card-select:change'];assert.ok(fn);fn({target:{value:id}});},
    input(id,value){const fn=inputs[id+':input'];assert.ok(fn,'input '+id);fn({target:{value}});},
    check(index,checked){const fn=checks[String(index)];assert.ok(fn,'checkbox '+index);fn({target:{dataset:{checkIndex:String(index)},checked}});},
    flush(){const f=timers.shift();assert.ok(f,'No hay temporizador');f();},
    focus(){return focused;}
  };
}
function run(){
 let passed=0;
 const check=(label,fn)=>{fn();passed++;console.log('[OK] '+label);};
 check('A01: actualizar cantidad, subtotal, total y diferencia; requerir revisión',()=>{
   const e=boot('v2');e.click('goto',{go:'menu'});e.click('add',{item:'cafe'});e.click('add',{item:'sanduche'});e.click('goto',{go:'cart'});
   assert.match(e.app.innerHTML,/\$4\.25/);e.click('qty',{item:'cafe',delta:'1'});
   assert.equal(e.state.a01ReviewRequired,true);assert.match(e.app.innerHTML,/Subtotal: \$3\.00/);
   assert.match(e.app.innerHTML,/nuevo total \$5\.75/);assert.match(e.app.innerHTML,/Diferencia \+\$1\.50/);
   assert.match(e.app.innerHTML,/data-action="review-total"/);
   e.click('confirm');assert.equal(e.state.confirmedCount,0);assert.equal(e.timers.length,0);
   assert.match(e.state.alertMessage,/revise el nuevo total/);
   e.click('review-total');assert.equal(e.state.a01ReviewRequired,false);
   e.state.ackAllergens=true;e.click('confirm');assert.equal(e.state.isSubmitting,true);
   assert.equal(e.timers.length,1);e.flush();assert.equal(e.state.view,'confirmation');
   assert.equal(e.state.confirmedCount,1);
 });
 check('A01: cada edición posterior vuelve a requerir revisión',()=>{
   const e=boot('v2');e.click('goto',{go:'menu'});e.click('add',{item:'cafe'});e.click('goto',{go:'cart'});
   e.click('qty',{item:'cafe',delta:'1'});e.click('review-total');
   e.click('qty',{item:'cafe',delta:'1'});assert.equal(e.state.a01ReviewRequired,true);
   assert.match(e.app.innerHTML,/nuevo total \$4\.50/);
 });
 check('A01: v1 mantiene el defecto original para contraste',()=>{
   const e=boot('v1');e.click('goto',{go:'menu'});e.click('add',{item:'cafe'});e.click('goto',{go:'cart'});
   const before=e.app.innerHTML.match(/id="total"[^>]*>([^<]+)/)[1];
   e.click('qty',{item:'cafe',delta:'1'});
   assert.equal(before,e.app.innerHTML.match(/id="total"[^>]*>([^<]+)/)[1]);
   assert.equal(e.state.a01ReviewRequired,false);
 });
 check('A12: impide cierre falso, identifica ítem y devuelve foco',()=>{
   const e=boot('v2');e.select('IHC-A-12');e.input('title','Prueba técnica');
   e.input('code','P-001');e.click('next');
   e.check(0,true);e.check(1,true);e.click('next');e.input('errors','2');e.input('notes','Observación de ensayo');e.click('next');
   assert.equal(e.state.dashboardStep,3);e.click('finish');
   assert.equal(e.state.dashboardStep,1);assert.match(e.state.alertMessage,/ítem obligatorio 3/);
   assert.equal(e.focus(),'check-2');assert.deepEqual(Array.from(e.state.dashboardData.checklist),[true,true,false]);
   assert.equal(e.state.dashboardData.notes,'Observación de ensayo');
   assert.equal(e.timers.length,0);
 });
 check('A12: con 3/3 muestra verificación y solo después éxito',()=>{
   const e=boot('v2');e.select('IHC-A-12');e.input('title','Prueba');e.input('code','P-001');
   e.click('next');e.check(0,true);e.check(1,true);e.check(2,true);
   e.click('next');e.click('next');e.click('finish');
   assert.equal(e.state.dashboardStep,3);assert.equal(e.state.dashboardFinishing,true);
   assert.match(e.app.innerHTML,/Verificando checklist/);
   e.click('finish');assert.equal(e.timers.length,1);
   e.flush();assert.equal(e.state.dashboardStep,4);assert.match(e.app.innerHTML,/Sesión cerrada/);
 });
 check('A12: recupera checklist, paso y notas al recargar',()=>{
   const storage=new Map(),a=boot('v2',storage);a.select('IHC-A-12');a.input('title','Ensayo persistencia');a.input('code','P-001');a.click('next');a.check(0,true);a.click('next');a.input('errors','3');a.input('notes','Nota sin identidad');
   const b=boot('v2',storage);b.select('IHC-A-12');
   assert.equal(b.state.dashboardStep,2);assert.equal(b.state.dashboardData.title,'Ensayo persistencia');
   assert.equal(b.state.dashboardData.errors,'3');assert.equal(b.state.dashboardData.notes,'Nota sin identidad');
   assert.deepEqual(Array.from(b.state.dashboardData.checklist),[true,false,false]);
 });
 check('Regresión: v2 A05 conserva límite de USD 4,25',()=>{
   const e=boot('v2');e.select('IHC-A-05');e.click('goto',{go:'menu'});
   e.click('add',{item:'sanduche'});e.click('add',{item:'cafe'});e.click('goto',{go:'cart'});
   e.click('qty',{item:'cafe',delta:'1'});e.state.ackAllergens=true;e.click('confirm');
   assert.match(e.state.alertMessage,/Presupuesto excedido/);assert.equal(e.timers.length,0);
 });
 console.log('OK: '+passed+'/7 pruebas de lógica integradas sobre DOM simulado. El navegador real y la sesión humana NO fueron probados.');
}
run();
