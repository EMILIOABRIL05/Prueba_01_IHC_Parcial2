# IHC-A-09 · Dashboard · Anonimización

**Ficha de preparación y especificación de diseño.** Los diagnósticos emocionales son hipótesis; esta ficha no acredita por sí sola una ejecución real ni un incidente sorpresa resuelto.

## Persona, tarea y alcance

- **Persona:** Investigadora con participantes anónimos.
- **Tarea crítica:** Registrar resultados y finalizar sesión.
- **Restricción:** No mostrar nombres reales en evidencias.
- **Fallo descrito en tarjeta docente:** Formulario exige nombre real, no admite código.
- **Recurso complementario:** CaféU (editar/error y confirmación visible).
- Recorrido de diagnóstico: registrar resultados con código seudónimo.
- Hipótesis de mejora para v2: **Se utiliza código P-000 y no se exige nombre real**.

## Fase 1 · Diagnóstico emocional
**Ningún valor de esta tabla ha sido medido.** Se proponen touchpoints para diseñar una prueba; la curva en `diagramas/IHC-A-09-curva-antes.svg` es una predicción de diseño.

| # | Touchpoint | Importancia | Emoción estimada | Tipo de evidencia |
|---|---|---|---|---|
| T1 | Abrir dashboard | Punto de contacto | +1 | Estimación, no observación |
| T2 | Configurar sesión | Punto de contacto | +1 | Estimación, no observación |
| T3 | Identificar paso | Punto de contacto | 0 | Estimación, no observación |
| T4 | Marcar checklist | Punto de contacto | −2 | Estimación, no observación |
| T5 | Registrar hallazgos | Momento de verdad 1 | −2 | Estimación, no observación |
| T6 | Revisar resumen | Punto de contacto | 0 | Estimación, no observación |
| T7 | Cerrar sesión | Momento de verdad 2 | 0 | Estimación, no observación |

**Momentos de verdad:** T5, cuando código de participante puede causar un error decisivo; T7, cuando la persona comprueba el resultado de su tarea.

| ID | Hallazgo candidato | Severidad preliminar | Marco y justificación |
|---|---|---|---|
| P1 | Fallo principal: formulario exige nombre real | Alta | Regla de prevención de errores vulnerada; la tarea crítica puede resultar incorrecta. |
| P2 | Retroalimentación insuficiente en transición | Media | Visibilidad del estado de Nielsen: incertidumbre durante procesamiento o cambio. |
| P3 | Jerarquía dispersa en pantalla y pérdida de contexto | Media | Gestalt y carga cognitiva: obliga a recordar el contexto en lugar de reconocerlo. |

Se preparan borradores de Issue en `github/issues/IHC-A-09-P1.md`, P2 y P3; deben publicarse con asignación y reproducibilidad real durante la sesión.

## Fase 2 · Requisitos verificables

| ID | Requisito | Criterio de aceptación |
|---|---|---|
| R01 | Completar «Registrar resultados y finalizar sesión» siguiendo etapas identificables. | Recorrido llega a revisión y cierre desde inicio con Stepper. |
| R02 | Resolver condición crítica: Se acepta código seudónimo P-001 sin exigir nombre. | Se acepta código seudónimo P-001 sin exigir nombre. Repetir el fallo inicial en v1 y comprobar que no ocurre en v2 para el escenario. |
| R03 | Volver a una etapa anterior y corregir sin perder progreso válido. | Regresar y avanzar mantiene las selecciones anteriores. Después de editar o cancelar, los datos pertinentes siguen disponibles. |
| R04 | Distinguir progreso, error de validación y cierre correcto. Los estados normal y de edición también se identifican. | Mensaje de estado comprensible; error indica cómo recuperar. Cada estado muestra texto descriptivo y se distingue visual y semánticamente. |
| R05 | Permitir interacción por teclado con etiquetas semánticas. | Tab y Enter operan controles; foco visible; estado no depende del color. Escape permite volver donde aplique. |
| R06 | Cumplir restricción contextual: No mostrar nombres reales en evidencias. La información crítica debe comprenderse a 360 px cuando corresponda. | No se imprimen nombres reales en pantallas ni evidencias. Texto legible, acciones esenciales visibles y ruta de recuperación identificable. |

### Arquitectura de información

- [Sitemap](../../diagramas/IHC-A-09-sitemap.mmd) con todas las páginas y regreso.
- [User flow](../../diagramas/IHC-A-09-flujo.mmd): **F1** principal, **E1** edición, **X1** error.
- **Secuencia principal:** Inicio → datos → Stepper → checklist → registro → revisión → cierre.
- **Condición principal a comprobar:** Se acepta código seudónimo P-001 sin exigir nombre.
- **Recuperación:** mostrar el problema en texto, ofrecer una ruta de edición y conservar los datos pertinentes.
- Ramas: F1 Datos→Checklist→Registro→Revisión→Cierre; E1 revisión→paso anterior; X1 validación→paso correspondiente.

