/**
 * Verificación de la línea de base v1, sin dependencias.
 * Uso: node prototipo/v1/tests/verificar_logica.mjs
 * Ejecuta los manejadores originales con render sustituido por una función vacía.
 * Comprueba fuente y lógica; NO comprueba DOM nativo, CSS, foco o lector de pantalla.
 */
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import vm from 'node:vm';
import assert from 'node:assert/strict';
import {fileURLToPath} from 'node:url';

const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const appSource=fs.readFileSync(path.join(root,'assets/app.js'),'utf8');
const scenarios=fs.readFileSync(path.join(root,'assets/scenarios.js'),'utf8');
const css=fs.readFileSync(path.join(root,'assets/styles.css'),'utf8');
const html=fs.readFileSync(path.join(root,'index.html'),'utf8');
const results=[];

function load(card,bodyVersion='v1'){
  const timers=new Map(),events=new Map();let id=0,storageCalls=0;
  const context={URLSearchParams,console,location:{search:`?card=IHC-A-${String(card).padStart(2,'0')}`},
    document:{body:{dataset:{version:bodyVersion}},querySelector:()=>({addEventListener(){}}),addEventListener:(type,fn)=>events.set(type,fn)},
    localStorage:{getItem(){storageCalls++;return null},setItem(){storageCalls++}},
    setTimeout:fn=>{timers.set(++id,fn);return id},clearTimeout:key=>timers.delete(key)};
  context.window=context;vm.createContext(context);vm.runInContext(scenarios,context);
  const start=appSource.indexOf("function render(focus='')"),end=appSource.indexOf('function cafe()',start);
  assert(start>=0&&end>start,'No se encontró el punto de instrumentación de render');
  let instrumented=appSource.slice(0,start)+'function render(){}\n'+appSource.slice(end);
  instrumented=instrumented.replace(/init\(\);\s*\}\)\(\);\s*$/,
    'init();globalThis.AUDIT={get state(){return s},onAction,confirm,dashMove,cafe,dashboard,dashSteps,total,showTotal,init,get version(){return VERSION}};})();');
  vm.runInContext(instrumented,context);
  return {api:context.AUDIT,events,get storageCalls(){return storageCalls},tick(){const fns=[...timers.values()];timers.clear();fns.forEach(fn=>fn());}};
}
const act=(a,name,dataset={})=>a.api.onAction(name,{dataset});
const add=(a,item='cafe')=>act(a,'add',{item});
function check(id,description,kind,fn){try{fn();results.push({id,description,kind,status:'OK'});}catch(error){results.push({id,description,kind,status:'FALLO',detail:String(error)});}}

