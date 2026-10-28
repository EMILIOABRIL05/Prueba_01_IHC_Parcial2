# IHC-A-02 · CaféU · Requisitos y trazabilidad

**Naturaleza:** especificación de diseño. No contiene mediciones de usuarios ni un incidente sorpresa resuelto.

## Datos del caso
- **Persona:** Estudiante que utiliza teclado por lesión temporal.
- **Tarea crítica:** Editar pedido y finalizar sin ratón.
- **Restricción:** Tab, Enter y Escape.
- **Fallo descrito en tarjeta docente:** Quitar carece de nombre accesible y confirmación.
- **Recurso complementario:** Dashboard UX (touchpoints, momentos de verdad y feedback).

## Seis requisitos verificables

| ID | Requisito | Criterio de aceptación |
|---|---|---|
| R01 | Completar «Editar pedido y finalizar sin ratón» mediante ruta de inicio a resultado. | Inicio → acción → revisión → resultado sin pantallas externas. |
| R02 | Resolver condición crítica: Quitar tiene etiqueta accesible, opción cancelar y foco recuperable. | Quitar tiene etiqueta accesible, opción cancelar y foco recuperable. |
| R03 | Editar o cancelar antes de enviar sin borrar datos pertinentes. | Tras modificar, el carrito refleja últimas cantidades y selección. |
| R04 | Distinguir solicitud pendiente, error y éxito de forma inequívoca. | No indicar éxito antes de confirmación; error ofrece reintento. |
| R05 | Operar controles esenciales con teclado y foco visible. | Tab alcanza controles, Enter activa y Escape permite cancelar donde aplique. |
| R06 | Cumplir restricción contextual: Tab, Enter y Escape. | Ruta completa con Tab, Enter y Escape sin ratón. |

## Arquitectura de información
- [Sitemap](../../diagramas/IHC-A-02-sitemap.mmd) con todas las páginas y regreso.
- [User flow](../../diagramas/IHC-A-02-flujo.mmd): **F1** principal, **E1** edición, **X1** error.
- **Secuencia principal:** Inicio → menú → detalle → carrito → revisión → pendiente → acuse.
- **Condición principal a comprobar:** Quitar tiene etiqueta accesible, opción cancelar y foco recuperable.
- **Recuperación:** mostrar el problema en texto, ofrecer una ruta de edición y conservar los datos pertinentes.

## Componentes
Navegación y título de pantalla, Quitar producto, editor de pedido y estados de envío, indicador de estado, aviso textual, botones etiquetados y foco visible.

## Matriz requisito → flujo → pantalla → componente → wireframe

| Requisito | Flujo | Pantalla | Componente | Wireframe |
|---|---|---|---|---|
| R01 | F1 | Carrito | Navegación / catálogo / pedido | [inicio](../../wireframes/IHC-A-02-inicio.svg) |
| R02 | F1/X1 | Quitar producto | Control y validación específica | [accion](../../wireframes/IHC-A-02-accion.svg) |
| R03 | E1 | Mi pedido | Editor y botón regresar | [accion](../../wireframes/IHC-A-02-accion.svg) |
| R04 | F1/X1 | Confirmación de compra | Indicadores de estado y acuse | [confirmacion](../../wireframes/IHC-A-02-confirmacion.svg) |
| R05 | F1/E1 | Carrito | Botones etiquetados y foco | [accion](../../wireframes/IHC-A-02-accion.svg) |
| R06 | X1 | Quitar producto | Alerta o limitación contextual | [error](../../wireframes/IHC-A-02-error.svg) |

## Cuatro wireframes Lo-Fi
- [inicio](../../wireframes/IHC-A-02-inicio.svg)
- [accion](../../wireframes/IHC-A-02-accion.svg)
- [error](../../wireframes/IHC-A-02-error.svg)
- [confirmacion](../../wireframes/IHC-A-02-confirmacion.svg)

## Comprobación técnica al integrar el prototipo
1. Seleccionar IHC-A-02 y ejecutar **F1**; observar estados y resultado.
2. Probar la ruta **E1** y el error **X1**, preservando información pertinente.
3. Verificar R02: Quitar tiene etiqueta accesible, opción cancelar y foco recuperable.
4. Verificar R06: Ruta completa con Tab, Enter y Escape sin ratón.
5. Guardar evidencia con versión, fecha, acción y resultado real.

La integración del prototipo pertenece a otras ramas. Este diseño no acredita por sí mismo una observación externa.

**Referencia GitHub:** [Issue #2](https://github.com/EMILIOABRIL05/Prueba_01_IHC_Parcial2/issues/2).
