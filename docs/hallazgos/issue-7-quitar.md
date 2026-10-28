# Issue #7: Quitar accesible y recuperación del foco en A02

Referencias: [Issue #7](https://github.com/EMILIOABRIL05/Prueba_01_IHC_Parcial2/issues/7), [Issue #3](https://github.com/EMILIOABRIL05/Prueba_01_IHC_Parcial2/issues/3), [Issue #4](https://github.com/EMILIOABRIL05/Prueba_01_IHC_Parcial2/issues/4), PR #12 (v2 de Pablo) y PR #13 (v1 de William).

## Alcance y procedencia

La base de v2 y su diálogo proceden del aporte de Pablo Lozada, integrado mediante PR #12. Esta rama de William complementa esa implementación con restitución exacta del foco, contención del teclado y prevención de una eliminación alternativa sin confirmación. Preparación con asistencia de IA. No atribuye pruebas ni contribuciones nuevas al compañero.

Se conserva intacta la línea de base independiente de `prototipo/v1/`. La corrección afecta al diálogo y sus controles en `assets/app.js`, que carga `prototipo/v2/index.html`. No se cambian otras funcionalidades ni se declara conformidad exhaustiva con WCAG.

## Problemas comprobables en la fuente anterior

- Escape buscaba el primer `[data-action="remove"]`, aunque el aviso se hubiese abierto desde el segundo producto.
- Cancelar y confirmar reconstruían la interfaz sin enfocar un control válido.
- El diálogo tenía atributos semánticos, pero faltaba contención de Tab y exclusión del fondo.
- En A02, reducir una cantidad de 1 a 0 podía quitar el producto sin confirmación.

## Decisiones aplicadas

1. Se conserva el nombre descriptivo `Quitar [producto] del pedido` aportado en v2 y se añaden IDs estables.
2. Abrir el aviso conserva el carrito y guarda el ID del control disparador.
3. El foco inicial se coloca en **Cancelar** para que una segunda activación inmediata no borre accidentalmente. Este criterio sustituye la elección de foco inicial en confirmar descrita en la documentación anterior de v2.
4. Tab y Shift+Tab permanecen entre Cancelar y Quitar. Cabecera y contenido de fondo quedan `inert` mientras el diálogo está abierto; también se bloquean sus acciones delegadas.
5. Escape y Cancelar conservan el pedido y devuelven el foco al disparador exacto, incluido el botón de disminuir si abrió el aviso.
6. Al confirmar, se elimina solo el producto elegido. El foco pasa al siguiente producto, al anterior cuando corresponda o a Volver al menú si el carrito quedó vacío.
7. Reducir la última unidad en A02 v2 abre el mismo aviso, en lugar de evitar la confirmación.

## Reproducción y comparación

Servir el repositorio con `python -m http.server 8000`. Abrir `/prototipo/v1/` o `/prototipo/v2/` y seleccionar A02 en la cabecera. Usar café y sánduche como datos de ensayo, sin participantes ni información personal.

| Caso | v1 independiente | v2 con esta corrección |
|---|---|---|
| Identificar quitar | Signo ×, sin nombre descriptivo | Nombre de acción y producto |
| Enter en Quitar | Eliminación directa | Abre diálogo sin borrar |
| Escape | No existe diálogo que cancelar | Conserva carrito y devuelve foco al disparador |
| Cancelar del segundo producto | No disponible | Foco vuelve al segundo producto, no al primero |
| Tab / Shift+Tab en aviso | No disponible | Ciclo entre los dos controles |
| Confirmar eliminación | Directa | Solo borra tras confirmar; enfoca un control existente |
| Quitar último producto | Foco no garantizado | Foco en Volver al menú |
| Disminuir de 1 a 0 en A02 | Elimina directamente | Pide confirmación y permite cancelar |

## Validación y evidencias

- `node tests/issue7-logica.mjs`: ejecuta los manejadores y el HTML generado con un DOM reducido. Resultado de la preparación: **11/11 comprobaciones**, guardadas en `tests/issue7-resultado.json`. Un OK de v1 acredita reproducción del fallo, no accesibilidad aprobada.
- `node --check assets/app.js`: sintaxis comprobada.
- `tests/issue7-navegador.py`: regresión preparada para navegador real, con Tab, Shift+Tab, Enter, Espacio, Escape y capturas comparativas nuevas. Requiere Playwright y Chromium disponibles. Produce su salida en una carpeta temporal.
- Las capturas anteriores de v1 tienen procedencia documentada en `prototipo/v1/evidencias/`. Las imágenes de la versión anterior de v2 no acreditan esta corrección de foco.

En el entorno de preparación no hay Chromium. **La prueba de navegador, las capturas nuevas, la inspección del foco visible, el ensayo con lector de pantalla y la sesión humana quedan pendientes.** Los tests con DOM reducido no sustituyen esas comprobaciones. No se adjuntan resultados o capturas inventadas.

## Cierre del Issue

La rama referencia #7 sin cerrarlo automáticamente. Al crear el PR, enlazar este documento, los dos commits y el resultado técnico. Antes de cerrar el Issue como completo, ejecutar la prueba de navegador, revisar sus capturas y obtener revisión fundamentada de otro integrante. La observación humana se incorpora solo cuando exista.
