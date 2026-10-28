# Guion manual por tarjeta

Repetir en navegador con teclado y, donde corresponda, lector de pantalla. Registrar versión, fecha y resultado; no marcar ejecutado por contar con una captura automática.

| Tarjeta | Tarea y criterio |
|---|---|
| A01 | Un café y un sánduche suman USD 4,25; dos cafés y un sánduche USD 5,75. Agregar, quitar y variar cantidades invalidan la revisión. Antes de revisarla no se envía. |
| A02 | Cancelar o Escape conserva el producto y enfoca el control que abrió el aviso; confirmar elimina solo el elegido. Reducir la última unidad también pide confirmación. |
| A03 | El recibo utiliza la instantánea del envío. Hacer otro pedido vacía el carrito y produce otra referencia; regresar al carrito no reenvía el pedido recibido. |
| A04 | Sin marcar la aceptación, Confirmar enfoca su casilla y explica el bloqueo. Nueva tarjeta o edición invalida la aceptación. Escape desde Detalle vuelve sin cambiar el carrito. |
| A05 | USD 4,25 es admisible. USD 5,75 muestra exceso y no se procesa. Reducir cantidades conserva los demás productos y permite confirmar tras revisar los avisos aplicables. |
| A06 | Durante pendiente no aparece éxito. Un fallo conserva datos y referencia; Reintentar puede completar una sola confirmación. Cambiar de tarjeta invalida callbacks anteriores. |
| A07 | Con 0/3 o 2/3, Siguiente y el Stepper permanecen en Checklist, explican la falta y enfocan la casilla. Con 3/3 se permite avanzar sin perder marcas. |
| A08 | Tras marcar, avanzar, volver y recargar, las marcas y campos guardados se recuperan en A08. Una excepción de almacenamiento se muestra como Sin guardar. |
| A09 | Nombres, P-000 y códigos fuera del formato se rechazan con foco y explicación. P-001 y P-999 son válidos. El resumen muestra código y nunca interpreta notas como HTML. |
| A10 | Tab y Enter recorren las etapas; después de avanzar el encabezado recibe foco y el estado textual cambia. La inspección de atributos y foco no reemplaza un ensayo con lector. |
| A11 | A 360 x 800, los controles visibles no exceden el ancho y el documento no requiere desplazamiento horizontal. Se verifica Datos, Checklist, Observaciones, Revisión y Cierre. |
| A12 | Con 2/3 se anuncia el ítem faltante y se enfoca su casilla. Se preservan campos y etapa; con 3/3 se verifica y guarda. Recargar restaura también la sesión cerrada válida. |

Las sesiones humanas se registran en [pruebas/sesion.md](../pruebas/sesion.md).
