# Decisiones de diseño e implementación: v1 a v2

Base v2 de Pablo Lozada; arquitectura e incidencias iniciales de Emilio Abril; v1 y revisiones de William Martínez. Se conserva la atribución mediante commits y PR.

La v1 independiente es una implementación distinta de la v2. Los siguientes fragmentos son referencias de comportamiento, no diffs literales entre el mismo archivo. El navegador ejecuta ambas entradas HTTP reales.

## IHC-A-01 · Compra rápida y revisión del importe
- **Problema:** El total permanece obsoleto al variar cantidades.
- **Decisión:** Cada cambio del pedido actualiza subtotales y total; en A01 se exige revisar la versión vigente del carrito antes de confirmar.
- **Fundamento:** Visibilidad del estado y prevención de errores: el importe revisado corresponde al pedido enviado.
- **Fragmento antes (v1, comportamiento):** El total permanece obsoleto al variar cantidades; fuente en `prototipo/v1/assets/app.js`.
- **Fragmento después (v2, implementación):** `cartChanged / cartSignature / handleConfirm` en `assets/app.js`.
- **Prueba técnica:** Un café y un sánduche suman USD 4,25; dos cafés y un sánduche USD 5,75. Agregar, quitar y variar cantidades invalidan la revisión. Antes de revisarla no se envía.
- **Casos:** `A01-agregar-invalida-revision; A01-quitar-invalida-revision`.
- **Capturas actuales:** [v1](../evidencias/ejecucion-actual/IHC-A-01-v1.png) y [v2](../evidencias/ejecucion-actual/IHC-A-01-v2.png).

## IHC-A-02 · Pedido completo por teclado
- **Problema:** Quitar no identifica el producto y elimina sin confirmación.
- **Decisión:** Quitar identifica acción y producto; abre un diálogo con Cancelar inicial, Escape, ciclo de foco y retorno al disparador.
- **Fundamento:** Control y libertad; reconocimiento de la acción; prevención del borrado accidental.
- **Fragmento antes (v1, comportamiento):** Quitar no identifica el producto y elimina sin confirmación; fuente en `prototipo/v1/assets/app.js`.
- **Fragmento después (v2, implementación):** `openRemoval / closeRemoval / render` en `assets/app.js`.
- **Prueba técnica:** Cancelar o Escape conserva el producto y enfoca el control que abrió el aviso; confirmar elimina solo el elegido. Reducir la última unidad también pide confirmación.
- **Casos:** `IHC-A-02-v2; A04-detalle-Escape`.
- **Capturas actuales:** [v1](../evidencias/ejecucion-actual/IHC-A-02-v1.png) y [v2](../evidencias/ejecucion-actual/IHC-A-02-v2.png).

## IHC-A-03 · Acuse visible y privacidad
- **Problema:** El resultado dice Listo sin número ni desglose.
- **Decisión:** El acuse identifica el pedido y muestra sus productos, cantidades y total, sin datos personales.
- **Fundamento:** Visibilidad del estado, reconocimiento y minimización de datos.
- **Fragmento antes (v1, comportamiento):** El resultado dice Listo sin número ni desglose; fuente en `prototipo/v1/assets/app.js`.
- **Fragmento después (v2, implementación):** `handleConfirm / pendingOrder / receipt / startNewOrder` en `assets/app.js`.
- **Prueba técnica:** El recibo utiliza la instantánea del envío. Hacer otro pedido vacía el carrito y produce otra referencia; regresar al carrito no reenvía el pedido recibido.
- **Casos:** `A03-pedido-nuevo-e-identificador`.
- **Capturas actuales:** [v1](../evidencias/ejecucion-actual/IHC-A-03-v1.png) y [v2](../evidencias/ejecucion-actual/IHC-A-03-v2.png).

## IHC-A-04 · Ingredientes, alérgenos y corrección
- **Problema:** Se permite confirmar sin reconocer la advertencia.
- **Decisión:** Detalle y carrito exponen los alérgenos. El pedido con sánduche no se confirma sin aceptar el aviso correspondiente al carrito actual.
- **Fundamento:** Prevención de errores y proximidad entre información de riesgo y acción.
- **Fragmento antes (v1, comportamiento):** Se permite confirmar sin reconocer la advertencia; fuente en `prototipo/v1/assets/app.js`.
- **Fragmento después (v2, implementación):** `renderCafeU detail / ackAllergens / cartChanged / handleConfirm` en `assets/app.js`.
- **Prueba técnica:** Sin marcar la aceptación, Confirmar enfoca su casilla y explica el bloqueo. Nueva tarjeta o edición invalida la aceptación. Escape desde Detalle vuelve sin cambiar el carrito.
- **Casos:** `A04-aceptacion-contextual; A04-detalle-Escape`.
- **Capturas actuales:** [v1](../evidencias/ejecucion-actual/IHC-A-04-v1.png) y [v2](../evidencias/ejecucion-actual/IHC-A-04-v2.png).

