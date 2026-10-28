# Reproducción técnica de la línea de base v1

Referencia: Issue #3. Iniciar cada ensayo con **Reiniciar** y seleccionar la tarjeta indicada. Registrar dispositivo, navegador, ancho, versión, pasos y evidencia. Estos guiones no son registros de participantes.

## CaféU: recorrido común

Inicio → Menú → Detalle (cuando la tarea lo requiera) → agregar → Mi pedido → editar → confirmar → procesando → resultado. El fallo de red de A06 permite observar error, reintento y edición. Un carrito vacío no permite confirmar desde su botón.

| Tarjeta | Datos y pasos de reproducción | Comportamiento v1 que debe registrarse | Qué deberá contrastar quien trabaje v2 |
|---|---|---|---|
| A01 | Ancho 360 px. Agregar 1 café y 1 sánduche; abrir Mi pedido; anotar USD 3,75; aumentar café a 2. | Cantidad 2, pero el resumen conserva USD 3,75 en lugar de USD 5,25. | Recalcular subtotal/total y anunciar el cambio; evitar un importe obsoleto al confirmar. La tarea humana deberá cronometrarse hasta recepción, con máximo de tres minutos según tarjeta. |
| A02 | Agregar café; abrir Mi pedido. Llegar con Tab al control de quitar y activarlo con Enter. Repetir inspeccionando nombre accesible. | El control usa el signo × sin un nombre que describa quitar el producto y elimina directamente, sin confirmación. Registrar posición posterior del foco. | Nombre descriptivo, confirmación/cancelación con Escape y recuperación del foco. No declarar lector de pantalla probado a partir de una inspección visual. |
| A03 | Agregar un café, abrir Mi pedido y confirmar. Esperar el resultado. | Se muestra «Listo» sin identificador ni desglose en el panel final. No se piden datos personales. | Recepción inequívoca, identificador de pedido, desglose y salida adecuada a dispositivo compartido. |
| A04 | Abrir detalle de sánduche y sus ingredientes; agregarlo; ir a Mi pedido y confirmar sin un reconocimiento previo. | Se permite enviar sin la revisión explícita de la advertencia. | Aviso perceptible y accesible antes del envío, posibilidad de corregir sin perder carrito y comprensión observada por separado. |
| A05 | Agregar café y sánduche (USD 3,75); aumentar café a 2 (USD 5,25); confirmar. | Se procesa el pedido con exceso de USD 1,00 sobre el presupuesto de USD 4,25, sin un aviso específico de sobrecosto. | Aviso antes de confirmar y ajuste conservando carrito. Documentar si la política final exige bloquear hasta ajustar. |
| A06 | Agregar café y confirmar. Durante «Procesando», activar «Confirmar de nuevo (fallo v1)». Esperar ambas respuestas. | El contador llega a dos confirmaciones para la misma intención de envío. | Un único envío, estados pendiente/confirmado/no confirmado y recuperación segura. En otro ensayo, activar fallo de red: observar error, editar o reintentar y conservar el pedido. |

## Dashboard UX: recorrido común

Datos → Checklist → Registro → Revisión → cierre. Datos de ensayo: título `Ensayo técnico`, código `P-001` en los escenarios que lo admiten, errores `0` y observación `Nota de prueba sin identidad personal`. Las tres casillas son las de la interfaz base. La entrada del nombre en A09 utiliza exclusivamente texto de prueba.

| Tarjeta | Pasos de reproducción | Comportamiento v1 que debe registrarse | Qué deberá contrastar quien trabaje v2 |
|---|---|---|---|
| A07 | Desde Datos sin completar, pulsar directamente Revisión en Stepper. Repetir desde Checklist con casillas incompletas. | Se accede a etapas posteriores sin completar condiciones previas. | Bloquear rutas inválidas con explicación, identificar paso actual y permitir volver conservando datos. |
| A08 | Completar datos; entrar a Checklist; marcar una casilla; avanzar a Registro; volver a Checklist. | Se pierde la marca al salir del paso. | Conservación real, estado guardado/sin guardar y procedimiento disponible antes de iniciar. |
| A09 | Abrir Datos y examinar el campo de participante; completar la ruta usando `Nombre de prueba` como texto de ensayo. | El formulario presenta nombre real en vez de un campo de código seudónimo. La v1 tampoco valida de forma completa todos los avances; registrar esa limitación si se observa. | Admitir y validar código sin exigir nombre real; mantener las evidencias libres de identidad. |
| A10 | Recorrer las etapas visualmente y después con teclado/lector disponible. Inspeccionar Stepper. | El paso activo se diferencia por estilo de color y no tiene `aria-current="step"` ni texto explícito «actual». | Nombre, posición y estado semántico de la etapa, anuncios de resultados y foco. La comprobación con lector queda pendiente hasta ejecutarse. |
| A11 | Ancho 360 px. Abrir Dashboard y recorrer sus etapas. Comprobar anchura y posición de Stepper respecto a campos. | El estilo `mobile-bug` desplaza Stepper, provoca desbordamiento y puede tapar el comienzo del contenido. | Jerarquía móvil sin superposición, todos los campos alcanzables y orden lógico del foco. |
| A12 | Dejar casillas incompletas, ir a Revisión y finalizar. En otro ensayo, marcar una casilla y recargar. | Se permite cerrar con checklist incompleto. La recarga no recupera el avance de v1. | Recuperar progreso guardado, revisar antes de cerrar y evitar éxito con requisitos pendientes. |

## Registro complementario de teclado y foco

1. Usar Tab y Shift+Tab desde la cabecera hasta la tarea; anotar cada control inaccesible o sin nombre descriptivo.
2. Usar Enter para activar y Espacio cuando corresponda al control nativo.
3. En Detalle o Error de CaféU, probar Escape y registrar el regreso al carrito. En Dashboard, Escape retrocede cuando hay una etapa anterior.
4. Observar el indicador de foco y su posición después de cada transición. El renderizado completo de la fuente puede perder foco en controles sin un ID estable: es una limitación de v1 que debe registrarse, no un resultado aprobado.
5. En A02 v1 no existe un diálogo de confirmación que cancelar; su incorporación y la devolución del foco deben verificarse en v2.

## Evidencia y límites

Las capturas `base-zip` ya venían en el archivo compartido. Para una ejecución propia, crear capturas nuevas con el script de navegador o manualmente y registrar su procedencia. Ningún OK de fuente/lógica equivale a conformidad de accesibilidad, aprobación del diseño o mejora de usabilidad.

Los defectos de v1 son el punto de comparación preparado. La mejora que se presente como observada debe vincularse a una sesión real y una corrección comprobable; esa sesión corresponde a la fase de pruebas.