### Componentes

Navegación y título de pantalla, Código de participante, Stepper semántico y checklist, indicador de estado, aviso textual, botones etiquetados y foco visible.

- Componentes clave: navegación, campo código y validación de formato, feedback de error, botón de acción, resumen visible, controles accesibles.

### Matriz de trazabilidad

| Requisito | Flujo | Pantalla | Componente | Wireframe |
|---|---|---|---|---|
| R01 | F1 | Datos de sesión; Inicio/Acción | Stepper / navegación; campo código y validación de formato | [inicio](../../wireframes/IHC-A-09-inicio.svg) |
| R02 | F1/X1 | Código de participante; Datos | Checklist / validación por etapa; campo código y validación de formato | [accion](../../wireframes/IHC-A-09-accion.svg) |
| R03 | E1 | Checklist / edición; Error/Confirmación | Control anterior y estado; campo código y validación de formato | [accion](../../wireframes/IHC-A-09-accion.svg) |
| R04 | F1/X1 | Resultados anónimos; Datos | Stepper / alerta / resumen; campo código y validación de formato | [confirmacion](../../wireframes/IHC-A-09-confirmacion.svg) / [error](../../wireframes/IHC-A-09-error.svg) |
| R05 | F1/E1 | Etapa actual; Inicio/Acción | Campos accesibles y foco; campo código y validación de formato | [accion](../../wireframes/IHC-A-09-accion.svg) |
| R06 | X1/F1/E1 | Código de participante; Error/Confirmación | Condición contextual; campo código y validación de formato | [error](../../wireframes/IHC-A-09-error.svg) / [confirmacion](../../wireframes/IHC-A-09-confirmacion.svg) |

### Cuatro wireframes Lo-Fi

- [inicio](../../wireframes/IHC-A-09-inicio.svg)
- [accion](../../wireframes/IHC-A-09-accion.svg)
- [error](../../wireframes/IHC-A-09-error.svg)
- [confirmacion](../../wireframes/IHC-A-09-confirmacion.svg)

### Comprobación técnica al integrar el prototipo

1. Seleccionar IHC-A-09 y ejecutar **F1**; observar estados y resultado.
2. Probar la ruta **E1** y el error **X1**, preservando información pertinente.
3. Verificar R02: Se acepta código seudónimo P-001 sin exigir nombre.
4. Verificar R06: No se imprimen nombres reales en pantallas ni evidencias.
5. Guardar evidencia con versión, fecha, acción y resultado real.

La especificación de arquitectura no acredita por sí misma una observación externa; el prototipo y su preparación de prueba se describen en las fases siguientes.

**Referencia GitHub:** [Issue #2](https://github.com/EMILIOABRIL05/Prueba_01_IHC_Parcial2/issues/2).

## Fase 3 · Prototipo

- v1: `prototipo/v1/index.html` → seleccionar `IHC-A-09` y reproducir: formulario exige nombre real.
- v2: `prototipo/v2/index.html` → seleccionar `IHC-A-09` → comprobar la hipótesis: Se utiliza código P-000 y no se exige nombre real.
- Estados previstos: normal, editando, validando/procesando (CaféU), error y éxito; Dashboard dispone de etapas normales, error de validación y resultado.
- Herramienta: HTML + CSS + JS, ejecutado localmente, fidelidad media/alta; wireframes SVG de baja fidelidad.
- Decisión arquitectónica: mismo flujo de control para 12 escenarios, diferencias controladas por tarjeta y versión.

## Fase 4 · Prueba cognitiva

- Guion: `registrar resultados con código seudónimo`. Una persona **de otro equipo** debe completar la tarea sin ayudas.
- Registrar de manera real: hora, duración, errores, pausas, resultado, cita textual y consentimiento para evidencias.
- Acta específica (no completada): `pruebas/IHC-A-09-sesion.md`.
- Hipótesis v2: Se utiliza código P-000 y no se exige nombre real. **No se debe escribir “mejoró” hasta contar con datos observados**.
- La curva v2 (`diagramas/IHC-A-09-curva-v2-hipotesis.svg`) es hipotética, no resultado de prueba.

## Fase 5 · Incidencia nueva y defensa

- Esperar el incidente entregado oficialmente y completar `docs/incidencia-sorpresa-plantilla.md`.
- Demostrar requisito R02, falla/solución y trazabilidad a un Issue/PR genuino.
- Pregunta preparatoria: ¿cómo compruebas que código de participante comunica el estado correcto sin depender solo del aspecto visual?

## Estado de evidencia

- [x] Diseño de ejemplo y prototipos generados.
- [ ] Observación externa y mediciones reales.
- [ ] Capturas de navegador de v1/v2 como evidencia de ejecución.
- [ ] Issues y PR publicados y revisados en GitHub.
- [ ] Incidencia recibida y cambio con commit posterior.
- [ ] Defensa individual realizada.