## IHC-A-05 · Pedido dentro del presupuesto
- **Problema:** La edición produce un sobrecosto sin aviso.
- **Decisión:** El carrito muestra el total y alerta si excede USD 4,25; la confirmación queda bloqueada hasta ajustar.
- **Fundamento:** Prevención de errores y carga cognitiva: el usuario compara importes visibles.
- **Fragmento antes (v1, comportamiento):** La edición produce un sobrecosto sin aviso; fuente en `prototipo/v1/assets/app.js`.
- **Fragmento después (v2, implementación):** `calculateCartTotal / renderCafeU / handleConfirm A05` en `assets/app.js`.
- **Prueba técnica:** USD 4,25 es admisible. USD 5,75 muestra exceso y no se procesa. Reducir cantidades conserva los demás productos y permite confirmar tras revisar los avisos aplicables.
- **Casos:** `IHC-A-05-v2`.
- **Capturas actuales:** [v1](../evidencias/ejecucion-actual/IHC-A-05-v1.png) y [v2](../evidencias/ejecucion-actual/IHC-A-05-v2.png).

## IHC-A-06 · Envío único y conexión inestable
- **Problema:** Pulsar dos veces genera solicitudes duplicadas.
- **Decisión:** Mientras se procesa se bloquean las mutaciones y el reenvío. El reintento conserva la referencia lógica y el recibo describe la instantánea enviada.
- **Fundamento:** Visibilidad del estado, consistencia y recuperación de errores.
- **Fragmento antes (v1, comportamiento):** Pulsar dos veces genera solicitudes duplicadas; fuente en `prototipo/v1/assets/app.js`.
- **Fragmento después (v2, implementación):** `operation / pendingOrder / handleConfirm / cancelOperation` en `assets/app.js`.
- **Prueba técnica:** Durante pendiente no aparece éxito. Un fallo conserva datos y referencia; Reintentar puede completar una sola confirmación. Cambiar de tarjeta invalida callbacks anteriores.
- **Casos:** `A06-pedido-inmutable-y-sin-reenvio; A06-cancelar-operacion-al-cambiar-tarjeta`.
- **Capturas actuales:** [v1](../evidencias/ejecucion-actual/IHC-A-06-v1.png) y [v2](../evidencias/ejecucion-actual/IHC-A-06-v2.png).

## IHC-A-07 · Secuencia obligatoria y paso actual
- **Problema:** El Stepper permite saltar verificaciones incompletas.
- **Decisión:** Siguiente y Stepper comparten validación. En A07, salir del Checklist requiere sus tres verificaciones.
- **Fundamento:** Consistencia, reconocimiento y prevención de errores de secuencia.
- **Fragmento antes (v1, comportamiento):** El Stepper permite saltar verificaciones incompletas; fuente en `prototipo/v1/assets/app.js`.
- **Fragmento después (v2, implementación):** `navigationProblem / handleStepClick / checklistProblem` en `assets/app.js`.
- **Prueba técnica:** Con 0/3 o 2/3, Siguiente y el Stepper permanecen en Checklist, explican la falta y enfocan la casilla. Con 3/3 se permite avanzar sin perder marcas.
- **Casos:** `IHC-A-07-v2`.
- **Capturas actuales:** [v1](../evidencias/ejecucion-actual/IHC-A-07-v1.png) y [v2](../evidencias/ejecucion-actual/IHC-A-07-v2.png).

## IHC-A-08 · Procedimiento y guardado del checklist
- **Problema:** Las casillas se pierden al cambiar de etapa.
- **Decisión:** La guía explica la secuencia antes de iniciar; las marcas se conservan al ir y volver, con indicador de guardado real.
- **Fundamento:** Memoria externa, consistencia y feedback sobre conservación.
- **Fragmento antes (v1, comportamiento):** Las casillas se pierden al cambiar de etapa; fuente en `prototipo/v1/assets/app.js`.
- **Fragmento después (v2, implementación):** `storageKey A08 / saveStorage / loadStorage / save-status` en `assets/app.js`.
- **Prueba técnica:** Tras marcar, avanzar, volver y recargar, las marcas y campos guardados se recuperan en A08. Una excepción de almacenamiento se muestra como Sin guardar.
- **Casos:** `IHC-A-08-v2`.
- **Capturas actuales:** [v1](../evidencias/ejecucion-actual/IHC-A-08-v1.png) y [v2](../evidencias/ejecucion-actual/IHC-A-08-v2.png).

