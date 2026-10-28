'use strict';
const assert=require('node:assert/strict');
const M=require('../model.js');
const cases=["IHC-A-01","IHC-A-01","IHC-A-02","IHC-A-02","IHC-A-03","IHC-A-04","IHC-A-04","IHC-A-05","IHC-A-06","IHC-A-07","IHC-A-07","IHC-A-08","IHC-A-09","IHC-A-10","IHC-A-11","IHC-A-12","IHC-A-12"];
{let s=M.initial('IHC-A-01');for(const a of ["edit","confirm"])s=M.transition(s,a);assert.ok(s.total===5.75&&s.status==='bloqueado','Caso 1 IHC-A-01');}
{let s=M.initial('IHC-A-01');for(const a of ["edit","review","confirm"])s=M.transition(s,a);assert.ok(s.status==='confirmado','Caso 2 IHC-A-01');}
{let s=M.initial('IHC-A-02');for(const a of ["remove"])s=M.transition(s,a);assert.ok(s.focus==='deshacer'&&s.removed==='Café','Caso 3 IHC-A-02');}
{let s=M.initial('IHC-A-02');for(const a of ["remove","undo"])s=M.transition(s,a);assert.ok(s.cart.length===2&&s.removed===null,'Caso 4 IHC-A-02');}
{let s=M.initial('IHC-A-03');for(const a of ["confirm","confirm","wait8"])s=M.transition(s,a);assert.ok(s.requests===1&&s.status==='pendiente','Caso 5 IHC-A-03');}
{let s=M.initial('IHC-A-04');for(const a of ["add-allergen","confirm"])s=M.transition(s,a);assert.ok(s.status==='bloqueado','Caso 6 IHC-A-04');}
{let s=M.initial('IHC-A-04');for(const a of ["add-allergen","edit","ack","confirm"])s=M.transition(s,a);assert.ok(s.status==='confirmado','Caso 7 IHC-A-04');}
{let s=M.initial('IHC-A-05');for(const a of ["increase-price","confirm"])s=M.transition(s,a);assert.ok(s.unitPrice===2.75&&s.status==='bloqueado','Caso 8 IHC-A-05');}
{let s=M.initial('IHC-A-06');for(const a of ["submit","disconnect","retry","ok"])s=M.transition(s,a);assert.ok(s.requests===1&&s.status==='confirmado','Caso 9 IHC-A-06');}
{let s=M.initial('IHC-A-07');for(const a of ["new-check","go"])s=M.transition(s,a);assert.ok(s.checks.length===4&&s.status==='bloqueado','Caso 10 IHC-A-07');}
{let s=M.initial('IHC-A-07');for(const a of ["new-check","mark-all","go"])s=M.transition(s,a);assert.ok(s.step==='Ejecución','Caso 11 IHC-A-07');}
{let s=M.initial('IHC-A-08');for(const a of ["mark-all","next","back"])s=M.transition(s,a);assert.ok(s.checks.every(Boolean),'Caso 12 IHC-A-08');}
{let s=M.initial('IHC-A-09');for(const a of ["anonymize"])s=M.transition(s,a);assert.ok(s.personName===''&&s.errors===2,'Caso 13 IHC-A-09');}
{let s=M.initial('IHC-A-10');for(const a of ["grayscale","next"])s=M.transition(s,a);assert.ok(s.grayscale&&s.step===1,'Caso 14 IHC-A-10');}
{let s=M.initial('IHC-A-11');for(const a of ["narrow"])s=M.transition(s,a);assert.ok(s.width===320,'Caso 15 IHC-A-11');}
{let s=M.initial('IHC-A-12');for(const a of ["finish"])s=M.transition(s,a);assert.ok(s.status==='bloqueado','Caso 16 IHC-A-12');}
{let s=M.initial('IHC-A-12');for(const a of ["complete","restore","finish"])s=M.transition(s,a);assert.ok(s.status==='confirmado','Caso 17 IHC-A-12');}
console.log('17/17 pruebas puras OK; las comprobaciones visuales, foco real, y sesiones humanas siguen pendientes.');
