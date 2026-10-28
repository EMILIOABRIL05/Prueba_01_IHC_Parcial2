# IHC-A-12 · Dashboard · Retomar sesión

**Ficha de preparación y especificación de diseño.** Los diagnósticos emocionales son hipótesis; esta ficha no acredita por sí sola una ejecución real ni un incidente sorpresa resuelto.

## Persona, tarea y alcance

- **Persona:** Investigadora que retoma prueba interrumpida.
- **Tarea crítica:** Recuperar checklist y cerrar sesión.
- **Restricción:** No perder pasos previamente finalizados.
- **Fallo descrito en tarjeta docente:** Muestra éxito sin validar checklist obligatorio.
- **Recurso complementario:** CaféU (editar/error y confirmación visible).
- Recorrido de diagnóstico: reanudar, completar lista y cerrar.
- Hipótesis de mejora para v2: **No se muestra éxito con checklist obligatorio incompleto**.

## Fase 1 · Diagnóstico emocional
**Ningún valor de esta tabla ha sido medido.** Se proponen touchpoints para diseñar una prueba; la curva en `diagramas/IHC-A-12-curva-antes.svg` es una predicción de diseño.

| # | Touchpoint | Importancia | Emoción estimada | Tipo de evidencia |
|---|---|---|---|---|
| T1 | Abrir dashboard | Punto de contacto | +1 | Estimación, no observación |
| T2 | Configurar sesión | Punto de contacto | +1 | Estimación, no observación |
| T3 | Identificar paso | Punto de contacto | 0 | Estimación, no observación |
| T4 | Marcar checklist | Punto de contacto | −2 | Estimación, no observación |
| T5 | Registrar hallazgos | Momento de verdad 1 | −2 | Estimación, no observación |
| T6 | Revisar resumen | Punto de contacto | 0 | Estimación, no observación |
| T7 | Cerrar sesión | Momento de verdad 2 | 0 | Estimación, no observación |

**Momentos de verdad:** T5, cuando consistencia del estado puede causar un error decisivo; T7, cuando la persona comprueba el resultado de su tarea.

| ID | Hallazgo candidato | Severidad preliminar | Marco y justificación |
|---|---|---|---|
| P1 | Fallo principal: declara fin sin completar checklist | Alta | Regla de prevención de errores vulnerada; la tarea crítica puede resultar incorrecta. |
| P2 | Retroalimentación insuficiente en transición | Media | Visibilidad del estado de Nielsen: incertidumbre durante procesamiento o cambio. |
| P3 | Jerarquía dispersa en pantalla y pérdida de contexto | Media | Gestalt y carga cognitiva: obliga a recordar el contexto en lugar de reconocerlo. |

Se preparan borradores de Issue en `github/issues/IHC-A-12-P1.md`, P2 y P3; deben publicarse con asignación y reproducibilidad real durante la sesión.

## Fase 2 · Requisitos verificables

| ID | Requisito | Criterio de aceptación |
|---|---|---|
| R01 | Completar «Recuperar checklist y cerrar sesión» siguiendo etapas identificables. | Recorrido llega a revisión y cierre desde inicio con Stepper. |
| R02 | Resolver condición crítica: No permite éxito hasta completar obligatorios. | No permite éxito hasta completar obligatorios. Repetir el fallo inicial en v1 y comprobar que no ocurre en v2 para el escenario. |
| R03 | Volver a una etapa anterior y corregir sin perder progreso válido. | Regresar y avanzar mantiene las selecciones anteriores. Después de editar o cancelar, los datos pertinentes siguen disponibles. |
| R04 | Distinguir progreso, error de validación y cierre correcto. Los estados normal y de edición también se identifican. | Mensaje de estado comprensible; error indica cómo recuperar. Cada estado muestra texto descriptivo y se distingue visual y semánticamente. |
| R05 | Permitir interacción por teclado con etiquetas semánticas. | Tab y Enter operan controles; foco visible; estado no depende del color. Escape permite volver donde aplique. |
| R06 | Cumplir restricción contextual: No perder pasos previamente finalizados. La información crítica debe comprenderse a 360 px cuando corresponda. | Al recargar se recuperan casillas finalizadas. Texto legible, acciones esenciales visibles y ruta de recuperación identificable. |