## IHC-A-09 · Resultados con código anónimo
- **Problema:** El formulario exige o imprime nombre real.
- **Decisión:** El dato de participante es un código P-001 a P-999; cualquier ruta de avance o cierre valida ese formato.
- **Fundamento:** Minimización de datos, consistencia y prevención de exposición accidental.
- **Fragmento antes (v1, comportamiento):** El formulario exige o imprime nombre real; fuente en `prototipo/v1/assets/app.js`.
- **Fragmento después (v2, implementación):** `dataProblem / escapeHtml / navigationProblem / finishProblem` en `assets/app.js`.
- **Prueba técnica:** Nombres, P-000 y códigos fuera del formato se rechazan con foco y explicación. P-001 y P-999 son válidos. El resumen muestra código y nunca interpreta notas como HTML.
- **Casos:** `A09-limites-de-codigo; Dashboard-texto-no-inserta-HTML`.
- **Capturas actuales:** [v1](../evidencias/ejecucion-actual/IHC-A-09-v1.png) y [v2](../evidencias/ejecucion-actual/IHC-A-09-v2.png).

## IHC-A-10 · Stepper y estados accesibles
- **Problema:** El paso actual solo se diferencia visualmente.
- **Decisión:** El paso actual tiene texto y aria-current=step; el cambio de pantalla enfoca su encabezado y actualiza una región de estado persistente.
- **Fundamento:** Diseño inclusivo y redundancia visual/semántica del feedback.
- **Fragmento antes (v1, comportamiento):** El paso actual solo se diferencia visualmente; fuente en `prototipo/v1/assets/app.js`.
- **Fragmento después (v2, implementación):** `render focusId / announce / live-status / renderDashboard` en `assets/app.js`.
- **Prueba técnica:** Tab y Enter recorren las etapas; después de avanzar el encabezado recibe foco y el estado textual cambia. La inspección de atributos y foco no reemplaza un ensayo con lector.
- **Casos:** `IHC-A-10-v2`.
- **Capturas actuales:** [v1](../evidencias/ejecucion-actual/IHC-A-10-v1.png) y [v2](../evidencias/ejecucion-actual/IHC-A-10-v2.png).

## IHC-A-11 · Jerarquía y controles a 360 px
- **Problema:** La Card UI rígida desborda y dificulta el recorrido.
- **Decisión:** Stepper, formularios y botones se reorganizan verticalmente; el contenido esencial queda dentro del viewport y el foco sigue el orden DOM.
- **Fundamento:** Gestalt: proximidad y jerarquía; accesibilidad situacional.
- **Fragmento antes (v1, comportamiento):** La Card UI rígida desborda y dificulta el recorrido; fuente en `prototipo/v1/assets/app.js`.
- **Fragmento después (v2, implementación):** `assets/styles.css media max-width 480px / renderDashboard` en `assets/app.js`.
- **Prueba técnica:** A 360 x 800, los controles visibles no exceden el ancho y el documento no requiere desplazamiento horizontal. Se verifica Datos, Checklist, Observaciones, Revisión y Cierre.
- **Casos:** `IHC-A-11-v2; 12-tarjetas-controles-dentro-de-360px`.
- **Capturas actuales:** [v1](../evidencias/ejecucion-actual/IHC-A-11-v1.png) y [v2](../evidencias/ejecucion-actual/IHC-A-11-v2.png).

## IHC-A-12 · Reanudación y cierre verificado
- **Problema:** Se permite finalizar sin validar el checklist obligatorio.
- **Decisión:** El cierre requiere datos válidos y exactamente tres verificaciones verdaderas. Falta, error de almacenamiento o datos dañados no producen cierre confirmado.
- **Fundamento:** Prevención de falso éxito, continuidad de tarea y feedback comprobable.
- **Fragmento antes (v1, comportamiento):** Se permite finalizar sin validar el checklist obligatorio; fuente en `prototipo/v1/assets/app.js`.
- **Fragmento después (v2, implementación):** `loadStorage / finishProblem / handleDashboardFinish / saveStorage` en `assets/app.js`.
- **Prueba técnica:** Con 2/3 se anuncia el ítem faltante y se enfoca su casilla. Se preservan campos y etapa; con 3/3 se verifica y guarda. Recargar restaura también la sesión cerrada válida.
- **Casos:** `IHC-A-12-v2; A12-checklist-persistido-vacio; A12-fallo-guardado-y-reintento`.
- **Capturas actuales:** [v1](../evidencias/ejecucion-actual/IHC-A-12-v1.png) y [v2](../evidencias/ejecucion-actual/IHC-A-12-v2.png).

## Criterios transversales

- Cancelar es el foco inicial del modal; Tab/Shift+Tab quedan dentro y Escape conserva el pedido.
- Cada cambio relevante invalida revisión/aceptación; el envío usa una instantánea y un identificador por intención. El prototipo no demuestra idempotencia de un backend inexistente.
- Siguiente, Stepper y cierre comparten validación. El estado guardado se comprueba antes de reanudar.
- El texto introducido se escapa antes de insertarse en HTML y los errores se validan como enteros no negativos.
- El contenido móvil se reorganiza; no se oculta el desbordamiento para aparentar cumplimiento.
- Las comprobaciones de foco, atributos y viewport no equivalen a una certificación global WCAG ni a una prueba humana.
