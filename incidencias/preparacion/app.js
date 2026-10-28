(function(){
'use strict';
const M=window.IncidencePrep, select=document.getElementById('tarjeta');
let state=null;
const $=id=>document.getElementById(id);
const escapeHtml=v=>String(v).replace(/[&<>"']/g,ch=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));
const storeKey=id=>'ihc-incidencia-preparacion-'+id;
for(const c of M.cards){const o=document.createElement('option');o.value=c.id;o.textContent=c.id+' · '+c.title;select.appendChild(o);}
function initialize(){
const id=select.value||M.cards[0].id;
state=M.initial(id);
if(id==='IHC-A-08'||id==='IHC-A-12'){
try{const saved=JSON.parse(localStorage.getItem(storeKey(id))||'null');
if(saved&&saved.id===id&&Array.isArray(saved.checks)){state.checks=saved.checks;state.saved=saved.saved||saved.checks;state.notice='Datos del ensayo recuperados tras recargar';}}catch(e){state.notice='No fue posible leer los datos locales';}}
render();
}
function update(act){
state=M.transition(state,act);
if(state.id==='IHC-A-08'||state.id==='IHC-A-12'){
try{localStorage.setItem(storeKey(state.id),JSON.stringify({id:state.id,checks:state.checks,saved:state.saved}));}catch(e){}}
render();
const focusId=state.id==='IHC-A-02'&&state.focus==='deshacer'?'accion-undo':state.id==='IHC-A-02'&&state.focus==='quitar'?'accion-remove':state.id==='IHC-A-12'&&state.status==='bloqueado'?'accion-complete':null;
if(focusId)document.getElementById(focusId)?.focus();
}
function reset(){try{localStorage.removeItem(storeKey(select.value));}catch(e){}initialize();}
function render(){
const card=M.cards.find(c=>c.id===state.id);
$('case-area').textContent=card.area+' · '+card.id;
$('case-title').textContent=card.title;
$('trigger').textContent=card.trigger;$('goal').textContent=card.goal;
$('requirement').textContent=card.requirement;$('proof').textContent=card.proof;
const actions=$('actions');actions.innerHTML='';
for(const [act,label] of M.actions(state.id)){const b=document.createElement('button');b.type='button';b.id='accion-'+act;b.dataset.act=act;b.textContent=label;b.addEventListener('click',()=>update(act));actions.appendChild(b);}
const status=$('status');status.dataset.result=state.status;status.textContent='Estado: '+state.status+'. '+state.notice;
const safe={...state};delete safe.audit;
$('state').textContent=JSON.stringify(safe,null,2);
const audit=$('audit');audit.innerHTML='';
state.audit.slice().reverse().slice(0,12).forEach(record=>{const li=document.createElement('li');li.textContent=record.action+' → '+record.status+' — '+record.notice;audit.appendChild(li);});
const sem=$('semantic');sem.innerHTML='';
if(state.id==='IHC-A-10'){
const ul=document.createElement('ol');ul.className='stepper'+(state.grayscale?' grayscale':'');ul.setAttribute('aria-label','Pasos de la evaluación');
state.steps.forEach((name,i)=>{const li=document.createElement('li');const b=document.createElement('button');b.type='button';b.textContent=(i+1)+'. '+name+(i===state.step?' (actual)':'');if(i===state.step)b.setAttribute('aria-current','step');b.addEventListener('click',()=>update(i>state.step?'next':'prev'));li.appendChild(b);ul.appendChild(li);});sem.appendChild(ul);
}
if(state.id==='IHC-A-11'){const info=document.createElement('p');info.textContent='Prueba visual obligatoria: reduzca viewport a 320 px; compruebe document.documentElement.scrollWidth <= document.documentElement.clientWidth y alcance Siguiente por Tab.';sem.appendChild(info);const b=document.createElement('button');b.type='button';b.textContent='Siguiente (verificar posición a 320 px)';b.addEventListener('click',()=>update('narrow'));sem.appendChild(b);}
}
select.addEventListener('change',initialize);$('reset').addEventListener('click',reset);initialize();
})();