# IHC-A-05 · CaféU · Requisitos y trazabilidad

**Naturaleza:** especificación de diseño. No contiene mediciones de usuarios ni un incidente sorpresa resuelto.

## Datos del caso
- **Persona:** Estudiante con presupuesto de USD 4,25.
- **Tarea crítica:** Añadir productos, ajustar cantidades y revisar total.
- **Restricción:** Avisar antes de exceder USD 4,25.
- **Fallo descrito en tarjeta docente:** Edición genera sobrecosto sin feedback.
- **Recurso complementario:** Dashboard UX (touchpoints, momentos de verdad y feedback).

## Seis requisitos verificables

| ID | Requisito | Criterio de aceptación |
|---|---|---|
| R01 | Completar «Añadir productos, ajustar cantidades y revisar total» mediante ruta de inicio a resultado. | Inicio → acción → revisión → resultado sin pantallas externas. |
| R02 | Resolver condición crítica: Si total supera USD 4,25 se indica exceso y se bloquea confirmación. | Si total supera USD 4,25 se indica exceso y se bloquea confirmación. |
| R03 | Editar o cancelar antes de enviar sin borrar datos pertinentes. | Tras modificar, el carrito refleja últimas cantidades y selección. |
| R04 | Distinguir solicitud pendiente, error y éxito de forma inequívoca. | No indicar éxito antes de confirmación; error ofrece reintento. |
| R05 | Operar controles esenciales con teclado y foco visible. | Tab alcanza controles, Enter activa y Escape permite cancelar donde aplique. |
| R06 | Cumplir restricción contextual: Avisar antes de exceder USD 4,25. | Se visualizan límite, total actual y forma de volver a editar. |

## Arquitectura de información
- [Sitemap](../../diagramas/IHC-A-05-sitemap.mmd) con todas las páginas y regreso.
- [User flow](../../diagramas/IHC-A-05-flujo.mmd): **F1** principal, **E1** edición, **X1** error.
- **Secuencia principal:** Inicio → menú → detalle → carrito → revisión → pendiente → acuse.
- **Condición principal a comprobar:** Si total supera USD 4,25 se indica exceso y se bloquea confirmación.
- **Recuperación:** mostrar el problema en texto, ofrecer una ruta de edición y conservar los datos pertinentes.

## Componentes
Navegación y título de pantalla, Ajustar cantidades, editor de pedido y estados de envío, indicador de estado, aviso textual, botones etiquetados y foco visible.

## Matriz requisito → flujo → pantalla → componente → wireframe

| Requisito | Flujo | Pantalla | Componente | Wireframe |
|---|---|---|---|---|
| R01 | F1 | Mi pedido | Navegación / catálogo / pedido | [inicio](../../wireframes/IHC-A-05-inicio.svg) |
| R02 | F1/X1 | Ajustar cantidades | Control y validación específica | [accion](../../wireframes/IHC-A-05-accion.svg) |
| R03 | E1 | Mi pedido | Editor y botón regresar | [accion](../../wireframes/IHC-A-05-accion.svg) |
| R04 | F1/X1 | Confirmación condicionada | Indicadores de estado y acuse | [confirmacion](../../wireframes/IHC-A-05-confirmacion.svg) |
| R05 | F1/E1 | Carrito | Botones etiquetados y foco | [accion](../../wireframes/IHC-A-05-accion.svg) |
| R06 | X1 | Ajustar cantidades | Alerta o limitación contextual | [error](../../wireframes/IHC-A-05-error.svg) |

## Cuatro wireframes Lo-Fi
- [inicio](../../wireframes/IHC-A-05-inicio.svg)
- [accion](../../wireframes/IHC-A-05-accion.svg)
- [error](../../wireframes/IHC-A-05-error.svg)
- [confirmacion](../../wireframes/IHC-A-05-confirmacion.svg)

## Comprobación técnica al integrar el prototipo
1. Seleccionar IHC-A-05 y ejecutar **F1**; observar estados y resultado.
2. Probar la ruta **E1** y el error **X1**, preservando información pertinente.
3. Verificar R02: Si total supera USD 4,25 se indica exceso y se bloquea confirmación.
4. Verificar R06: Se visualizan límite, total actual y forma de volver a editar.
5. Guardar evidencia con versión, fecha, acción y resultado real.

La integración del prototipo pertenece a otras ramas. Este diseño no acredita por sí mismo una observación externa.

**Referencia GitHub:** [Issue #2](https://github.com/EMILIOABRIL05/Prueba_01_IHC_Parcial2/issues/2).