check('A01','Se reproduce total obsoleto de USD 3,75 frente a USD 5,25','Lógica de fallo',()=>{
 const a=load(1);add(a);add(a,'sanduche');act(a,'qty',{item:'cafe',delta:'1'});assert.equal(a.api.showTotal(),3.75);assert.equal(a.api.total(),5.25);
});
check('A02','Quitar no tiene etiqueta descriptiva y elimina sin confirmación','Fuente y lógica de fallo',()=>{
 const a=load(2);add(a);act(a,'goto',{go:'cart'});assert.match(a.api.cafe(),/aria-label=""/);act(a,'remove',{item:'cafe'});assert.equal(Object.keys(a.api.state.cart).length,0);assert(!a.api.cafe().includes('role="dialog"'));
});
check('A03','El resultado muestra Listo sin desglose en el panel final','Lógica de fallo',()=>{
 const a=load(3);add(a);a.api.confirm();a.tick();const view=a.api.cafe();assert.match(view,/>Listo<\/h2>/);assert(!view.includes('class="summ-total"'));
});
check('A04','Se permite envío sin reconocimiento previo de advertencia','Lógica de fallo',()=>{
 const a=load(4);add(a,'sanduche');assert.equal(a.api.state.ack,false);a.api.confirm();assert.equal(a.api.state.screen,'processing');
});
check('A05','Se permite procesar USD 5,25 sin validación del presupuesto','Lógica de fallo',()=>{
 const a=load(5);add(a);add(a,'sanduche');act(a,'qty',{item:'cafe',delta:'1'});assert.equal(a.api.total(),5.25);a.api.confirm();assert.equal(a.api.state.screen,'processing');
});
check('A06','Dos confirmaciones durante espera producen dos operaciones','Lógica de fallo',()=>{
 const a=load(6);add(a);a.api.confirm();a.api.confirm();a.tick();assert.equal(a.api.state.orders,2);
});
check('A07','Se puede saltar a Revisión con datos incompletos','Lógica de fallo',()=>{
 const a=load(7);a.api.dashMove(3,true);assert.equal(a.api.state.dstep,3);
});
check('A08','Las marcas se pierden al salir del checklist','Lógica de fallo',()=>{
 const a=load(8);a.api.dashMove(1,true);a.api.state.checks[0]=true;a.api.dashMove(2,true);a.api.dashMove(1,false);assert.equal(a.api.state.checks[0],false);
});
check('A09','El formulario presenta nombre real y no código','Fuente de fallo',()=>{
 const a=load(9);const view=a.api.dashboard();assert.match(view,/id="name"/);assert(!view.includes('id="code"'));
});
check('A10','Stepper sin aria-current y sin texto explícito actual','Fuente de fallo',()=>{
 const a=load(10);const view=a.api.dashSteps();assert(!view.includes('aria-current='));assert(!view.includes('(actual)'));
});
check('A11','Se conserva la regla CSS que provoca el fallo móvil','Fuente de fallo',()=>{
 assert.match(appSource,/IHC-A-11/);assert.match(css,/\.mobile-bug \.stepper/);assert.match(css,/minmax\(100px,1fr\)/);
});
check('A12','Cierre incompleto y pérdida de progreso al reiniciar v1','Lógica de fallo',()=>{
 const a=load(12);a.api.state.dstep=3;act(a,'finish');a.tick();assert.equal(a.api.state.finalized,true);assert.equal(a.api.state.checks.filter(Boolean).length,0);a.api.state.checks[0]=true;a.api.init();assert.equal(a.api.state.checks[0],false);assert.equal(a.storageCalls,0);
});
check('V1-13','Recorrido por Inicio, Menú, Detalle y Mi pedido','Lógica',()=>{
 const a=load(1);assert.equal(a.api.state.screen,'home');act(a,'goto',{go:'menu'});assert.match(a.api.cafe(),/Nuestro menú/);act(a,'detail',{item:'cafe'});assert.equal(a.api.state.screen,'detail');add(a);act(a,'goto',{go:'cart'});assert.match(a.api.cafe(),/Revisar y editar pedido/);
});
check('V1-14','El botón del carrito vacío está deshabilitado','Fuente y lógica',()=>{
 const a=load(1);act(a,'goto',{go:'cart'});assert.match(a.api.cafe(),/data-action="confirm" disabled/);
});
check('V1-15','Invocar envío vacío ofrece un error','Lógica',()=>{
 const a=load(1);a.api.confirm();assert.equal(a.api.state.screen,'error');assert.match(a.api.state.error,/Agrega al menos/);
});
check('V1-16','Fallo de red conserva el carrito y no declara recibido','Lógica',()=>{
 const a=load(6);add(a);a.api.state.offline=true;a.api.confirm();assert.equal(a.api.state.screen,'processing');a.tick();assert.equal(a.api.state.screen,'error');assert.equal(a.api.state.confirmed,false);assert.equal(a.api.state.cart.cafe,1);
});
check('V1-17','Reintento después del fallo recupera el envío','Lógica',()=>{
 const a=load(6);add(a);a.api.state.offline=true;a.api.confirm();a.tick();act(a,'retry');a.tick();assert.equal(a.api.state.screen,'success');assert.equal(a.api.state.orders,1);
});
check('V1-18','La entrada sigue en v1 aunque el dataset externo indique v2','Lógica',()=>{
 const a=load(1,'v2');assert.equal(a.api.version,'v1');
});
check('V1-19','Procesando precede al recibido en un envío normal','Lógica',()=>{
 const a=load(3);add(a);a.api.confirm();assert.equal(a.api.state.pending,true);assert.equal(a.api.state.confirmed,false);a.tick();assert.equal(a.api.state.pending,false);assert.equal(a.api.state.confirmed,true);
});
check('V1-20','Escape desde detalle regresa al carrito','Manejador de teclado',()=>{
 const a=load(2);act(a,'detail',{item:'cafe'});a.events.get('keydown')({key:'Escape'});assert.equal(a.api.state.screen,'cart');
});
check('V1-21','Escape en Dashboard vuelve a la etapa anterior','Manejador de teclado',()=>{
 const a=load(10);a.api.dashMove(2,true);a.events.get('keydown')({key:'Escape'});assert.equal(a.api.state.dstep,1);
});
check('V1-22','La fuente define un indicador focus-visible','Fuente; no medición visual',()=>{
 assert.match(css,/:focus-visible/);assert.match(css,/outline:3px solid/);
});
check('V1-23','Hay viewport y reglas móviles comunes en la fuente','Fuente; no medición de layout',()=>{
 assert.match(html,/name="viewport"/);assert.match(css,/@media\(max-width:460px\)/);
});
check('V1-24','Los doce escenarios están disponibles y fijados a v1','Lógica',()=>{
 for(let n=1;n<=12;n++){const a=load(n);assert.equal(a.api.version,'v1');assert.match(scenarios,new RegExp(`IHC-A-${String(n).padStart(2,'0')}`));}
});

const report={generatedAt:new Date().toISOString(),scope:'Fuente y lógica de v1. Sin navegador nativo ni participantes.',passed:results.filter(x=>x.status==='OK').length,total:results.length,results};
const output=fs.mkdtempSync(path.join(os.tmpdir(),'ihc-v1-logica-'));
fs.writeFileSync(path.join(output,'resultado.json'),JSON.stringify(report,null,2));
console.log(JSON.stringify({...report,output},null,2));
if(report.passed!==report.total)process.exitCode=1;
