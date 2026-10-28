# IHC-A-07 · Dashboard UX · Secuencia obligatoria y paso actual

**Procedencia:** arquitectura base de Emilio Abril y diagnóstico del equipo; revisión integral de William Martínez. Los commits de cada integrante se conservan en Git.

## Persona, tarea y contexto
- Persona: Investigadora novata que prepara una prueba de usabilidad.
- Tarea: Configurar datos, completar checklist y avanzar por etapas.
- Restricción: Identificar el paso actual y bloquear omisiones de pasos obligatorios.
- Fallo de referencia en v1: El Stepper permite saltar verificaciones incompletas.
- Complemento entre recursos: se aplica arquitectura confirmar/editar de CaféU y evaluación emocional/Stepper/checklist del Dashboard.

## Fase 1 · Diagnóstico emocional
Las emociones siguientes son **estimaciones de diseño**, no mediciones de participantes. La curva inicial utiliza la misma escala de -3 a +3 y los mismos valores que esta tabla.

| Punto | Touchpoint | Importancia | Emoción estimada | Evidencia |
|---|---|---|---|---|
| T1 | Abrir o recuperar sesión | Punto de contacto | +1 | Hipótesis, sin observación humana |
| T2 | Configurar datos y revisar procedimiento | Punto de contacto | +1 | Hipótesis, sin observación humana |
| T3 | Reconocer el paso actual y la secuencia | Momento de verdad 1 | 0 | Hipótesis, sin observación humana |
| T4 | Intentar avanzar con verificaciones pendientes | Momento de verdad 2 | −2 | Hipótesis, sin observación humana |
| T5 | Registrar errores y observaciones | Punto de contacto | −2 | Hipótesis, sin observación humana |
| T6 | Revisar resumen | Punto de contacto | 0 | Hipótesis, sin observación humana |
| T7 | Cerrar sesión | Punto de contacto | 0 | Hipótesis, sin observación humana |

**Momentos de verdad:** T3 y T4. Consistencia, reconocimiento y prevención de errores de secuencia.
[Curva inicial](../../diagramas/IHC-A-07-curva-antes.svg). No se presenta una curva posterior como observada sin datos de una sesión.

| ID | Hallazgo candidato | Severidad preliminar | Fundamento |
|---|---|---|---|
| P1 | El Stepper permite saltar verificaciones incompletas | Alta | Consistencia, reconocimiento y prevención de errores de secuencia. |
| P2 | Incertidumbre durante transición o recuperación | Media | Visibilidad del estado: comprobar el mensaje y la posibilidad de recuperar. |
| P3 | Jerarquía o agrupación puede aumentar esfuerzo de búsqueda | Media | Gestalt y carga cognitiva: validar proximidad, orden y reconocimiento en la tarea concreta. |

Borradores: `github/issues/IHC-A-07-P1.md`, P2 y P3. Solo los Issues publicados y enlazados acreditan seguimiento en GitHub.

## Fase 2 · Requisitos verificables

| ID | Requisito | Criterio de aceptación |
|---|---|---|
| R01 | Completar la tarea: Configurar datos, completar checklist y avanzar por etapas. | Recorrer Datos, Checklist, Observaciones, Revisión y cierre; la guía aparece antes de iniciar. |
| R02 | Siguiente y Stepper comparten validación. En A07, salir del Checklist requiere sus tres verificaciones. | Con 0/3 o 2/3, Siguiente y el Stepper permanecen en Checklist, explican la falta y enfocan la casilla. Con 3/3 se permite avanzar sin perder marcas. |
| R03 | Editar, cancelar o regresar sin perder datos pertinentes. | Volver conserva título, código, métricas y marcas; nueva sesión requiere una acción explícita. |
| R04 | Comunicar estado normal, validación, procesamiento, error y resultado. | Un campo inválido se identifica y enfoca; Verificando precede al cierre y el guardado refleja su resultado real. |
| R05 | Permitir teclado, foco visible y nombres semánticos de las acciones. | Tab y Enter operan etapas y casillas; el paso actual tiene texto, número y aria-current; el cambio enfoca encabezado o campo inválido. |
| R06 | Cumplir la restricción contextual: Identificar el paso actual y bloquear omisiones de pasos obligatorios. | Con 0/3 o 2/3, Siguiente y el Stepper permanecen en Checklist, explican la falta y enfocan la casilla. Con 3/3 se permite avanzar sin perder marcas. |

