# Verificación posterior a la fusión del PR #20

La ejecución del 28-10-2026 a las **17:07:57 -05** (22:07:57 UTC) comprobó los mismos 361 archivos publicados en main `49abf9cadd269553594142be02dfb068fa53efc3`. No hubo archivos faltantes ni hashes Git distintos.

Resultado: **41/41** casos de navegador por HTTP real, Chromium 153.0.8010.0, Linux, viewport 360 x 800. Incluye 24 casos tarjeta/versión y 17 regresiones. [Resultado completo](resultado.json) con revisión, entorno, SHA-256 de ocho fuentes y estado de cada caso.

Las 33 capturas publicadas en [ejecucion-actual](../ejecucion-actual/README.md) corresponden a las mismas fuentes de aplicación. Esta carpeta conserva solo el nuevo reporte; no presenta las capturas previas como nuevas ni copia sus fechas.

También se repitieron correctamente: 14/14 regresiones, 7/7 R7, 11/11 modal A02, 24/24 v1, 17/17 modelo preparatorio y 12/12 coherencia de curvas/severidades. La arquitectura conserva 12 fichas, 74 requisitos, 24 diagramas de navegación y 50 Lo-Fi. No se encontraron enlaces Markdown internos rotos.

## Reproducir

Desde la raíz, instalar las dependencias indicadas en el README y ejecutar:

```bash
python tests/navegador_integral.py --revision 49abf9cadd269553594142be02dfb068fa53efc3 --salida ruta/nueva
```

Si se usa un Chromium existente, añadir `--browser-path ruta/al/ejecutable`. `--revision` etiqueta el commit que el ejecutor debe haber comprobado; no descarga ni cambia por sí solo el código local.

Estos resultados son técnicos. No registran participantes, un lector de pantalla, revisión personal de compañeros ni inspección remota de Figma.
