# Matriz de Decisiones de Diseño, Accesibilidad y Corrección (v1 → v2)

**Proyecto:** Prueba 01 · IHC · Parcial 2 (UTA - Quinto Nivel)  
**Responsable:** Pablo Lozada ([@idk-Damian](https://github.com/idk-Damian)) · Rama `pablo/prototipo-v2`  
**Issues vinculados:**
- [Issue #4 · [Fase 4][Pablo Lozada] Corrección v2, accesibilidad y antes/después](https://github.com/EMILIOABRIL05/Prueba_01_IHC_Parcial2/issues/4)
- [Issue #6 · [Hallazgo][A01][Alta] Total no se actualiza al cambiar cantidades](https://github.com/EMILIOABRIL05/Prueba_01_IHC_Parcial2/issues/6)
- [Issue #7 · [Hallazgo][A02][Alta] Quitar carece de nombre accesible y confirmación](https://github.com/EMILIOABRIL05/Prueba_01_IHC_Parcial2/issues/7)
- [Issue #8 · [Hallazgo][A12][Alta] Cierre exitoso sin validar checklist obligatorio](https://github.com/EMILIOABRIL05/Prueba_01_IHC_Parcial2/issues/8)

---

## 1. Metodología de Validación y Distinción de Evidencias
De acuerdo con las directrices de la cátedra de IHC, se establece una distinción metodológica estricta:
1. **Mejora técnica demostrada (código, accesibilidad, heurística):** comprobación verificable mediante inspección del DOM, validación de estados ARIA, soporte por teclado, diseño responsive a 360 px y pruebas de ejecución.
2. **Mejora observada con usuarios reales:** mediciones psicométricas, tiempos de tarea y verbalizaciones obtenidas durante las sesiones presenciales con participantes de otros equipos (registradas en la Fase 5 por Jhonatan Gamboa en `pruebas/sesion.md`).

---

## 2. Matriz de Decisiones por Escenario (IHC-A-01 a IHC-A-12)

### IHC-A-01 · Recálculo de cantidades y total en tiempo real (Issue #6)
- **Problema:** En v1, al modificar las cantidades de café o sánduche con los selectores de incremento/decremento, el subtotal y el importe total (`#total`) no se recalculan dinámicamente en el DOM, mostrando un total obsoleto que induce a error al confirmar la compra. Severidad: Alta.
- **Decisión IHC:** Vincular un oyente de eventos reactivo a la modificación de la colección del carrito que recalcule inmediatamente subtotal y total formateado (`formatMoney(calculateCartTotal())`) en el elemento `#total` sin requerir recarga de página.
- **Fragmento antes (v1):**
```javascript
// v1: se actualiza el objeto en memoria pero se mantiene en pantalla el total inicial
var cartItem = state.cart.find(c => c.id === item);
cartItem.qty += delta;
render(); // #total renderiza state.v1CachedTotal desactualizado
```
- **Fragmento después (v2):**
```javascript
// v2: recálculo inmediato y actualización reactiva del DOM
var cartItem = state.cart.find(c => c.id === item);
cartItem.qty += delta;
var totalActual = calculateCartTotal();
document.getElementById('total').innerText = formatMoney(totalActual);
```
- **Prueba técnica:** Abrir `prototipo/v2/`, agregar café ($1.50), pulsar `+` en cantidad; verificar que el importe reflejado pase inmediatamente a $3.00.
- **Captura comparativa:** `evidencias/capturas-tecnicas/IHC-A-01-v1.png` vs `evidencias/capturas-tecnicas/IHC-A-01-v2.png`.

---

### IHC-A-02 · Accesibilidad por teclado y confirmación de quitar (Issue #7)
- **Problema:** En v1, el botón para remover productos es un carácter ambiguo `×` sin etiqueta accesible (`aria-label`), inoperable con lector de pantalla y borra el producto inmediatamente al pulsar Enter sin confirmación, impidiendo la recuperación de errores (Heurística de Nielsen #9). Severidad: Alta.
- **Decisión IHC:** Sustituir el glifo por texto explícito "Quitar" con `aria-label="Quitar café americano del pedido"`. Al activarlo por teclado, se despliega un cuadro de diálogo modal accesible (`role="dialog"`, `aria-modal="true"`) con foco inicial en `#remove-ok`. La tecla `Escape` cancela la operación y devuelve el foco al botón disparador.
- **Fragmento antes (v1):**
```html
<!-- v1: botón sin nombre accesible ni confirmación -->
<button class="btn-remove" data-action="remove" data-item="cafe">×</button>
```
- **Fragmento después (v2):**
```html
<!-- v2: botón accesible con modal y restauración de foco -->
<button class="btn-remove" data-action="remove" data-item="cafe" 
        aria-label="Quitar café americano del pedido">Quitar</button>

<div class="dialog-backdrop" role="dialog" aria-modal="true" aria-labelledby="dialog-title">
  <h3 id="dialog-title">¿Quitar del pedido?</h3>
  <button id="remove-cancel" data-action="remove-cancel">Cancelar (Esc)</button>
  <button id="remove-ok" data-action="remove-ok">Quitar producto</button>
</div>
```
- **Prueba técnica:** Navegar usando exclusivamente `Tab`, pulsar `Enter` en Quitar, comprobar apertura de modal y foco en botón confirmar; pulsar `Escape` y verificar que el producto permanece y el foco vuelve al botón Quitar.
- **Captura comparativa:** `evidencias/capturas-tecnicas/IHC-A-02-v1.png` vs `evidencias/capturas-tecnicas/IHC-A-02-v2.png`.

---

### IHC-A-03 · Acuse de recibo explícito y privacidad de datos
- **Problema:** En v1, la pantalla final muestra un texto genérico "Listo" sin número identificador de orden, sin resumen de los productos despachados ni desglose de pago. Además, en dispositivos compartidos de cafetería, pedir datos personales innecesarios viola el principio de privacidad. Severidad: Media-Alta.
- **Decisión IHC:** Reemplazar el estado ambiguo por una tarjeta de acuse de recibo estructurada con título "Pedido recibido", número de orden unívoco `#CU-104`, contenedor semántico `<section class="summ-total">` con desglose de cantidades y total abonado, eliminando cualquier recolección de cédula o teléfono.
- **Fragmento antes (v1):**
```html
<!-- v1: estado final opaco -->
<h2 class="page-title">Listo</h2>
<div class="receipt-card"><p>Tu orden ha sido procesada.</p></div>
```
- **Fragmento después (v2):**
```html
<!-- v2: acuse estructurado sin almacenamiento de datos sensibles -->
<h2 class="page-title">Pedido recibido</h2>
<div class="receipt-card">
  <div class="order-badge">#CU-104</div>
  <section class="session-summary-box">
    <div class="summ-total">Total abonado: $4.25</div>
  </section>
</div>
```
- **Prueba técnica:** Confirmar una orden y verificar en el DOM la presencia del badge `#CU-104` y del elemento `.summ-total`.
- **Captura comparativa:** `evidencias/capturas-tecnicas/IHC-A-03-v1.png` vs `evidencias/capturas-tecnicas/IHC-A-03-v2.png`.

---

### IHC-A-04 · Detección y reconocimiento obligatorio de alérgenos
- **Problema:** En v1, el sistema permite ordenar productos que contienen alérgenos severos (Gluten, Lactosa) sin advertencia perceptible antes del pago, exponiendo al usuario a riesgos de salud. Severidad: Crítica.
- **Decisión IHC:** Identificar los productos con alérgenos y presentar un banner de alta notoriedad en el carrito con una casilla de verificación obligatoria (`#ack`). Si el usuario intenta confirmar sin marcarla, se bloquea el envío y se emite un mensaje accesible en `.status.error` (`role="alert"`).
- **Fragmento antes (v1):**
```javascript
// v1: confirmación directa sin comprobar alérgenos
function handleConfirm() {
  state.view = 'confirmation';
  render();
}
```
- **Fragmento después (v2):**
```javascript
// v2: compuerta de validación con alerta accesible
var hasSanduche = state.cart.some(c => c.id === 'sanduche');
if (hasSanduche && !state.ackAllergens) {
  state.alertMessage = 'Debe revisar las advertencias de alérgenos y aceptarlas antes de confirmar';
  render();
  return;
}
```
- **Prueba técnica:** Agregar sánduche, presionar confirmar sin marcar checkbox; comprobar que se muestra el mensaje de error y el carrito no transiciona a éxito.
- **Captura comparativa:** `evidencias/capturas-tecnicas/IHC-A-04-v1.png` vs `evidencias/capturas-tecnicas/IHC-A-04-v2.png`.

---

### IHC-A-05 · Prevención de sobrecosto por límite presupuestario ($4.25)
- **Problema:** En v1, un estudiante con presupuesto ajustado de $4.25 puede agregar productos o incrementar unidades por encima del límite sin recibir advertencia ni bloqueo, generando una deuda no prevista en cafetería. Severidad: Alta.
- **Decisión IHC:** Implementar validación en tiempo real del límite monetario. Si el total supera $4.25, el sistema muestra un banner `.status.error` indicando el límite y el exceso, e inhabilita la confirmación hasta que el usuario reduzca cantidades.
- **Fragmento antes (v1):**
```javascript
// v1: sin comprobación presupuestaria
handleConfirm(); // procesa sin importar el monto
```
- **Fragmento después (v2):**
```javascript
// v2: bloqueo de confirmación y advertencia visible
if (calculateCartTotal() > 4.25) {
  state.alertMessage = 'Presupuesto excedido: límite USD 4,25. Ajuste las cantidades antes de confirmar.';
  render();
  return;
}
```
- **Prueba técnica:** Agregar café y sánduche ($4.25), sumar 1 café adicional ($5.75); comprobar aparición de `.status.error` y retención en el carrito al intentar confirmar.
- **Captura comparativa:** `evidencias/capturas-tecnicas/IHC-A-05-v1.png` vs `evidencias/capturas-tecnicas/IHC-A-05-v2.png`.

---

### IHC-A-06 · Prevención de doble envío y gestión de red inestable (Hallazgo de Referencia)
- **Problema:** En redes móviles inestables, el usuario tiende a presionar repetidamente el botón "Confirmar pedido" ante la falta de feedback inmediato. En v1, esto genera solicitudes duplicadas ("Solicitudes confirmadas en esta sesión: 2"). Severidad: Alta.
- **Decisión IHC:** Al pulsar confirmar, inhabilitar inmediatamente el botón (`disabled`), transicionar a estado intermedio con texto claro "Procesando pedido...", simular timeout de red con opción de reintento (`retry`) y registrar una sola confirmación unívoca (`confirmedCount = 1`).
- **Fragmento antes (v1):**
```html
<!-- v1: botón permanece interactivo durante la petición -->
<button class="btn-primary" data-action="confirm">Confirmar pedido</button>
<!-- Cada pulsación incrementa confirmedCount -->
```
- **Fragmento después (v2):**
```html
<!-- v2: botón inhabilitado durante el envío y reintento seguro -->
<button class="btn-primary" disabled>Procesando pedido...</button>
<!-- Si ocurre desconexión, muestra pantalla de error con botón retry -->
<button class="btn-primary" data-action="retry">Reintentar</button>
```
- **Prueba técnica:** Pulsar confirmar dos veces consecutivas en v1 y v2; verificar que en v2 el contador final indica exactamente 1 solicitud confirmada.
- **Captura comparativa:** `evidencias/capturas-tecnicas/IHC-A-06-v1.png` vs `evidencias/capturas-tecnicas/IHC-A-06-v2.png`.

---

### IHC-A-07 · Bloqueo de salto de etapas en Stepper
- **Problema:** En v1, el Stepper permite pulsar libremente botones de pasos futuros (ej: saltar directamente al paso 4), evadiendo la configuración de datos obligatorios y el checklist. Severidad: Alta.
- **Decisión IHC:** Implementar navegación secuencial obligatoria. Los pasos superiores quedan bloqueados si los pasos precedentes no han sido validados con éxito, emitiendo una notificación en `[role=alert]` ("Introduce el título y datos requeridos antes de avanzar").
- **Fragmento antes (v1):**
```javascript
// v1: salto incondicional de paso
function handleStepClick(targetStep) {
  state.dashboardStep = targetStep;
  render();
}
```
- **Fragmento después (v2):**
```javascript
// v2: compuerta secuencial de navegación
function handleStepClick(targetStep) {
  if (targetStep > state.dashboardStep && (!state.dashboardData.title || state.dashboardData.title.trim() === '')) {
    state.alertMessage = 'Introduce el título y datos requeridos antes de avanzar';
    render();
    return;
  }
  state.dashboardStep = targetStep;
  render();
}
```
- **Prueba técnica:** Desde el paso 1, pulsar el botón del paso 4; comprobar que el sistema permanece en el paso 1 y despliega el mensaje de bloqueo.
- **Captura comparativa:** `evidencias/capturas-tecnicas/IHC-A-07-v1.png` vs `evidencias/capturas-tecnicas/IHC-A-07-v2.png`.

---

### IHC-A-08 · Persistencia de marcas del checklist al navegar
- **Problema:** En v1, si el evaluador marca casillas en el checklist del paso 2, avanza al paso 3 y luego presiona "Anterior", el estado de los checkboxes se reinicia, perdiendo el trabajo realizado. Severidad: Media-Alta.
- **Decisión IHC:** Mantener el estado booleano de cada ítem en el estado central de la aplicación (`state.dashboardData.checklist`), sincronizándolo en cada evento `change` para que el renderizado preserve los atributos `checked` bidireccionalmente.
- **Fragmento antes (v1):**
```javascript
// v1: restablecimiento al retroceder
if (action === 'prev') {
  state.dashboardData.checklist = [false, false, false];
}
```
- **Fragmento después (v2):**
```javascript
// v2: persistencia íntegra de marcas
var checked = state.dashboardData.checklist[idx] ? ' checked' : '';
html += '<input type="checkbox" id="check-' + idx + '"' + checked + '>';
```
- **Prueba técnica:** Marcar `#check-0`, avanzar a Observaciones, regresar con Anterior y verificar que `#check-0` sigue marcado.
- **Captura comparativa:** `evidencias/capturas-tecnicas/IHC-A-08-v1.png` vs `evidencias/capturas-tecnicas/IHC-A-08-v2.png`.

---

### IHC-A-09 · Privacidad de participantes y códigos seudónimos
- **Problema:** En v1, el paso inicial exige obligatoriamente registrar "Nombre y Apellido completo" del participante (`#name`), violando las normas éticas de evaluación de usabilidad que exigen anonimato. Severidad: Alta.
- **Decisión IHC:** Cambiar el campo a código seudónimo (`#code`, ej: `P-001`). Si el evaluador ingresa nombres personales reconocibles (patrón de texto con espacios), el sistema rechaza el dato con alerta `role="alert"`: "Debe ingresar un código anónimo válido (ej: P-001). No ingrese nombres reales".
- **Fragmento antes (v1):**
```html
<!-- v1: solicita nombre real obligatorio -->
<label for="name">Nombre y apellido completo:</label>
<input type="text" id="name" class="form-control">
```
- **Fragmento después (v2):**
```html
<!-- v2: campo seudónimo con validación de anonimato -->
<label for="code">Código anónimo del participante (ej: P-001):</label>
<input type="text" id="code" class="form-control" placeholder="P-001">
```
- **Prueba técnica:** Ingresar "Juan Pérez" en `#code` y pulsar Siguiente; verificar rechazo. Ingresar "P-001" y verificar avance exitoso al paso 2.
- **Captura comparativa:** `evidencias/capturas-tecnicas/IHC-A-09-v1.png` vs `evidencias/capturas-tecnicas/IHC-A-09-v2.png`.

---

### IHC-A-10 · Semántica accesible para tecnología de asistencia en Stepper
- **Problema:** En v1, el paso activo del Stepper se diferencia de los demás únicamente por una variación cromática (azul vs gris), incumpliendo el criterio WCAG 2.1 - 1.4.1 (Uso del color) y privando de contexto a evaluadores con lectores de pantalla. Severidad: Alta.
- **Decisión IHC:** Añadir el atributo estándar `aria-current="step"` en el botón del paso activo, acompañado de una etiqueta textual explícita `(actual)` reconocible de forma auditiva y visual.
- **Fragmento antes (v1):**
```html
<!-- v1: distinción puramente visual por clase CSS -->
<button class="step-item active"><span>1</span> <span>Datos</span></button>
```
- **Fragmento después (v2):**
```html
<!-- v2: semántica WCAG completa -->
<button class="step-item active" aria-current="step">
  <span class="step-num">1</span>
  <span>Datos de sesión</span>
  <span style="font-size:0.75rem; font-weight:700;">(actual)</span>
</button>
```
- **Prueba técnica:** Inspeccionar el DOM del paso activo y verificar la presencia de `aria-current="step"` y del texto `(actual)`.
- **Captura comparativa:** `evidencias/capturas-tecnicas/IHC-A-10-v1.png` vs `evidencias/capturas-tecnicas/IHC-A-10-v2.png`.

---

### IHC-A-11 · Jerarquía usable y eliminación de desbordamiento a 360 px
- **Problema:** En pantallas angostas de dispositivos móviles (360 px), la Card UI de v1 tiene fijado un ancho rígido de `min-width: 460px`, generando desbordamiento horizontal (`scrollWidth > 360 px`), truncamiento de controles y superposición con el Stepper. Severidad: Alta.
- **Decisión IHC:** Aplicar un modelo de caja fluido con `box-sizing: border-box`, `max-width: 100%`, `overflow-x: hidden` y flex-wrap vertical en botones para garantizar `scrollWidth <= 360 px` en todo el recorrido.
- **Fragmento antes (v1):**
```css
/* v1: ancho rígido que desborda pantallas móviles */
body[data-version="v1"] .dashboard-card {
  min-width: 460px;
}
```
- **Fragmento después (v2):**
```css
/* v2: fluidéz y contención estricta en 360 px */
body[data-version="v2"] {
  max-width: 100%;
  overflow-x: hidden;
}
body[data-version="v2"] * {
  max-width: 100%;
}
```
- **Prueba técnica:** Ajustar el viewport a 360x780 px y evaluar en consola `document.documentElement.scrollWidth <= 360`; comprobar usabilidad vertical completa.
- **Captura comparativa:** `evidencias/capturas-tecnicas/IHC-A-11-v1.png` vs `evidencias/capturas-tecnicas/IHC-A-11-v2.png`.

---

### IHC-A-12 · Validación de checklist obligatorio y persistencia tras recarga (Issue #8)
- **Problema:** En v1, el sistema permite presionar "Finalizar sesión" emitiendo un estado final de "Sesión cerrada con éxito" incluso con el checklist obligatorio incompleto (falso positivo grave). Además, si la sesión se interrumpe y la página se recarga, todas las marcas se destruyen. Severidad: Crítica.
- **Decisión IHC:** Impedir el cierre de sesión si existe algún ítem obligatorio sin verificar, destacando el faltante en un banner `role="alert"`. Integrar persistencia local (`localStorage`) para que al reanudar la sesión se restablezca el progreso sin pérdida de información.
- **Fragmento antes (v1):**
```javascript
// v1: cierre sin compuerta lógica y pérdida de sesión
function handleDashboardFinish() {
  state.dashboardStep = 4; // Emite "Sesión cerrada" directamente
  render();
}
```
- **Fragmento después (v2):**
```javascript
// v2: validación 100% de checklist obligatorio y persistencia en localStorage
function handleDashboardFinish() {
  var allChecked = state.dashboardData.checklist.every(x => x);
  if (!allChecked) {
    state.alertMessage = 'Checklist obligatorio pendiente. Debe verificar todas las tareas antes de cerrar la sesión';
    render();
    return;
  }
  state.dashboardStep = 4;
  render();
}
```
- **Prueba técnica:** Marcar 1 de 3 casillas, pulsar finalizar y verificar alerta de bloqueo. Recargar la página y verificar que la casilla marcada continúa seleccionada. Marcar las 3 y verificar finalización autorizada.
- **Captura comparativa:** `evidencias/capturas-tecnicas/IHC-A-12-v1.png` vs `evidencias/capturas-tecnicas/IHC-A-12-v2.png`.

---

## 3. Resumen Cuantitativo de Mejoras Técnicas Implementadas
| Dimensión | Prototipo v1 | Prototipo v2 | Estándar / Referencia |
|---|---|---|---|
| **Contraste de foco visible** | No especificado / outline ausente | 3px solid #2563eb; offset 2px | WCAG 2.1 AA (2.4.7 Foco Visible) |
| **Operabilidad por teclado** | Requiere ratón en modales | Tab, Enter y Escape completos | WCAG 2.1 AA (2.1.1 Teclado) |
| **Viewport móvil (360 px)** | Desbordamiento horizontal (460 px) | Fluido sin scroll horizontal (≤360 px) | WCAG 2.1 AA (1.4.10 Reflujo) |
| **Semántica auditiva** | Solo color para paso activo | `aria-current="step"` y `(actual)` | WCAG 2.1 AA (1.4.1 Uso del Color) |
| **Prevención de errores** | Falso éxito y doble confirmación | Validación de checklist y bloqueo doble click | Nielsen #5 (Prevención de Errores) |
| **Recuperabilidad** | Borrado instantáneo sin confirmación | Diálogo modal con cancelación | Nielsen #3 (Control y Libertad del Usuario) |
| **Protección de datos** | Exigencia de nombres reales | Códigos anónimos seudónimos | Heurística de Privacidad y Consentimiento |
