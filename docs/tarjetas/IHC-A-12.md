# IHC-A-12 · Dashboard UX · Reanudación y cierre verificado

**Procedencia:** arquitectura base de Emilio Abril y diagnóstico del equipo; revisión integral de William Martínez. Los commits de cada integrante se conservan en Git.

## Persona, tarea y contexto
- Persona: Investigadora que retoma una sesión interrumpida.
- Tarea: Recuperar el progreso, completar el checklist y cerrar.
- Restricción: No perder verificaciones ni declarar éxito incompleto.
- Fallo de referencia en v1: Se permite finalizar sin validar el checklist obligatorio.
- Complemento entre recursos: se aplica arquitectura confirmar/editar de CaféU y evaluación emocional/Stepper/checklist del Dashboard.

## Fase 1 · Diagnóstico emocional
Las emociones siguientes son **estimaciones de diseño**, no mediciones de participantes. La curva inicial utiliza la misma escala de -3 a +3 y los mismos valores que esta tabla.

| Punto | Touchpoint | Importancia | Emoción estimada | Evidencia |
|---|---|---|---|---|
| T1 | Recuperar la sesión y reconocer el progreso anterior | Momento de verdad 1 | +1 | Hipótesis, sin observación humana |
| T2 | Configurar datos y revisar procedimiento | Punto de contacto | +1 | Hipótesis, sin observación humana |
| T3 | Identificar paso actual | Punto de contacto | 0 | Hipótesis, sin observación humana |
| T4 | Completar checklist | Punto de contacto | −2 | Hipótesis, sin observación humana |
| T5 | Registrar errores y observaciones | Punto de contacto | −2 | Hipótesis, sin observación humana |
| T6 | Revisar resumen | Punto de contacto | 0 | Hipótesis, sin observación humana |
| T7 | Comprobar que el cierre valida todos los obligatorios | Momento de verdad 2 | 0 | Hipótesis, sin observación humana |

**Momentos de verdad:** T1 y T7. Prevención de falso éxito, continuidad de tarea y feedback comprobable.
[Curva inicial](../../diagramas/IHC-A-12-curva-antes.svg). No se presenta una curva posterior como observada sin datos de una sesión.

| ID | Hallazgo candidato | Severidad preliminar | Fundamento |
|---|---|---|---|
| P1 | Se permite finalizar sin validar el checklist obligatorio | Alta | Prevención de falso éxito, continuidad de tarea y feedback comprobable. |
| P2 | Incertidumbre durante transición o recuperación | Media | Visibilidad del estado: comprobar el mensaje y la posibilidad de recuperar. |
| P3 | Jerarquía o agrupación puede aumentar esfuerzo de búsqueda | Media | Gestalt y carga cognitiva: validar proximidad, orden y reconocimiento en la tarea concreta. |

Borradores: `github/issues/IHC-A-12-P1.md`, P2 y P3. Solo los Issues publicados y enlazados acreditan seguimiento en GitHub.

## Fase 2 · Requisitos verificables

| ID | Requisito | Criterio de aceptación |
|---|---|---|
| R01 | Completar la tarea: Recuperar el progreso, completar el checklist y cerrar. | Recorrer Datos, Checklist, Observaciones, Revisión y cierre; la guía aparece antes de iniciar. |
| R02 | El cierre requiere datos válidos y exactamente tres verificaciones verdaderas. Falta, error de almacenamiento o datos dañados no producen cierre confirmado. | Con 2/3 se anuncia el ítem faltante y se enfoca su casilla. Se preservan campos y etapa; con 3/3 se verifica y guarda. Recargar restaura también la sesión cerrada válida. |
| R03 | Editar, cancelar o regresar sin perder datos pertinentes. | Volver conserva título, código, métricas y marcas; nueva sesión requiere una acción explícita. |
| R04 | Comunicar estado normal, validación, procesamiento, error y resultado. | Un campo inválido se identifica y enfoca; Verificando precede al cierre y el guardado refleja su resultado real. |
| R05 | Permitir teclado, foco visible y nombres semánticos de las acciones. | Tab y Enter operan etapas y casillas; el paso actual tiene texto, número y aria-current; el cambio enfoca encabezado o campo inválido. |
| R06 | Cumplir la restricción contextual: No perder verificaciones ni declarar éxito incompleto. | Con 2/3 se anuncia el ítem faltante y se enfoca su casilla. Se preservan campos y etapa; con 3/3 se verifica y guarda. Recargar restaura también la sesión cerrada válida. |
| R7 | Bloquear cierre incompleto, identificar y enfocar el ítem faltante, preservar progreso y revalidar antes de guardar el estado cerrado. | Con 2/3 se anuncia el ítem faltante y se enfoca su casilla. Se preservan campos y etapa; con 3/3 se verifica y guarda. Recargar restaura también la sesión cerrada válida. |

