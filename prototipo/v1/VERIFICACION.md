# Verificación técnica de v1 para el Issue #3

La entrada se preparó a partir del ZIP compartido y se fijó a v1. El resultado de las comprobaciones de fuente y lógica está en [tests/resultado_logica.json](tests/resultado_logica.json). Fecha de ejecución: **28 de octubre de 2026, 11:43:30, America/Guayaquil** (16:43:30 UTC).

## Resultado ejecutado

**24/24 comprobaciones de fuente/lógica conformes al comportamiento esperado de la línea de base.** Un OK de un caso de fallo significa que el defecto se reprodujo, no que el requisito de usabilidad esté aprobado.

El script ejecuta los manejadores originales en Node, sustituye únicamente el renderizado y controla sus temporizadores. Se verificaron:

- A01–A12: total obsoleto, eliminación directa, resultado ambiguo, omisión de revisión de alérgenos, exceso sin aviso, duplicación, saltos de etapas, pérdida de marcas, campo nominal, ausencia del estado activo semántico, regla CSS del fallo móvil y cierre incompleto/pérdida de progreso.
- Recorrido de estados de CaféU, vacío y error, espera antes de resultado, fallo de envío y reintento con carrito conservado.
- Manejadores Escape de CaféU y Dashboard; versión v1 fija.
- Existencia en fuente de viewport y estilos de foco/móvil.

También se comprobó la sintaxis de JavaScript y Python, la resolución de recursos locales, la integridad de las doce imágenes de origen y sus sumas SHA-256.

## Estado respecto al Issue

| Solicitud | Evidencia disponible | Límite o siguiente comprobación |
|---|---|---|
| V1 para A01–A12, pantallas y rutas | Código local independiente y guiones por tarjeta. CaféU tiene Inicio/Menú/Detalle/Carrito/estados; Dashboard tiene cuatro etapas y cierre. | Repetir visualmente cada recorrido en el navegador. |
| Normal, procesando, error, éxito, edición | Fuente y lógica de estados; recuperación de red A06. | El Dashboard v1 tiene validaciones omitidas: documentarlas como línea de base, no como estados aprobados. |
| Tab, Enter, Escape, nombres y foco | Guion manual, script de navegador y comprobación ejecutada de los manejadores Escape. | Tabulación nativa, foco tras render y lector de pantalla pendientes de comprobación real. A02 y A10 tienen fallos deliberados. |
| Ancho de 360 px | Fuente responsiva, capturas base A01/A11 y prueba de navegador preparada. | No se midió layout nuevo en este entorno. A11 debe mostrar el fallo, no aprobarse como responsivo. |
| Capturas y ejecución local | Doce capturas v1 del ZIP con procedencia verificable y README de ejecución. | Capturas nuevas del usuario/navegador pendientes; no atribuir las de origen a una ejecución propia. |
| Reproducir fallos sin inventar observaciones | REPRODUCCION.md y 24 resultados técnicos de fuente/lógica. | No hay participantes, tiempos humanos, citas ni mejora cognitiva demostrada. |
| Commit, PR y revisión | Esta entrega se prepara en la rama william/prototipo-v1 con referencia al Issue #3. | El usuario creará el PR y otro integrante deberá revisarlo. No se declara cerrado el Issue. |
| Diferencia v1/v2 | Última columna de REPRODUCCION.md. | Es el comportamiento que se deberá contrastar; v2 y su validación corresponden a su responsable. |

## Prueba de navegador pendiente

El entorno de preparación no dispone de Chromium ni de Playwright para Python. Por eso **no se ha ejecutado** `tests/verificar_navegador.py`, no se han certificado sus resultados y no se presentan capturas nuevas de navegador.

El script preparado abre el HTML real, recorre las doce tarjetas, prueba Tab/Enter/Escape en la reproducción A02 y genera capturas y un informe en una carpeta nueva. Se debe ejecutar en un entorno que tenga los requisitos disponibles. La presencia de ARIA/CSS en código no acredita el anuncio o la apariencia en ejecución.

Las doce capturas de `evidencias/base-zip/` y el informe 29/29 del paquete original tienen otra procedencia. Aquí no se presentan esas 29 comprobaciones como una nueva ejecución de esta rama.
