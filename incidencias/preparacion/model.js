(function(root){'use strict';const api=(function createModel(){
"use strict";
const cards=[
{id:"IHC-A-01",area:"CaféU",title:"Precio cambia al editar",trigger:"La pantalla conserva USD 4,25 tras pasar de 1 a 2 cafés",goal:"Actualizar subtotal y total y solicitar una revisión antes de confirmar",requirement:"R7: Después de editar cantidad, el total se recalcula y Confirmar queda bloqueado hasta revisar el desglose",proof:"Modificar cantidad 1→2; ver USD 5,75; antes de revisar no confirma; revisar y confirmar"},
{id:"IHC-A-02",area:"CaféU",title:"Quitar con teclado",trigger:"Al quitar con teclado el foco desaparece y no se sabe qué se eliminó",goal:"Anunciar eliminación, devolver el foco y ofrecer Deshacer simulado",requirement:"R7: Quitar anuncia el producto, sitúa foco en Deshacer y restaura producto sin ratón",proof:"Tab→Enter en Quitar; anunciar producto; foco en Deshacer; Enter restaura"},
{id:"IHC-A-03",area:"CaféU",title:"Estado de pedido pendiente",trigger:"La confirmación demora ocho segundos y se pulsa de nuevo",goal:"Evitar operación duplicada y distinguir pendiente, confirmado y no confirmado",requirement:"R7: Una intención de envío genera un único pedido; pendiente nunca equivale a confirmado",proof:"Confirmar dos veces; solicitudes=1; a 8 s seguir pendiente; resolver sí/no"},
{id:"IHC-A-04",area:"CaféU",title:"Alergia añadida",trigger:"Aparece un alérgeno nuevo no visible previamente",goal:"Mostrar ingrediente y advertencia antes de confirmar; permitir editar sin perder carrito",requirement:"R7: Cambio de alérgeno invalida la aceptación previa y bloquea confirmar hasta revisión explícita",proof:"Anunciar alérgeno; bloquear confirmación; volver al detalle; aceptar y confirmar"},
{id:"IHC-A-05",area:"CaféU",title:"Presupuesto agotado",trigger:"Un producto sube USD 0,50 antes de confirmar",goal:"Recalcular, explicar cambio y permitir modificar o cancelar",requirement:"R7: Subida de USD 0,50 recalcula total, muestra diferencia y solicita revisión antes de confirmar",proof:"Precio 2,25→2,75; cambio visible; cambiar cantidad/cancelar; no éxito anticipado"},
{id:"IHC-A-06",area:"CaféU",title:"Falla de conexión",trigger:"La red se interrumpe al confirmar y el resultado es desconocido",goal:"Mostrar no confirmado, reintento seguro y conservar los datos",requirement:"R7: Desconexión no se presenta como éxito y el reintento conserva mismo identificador lógico",proof:"Enviar→pendiente→red caída→no confirmado; reintentar sin crear nuevo pedido"},
{id:"IHC-A-07",area:"Dashboard UX",title:"Paso obligatorio añadido",trigger:"El docente añade una verificación obligatoria antes de Ejecución",goal:"Actualizar Stepper, bloqueo de avance, feedback y navegación de retorno",requirement:"R7: El paso obligatorio nuevo aparece en Checklist y bloquea Ejecución hasta marcarlo",proof:"Agregar verificación; intentar avanzar; bloqueo; marcar todas y avanzar"},
{id:"IHC-A-08",area:"Dashboard UX",title:"Guardado inconsistente",trigger:"Tres casillas marcadas aparecen desmarcadas tras volver",goal:"Conservar marcas y diferenciar pendiente, guardado y completo",requirement:"R7: Navegar de ida y vuelta conserva checks y comunica guardando/guardado/completo",proof:"Marcar 3; pasar a Registro y volver; deben permanecer marcadas"},
{id:"IHC-A-09",area:"Dashboard UX",title:"Dato personal inesperado",trigger:"Interfaz solicita nombre completo y lo imprime en resumen",goal:"Sustituirlo por código anónimo sin perder las métricas",requirement:"R7: Captura/Resumen nunca solicita ni muestra nombre; se mantiene código de participante y métricas",proof:"Sustituir nombre ficticio por P-001; resumen sin nombre y errores intactos"},
{id:"IHC-A-10",area:"Dashboard UX",title:"Stepper sin color",trigger:"La interfaz se visualiza en escala de grises",goal:"Texto, atributos semánticos y teclado para identificar paso activo",requirement:"R7: El paso activo se comunica por texto y aria-current incluso sin color",proof:"Activar gris; Tab/Enter en pasos; texto (actual) y aria-current step"},
{id:"IHC-A-11",area:"Dashboard UX",title:"Vista estrecha 320 px",trigger:"La ventana baja a 320 px y Siguiente queda fuera",goal:"Evitar desplazamiento horizontal y preservar orden de lectura",requirement:"R7: A 320 px no hay scroll horizontal, Siguiente sigue visible y foco respeta orden DOM",proof:"Inspeccionar en 320 px; medir scrollWidth <= clientWidth; recorrer Tab"},
{id:"IHC-A-12",area:"Dashboard UX",title:"Finalización prematura",trigger:"Sesión marcada finalizada con checklist incompleto",goal:"Bloquear falso éxito, explicar pendiente y permitir corregir sin borrar",requirement:"R7: Finalizar exige checklist obligatorio completo y preserva los checks previos",proof:"Intentar cerrar 2/3, bloqueado; completar tercero; cierre correcto; progreso conservado"}
];
function initial(id){
if(!cards.find(c=>c.id===id))throw Error("Tarjeta desconocida: "+id);
const common={id,status:"normal",notice:"Preparación técnica, no incidencia oficial",audit:[]};
switch(id){
case "IHC-A-01":return {...common,qty:1,baseTotal:4.25,cafeUnitPrice:1.50,total:4.25,reviewed:true};
case "IHC-A-02":return {...common,cart:["Café","Sánduche"],removed:null,focus:"quitar",notice:"Carrito de demostración"};
case "IHC-A-03":return {...common,requests:0,elapsed:0,status:"sin enviar"};
case "IHC-A-04":return {...common,cart:["Sánduche"],newAllergen:false,ack:false};
case "IHC-A-05":return {...common,qty:1,unitPrice:2.25,oldPrice:2.25,reviewed:true};
case "IHC-A-06":return {...common,cart:["Café"],requestId:"ENSAYO-001",requests:0,status:"sin enviar"};
case "IHC-A-07":return {...common,checks:[false,false,false],added:false,step:"Checklist"};
case "IHC-A-08":return {...common,checks:[false,false,false],saved:[false,false,false],step:"Checklist",saveStatus:"sin cambios"};
case "IHC-A-09":return {...common,personName:"Nombre ficticio de ejemplo",code:"",errors:2,notes:"Métricas de demostración",summary:""};
case "IHC-A-10":return {...common,step:0,grayscale:false,steps:["Datos","Checklist","Registro"]};
case "IHC-A-11":return {...common,width:360,overflow:false,readingOrder:true};
case "IHC-A-12":return {...common,checks:[true,true,false],saved:[true,true,false],focus:"",status:"revisión"};
}
}
function transition(state,act,value){
const s=JSON.parse(JSON.stringify(state));
let note="";const card=s.id;
const set=(status,message)=>{s.status=status;note=message;};
if(card==="IHC-A-01"){
if(act==="edit"){s.qty=2;s.total=+(s.baseTotal+(s.qty-1)*s.cafeUnitPrice).toFixed(2);s.reviewed=false;set("revisar","Cantidad 1→2. Total recalculado a USD "+s.total.toFixed(2)+". Revise antes de confirmar.");}
if(act==="review"){s.reviewed=true;set("revisado","Desglose revisado y aceptado.");}
if(act==="confirm")set(s.reviewed?"confirmado":"bloqueado",s.reviewed?"Pedido confirmado en ensayo.":"Confirme primero la revisión del nuevo total.");
}
if(card==="IHC-A-02"){
if(act==="remove"&&s.cart.length){s.removed=s.cart.shift();s.focus="deshacer";set("eliminado","Se eliminó "+s.removed+". Foco previsto: Deshacer.");}
if(act==="undo"&&s.removed){s.cart.unshift(s.removed);s.removed=null;s.focus="quitar";set("restaurado","Producto restaurado, foco previsto: Quitar.");}
}
if(card==="IHC-A-03"){
if(act==="confirm"){if(s.status==="pendiente"){set("pendiente","Pedido pendiente, se ignora la repetición.");}else if(s.status==="sin enviar"){s.requests++;set("pendiente","Solicitud enviada. Aún no está confirmada.");}}
if(act==="wait8"&&s.status==="pendiente"){s.elapsed=8;set("pendiente","Ocho segundos sin respuesta: pendiente, no éxito.");}
if(act==="resolve-ok"&&s.status==="pendiente")set("confirmado","Servidor confirmó pedido único.");
if(act==="resolve-no"&&s.status==="pendiente")set("no confirmado","Servidor informó pedido no confirmado.");
}
if(card==="IHC-A-04"){
if(act==="add-allergen"){s.newAllergen=true;s.ack=false;set("advertencia","Nuevo alérgeno: nueces. Debe revisarlo antes de enviar.");}
if(act==="edit"){set("detalle","Detalle abierto; carrito conservado.");}
if(act==="ack"){s.ack=true;set("revisado","Alérgeno nuevo revisado expresamente.");}
if(act==="confirm"){if(s.newAllergen&&!s.ack)set("bloqueado","Falta revisar la advertencia de nueces.");else set("confirmado","Pedido confirmado en ensayo.");}
}
if(card==="IHC-A-05"){
if(act==="increase-price"){s.oldPrice=s.unitPrice;s.unitPrice=+(s.unitPrice+0.5).toFixed(2);s.reviewed=false;set("revisar","Cambio de precio +USD 0,50: ahora "+s.unitPrice.toFixed(2));}
if(act==="qty-minus"){s.qty=Math.max(0,s.qty-1);s.reviewed=false;set("revisar","Cantidad ajustada. Total USD "+(s.qty*s.unitPrice).toFixed(2));}
if(act==="review"){s.reviewed=true;set("revisado","Desglose revisado. Total USD "+(s.qty*s.unitPrice).toFixed(2));}
if(act==="cancel")set("cancelado","Operación cancelada sin confirmar.");
if(act==="confirm"){if(!s.reviewed)set("bloqueado","Revise la diferencia de precio antes de confirmar.");else set("confirmado","Pedido ensayado correctamente.");}
}
if(card==="IHC-A-06"){
if(act==="submit"&&(s.status==="sin enviar"||s.status==="no confirmado")){if(s.requests===0)s.requests=1;set("pendiente","Envío "+s.requestId+" pendiente. No repetir intención.");}
if(act==="disconnect"&&s.status==="pendiente")set("no confirmado","Conexión caída. Resultado desconocido; pedido conservado.");
if(act==="retry"&&s.status==="no confirmado")set("pendiente","Reintento con la misma referencia "+s.requestId+" (simulación de idempotencia).");
if(act==="ok"&&s.status==="pendiente")set("confirmado","Acuse comprobado; una intención, una solicitud lógica.");
}
if(card==="IHC-A-07"){
if(act==="new-check"&&!s.added){s.added=true;s.checks.push(false);set("pendiente","Se agregó la verificación obligatoria antes de Ejecución.");}
if(act==="mark-all"){s.checks=s.checks.map(()=>true);set("completo","Todas las comprobaciones obligatorias marcadas.");}
if(act==="go"){if(s.checks.every(Boolean)&&s.added){s.step="Ejecución";set("completo","Se permite avanzar a Ejecución.");}else set("bloqueado","Falta completar verificación obligatoria; permanece en Checklist.");}
if(act==="back"){s.step="Checklist";set("retorno","Regresó a Checklist conservando marcas.");}
}
if(card==="IHC-A-08"){
if(act==="mark-all"){s.checks=[true,true,true];s.saveStatus="pendiente";set("pendiente","Tres casillas marcadas; cambios por guardar.");}
if(act==="next"){s.saved=s.checks.slice();s.saveStatus="guardado";s.step="Registro";set("guardado","Tres marcas guardadas al cambiar de paso.");}
if(act==="back"){s.step="Checklist";s.checks=s.saved.slice();s.saveStatus=s.checks.every(Boolean)?"completo":"guardado";set(s.saveStatus,"Se recuperaron "+s.checks.filter(Boolean).length+" de 3 marcas.");}
}
if(card==="IHC-A-09"){
if(act==="anonymize"){s.personName="";s.code="P-001";s.summary="Participante: "+s.code+"; Errores: "+s.errors+"; Notas: "+s.notes;set("anónimo","Nombre eliminado del formulario y del resumen; métricas conservadas.");}
}
if(card==="IHC-A-10"){
if(act==="grayscale"){s.grayscale=true;set("gris","Estado visible con texto y semántica, sin depender del color.");}
if(act==="next"){s.step=Math.min(s.steps.length-1,s.step+1);set("actual","Paso actual: "+s.steps[s.step]);}
if(act==="prev"){s.step=Math.max(0,s.step-1);set("actual","Paso actual: "+s.steps[s.step]);}
}
if(card==="IHC-A-11"){
if(act==="narrow"){s.width=320;s.overflow=false;s.readingOrder=true;set("320px","Ensayo a 320 px: usar inspección real de scroll y foco en navegador.");}
}
if(card==="IHC-A-12"){
if(act==="finish"){if(s.checks.every(Boolean))set("confirmado","Cierre permitido, checklist 3/3.");else {s.focus="check-"+s.checks.findIndex(v=>!v);set("bloqueado","Cierre impedido. Falta completar ítem "+(s.checks.findIndex(v=>!v)+1)+".");}}
if(act==="complete"){s.checks=s.checks.map(()=>true);s.saved=s.checks.slice();set("revisión","Checklist completo; marcas guardadas.");}
if(act==="restore"){s.checks=s.saved.slice();set("revisión","Reanudado: "+s.checks.filter(Boolean).length+"/3 marcas preservadas.");}
}
s.notice=note||s.notice;
s.audit.push({action:act,status:s.status,notice:s.notice});
return s;
}
function actions(id){
const map={
"IHC-A-01":[["edit","Editar: 1→2 cafés"],["confirm","Confirmar"],["review","Revisar desglose"]],
"IHC-A-02":[["remove","Quitar primer producto"],["undo","Deshacer"]],
"IHC-A-03":[["confirm","Confirmar (repetir)"],["wait8","Simular 8 segundos"],["resolve-ok","Servidor: confirmado"],["resolve-no","Servidor: no confirmado"]],
"IHC-A-04":[["add-allergen","Anunciar nuevo alérgeno"],["confirm","Confirmar"],["edit","Volver al detalle"],["ack","He leído alérgeno"]],
"IHC-A-05":[["increase-price","Subir USD 0,50"],["confirm","Confirmar"],["qty-minus","Modificar cantidad"],["review","Revisar desglose"],["cancel","Cancelar"]],
"IHC-A-06":[["submit","Enviar"],["disconnect","Interrumpir red"],["retry","Reintentar seguro"],["ok","Confirmación real"]],
"IHC-A-07":[["new-check","Agregar ítem obligatorio"],["go","Ir a Ejecución"],["mark-all","Marcar todos"],["back","Volver"]],
"IHC-A-08":[["mark-all","Marcar tres casillas"],["next","Cambiar etapa / guardar"],["back","Regresar"]],
"IHC-A-09":[["anonymize","Sustituir nombre por código"]],
"IHC-A-10":[["grayscale","Activar escala gris"],["next","Paso siguiente"],["prev","Paso anterior"]],
"IHC-A-11":[["narrow","Reducir a 320 px"]],
"IHC-A-12":[["finish","Finalizar"],["complete","Completar pendiente"],["restore","Reanudar sesión"]]
};
return map[id]||[];
}
return {cards,initial,transition,actions};
})();if(typeof module==='object'&&module.exports)module.exports=api;root.IncidencePrep=api;})(typeof window!=='undefined'?window:globalThis);