### Arquitectura, componentes y trazabilidad
- [Sitemap](../../diagramas/IHC-A-07-sitemap.mmd).
- [Flujo F1/E1/X1](../../diagramas/IHC-A-07-flujo.mmd).
- Componente crítico: Stepper, validación compartida y primer campo pendiente.
- Implementación: `navigationProblem / handleStepClick / checklistProblem` en `assets/app.js`, con estilos en `assets/styles.css`.

| Requisito | Flujo | Pantalla | Componente | Wireframe |
|---|---|---|---|---|
| R01 | F1 | Datos y guía | Stepper, validación compartida y primer campo pendiente | [inicio](../../wireframes/IHC-A-07-inicio.svg) |
| R02 | F1/E1/X1 | Checklist / Datos | Stepper, validación compartida y primer campo pendiente | [accion](../../wireframes/IHC-A-07-accion.svg) |
| R03 | E1 | Edición y retorno | Stepper, validación compartida y primer campo pendiente | [accion](../../wireframes/IHC-A-07-accion.svg) |
| R04 | F1/E1/X1 | Revisión / verificación / cierre | Stepper, validación compartida y primer campo pendiente | [confirmacion](../../wireframes/IHC-A-07-confirmacion.svg) |
| R05 | F1/E1/X1 | Controles de la etapa actual | Stepper, validación compartida y primer campo pendiente | [accion](../../wireframes/IHC-A-07-accion.svg) |
| R06 | F1/E1/X1 | Estado crítico y recuperación | Stepper, validación compartida y primer campo pendiente | [error](../../wireframes/IHC-A-07-error.svg) |

## Fase 3 · Prototipos y estados
- v1: `prototipo/v1/index.html`, implementación independiente que conserva el fallo de referencia.
- v2: `prototipo/v2/index.html`, aplicación corregida compartida para doce tarjetas.
- Fidelidad: Lo-Fi en SVG para estructura; media/alta en HTML/CSS/JS para validar interacción real de navegador.
- El prototipo local no integra pagos, cocina, red de pedidos ni un servicio de investigación real.
- v1 y v2 tienen catálogos distintos: sánduche USD 2,25 en v1 y USD 2,75 en v2. Comparar comportamiento y calcular cada importe con su catálogo.

## Fase 4 · Verificación técnica y prueba con participante
- [Captura técnica v1](../../evidencias/ejecucion-actual/IHC-A-07-v1.png) y [captura técnica v2](../../evidencias/ejecucion-actual/IHC-A-07-v2.png).
- Casos: `IHC-A-07-v2` y `IHC-A-07-v2`, ejecutados por `tests/navegador_integral.py` sobre las entradas HTTP reales.
- [Resultado, entorno y huellas de fuentes](../../evidencias/ejecucion-actual/README.md). Estas comprobaciones no son una sesión humana.
- [Acta de la tarjeta](../../pruebas/IHC-A-07-sesion.md): registrar participante de otro equipo, tarea sin ayuda, tiempo, errores, pausas, resultado y cita literal cuando se ejecute.
- La mejora técnica puede comprobarse en código/navegador; la mejora de experiencia exige observación. No se infieren tiempos o satisfacción de las capturas.

## Fase 5 · Incidencia y control de cambios
- El laboratorio `incidencias/preparacion/` es material de ensayo; no representa incidencias oficiales adicionales asignadas a esta tarjeta.

## Estado de evidencia
- [x] Requisitos, flujo, sitemap, componentes y cuatro Lo-Fi específicos.
- [x] Pruebas técnicas de navegador y evidencia de la ejecución indicada en su registro.
- [ ] Sesión humana confirmada con registros originales y consentimiento.
- [ ] Ensayo con lector de pantalla cuando corresponda.
- [ ] Revisión personal fundamentada del PR de esta rama por otro integrante.
