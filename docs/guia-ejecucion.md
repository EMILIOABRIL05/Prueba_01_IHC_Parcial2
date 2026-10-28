# Guía de ejecución y reproducción

Servir desde la raíz con `python -m http.server 8000`. Abrir `/prototipo/v1/` o `/prototipo/v2/` y elegir la tarjeta. El servidor no agrega un backend de pedidos; ofrece un origen HTTP estable para archivos y almacenamiento.

## CaféU

Inicio → Menú → Ver detalle (Escape vuelve) → Agregar → Mi pedido → editar o quitar → revisar total/avisos aplicables → confirmar → pendiente → error/reintento o recibo. En A01, cualquier edición exige revisar el total vigente; A05 aplica el presupuesto USD 4,25. Durante envío se bloquean cambios; después del acuse se usa Hacer otro pedido para iniciar un carrito vacío.

## Dashboard UX

Datos y procedimiento → título/código P-001 a P-999 → Checklist → Observaciones → Revisión → Verificando → Sesión cerrada. A07 bloquea salir de Checklist incompleto. A12 permite llegar a la revisión de pendientes, pero no cerrar hasta completar 3/3; el error lleva a la casilla faltante. A08/A12 conservan el progreso y el cierre en este navegador; compruebe Guardado/Sin guardar. Errores debe ser un entero no negativo.

## Validación

Seguir [tests/README.md](../tests/README.md). La prueba HTTP usa ambas implementaciones reales, no una página reconstruida con fuentes compartidas. Capturas y metadatos se guardan en una salida nueva. [Evidencia actual](../evidencias/ejecucion-actual/README.md).

## Práctica con personas

Usar [pruebas/sesion.md](../pruebas/sesion.md). Registrar observación externa, cita auténtica y captura de esa ejecución. No reutilizar imágenes técnicas para acreditar participantes.
