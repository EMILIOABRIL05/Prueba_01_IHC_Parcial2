# Verificación de navegador: complementaria (no ejecutada automáticamente)
Ejecutar el simulador con servidor local: `python -m http.server 8000`; abrir `/incidencias/preparacion/`.

## Inspección con teclado
- A02: Tab hasta Quitar, Enter, comprobar anuncio con lector de pantalla/role status y foco en Deshacer; Enter restaura.
- A10: sin color, texto «(actual)» + `aria-current="step"` en DOM. Revisar Tab/Enter.
- A11: viewport **320 px** (no 360). Consola: `document.documentElement.scrollWidth <= document.documentElement.clientWidth`. Revisar orden con Tab y botón Siguiente.

## Verificación de regresión y evidencias
- Ejecutar `node incidencias/preparacion/tests/verificar-modelo.cjs` (17 aserciones puras).
- En navegador, repetir el guion `incidencias/preparacion/README.md` de cada tarjeta, capturar **antes y después del ensayo** con nombre que diga PREPARACIÓN.
- No reutilizar capturas del ensayo como evidencia de ejecución posterior a la incidencia real.
- No atribuir al simulador operaciones de red, transacciones, lectores de pantalla o interacción de participantes reales.
