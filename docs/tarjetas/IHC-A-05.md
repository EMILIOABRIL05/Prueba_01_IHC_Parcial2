# IHC-A-05 · CaféU · Control de presupuesto

**Ficha de preparación y especificación de diseño.** Los diagnósticos emocionales son hipótesis; esta ficha no acredita por sí sola una ejecución real ni un incidente sorpresa resuelto.

## Persona, tarea y alcance

- **Persona:** Estudiante con presupuesto de USD 4,25.
- **Tarea crítica:** Añadir productos, ajustar cantidades y revisar total.
- **Restricción:** Avisar antes de exceder USD 4,25.
- **Fallo descrito en tarjeta docente:** Edición genera sobrecosto sin feedback.
- **Recurso complementario:** Dashboard UX (touchpoints, momentos de verdad y feedback).
- Recorrido de diagnóstico: agregar, editar y ajustar gasto dentro de USD 4,25.
- Hipótesis de mejora para v2: **Se informa y bloquea confirmación cuando total supera USD 4,25**.

## Fase 1 · Diagnóstico emocional
**Ningún valor de esta tabla ha sido medido.** Se proponen touchpoints para diseñar una prueba; la curva en `diagramas/IHC-A-05-curva-antes.svg` es una predicción de diseño.

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

**Momentos de verdad:** T5, cuando presupuesto y total puede causar un error decisivo; T8, cuando la persona comprueba el resultado de su tarea.

| ID | Hallazgo candidato | Severidad preliminar | Marco y justificación |
|---|---|---|---|
| P1 | Fallo principal: sobreprecio sin mensaje tras editar | Alta | Regla de prevención de errores vulnerada; la tarea crítica puede resultar incorrecta. |
| P2 | Retroalimentación insuficiente en transición | Media | Visibilidad del estado de Nielsen: incertidumbre durante procesamiento o cambio. |
| P3 | Jerarquía dispersa en pantalla y pérdida de contexto | Media | Gestalt y carga cognitiva: obliga a recordar el contexto en lugar de reconocerlo. |

Se preparan borradores de Issue en `github/issues/IHC-A-05-P1.md`, P2 y P3; deben publicarse con asignación y reproducibilidad real durante la sesión.

## Fase 2 · Requisitos verificables

| ID | Requisito | Criterio de aceptación |
|---|---|---|
| R01 | Completar «Añadir productos, ajustar cantidades y revisar total» mediante ruta de inicio a resultado. | Inicio → acción → revisión → resultado sin pantallas externas. |
| R02 | Resolver condición crítica: Si total supera USD 4,25 se indica exceso y se bloquea confirmación. | Si total supera USD 4,25 se indica exceso y se bloquea confirmación. Repetir el fallo inicial en v1 y comprobar que no ocurre en v2 para el escenario. |
| R03 | Editar o cancelar antes de enviar sin borrar datos pertinentes. | Tras modificar, el carrito refleja últimas cantidades y selección. Después de editar o cancelar, los datos pertinentes siguen disponibles. |
| R04 | Distinguir solicitud pendiente, error y éxito de forma inequívoca. Los estados normal y de edición también se identifican. | No indicar éxito antes de confirmación; error ofrece reintento. Cada estado muestra texto descriptivo y se distingue visual y semánticamente. |
| R05 | Operar controles esenciales con teclado y foco visible. | Tab alcanza controles, Enter activa y Escape permite cancelar donde aplique. |
| R06 | Cumplir restricción contextual: Avisar antes de exceder USD 4,25. La información crítica debe comprenderse a 360 px cuando corresponda. | Se visualizan límite, total actual y forma de volver a editar. Texto legible, acciones esenciales visibles y ruta de recuperación identificable. |

### Arquitectura de información

- [Sitemap](../../diagramas/IHC-A-05-sitemap.mmd) con todas las páginas y regreso.
- [User flow](../../diagramas/IHC-A-05-flujo.mmd): **F1** principal, **E1** edición, **X1** error.
- **Secuencia principal:** Inicio → menú → detalle → carrito → revisión → pendiente → acuse.
- **Condición principal a comprobar:** Si total supera USD 4,25 se indica exceso y se bloquea confirmación.
- **Recuperación:** mostrar el problema en texto, ofrecer una ruta de edición y conservar los datos pertinentes.
- Ramas: F1 Inicio→Menú→Detalle→Carrito→Procesamiento→Confirmación; E1 edición Carrito→Menú/Carrito; X1 error→Carrito/Reintento.

### Componentes

Navegación y título de pantalla, Ajustar cantidades, editor de pedido y estados de envío, indicador de estado, aviso textual, botones etiquetados y foco visible.

- Componentes clave: navegación, límite y retroalimentación inmediata, feedback de error, botón de acción, resumen visible, controles accesibles.

