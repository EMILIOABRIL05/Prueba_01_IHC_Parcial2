# IHC-A-02 · CaféU · Edición con teclado

**Ficha de preparación y especificación de diseño.** Los diagnósticos emocionales son hipótesis; esta ficha no acredita por sí sola una ejecución real ni un incidente sorpresa resuelto.

## Persona, tarea y alcance

- **Persona:** Estudiante que utiliza teclado por lesión temporal.
- **Tarea crítica:** Editar pedido y finalizar sin ratón.
- **Restricción:** Tab, Enter y Escape.
- **Fallo descrito en tarjeta docente:** Quitar carece de nombre accesible y confirmación.
- **Recurso complementario:** Dashboard UX (touchpoints, momentos de verdad y feedback).
- Recorrido de diagnóstico: editar, eliminar producto y finalizar con Tab/Enter/Escape.
- Hipótesis de mejora para v2: **Los botones Quitar son nombrados y se accionan por teclado**.

## Fase 1 · Diagnóstico emocional
**Ningún valor de esta tabla ha sido medido.** Se proponen touchpoints para diseñar una prueba; la curva en `diagramas/IHC-A-02-curva-antes.svg` es una predicción de diseño.

| # | Touchpoint | Importancia | Emoción estimada | Tipo de evidencia |
|---|---|---|---|---|
| T1 | Abrir inicio | Punto de contacto | +1 | Estimación, no observación |
| T2 | Explorar menú | Punto de contacto | +1 | Estimación, no observación |
| T3 | Consultar detalle | Punto de contacto | 0 | Estimación, no observación |
| T4 | Agregar producto | Punto de contacto | −2 | Estimación, no observación |
| T5 | Editar cantidades | Momento de verdad 1 | −2 | Estimación, no observación |
| T6 | Revisar total y advertencias | Punto de contacto | 0 | Estimación, no observación |
| T7 | Confirmar solicitud | Punto de contacto | 0 | Estimación, no observación |
| T8 | Ver resultado | Momento de verdad 2 | 0 | Estimación, no observación |

**Momentos de verdad:** T5, cuando foco y eliminación puede causar un error decisivo; T8, cuando la persona comprueba el resultado de su tarea.

| ID | Hallazgo candidato | Severidad preliminar | Marco y justificación |
|---|---|---|---|
| P1 | Fallo principal: Quitar carece de nombre y confirmación | Alta | Regla de control y libertad del usuario vulnerada; la tarea crítica puede resultar incorrecta. |
| P2 | Retroalimentación insuficiente en transición | Media | Visibilidad del estado de Nielsen: incertidumbre durante procesamiento o cambio. |
| P3 | Jerarquía dispersa en pantalla y pérdida de contexto | Media | Gestalt y carga cognitiva: obliga a recordar el contexto en lugar de reconocerlo. |

Se preparan borradores de Issue en `github/issues/IHC-A-02-P1.md`, P2 y P3; deben publicarse con asignación y reproducibilidad real durante la sesión.

## Fase 2 · Requisitos verificables

| ID | Requisito | Criterio de aceptación |
|---|---|---|
| R01 | Completar «Editar pedido y finalizar sin ratón» mediante ruta de inicio a resultado. | Inicio → acción → revisión → resultado sin pantallas externas. |
| R02 | Resolver condición crítica: Quitar tiene etiqueta accesible, opción cancelar y foco recuperable. | Quitar tiene etiqueta accesible, opción cancelar y foco recuperable. Repetir el fallo inicial en v1 y comprobar que no ocurre en v2 para el escenario. |
| R03 | Editar o cancelar antes de enviar sin borrar datos pertinentes. | Tras modificar, el carrito refleja últimas cantidades y selección. Después de editar o cancelar, los datos pertinentes siguen disponibles. |
| R04 | Distinguir solicitud pendiente, error y éxito de forma inequívoca. Los estados normal y de edición también se identifican. | No indicar éxito antes de confirmación; error ofrece reintento. Cada estado muestra texto descriptivo y se distingue visual y semánticamente. |
| R05 | Operar controles esenciales con teclado y foco visible. | Tab alcanza controles, Enter activa y Escape permite cancelar donde aplique. |
| R06 | Cumplir restricción contextual: Tab, Enter y Escape. La información crítica debe comprenderse a 360 px cuando corresponda. | Ruta completa con Tab, Enter y Escape sin ratón. Texto legible, acciones esenciales visibles y ruta de recuperación identificable. |

### Arquitectura de información

- [Sitemap](../../diagramas/IHC-A-02-sitemap.mmd) con todas las páginas y regreso.
- [User flow](../../diagramas/IHC-A-02-flujo.mmd): **F1** principal, **E1** edición, **X1** error.
- **Secuencia principal:** Inicio → menú → detalle → carrito → revisión → pendiente → acuse.
- **Condición principal a comprobar:** Quitar tiene etiqueta accesible, opción cancelar y foco recuperable.
- **Recuperación:** mostrar el problema en texto, ofrecer una ruta de edición y conservar los datos pertinentes.
- Ramas: F1 Inicio→Menú→Detalle→Carrito→Procesamiento→Confirmación; E1 edición Carrito→Menú/Carrito; X1 error→Carrito/Reintento.