### Arquitectura de información

- [Sitemap](../../diagramas/IHC-A-12-sitemap.mmd) con todas las páginas y regreso.
- [User flow](../../diagramas/IHC-A-12-flujo.mmd): **F1** principal, **E1** edición, **X1** error.
- **Secuencia principal:** Inicio → datos → Stepper → checklist → registro → revisión → cierre.
- **Condición principal a comprobar:** No permite éxito hasta completar obligatorios.
- **Recuperación:** mostrar el problema en texto, ofrecer una ruta de edición y conservar los datos pertinentes.
- Ramas: F1 Datos→Checklist→Registro→Revisión→Cierre; E1 revisión→paso anterior; X1 validación→paso correspondiente.

### Componentes

Navegación y título de pantalla, Checklist incompleto, Stepper semántico y checklist, indicador de estado, aviso textual, botones etiquetados y foco visible.

- Componentes clave: navegación, recuperación y verificación previa, feedback de error, botón de acción, resumen visible, controles accesibles.

### Matriz de trazabilidad

| Requisito | Flujo | Pantalla | Componente | Wireframe |
|---|---|---|---|---|
| R01 | F1 | Recuperar sesión; Inicio/Acción | Stepper / navegación; recuperación y verificación previa | [inicio](../../wireframes/IHC-A-12-inicio.svg) |
| R02 | F1/X1 | Checklist incompleto; Revisión | Checklist / validación por etapa; recuperación y verificación previa | [accion](../../wireframes/IHC-A-12-accion.svg) |
| R03 | E1 | Checklist / edición; Error/Confirmación | Control anterior y estado; recuperación y verificación previa | [accion](../../wireframes/IHC-A-12-accion.svg) |
| R04 | F1/X1 | Resumen de cierre; Revisión | Stepper / alerta / resumen; recuperación y verificación previa | [confirmacion](../../wireframes/IHC-A-12-confirmacion.svg) / [error](../../wireframes/IHC-A-12-error.svg) |
| R05 | F1/E1 | Etapa actual; Inicio/Acción | Campos accesibles y foco; recuperación y verificación previa | [accion](../../wireframes/IHC-A-12-accion.svg) |
| R06 | X1/F1/E1 | Checklist incompleto; Error/Confirmación | Condición contextual; recuperación y verificación previa | [error](../../wireframes/IHC-A-12-error.svg) / [confirmacion](../../wireframes/IHC-A-12-confirmacion.svg) |

### Cuatro wireframes Lo-Fi

- [inicio](../../wireframes/IHC-A-12-inicio.svg)
- [accion](../../wireframes/IHC-A-12-accion.svg)
- [error](../../wireframes/IHC-A-12-error.svg)
- [confirmacion](../../wireframes/IHC-A-12-confirmacion.svg)

### Comprobación técnica al integrar el prototipo

1. Seleccionar IHC-A-12 y ejecutar **F1**; observar estados y resultado.
2. Probar la ruta **E1** y el error **X1**, preservando información pertinente.
3. Verificar R02: No permite éxito hasta completar obligatorios.
4. Verificar R06: Al recargar se recuperan casillas finalizadas.
5. Guardar evidencia con versión, fecha, acción y resultado real.

La especificación de arquitectura no acredita por sí misma una observación externa; el prototipo y su preparación de prueba se describen en las fases siguientes.

