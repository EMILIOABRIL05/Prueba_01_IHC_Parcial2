# IHC-A-12 · Dashboard · Retomar sesión

**Ficha de preparación, no registro de una ejecución real.**

## Persona, tarea y alcance
- Persona contextualizada: Retomar sesión.
- Tarea: reanudar, completar lista y cerrar.
- Fallo específico: **declara fin sin completar checklist**.
- Hipótesis de mejora para v2: **No se muestra éxito con checklist obligatorio incompleto**.
- Restricción: consultar tarjeta original adjunta; sus valores concretos se modelaron en el prototipo.
- Modelo complementario: rama editar/error y confirmación visible de CaféU.

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
| R01 | La persona puede reanudar, completar lista y cerrar siguiendo pasos visibles. | Recorrido principal completo hasta estado final, sin atajos externos. |
| R02 | No se muestra éxito con checklist obligatorio incompleto | Repetir el fallo inicial en v1 y comprobar que no ocurre en v2 para el escenario. |
| R03 | La interfaz permite volver y editar sin destruir injustificadamente la tarea. | Después de editar/cancelar, los datos pertinentes siguen disponibles. |
| R04 | Se distingue visual y semánticamente normal, procesando, error y éxito. | Cada estado muestra texto descriptivo; el resultado no se declara antes de confirmación simulada. |
| R05 | La interfaz es utilizable con teclado y foco perceptible. | Tab/Enter alcanzan controles; Escape permite volver donde aplique y foco tiene indicador visible. |
| R06 | La persona comprende información crítica en una pantalla de 360 px cuando corresponda. | Sin ocultación de acciones esenciales, con texto legible y ruta de recuperación identificable. |

### Sitemap y flujos
- Sitemap: `diagramas/IHC-A-12-sitemap.mmd`.
- Flujo normal/error/edición: `diagramas/IHC-A-12-flujo.mmd`.
- Ramas: F1 Datos→Checklist→Registro→Revisión→Cierre; E1 revisión→paso anterior; X1 validación→paso correspondiente.
- Componentes clave: navegación, recuperación y verificación previa, feedback de error, botón de acción, resumen visible, controles accesibles.

### Cuatro wireframes Lo-Fi
1. `wireframes/IHC-A-12-inicio.svg`.
2. `wireframes/IHC-A-12-accion.svg`.
3. `wireframes/IHC-A-12-error.svg`.
4. `wireframes/IHC-A-12-confirmacion.svg`.

### Matriz de trazabilidad
| Requisito | Flujo | Pantalla | Componente | Wireframe |
|---|---|---|---|---|
| R01 | F1 | Inicio/Acción | recuperación y verificación previa | `IHC-A-12-inicio.svg` |
| R02 | F1 | Revisión | recuperación y verificación previa | `IHC-A-12-accion.svg` |
| R03 | E1 | Error/Confirmación | recuperación y verificación previa | `IHC-A-12-accion.svg` |
| R04 | X1 | Revisión | recuperación y verificación previa | `IHC-A-12-error.svg` |
| R05 | F1/E1 | Inicio/Acción | recuperación y verificación previa | `IHC-A-12-accion.svg` |
| R06 | F1/E1 | Error/Confirmación | recuperación y verificación previa | `IHC-A-12-confirmacion.svg` |

## Fase 3 · Prototipo
- v1: `prototipo/v1/index.html` → seleccionar `IHC-A-12` y reproducir: declara fin sin completar checklist.
- v2: `prototipo/v2/index.html` → seleccionar `IHC-A-12` → comprobar la hipótesis: No se muestra éxito con checklist obligatorio incompleto.
- Estados previstos: normal, editando, validando/procesando (CaféU), error y éxito; Dashboard dispone de etapas normales, error de validación y resultado.
- Herramienta: HTML + CSS + JS, ejecutado localmente, fidelidad media/alta; wireframes SVG de baja fidelidad.
- Decisión arquitectónica: mismo flujo de control para 12 escenarios, diferencias controladas por tarjeta y versión.

## Fase 4 · Prueba cognitiva
- Guion: `reanudar, completar lista y cerrar`. Una persona **de otro equipo** debe completar la tarea sin ayudas.
- Registrar de manera real: hora, duración, errores, pausas, resultado, cita textual y consentimiento para evidencias.
- Acta específica (no completada): `pruebas/IHC-A-12-sesion.md`.
- Hipótesis v2: No se muestra éxito con checklist obligatorio incompleto. **No se debe escribir “mejoró” hasta contar con datos observados**.
- La curva v2 (`diagramas/IHC-A-12-curva-v2-hipotesis.svg`) es hipotética, no resultado de prueba.

## Fase 5 · Incidencia nueva y defensa
- Esperar el incidente entregado oficialmente y completar `docs/incidencia-sorpresa-plantilla.md`.
- Demostrar requisito R02, falla/solución y trazabilidad a un Issue/PR genuino.
- Pregunta preparatoria: ¿cómo compruebas que consistencia del estado comunica el estado correcto sin depender solo del aspecto visual?

## Estado de evidencia
- [x] Diseño de ejemplo y prototipos generados.
- [ ] Observación externa y mediciones reales.
- [ ] Capturas de navegador de v1/v2 como evidencia de ejecución.
- [ ] Issues y PR publicados y revisados en GitHub.
- [ ] Incidencia recibida y cambio con commit posterior.
- [ ] Defensa individual realizada.
