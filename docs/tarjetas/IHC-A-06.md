# IHC-A-06 · CaféU · Requisitos y trazabilidad

**Naturaleza:** especificación de diseño. No contiene mediciones de usuarios ni un incidente sorpresa resuelto.

## Datos del caso
- **Persona:** Estudiante con red móvil inestable.
- **Tarea crítica:** Confirmar pedido desde teléfono.
- **Restricción:** No declarar éxito estando pendiente.
- **Fallo descrito en tarjeta docente:** Dos pulsaciones duplican confirmaciones.
- **Recurso complementario:** Dashboard UX (touchpoints, momentos de verdad y feedback).

## Seis requisitos verificables

| ID | Requisito | Criterio de aceptación |
|---|---|---|
| R01 | Completar «Confirmar pedido desde teléfono» mediante ruta de inicio a resultado. | Inicio → acción → revisión → resultado sin pantallas externas. |
| R02 | Resolver condición crítica: Segundo clic durante pendiente no emite otra confirmación. | Segundo clic durante pendiente no emite otra confirmación. |
| R03 | Editar o cancelar antes de enviar sin borrar datos pertinentes. | Tras modificar, el carrito refleja últimas cantidades y selección. |
| R04 | Distinguir solicitud pendiente, error y éxito de forma inequívoca. | No indicar éxito antes de confirmación; error ofrece reintento. |
| R05 | Operar controles esenciales con teclado y foco visible. | Tab alcanza controles, Enter activa y Escape permite cancelar donde aplique. |
| R06 | Cumplir restricción contextual: No declarar éxito estando pendiente. | Diferenciar pendiente, confirmado y no confirmado. |

## Arquitectura de información
- [Sitemap](../../diagramas/IHC-A-06-sitemap.mmd) con todas las páginas y regreso.
- [User flow](../../diagramas/IHC-A-06-flujo.mmd): **F1** principal, **E1** edición, **X1** error.
- **Secuencia principal:** Inicio → menú → detalle → carrito → revisión → pendiente → acuse.
- **Condición principal a comprobar:** Segundo clic durante pendiente no emite otra confirmación.
- **Recuperación:** mostrar el problema en texto, ofrecer una ruta de edición y conservar los datos pertinentes.

## Componentes
Navegación y título de pantalla, Enviar solicitud, editor de pedido y estados de envío, indicador de estado, aviso textual, botones etiquetados y foco visible.

## Matriz requisito → flujo → pantalla → componente → wireframe

| Requisito | Flujo | Pantalla | Componente | Wireframe |
|---|---|---|---|---|
| R01 | F1 | Mi pedido | Navegación / catálogo / pedido | [inicio](../../wireframes/IHC-A-06-inicio.svg) |
| R02 | F1/X1 | Enviar solicitud | Control y validación específica | [accion](../../wireframes/IHC-A-06-accion.svg) |
| R03 | E1 | Mi pedido | Editor y botón regresar | [accion](../../wireframes/IHC-A-06-accion.svg) |
| R04 | F1/X1 | Estado de solicitud | Indicadores de estado y acuse | [confirmacion](../../wireframes/IHC-A-06-confirmacion.svg) |
| R05 | F1/E1 | Carrito | Botones etiquetados y foco | [accion](../../wireframes/IHC-A-06-accion.svg) |
| R06 | X1 | Enviar solicitud | Alerta o limitación contextual | [error](../../wireframes/IHC-A-06-error.svg) |

## Cuatro wireframes Lo-Fi
- [inicio](../../wireframes/IHC-A-06-inicio.svg)
- [accion](../../wireframes/IHC-A-06-accion.svg)
- [error](../../wireframes/IHC-A-06-error.svg)
- [confirmacion](../../wireframes/IHC-A-06-confirmacion.svg)

## Comprobación técnica al integrar el prototipo
1. Seleccionar IHC-A-06 y ejecutar **F1**; observar estados y resultado.
2. Probar la ruta **E1** y el error **X1**, preservando información pertinente.
3. Verificar R02: Segundo clic durante pendiente no emite otra confirmación.
4. Verificar R06: Diferenciar pendiente, confirmado y no confirmado.
5. Guardar evidencia con versión, fecha, acción y resultado real.

La integración del prototipo pertenece a otras ramas. Este diseño no acredita por sí mismo una observación externa.

**Referencia GitHub:** [Issue #2](https://github.com/EMILIOABRIL05/Prueba_01_IHC_Parcial2/issues/2).
