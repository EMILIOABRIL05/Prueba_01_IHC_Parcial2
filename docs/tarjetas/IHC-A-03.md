# IHC-A-03 · CaféU · Requisitos y trazabilidad

**Naturaleza:** especificación de diseño. No contiene mediciones de usuarios ni un incidente sorpresa resuelto.

## Datos del caso
- **Persona:** Estudiante que comparte dispositivo y sale rápido.
- **Tarea crítica:** Confirmar pedido y comprobar que se recibió.
- **Restricción:** No exponer ni guardar datos sensibles.
- **Fallo descrito en tarjeta docente:** «Listo» sin número ni resumen.
- **Recurso complementario:** Dashboard UX (touchpoints, momentos de verdad y feedback).

## Seis requisitos verificables

| ID | Requisito | Criterio de aceptación |
|---|---|---|
| R01 | Completar «Confirmar pedido y comprobar que se recibió» mediante ruta de inicio a resultado. | Inicio → acción → revisión → resultado sin pantallas externas. |
| R02 | Resolver condición crítica: Resultado muestra identificador simulado, desglose y estado recibido. | Resultado muestra identificador simulado, desglose y estado recibido. |
| R03 | Editar o cancelar antes de enviar sin borrar datos pertinentes. | Tras modificar, el carrito refleja últimas cantidades y selección. |
| R04 | Distinguir solicitud pendiente, error y éxito de forma inequívoca. | No indicar éxito antes de confirmación; error ofrece reintento. |
| R05 | Operar controles esenciales con teclado y foco visible. | Tab alcanza controles, Enter activa y Escape permite cancelar donde aplique. |
| R06 | Cumplir restricción contextual: No exponer ni guardar datos sensibles. | No solicita ni conserva número personal, cédula o teléfono. |

## Arquitectura de información
- [Sitemap](../../diagramas/IHC-A-03-sitemap.mmd) con todas las páginas y regreso.
- [User flow](../../diagramas/IHC-A-03-flujo.mmd): **F1** principal, **E1** edición, **X1** error.
- **Secuencia principal:** Inicio → menú → detalle → carrito → revisión → pendiente → acuse.
- **Condición principal a comprobar:** Resultado muestra identificador simulado, desglose y estado recibido.
- **Recuperación:** mostrar el problema en texto, ofrecer una ruta de edición y conservar los datos pertinentes.

## Componentes
Navegación y título de pantalla, Revisar y enviar, editor de pedido y estados de envío, indicador de estado, aviso textual, botones etiquetados y foco visible.

## Matriz requisito → flujo → pantalla → componente → wireframe

| Requisito | Flujo | Pantalla | Componente | Wireframe |
|---|---|---|---|---|
| R01 | F1 | Mi pedido | Navegación / catálogo / pedido | [inicio](../../wireframes/IHC-A-03-inicio.svg) |
| R02 | F1/X1 | Revisar y enviar | Control y validación específica | [accion](../../wireframes/IHC-A-03-accion.svg) |
| R03 | E1 | Mi pedido | Editor y botón regresar | [accion](../../wireframes/IHC-A-03-accion.svg) |
| R04 | F1/X1 | Acuse de recibo | Indicadores de estado y acuse | [confirmacion](../../wireframes/IHC-A-03-confirmacion.svg) |
| R05 | F1/E1 | Carrito | Botones etiquetados y foco | [accion](../../wireframes/IHC-A-03-accion.svg) |
| R06 | X1 | Revisar y enviar | Alerta o limitación contextual | [error](../../wireframes/IHC-A-03-error.svg) |

## Cuatro wireframes Lo-Fi
- [inicio](../../wireframes/IHC-A-03-inicio.svg)
- [accion](../../wireframes/IHC-A-03-accion.svg)
- [error](../../wireframes/IHC-A-03-error.svg)
- [confirmacion](../../wireframes/IHC-A-03-confirmacion.svg)

## Comprobación técnica al integrar el prototipo
1. Seleccionar IHC-A-03 y ejecutar **F1**; observar estados y resultado.
2. Probar la ruta **E1** y el error **X1**, preservando información pertinente.
3. Verificar R02: Resultado muestra identificador simulado, desglose y estado recibido.
4. Verificar R06: No solicita ni conserva número personal, cédula o teléfono.
5. Guardar evidencia con versión, fecha, acción y resultado real.

La integración del prototipo pertenece a otras ramas. Este diseño no acredita por sí mismo una observación externa.

**Referencia GitHub:** [Issue #2](https://github.com/EMILIOABRIL05/Prueba_01_IHC_Parcial2/issues/2).
