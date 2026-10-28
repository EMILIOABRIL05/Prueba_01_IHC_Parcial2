# Guía de ejecución y reproducción

No requiere Node ni servidor para el prototipo: abre los archivos HTML de `prototipo/v1/` y `prototipo/v2/`.

**Tarea CaféU:** ir a Menú → agregar café y sánduche → Mi pedido → editar cantidad → confirmar → observar procesamiento, error (cuando aplique) y recibo. La tarjeta 02 requiere repetir con Tab, Enter y Escape. En A04 abrir detalle y revisar alérgenos. En A05 incrementar hasta superar USD 4,25. En A06 activar «Simular fallo de red», confirmar, observar error, reintentar y comprobar duplicados.

**Tarea Dashboard:** registrar un título y un código P-001 → avanzar → checklist → registro de errores/observaciones → revisión → finalizar. En A07 intentar saltar de Datos a Revisión; en A08 marcar, salir y volver; en A09 comparar dato nominal vs seudónimo; en A10 comprobar paso actual sin color; en A11 estrechar ventana a 360 px; en A12 actualizar la página tras marcar checklist y contrastar recuperación.

**Capturas requeridas:** cada tarjeta tiene directorio preparado en `evidencias/` (usar capturas propias). Se recomienda screenshot del fallo v1, de la corrección v2, del Issue en GitHub y de la prueba realmente realizada.

**Limitación:** no hay comunicación de red real; latencia y error son simulados con temporizador. No se debe atribuir a un servicio de pedidos existente.
