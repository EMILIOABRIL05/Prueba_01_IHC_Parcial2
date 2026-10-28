# Contraste de las pantallas Figma con HTML v2

## Estado de la comprobación remota

El 28-10-2026 se intentó leer CaféU `XQP1LByW4KtPfTxyy5ouoV` y Dashboard `bPSF7lzSTecjbFlwLtRzUE`. Figma devolvió límite de llamadas del plan Starter en ambas consultas. **No se inspeccionaron capas ni se confirmó coincidencia visual.** No se modificaron archivos remotos ni conexiones.

Referencia: main `49abf9cadd269553594142be02dfb068fa53efc3`, integrado por PR #20; [v2](../prototipo/v2/index.html). Los [tableros SVG](tableros/) muestran cuatro estados por tarjeta; los [wireframes](../wireframes/) incluyen dos estados R7. No son una exportación del lienzo remoto.

## Método de contraste

1. Abrir cada archivo desde [el registro](REGISTRO-FIGMA.md) y anotar fecha, página y nombre/ID del frame.
2. Comparar con HTML v2: datos, estado, mensajes, controles, jerarquía y recuperación. Registrar capturas o exportación actual.
3. Marcar cada fila como coincide, requiere cambio o no existe, indicando frame y diferencia.
4. Actualizar pantallas si corresponde y repetir la comparación. El encargo original pide pantallas; las conexiones de Prototype no se agregan a esta lista.

## Pantallas y criterios

| Tarjeta | Estados/contenido | Criterio específico | Resultado remoto |
|---|---|---|---|
| A01 | Carrito, edición, revisión, pendiente y recibido. | 4,25 a 5,75, diferencia +1,50 y acción de revisar. Incluir [R7](../wireframes/IHC-A-01-revision-R7.svg). | No verificado: cuota |
| A02 | Carrito, diálogo quitar, cancelación, producto restante/carrito vacío. | Nombre del producto, Cancelar/Quitar y foco documentado. | No verificado: cuota |
| A03 | Confirmación y nuevo pedido. | Acuse, identificador, resumen, total y nueva compra sin datos personales. | No verificado: cuota |
| A04 | Detalle, ingredientes/alérgenos, edición y advertencia. | Reconocimiento antes de confirmar y corrección conservando el pedido. | No verificado: cuota |
| A05 | Dentro de límite, excedido y ajustado. | Límite 4,25, aviso y bloqueo mientras se excede. | No verificado: cuota |
| A06 | Pendiente, error, reintento y recibo. | Pendiente no parece éxito; sin segundo envío activo; reintento conserva intención. | No verificado: cuota |
| A07 | Datos, checklist, observaciones, revisión y cerrado. | Cuatro etapas; no saltar checklist por Stepper ni por Siguiente. | No verificado: cuota |
| A08 | Procedimiento, marcas, regreso y recuperación. | Guía inicial, marcas conservadas e indicador de guardado. | No verificado: cuota |
| A09 | Formulario anónimo, error y revisión. | P-001 a P-999; no nombres/apellidos ni P-000. | No verificado: cuota |
| A10 | Paso actual, controles, validación y cierre. | Información además del color; la anotación visual no sustituye la prueba de lector. | No verificado: cuota |
| A11 | Cuatro etapas a 360 px. | Sin solapamientos ni controles fuera del ancho; jerarquía legible. | No verificado: cuota |
| A12 | Recuperación, revisión 2/3, pendiente, verificación y cerrado. | Bloqueo, conservación y guardado. Incluir [R7](../wireframes/IHC-A-12-pendiente-R7.svg). | No verificado: cuota |

## Diferencias a comprobar

HTML usa **cuatro etapas de trabajo** en Dashboard más el estado final. Los diseños previos de seis etapas necesitan contraste si siguen presentes. El catálogo v2 usa sánduche 2,75; no trasladar el precio 2,25 de v1. La revisión obligatoria A01 y el estado pendiente A12 deben aparecer en las pantallas correspondientes.

## Registro visual

- Revisor y fecha: pendiente.
- Página y frame/ID por fila: pendiente.
- Exportación/captura original: pendiente.
- Diferencias y pantallas actualizadas: pendiente.
- Resultado después del cambio: pendiente.

Para retomar desde el asistente se necesita que Figma permita lecturas o una exportación actual. Preparar esta guía no completa la inspección remota.
