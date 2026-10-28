# IHC-A-03 · CaféU · Confirmación privada

**Ficha de preparación y especificación de diseño.** Los diagnósticos emocionales son hipótesis; esta ficha no acredita por sí sola una ejecución real ni un incidente sorpresa resuelto.

## Persona, tarea y alcance

- **Persona:** Estudiante que comparte dispositivo y sale rápido.
- **Tarea crítica:** Confirmar pedido y comprobar que se recibió.
- **Restricción:** No exponer ni guardar datos sensibles.
- **Fallo descrito en tarjeta docente:** «Listo» sin número ni resumen.
- **Recurso complementario:** Dashboard UX (touchpoints, momentos de verdad y feedback).
- Recorrido de diagnóstico: confirmar y verificar recepción sin datos sensibles.
- Hipótesis de mejora para v2: **El éxito incluye código sintético, resumen y estado recibido**.

## Fase 1 · Diagnóstico emocional
**Ningún valor de esta tabla ha sido medido.** Se proponen touchpoints para diseñar una prueba; la curva en `diagramas/IHC-A-03-curva-antes.svg` es una predicción de diseño.

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

**Momentos de verdad:** T5, cuando identificador no personal puede causar un error decisivo; T8, cuando la persona comprueba el resultado de su tarea.

| ID | Hallazgo candidato | Severidad preliminar | Marco y justificación |
|---|---|---|---|
| P1 | Fallo principal: mensaje Listo sin identificador ni resumen | Alta | Regla de visibilidad del estado vulnerada; la tarea crítica puede resultar incorrecta. |
| P2 | Retroalimentación insuficiente en transición | Media | Visibilidad del estado de Nielsen: incertidumbre durante procesamiento o cambio. |
| P3 | Jerarquía dispersa en pantalla y pérdida de contexto | Media | Gestalt y carga cognitiva: obliga a recordar el contexto en lugar de reconocerlo. |

Se preparan borradores de Issue en `github/issues/IHC-A-03-P1.md`, P2 y P3; deben publicarse con asignación y reproducibilidad real durante la sesión.

## Fase 2 · Requisitos verificables

| ID | Requisito | Criterio de aceptación |
|---|---|---|
| R01 | Completar «Confirmar pedido y comprobar que se recibió» mediante ruta de inicio a resultado. | Inicio → acción → revisión → resultado sin pantallas externas. |
| R02 | Resolver condición crítica: Resultado muestra identificador simulado, desglose y estado recibido. | Resultado muestra identificador simulado, desglose y estado recibido. Repetir el fallo inicial en v1 y comprobar que no ocurre en v2 para el escenario. |
| R03 | Editar o cancelar antes de enviar sin borrar datos pertinentes. | Tras modificar, el carrito refleja últimas cantidades y selección. Después de editar o cancelar, los datos pertinentes siguen disponibles. |
| R04 | Distinguir solicitud pendiente, error y éxito de forma inequívoca. Los estados normal y de edición también se identifican. | No indicar éxito antes de confirmación; error ofrece reintento. Cada estado muestra texto descriptivo y se distingue visual y semánticamente. |
| R05 | Operar controles esenciales con teclado y foco visible. | Tab alcanza controles, Enter activa y Escape permite cancelar donde aplique. |
| R06 | Cumplir restricción contextual: No exponer ni guardar datos sensibles. La información crítica debe comprenderse a 360 px cuando corresponda. | No solicita ni conserva número personal, cédula o teléfono. Texto legible, acciones esenciales visibles y ruta de recuperación identificable. |

### Arquitectura de información

- [Sitemap](../../diagramas/IHC-A-03-sitemap.mmd) con todas las páginas y regreso.
- [User flow](../../diagramas/IHC-A-03-flujo.mmd): **F1** principal, **E1** edición, **X1** error.
- **Secuencia principal:** Inicio → menú → detalle → carrito → revisión → pendiente → acuse.
- **Condición principal a comprobar:** Resultado muestra identificador simulado, desglose y estado recibido.
- **Recuperación:** mostrar el problema en texto, ofrecer una ruta de edición y conservar los datos pertinentes.
- Ramas: F1 Inicio→Menú→Detalle→Carrito→Procesamiento→Confirmación; E1 edición Carrito→Menú/Carrito; X1 error→Carrito/Reintento.

### Componentes

Navegación y título de pantalla, Revisar y enviar, editor de pedido y estados de envío, indicador de estado, aviso textual, botones etiquetados y foco visible.

- Componentes clave: navegación, acuse explícito y desglose sin identidad, feedback de error, botón de acción, resumen visible, controles accesibles.

### Matriz de trazabilidad