### Arquitectura, componentes y trazabilidad
- [Sitemap](../../diagramas/IHC-A-12-sitemap.mmd).
- [Flujo F1/E1/X1](../../diagramas/IHC-A-12-flujo.mmd).
- Componente crítico: Recuperación, checklist, alerta, foco y estado cerrado.
- Implementación: `loadStorage / finishProblem / handleDashboardFinish / saveStorage` en `assets/app.js`, con estilos en `assets/styles.css`.

| Requisito | Flujo | Pantalla | Componente | Wireframe |
|---|---|---|---|---|
| R01 | F1 | Datos y guía | Recuperación, checklist, alerta, foco y estado cerrado | [inicio](../../wireframes/IHC-A-12-inicio.svg) |
| R02 | F1/E1/X1 | Checklist / Datos | Recuperación, checklist, alerta, foco y estado cerrado | [accion](../../wireframes/IHC-A-12-accion.svg) |
| R03 | E1 | Edición y retorno | Recuperación, checklist, alerta, foco y estado cerrado | [accion](../../wireframes/IHC-A-12-accion.svg) |
| R04 | F1/E1/X1 | Revisión / verificación / cierre | Recuperación, checklist, alerta, foco y estado cerrado | [confirmacion](../../wireframes/IHC-A-12-confirmacion.svg) |
| R05 | F1/E1/X1 | Controles de la etapa actual | Recuperación, checklist, alerta, foco y estado cerrado | [accion](../../wireframes/IHC-A-12-accion.svg) |
| R06 | F1/E1/X1 | Estado crítico y recuperación | Recuperación, checklist, alerta, foco y estado cerrado | [error](../../wireframes/IHC-A-12-error.svg) |
| R7 | E1/X1/F1 | Checklist / Datos | Recuperación, checklist, alerta, foco y estado cerrado | [Estado R7](../../wireframes/IHC-A-12-pendiente-R7.svg) |

## Fase 3 · Prototipos y estados
- v1: `prototipo/v1/index.html`, implementación independiente que conserva el fallo de referencia.
- v2: `prototipo/v2/index.html`, aplicación corregida compartida para doce tarjetas.
- Fidelidad: Lo-Fi en SVG para estructura; media/alta en HTML/CSS/JS para validar interacción real de navegador.
- El prototipo local no integra pagos, cocina, red de pedidos ni un servicio de investigación real.
- v1 y v2 tienen catálogos distintos: sánduche USD 2,25 en v1 y USD 2,75 en v2. Comparar comportamiento y calcular cada importe con su catálogo.

## Fase 4 · Verificación técnica y prueba con participante
- [Captura técnica v1](../../evidencias/ejecucion-actual/IHC-A-12-v1.png) y [captura técnica v2](../../evidencias/ejecucion-actual/IHC-A-12-v2.png).
- Casos: `IHC-A-12-v2; A12-checklist-persistido-vacio; A12-fallo-guardado-y-reintento` y `IHC-A-12-v2`, ejecutados por `tests/navegador_integral.py` sobre las entradas HTTP reales.
- [Resultado, entorno y huellas de fuentes](../../evidencias/ejecucion-actual/README.md). Estas comprobaciones no son una sesión humana.
- [Acta de la tarjeta](../../pruebas/IHC-A-12-sesion.md): registrar participante de otro equipo, tarea sin ayuda, tiempo, errores, pausas, resultado y cita literal cuando se ejecute.
- La mejora técnica puede comprobarse en código/navegador; la mejora de experiencia exige observación. No se infieren tiempos o satisfacción de las capturas.

## Fase 5 · Incidencia y control de cambios
- Incidencia seleccionada: [Issue #18](https://github.com/EMILIOABRIL05/Prueba_01_IHC_Parcial2/issues/18), integrada inicialmente por [PR #19](https://github.com/EMILIOABRIL05/Prueba_01_IHC_Parcial2/pull/19).
- Esta rama completa regresiones y documentación; la fecha de anuncio docente solo se registra si existe evidencia auténtica.
- [Trazabilidad de las dos incidencias](../incidencias-seleccionadas-A01-A12.md).

## Estado de evidencia
- [x] Requisitos, flujo, sitemap, componentes y cuatro Lo-Fi específicos.
- [x] Pruebas técnicas de navegador y evidencia de la ejecución indicada en su registro.
- [ ] Sesión humana confirmada con registros originales y consentimiento.
- [ ] Ensayo con lector de pantalla cuando corresponda.
- [ ] Revisión personal fundamentada del PR de esta rama por otro integrante.
