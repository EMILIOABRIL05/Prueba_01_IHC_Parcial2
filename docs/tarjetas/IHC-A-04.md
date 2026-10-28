# IHC-A-04 · CaféU · Consulta de alérgenos

**Ficha de preparación, no registro de una ejecución real.**

## Persona, tarea y alcance
- Persona contextualizada: Consulta de alérgenos.
- Tarea: consultar detalles, editar y reconocer alérgenos.
- Fallo específico: **confirmar sin revisar advertencia**.
- Hipótesis de mejora para v2: **La advertencia se presenta antes del envío y se verifica reconocimiento**.
- Restricción: consultar tarjeta original adjunta; sus valores concretos se modelaron en el prototipo.
- Modelo complementario: curva emocional y momentos de verdad de Dashboard UX.

## Fase 1 · Diagnóstico emocional
**Ningún valor de esta tabla ha sido medido.** Se proponen touchpoints para diseñar una prueba; la curva en `diagramas/IHC-A-04-curva-antes.svg` es una predicción de diseño.

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

**Momentos de verdad:** T5, cuando ingredientes y confirmación puede causar un error decisivo; T8, cuando la persona comprueba el resultado de su tarea.

| ID | Hallazgo candidato | Severidad preliminar | Marco y justificación |
|---|---|---|---|
| P1 | Fallo principal: confirmar sin revisar advertencia | Alta | Regla de prevención de errores vulnerada; la tarea crítica puede resultar incorrecta. |
| P2 | Retroalimentación insuficiente en transición | Media | Visibilidad del estado de Nielsen: incertidumbre durante procesamiento o cambio. |
| P3 | Jerarquía dispersa en pantalla y pérdida de contexto | Media | Gestalt y carga cognitiva: obliga a recordar el contexto en lugar de reconocerlo. |

Se preparan borradores de Issue en `github/issues/IHC-A-04-P1.md`, P2 y P3; deben publicarse con asignación y reproducibilidad real durante la sesión.

## Fase 2 · Requisitos verificables
| ID | Requisito | Criterio de aceptación |
|---|---|---|
| R01 | La persona puede consultar detalles, editar y reconocer alérgenos siguiendo pasos visibles. | Recorrido principal completo hasta estado final, sin atajos externos. |
| R02 | La advertencia se presenta antes del envío y se verifica reconocimiento | Repetir el fallo inicial en v1 y comprobar que no ocurre en v2 para el escenario. |
| R03 | La interfaz permite volver y editar sin destruir injustificadamente la tarea. | Después de editar/cancelar, los datos pertinentes siguen disponibles. |
| R04 | Se distingue visual y semánticamente normal, procesando, error y éxito. | Cada estado muestra texto descriptivo; el resultado no se declara antes de confirmación simulada. |
| R05 | La interfaz es utilizable con teclado y foco perceptible. | Tab/Enter alcanzan controles; Escape permite volver donde aplique y foco tiene indicador visible. |
| R06 | La persona comprende información crítica en una pantalla de 360 px cuando corresponda. | Sin ocultación de acciones esenciales, con texto legible y ruta de recuperación identificable. |

### Sitemap y flujos
- Sitemap: `diagramas/IHC-A-04-sitemap.mmd`.
- Flujo normal/error/edición: `diagramas/IHC-A-04-flujo.mmd`.
- Ramas: F1 Inicio→Menú→Detalle→Carrito→Procesamiento→Confirmación; E1 edición Carrito→Menú/Carrito; X1 error→Carrito/Reintento.
- Componentes clave: navegación, advertencia perceptible y validación, feedback de error, botón de acción, resumen visible, controles accesibles.

### Cuatro wireframes Lo-Fi
1. `wireframes/IHC-A-04-inicio.svg`.
2. `wireframes/IHC-A-04-accion.svg`.
3. `wireframes/IHC-A-04-error.svg`.
4. `wireframes/IHC-A-04-confirmacion.svg`.

### Matriz de trazabilidad
| Requisito | Flujo | Pantalla | Componente | Wireframe |
|---|---|---|---|---|
| R01 | F1 | Inicio/Acción | advertencia perceptible y validación | `IHC-A-04-inicio.svg` |
| R02 | F1 | Detalle y carrito | advertencia perceptible y validación | `IHC-A-04-accion.svg` |
| R03 | E1 | Error/Confirmación | advertencia perceptible y validación | `IHC-A-04-accion.svg` |
| R04 | X1 | Detalle y carrito | advertencia perceptible y validación | `IHC-A-04-error.svg` |
| R05 | F1/E1 | Inicio/Acción | advertencia perceptible y validación | `IHC-A-04-accion.svg` |
| R06 | F1/E1 | Error/Confirmación | advertencia perceptible y validación | `IHC-A-04-confirmacion.svg` |

## Fase 3 · Prototipo
- v1: `prototipo/v1/index.html` → seleccionar `IHC-A-04` y reproducir: confirmar sin revisar advertencia.
- v2: `prototipo/v2/index.html` → seleccionar `IHC-A-04` → comprobar la hipótesis: La advertencia se presenta antes del envío y se verifica reconocimiento.
- Estados previstos: normal, editando, validando/procesando (CaféU), error y éxito; Dashboard dispone de etapas normales, error de validación y resultado.
- Herramienta: HTML + CSS + JS, ejecutado localmente, fidelidad media/alta; wireframes SVG de baja fidelidad.
- Decisión arquitectónica: mismo flujo de control para 12 escenarios, diferencias controladas por tarjeta y versión.

## Fase 4 · Prueba cognitiva
- Guion: `consultar detalles, editar y reconocer alérgenos`. Una persona **de otro equipo** debe completar la tarea sin ayudas.
- Registrar de manera real: hora, duración, errores, pausas, resultado, cita textual y consentimiento para evidencias.
- Acta específica (no completada): `pruebas/IHC-A-04-sesion.md`.
- Hipótesis v2: La advertencia se presenta antes del envío y se verifica reconocimiento. **No se debe escribir “mejoró” hasta contar con datos observados**.
- La curva v2 (`diagramas/IHC-A-04-curva-v2-hipotesis.svg`) es hipotética, no resultado de prueba.

## Fase 5 · Incidencia nueva y defensa
- Esperar el incidente entregado oficialmente y completar `docs/incidencia-sorpresa-plantilla.md`.
- Demostrar requisito R02, falla/solución y trazabilidad a un Issue/PR genuino.
- Pregunta preparatoria: ¿cómo compruebas que ingredientes y confirmación comunica el estado correcto sin depender solo del aspecto visual?

## Estado de evidencia
- [x] Diseño de ejemplo y prototipos generados.
- [ ] Observación externa y mediciones reales.
- [ ] Capturas de navegador de v1/v2 como evidencia de ejecución.
- [ ] Issues y PR publicados y revisados en GitHub.
- [ ] Incidencia recibida y cambio con commit posterior.
- [ ] Defensa individual realizada.