### Matriz de trazabilidad

| Requisito | Flujo | Pantalla | Componente | Wireframe |
|---|---|---|---|---|
| R01 | F1 | Mi pedido; Inicio/Acción | Navegación / catálogo / pedido; límite y retroalimentación inmediata | [inicio](../../wireframes/IHC-A-05-inicio.svg) |
| R02 | F1/X1 | Ajustar cantidades; Mi pedido | Control y validación específica; límite y retroalimentación inmediata | [accion](../../wireframes/IHC-A-05-accion.svg) |
| R03 | E1 | Mi pedido; Error/Confirmación | Editor y botón regresar; límite y retroalimentación inmediata | [accion](../../wireframes/IHC-A-05-accion.svg) |
| R04 | F1/X1 | Confirmación condicionada; Mi pedido | Indicadores de estado y acuse; límite y retroalimentación inmediata | [confirmacion](../../wireframes/IHC-A-05-confirmacion.svg) / [error](../../wireframes/IHC-A-05-error.svg) |
| R05 | F1/E1 | Carrito; Inicio/Acción | Botones etiquetados y foco; límite y retroalimentación inmediata | [accion](../../wireframes/IHC-A-05-accion.svg) |
| R06 | X1/F1/E1 | Ajustar cantidades; Error/Confirmación | Alerta o limitación contextual; límite y retroalimentación inmediata | [error](../../wireframes/IHC-A-05-error.svg) / [confirmacion](../../wireframes/IHC-A-05-confirmacion.svg) |

### Cuatro wireframes Lo-Fi

- [inicio](../../wireframes/IHC-A-05-inicio.svg)
- [accion](../../wireframes/IHC-A-05-accion.svg)
- [error](../../wireframes/IHC-A-05-error.svg)
- [confirmacion](../../wireframes/IHC-A-05-confirmacion.svg)

### Comprobación técnica al integrar el prototipo

1. Seleccionar IHC-A-05 y ejecutar **F1**; observar estados y resultado.
2. Probar la ruta **E1** y el error **X1**, preservando información pertinente.
3. Verificar R02: Si total supera USD 4,25 se indica exceso y se bloquea confirmación.
4. Verificar R06: Se visualizan límite, total actual y forma de volver a editar.
5. Guardar evidencia con versión, fecha, acción y resultado real.

La especificación de arquitectura no acredita por sí misma una observación externa; el prototipo y su preparación de prueba se describen en las fases siguientes.

**Referencia GitHub:** [Issue #2](https://github.com/EMILIOABRIL05/Prueba_01_IHC_Parcial2/issues/2).

## Fase 3 · Prototipo

- v1: `prototipo/v1/index.html` → seleccionar `IHC-A-05` y reproducir: sobreprecio sin mensaje tras editar.
- v2: `prototipo/v2/index.html` → seleccionar `IHC-A-05` → comprobar la hipótesis: Se informa y bloquea confirmación cuando total supera USD 4,25.
- Estados previstos: normal, editando, validando/procesando (CaféU), error y éxito; Dashboard dispone de etapas normales, error de validación y resultado.
- Herramienta: HTML + CSS + JS, ejecutado localmente, fidelidad media/alta; wireframes SVG de baja fidelidad.
- Decisión arquitectónica: mismo flujo de control para 12 escenarios, diferencias controladas por tarjeta y versión.

## Fase 4 · Prueba cognitiva

- Guion: `agregar, editar y ajustar gasto dentro de USD 4,25`. Una persona **de otro equipo** debe completar la tarea sin ayudas.
- Registrar de manera real: hora, duración, errores, pausas, resultado, cita textual y consentimiento para evidencias.
- Acta específica (no completada): `pruebas/IHC-A-05-sesion.md`.
- Hipótesis v2: Se informa y bloquea confirmación cuando total supera USD 4,25. **No se debe escribir “mejoró” hasta contar con datos observados**.
- La curva v2 (`diagramas/IHC-A-05-curva-v2-hipotesis.svg`) es hipotética, no resultado de prueba.

## Fase 5 · Incidencia nueva y defensa

- Esperar el incidente entregado oficialmente y completar `docs/incidencia-sorpresa-plantilla.md`.
- Demostrar requisito R02, falla/solución y trazabilidad a un Issue/PR genuino.
- Pregunta preparatoria: ¿cómo compruebas que presupuesto y total comunica el estado correcto sin depender solo del aspecto visual?

## Estado de evidencia

- [x] Diseño de ejemplo y prototipos generados.
- [ ] Observación externa y mediciones reales.
- [ ] Capturas de navegador de v1/v2 como evidencia de ejecución.
- [ ] Issues y PR publicados y revisados en GitHub.
- [ ] Incidencia recibida y cambio con commit posterior.
- [ ] Defensa individual realizada.
