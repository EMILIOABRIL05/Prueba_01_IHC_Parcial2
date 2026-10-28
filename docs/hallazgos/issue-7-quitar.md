# Issue #7: Quitar, teclado y foco

La base v2 procede del PR #12 de Pablo. El PR #14 de William añadió Cancelar inicial, contención de Tab/Shift+Tab, fondo inerte, Escape y retorno al disparador exacto. La corrección integral conserva esas decisiones y añade recuperación de foco al editar y al cambiar de pantalla.

## Comportamiento final

Quitar identifica producto y acción. Enter abre el diálogo sin borrar; Cancelar recibe foco. Escape/Cancelar conserva el carrito y enfoca el disparador exacto. Confirmar elimina el producto seleccionado y enfoca otro control existente. Disminuir la última unidad en A02 pasa por la misma confirmación. El resto de la ruta ofrece IDs estables, encabezados enfocables y región de estado persistente.

## Evidencia

`node tests/issue7-logica.mjs`: once casos de manejadores/HTML. `python tests/issue7-navegador.py`: grupo A02 de la suite HTTP real. La [ejecución actual](../../evidencias/ejecucion-actual/README.md) acredita Tab, Enter, Escape y foco nativo, con [captura del diálogo](../../evidencias/ejecucion-actual/A02-dialogo-teclado.png).

La línea base independiente v1 conserva el fallo. La compatibilidad con lector de pantalla y la experiencia de participantes se validan aparte; el ensayo técnico no certifica conformidad global WCAG.