**Referencia GitHub:** [Issue #2](https://github.com/EMILIOABRIL05/Prueba_01_IHC_Parcial2/issues/2).

## Fase 3 · Prototipo

- v1: `prototipo/v1/index.html` → seleccionar `IHC-A-12` y reproducir: declara fin sin completar checklist.
- v2: `prototipo/v2/index.html` → seleccionar `IHC-A-12` → comprobar la hipótesis: No se muestra éxito con checklist obligatorio incompleto.
- Estados previstos: normal, editando, validando/procesando (CaféU), error y éxito; Dashboard dispone de etapas normales, error de validación y resultado.
- Herramienta: HTML + CSS + JS, ejecutado localmente, fidelidad media/alta; wireframes SVG de baja fidelidad.
- Decisión arquitectónica: mismo flujo de control para 12 escenarios, diferencias controladas por tarjeta y versión.

## Fase 4 · Prueba cognitiva

- Guion: `reanudar, completar lista y cerrar`. Una persona **de otro equipo** debe completar la tarea sin ayudas.
- Registrar de manera real: hora, duración, errores, pausas, resultado, cita textual y consentimiento para evidencias.
- Acta integrada desde main: [sesión IHC-A-12](../../pruebas/IHC-A-12-sesion.md), con registros v1/v2 documentados por Jonathan Gamboa.
- Hipótesis v2: No se muestra éxito con checklist obligatorio incompleto. **No se debe escribir “mejoró” hasta contar con datos observados**.
- La curva v2 (`diagramas/IHC-A-12-curva-v2-hipotesis.svg`) es hipotética, no resultado de prueba.

## Requisito R7 · incidencia seleccionada A12 (implementación trazable)

**R7:** El sistema impide finalizar si existe un requisito del checklist incompleto. Debe indicar el primer ítem pendiente, devolver la navegación y el foco a la casilla pertinente y conservar datos y verificaciones hasta permitir un éxito realmente comprobado.

**Criterio de aceptación:** Con checklist 2/3, finalizar no muestra éxito y enfoca la casilla restante en Checklist. Se mantienen título, código, errores, notas y casillas previas, incluidos cambios al recargar. Con 3/3, se muestra «Verificando…» antes de «Sesión cerrada».

**Trazabilidad R7:** [Issue #18](https://github.com/EMILIOABRIL05/Prueba_01_IHC_Parcial2/issues/18) → [flujo F1/E1/X1](../../diagramas/IHC-A-12-flujo.mmd) → «Revisión y cierre» ↔ «Checklist» → alerta + foco + persistencia (`assets/app.js`) → [wireframe R7](../../wireframes/IHC-A-12-pendiente-R7.svg) → [prueba técnica](../../tests/verificar_incidentes_r7.cjs).

**Evidencia no acreditada:** No se afirma una sesión humana nueva ni una hora oficial de anuncio. Ver [registro](../../pruebas/incidencias-R7-ejecucion.md).

## Fase 5 · Incidencia nueva y defensa

- Esperar el incidente entregado oficialmente y completar `docs/incidencia-sorpresa-plantilla.md`.
- Demostrar requisito R02, falla/solución y trazabilidad a un Issue/PR genuino.
- Pregunta preparatoria: ¿cómo compruebas que consistencia del estado comunica el estado correcto sin depender solo del aspecto visual?

## Estado de evidencia

- [x] Diseño de ejemplo y prototipos generados.
- [x] Acta con observación externa y mediciones documentadas por Jonathan: [sesión](../../pruebas/IHC-A-12-sesion.md).
- [x] Capturas v1/v2 aportadas en [evidencias IHC-A-12](../../evidencias/IHC-A-12/README.md).
- [x] Referencias a Issues y revisión de PR documentadas en [revisión de Emilio](../revision_pr_emilio.md).
- [ ] Incidencia recibida y cambio con commit posterior.
- [ ] Defensa individual realizada.

Estos enlaces conservan los registros aportados en main; las estimaciones de la Fase 1 y las curvas siguen siendo hipótesis de diseño. La comparación v1/v2 del acta reconoce el posible sesgo de aprendizaje.
