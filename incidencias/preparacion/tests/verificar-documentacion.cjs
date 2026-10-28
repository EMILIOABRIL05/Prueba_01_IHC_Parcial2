'use strict';
const fs=require('node:fs');
const path=require('node:path');
const assert=require('node:assert/strict');
const root=path.resolve(__dirname,'../../..');
let count=0;
for(let i=1;i<=12;i++){
const id='IHC-A-'+String(i).padStart(2,'0');
const card=fs.readFileSync(path.join(root,'docs/tarjetas',id+'.md'),'utf8');
const curve=fs.readFileSync(path.join(root,'diagramas',id+'-curva-antes.svg'),'utf8');
const draft=fs.readFileSync(path.join(root,'github/issues',id+'-P3.md'),'utf8');
const values=[...card.matchAll(/^\| T\d+ \|.*$/gm)].map(m=>m[0].split('|')[4].trim().replace('−','-'));
const stored=(curve.match(/data-emotions="([^"]+)"/)||[])[1]?.split(',')||[];
assert.deepEqual(stored,values,id+' curva y tabla');
const row=card.split('\n').find(l=>l.startsWith('| P3 |'));
const sev=draft.match(/\*\*Severidad estimada:\*\* ([^;\n]+)/);
assert.ok(row&&sev,id+' severidades');
assert.equal(row.split('|')[3].trim(),sev[1].trim(),id+' P3');
count++;
}
console.log(count+'/12 curvas y severidades coherentes; datos de estimación, no observación.');