### Componentes

Navegación y título de pantalla, Quitar producto, editor de pedido y estados de envío, indicador de estado, aviso textual, botones etiquetados y foco visible.

- Componentes clave: navegación, nombre accesible, confirmación y recuperación de foco, feedback de error, botón de acción, resumen visible, controles accesibles.

### Matriz de trazabilidad

| Requisito | Flujo | Pantalla | Componente | Wireframe |
|---|---|---|---|---|
| R01 | F1 | Carrito; Inicio/Acción | Navegación / catálogo / pedido; nombre accesible, confirmación y recuperación de foco | [inicio](../../wireframes/IHC-A-02-inicio.svg) |
| R02 | F1/X1 | Quitar producto; Editar pedido | Control y validación específica; nombre accesible, confirmación y recuperación de foco | [accion](../../wireframes/IHC-A-02-accion.svg) |
| R03 | E1 | Mi pedido; Error/Confirmación | Editor y botón regresar; nombre accesible, confirmación y recuperación de foco | [accion](../../wireframes/IHC-A-02-accion.svg) |
| R04 | F1/X1 | Confirmación de compra; Editar pedido | Indicadores de estado y acuse; nombre accesible, confirmación y recuperación de foco | [confirmacion](../../wireframes/IHC-A-02-confirmacion.svg) / [error](../../wireframes/IHC-A-02-error.svg) |
| R05 | F1/E1 | Carrito; Inicio/Acción | Botones etiquetados y foco; nombre accesible, confirmación y recuperación de foco | [accion](../../wireframes/IHC-A-02-accion.svg) |
| R06 | X1/F1/E1 | Quitar producto; Error/Confirmación | Alerta o limitación contextual; nombre accesible, confirmación y recuperación de foco | [error](../../wireframes/IHC-A-02-error.svg) / [confirmacion](../../wireframes/IHC-A-02-confirmacion.svg) |

### Cuatro wireframes Lo-Fi

- [inicio](../../wireframes/IHC-A-02-inicio.svg)
- [accion](../../wireframes/IHC-A-02-accion.svg)
- [error](../../wireframes/IHC-A-02-error.svg)
- [confirmacion](../../wireframes/IHC-A-02-confirmacion.svg)

### Comprobación técnica al integrar el prototipo

1. Seleccionar IHC-A-02 y ejecutar **F1**; observar estados y resultado.
2. Probar la ruta **E1** y el error **X1**, preservando información pertinente.
3. Verificar R02: Quitar tiene etiqueta accesible, opción cancelar y foco recuperable.
4. Verificar R06: Ruta completa con Tab, Enter y Escape sin ratón.
5. Guardar evidencia con versión, fecha, acción y resultado real.

La especificación de arquitectura no acredita por sí misma una observación externa; el prototipo y su preparación de prueba se describen en las fases siguientes.

**Referencia GitHub:** [Issue #2](https://github.com/EMILIOABRIL05/Prueba_01_IHC_Parcial2/issues/2).

## Fase 3 · Prototipo

- v1: `prototipo/v1/index.html` → seleccionar `IHC-A-02` y reproducir: Quitar carece de nombre y confirmación.
- v2: `prototipo/v2/index.html` → seleccionar `IHC-A-02` → comprobar la hipótesis: Los botones Quitar son nombrados y se accionan por teclado.
- Estados previstos: normal, editando, validando/procesando (CaféU), error y éxito; Dashboard dispone de etapas normales, error de validación y resultado.
- Herramienta: HTML + CSS + JS, ejecutado localmente, fidelidad media/alta; wireframes SVG de baja fidelidad.
- Decisión arquitectónica: mismo flujo de control para 12 escenarios, diferencias controladas por tarjeta y versión.

## Fase 4 · Prueba cognitiva

- Guion: `editar, eliminar producto y finalizar con Tab/Enter/Escape`. Una persona **de otro equipo** debe completar la tarea sin ayudas.
- Registrar de manera real: hora, duración, errores, pausas, resultado, cita textual y consentimiento para evidencias.
- Acta específica (no completada): `pruebas/IHC-A-02-sesion.md`.
- Hipótesis v2: Los botones Quitar son nombrados y se accionan por teclado. **No se debe escribir “mejoró” hasta contar con datos observados**.
- La curva v2 (`diagramas/IHC-A-02-curva-v2-hipotesis.svg`) es hipotética, no resultado de prueba.

## Fase 5 · Incidencia nueva y defensa

- Esperar el incidente entregado oficialmente y completar `docs/incidencia-sorpresa-plantilla.md`.
- Demostrar requisito R02, falla/solución y trazabilidad a un Issue/PR genuino.
- Pregunta preparatoria: ¿cómo compruebas que foco y eliminación comunica el estado correcto sin depender solo del aspecto visual?

## Estado de evidencia

- [x] Diseño de ejemplo y prototipos generados.
- [ ] Observación externa y mediciones reales.
- [ ] Capturas de navegador de v1/v2 como evidencia de ejecución.
- [ ] Issues y PR publicados y revisados en GitHub.
- [ ] Incidencia recibida y cambio con commit posterior.
- [ ] Defensa individual realizada.
