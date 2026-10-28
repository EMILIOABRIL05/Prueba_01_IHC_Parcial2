# Resolución de hallazgos de la revisión integral

La revisión inicial examinó main 5c525296. Esta rama corrige el contenido y el comportamiento técnico; no sustituye las actuaciones humanas requeridas.

| Hallazgo | Tema | Cambio | Evidencia o límite |
|---|---|---|---|
| H01 | Procedencia A12 | Imágenes anteriores archivadas con SHA-256; acta y resumen conservados como aportes por validar; se retiró el nombre parcial. | La ratificación de la sesión requiere registros originales y observador. |
| H02 | Revisión A01 | Toda alta, baja o cantidad invalida revisión; la firma vigente del pedido se comprueba al enviar. | Regresiones de agregar y quitar, más caso R7 nativo. |
| H03 | Navegación Dashboard | Siguiente y Stepper usan el mismo validador; A07 no sale de Checklist con obligatorios pendientes. | Caso A07 por ambas rutas. |
| H04 | Anonimato A09 | Formato P-001 a P-999 validado por navegación y cierre. | Nombres y P-000 se rechazan; P-999 se admite. |
| H05 | Pedido pendiente | Instantánea de productos/precios/total; mutaciones y segundo envío bloqueados; callbacks vinculados a operación. | Ensayo de inmutabilidad y cambio de tarjeta. |
| H06 | Registro A12 inválido | Se normalizan tres booleanos y se valida el cierre; array vacío o JSON dañado no generan éxito. | Dos casos de recuperación adversa. |
| H07 | Actas sin observación | Se corrige su clasificación y se entrega protocolo completo por tarjeta. | Las doce sesiones humanas siguen pendientes de registro o ratificación auténtica. |
| H08 | Pedido nuevo | Carrito vacío explícito, recibo separado y referencia por intención; acuse no se reenvía. | Dos pedidos tienen identificadores distintos. |
| H09 | Alérgenos heredados | Se reinicia aceptación al cambiar contexto y al editar el carrito. | Regresión A04 de aceptación contextual. |
| H10 | Cierre/guardado A12 | Se restaura etapa cerrada válida; error de almacenamiento impide confirmar cierre; reintento conserva datos. | Recarga, cuota controlada y temporizadores. |
| H11 | Texto y métricas | Escape de texto/atributos; errores enteros no negativos. | Marcado no se ejecuta; negativos y decimales se rechazan. |
| H12 | Foco y anuncios | IDs estables, encabezado enfocable, región de estado persistente y modal con Cancelar inicial. | Teclado/foco nativo verificados; lector de pantalla pendiente. |
| H13 | A08 procedimiento y guardado | Guía inicial, conservación en memoria y almacenamiento de A08, indicador Guardado/Sin guardar. | Ida/vuelta y recarga con datos guardados. |
| H14 | Pruebas obsoletas | Comprobadores actualizados a 74 y nombre real de README; suite HTTP sustituye página reconstruida y rutas fijas. | 41/41 navegador, 14/14 nuevas regresiones lógicas. |
| H15 | Capturas v2 antiguas | 33 capturas nuevas con revisión, entorno y SHA-256 de fuentes; anteriores archivadas. | Directorio evidencias/ejecucion-actual. |
| H16 | Arquitectura divergente | Detalle implementado; doce flujos y sitemaps, 48 Lo-Fi específicos y tableros actualizados. | Validación de archivos y sintaxis Mermaid. |
| H17 | Documentos obsoletos | README, 74 requisitos, tabla R7 válida, referencias, precios, Figma y registro Edge alineados. | Comprobación de enlaces y fuentes. |
| H18 | Momentos genéricos | Dos momentos de verdad propios de cada tarjeta; valores de curvas preservados como hipótesis. | Doce tablas coinciden con sus curvas. |

## Evidencia actual
- Código probado: 787a4fd22baded030dd132343295b952f6290790.
- Navegador: Chromium 153.0.8010.0; 41/41 casos; fecha UTC 2026-10-28T21:20:34.474219+00:00.
- [Reporte y capturas](../evidencias/ejecucion-actual/README.md).
- [Actas y pendientes humanos](../pruebas/sesion.md).
- Los commits del equipo se conservan; la rama actual se revisa mediante un PR que abrirá William.