| Requisito | Flujo | Pantalla | Componente | Wireframe |
|---|---|---|---|---|
| R01 | F1 | Mi pedido; Inicio/Acción | Navegación / catálogo / pedido; acuse explícito y desglose sin identidad | [inicio](../../wireframes/IHC-A-03-inicio.svg) |
| R02 | F1/X1 | Revisar y enviar; Recibo | Control y validación específica; acuse explícito y desglose sin identidad | [accion](../../wireframes/IHC-A-03-accion.svg) |
| R03 | E1 | Mi pedido; Error/Confirmación | Editor y botón regresar; acuse explícito y desglose sin identidad | [accion](../../wireframes/IHC-A-03-accion.svg) |
| R04 | F1/X1 | Acuse de recibo | Indicadores de estado y acuse; acuse explícito y desglose sin identidad | [confirmacion](../../wireframes/IHC-A-03-confirmacion.svg) / [error](../../wireframes/IHC-A-03-error.svg) |
| R05 | F1/E1 | Carrito; Inicio/Acción | Botones etiquetados y foco; acuse explícito y desglose sin identidad | [accion](../../wireframes/IHC-A-03-accion.svg) |
| R06 | X1/F1/E1 | Revisar y enviar; Error/Confirmación | Alerta o limitación contextual; acuse explícito y desglose sin identidad | [error](../../wireframes/IHC-A-03-error.svg) / [confirmacion](../../wireframes/IHC-A-03-confirmacion.svg) |

### Cuatro wireframes Lo-Fi

- [inicio](../../wireframes/IHC-A-03-inicio.svg)
- [accion](../../wireframes/IHC-A-03-accion.svg)
- [error](../../wireframes/IHC-A-03-error.svg)
- [confirmacion](../../wireframes/IHC-A-03-confirmacion.svg)

### Comprobación técnica al integrar el prototipo

1. Seleccionar IHC-A-03 y ejecutar **F1**; observar estados y resultado.
2. Probar la ruta **E1** y el error **X1**, preservando información pertinente.
3. Verificar R02: Resultado muestra identificador simulado, desglose y estado recibido.
4. Verificar R06: No solicita ni conserva número personal, cédula o teléfono.
5. Guardar evidencia con versión, fecha, acción y resultado real.

La especificación de arquitectura no acredita por sí misma una observación externa; el prototipo y su preparación de prueba se describen en las fases siguientes.

**Referencia GitHub:** [Issue #2](https://github.com/EMILIOABRIL05/Prueba_01_IHC_Parcial2/issues/2).

## Fase 3 · Prototipo

- v1: `prototipo/v1/index.html` → seleccionar `IHC-A-03` y reproducir: mensaje Listo sin identificador ni resumen.
- v2: `prototipo/v2/index.html` → seleccionar `IHC-A-03` → comprobar la hipótesis: El éxito incluye código sintético, resumen y estado recibido.
- Estados previstos: normal, editando, validando/procesando (CaféU), error y éxito; Dashboard dispone de etapas normales, error de validación y resultado.
- Herramienta: HTML + CSS + JS, ejecutado localmente, fidelidad media/alta; wireframes SVG de baja fidelidad.
- Decisión arquitectónica: mismo flujo de control para 12 escenarios, diferencias controladas por tarjeta y versión.

## Fase 4 · Prueba cognitiva

- Guion: `confirmar y verificar recepción sin datos sensibles`. Una persona **de otro equipo** debe completar la tarea sin ayudas.
- Registrar de manera real: hora, duración, errores, pausas, resultado, cita textual y consentimiento para evidencias.
- Acta específica (no completada): `pruebas/IHC-A-03-sesion.md`.
- Hipótesis v2: El éxito incluye código sintético, resumen y estado recibido. **No se debe escribir “mejoró” hasta contar con datos observados**.
- La curva v2 (`diagramas/IHC-A-03-curva-v2-hipotesis.svg`) es hipotética, no resultado de prueba.

## Fase 5 · Incidencia nueva y defensa

- Esperar el incidente entregado oficialmente y completar `docs/incidencia-sorpresa-plantilla.md`.
- Demostrar requisito R02, falla/solución y trazabilidad a un Issue/PR genuino.
- Pregunta preparatoria: ¿cómo compruebas que identificador no personal comunica el estado correcto sin depender solo del aspecto visual?

## Estado de evidencia

- [x] Diseño de ejemplo y prototipos generados.
- [ ] Observación externa y mediciones reales.
- [ ] Capturas de navegador de v1/v2 como evidencia de ejecución.
- [ ] Issues y PR publicados y revisados en GitHub.
- [ ] Incidencia recibida y cambio con commit posterior.
- [ ] Defensa individual realizada.
