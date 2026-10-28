# IHC-A-08 · Dashboard UX · Procedimiento y guardado del checklist

**Procedencia:** arquitectura base de Emilio Abril y diagnóstico del equipo; revisión integral de William Martínez. Los commits de cada integrante se conservan en Git.

## Persona, tarea y contexto
- Persona: Docente evaluador que prepara una sesión contrarreloj.
- Tarea: Leer el procedimiento y completar datos y checklist.
- Restricción: Conservar marcas e informar el estado de guardado.
- Fallo de referencia en v1: Las casillas se pierden al cambiar de etapa.
- Complemento entre recursos: se aplica arquitectura confirmar/editar de CaféU y evaluación emocional/Stepper/checklist del Dashboard.

## Fase 1 · Diagnóstico emocional
Las emociones siguientes son **estimaciones de diseño**, no mediciones de participantes. La curva inicial utiliza la misma escala de -3 a +3 y los mismos valores que esta tabla.

| Punto | Touchpoint | Importancia | Emoción estimada | Evidencia |
|---|---|---|---|---|
| T1 | Abrir o recuperar sesión | Punto de contacto | +1 | Hipótesis, sin observación humana |
| T2 | Comprender el procedimiento antes de comenzar | Momento de verdad 1 | +1 | Hipótesis, sin observación humana |
| T3 | Identificar paso actual | Punto de contacto | 0 | Hipótesis, sin observación humana |
| T4 | Guardar y recuperar las verificaciones marcadas | Momento de verdad 2 | −2 | Hipótesis, sin observación humana |
| T5 | Registrar errores y observaciones | Punto de contacto | −2 | Hipótesis, sin observación humana |
| T6 | Revisar resumen | Punto de contacto | 0 | Hipótesis, sin observación humana |
| T7 | Cerrar sesión | Punto de contacto | 0 | Hipótesis, sin observación humana |

**Momentos de verdad:** T2 y T4. Memoria externa, consistencia y feedback sobre conservación.
[Curva inicial](../../diagramas/IHC-A-08-curva-antes.svg). No se presenta una curva posterior como observada sin datos de una sesión.

| ID | Hallazgo candidato | Severidad preliminar | Fundamento |
|---|---|---|---|
| P1 | Las casillas se pierden al cambiar de etapa | Alta | Memoria externa, consistencia y feedback sobre conservación. |
| P2 | Incertidumbre durante transición o recuperación | Media | Visibilidad del estado: comprobar el mensaje y la posibilidad de recuperar. |
| P3 | Jerarquía o agrupación puede aumentar esfuerzo de búsqueda | Media | Gestalt y carga cognitiva: validar proximidad, orden y reconocimiento en la tarea concreta. |

Borradores: `github/issues/IHC-A-08-P1.md`, P2 y P3. Solo los Issues publicados y enlazados acreditan seguimiento en GitHub.

## Fase 2 · Requisitos verificables

| ID | Requisito | Criterio de aceptación |
|---|---|---|
| R01 | Completar la tarea: Leer el procedimiento y completar datos y checklist. | Recorrer Datos, Checklist, Observaciones, Revisión y cierre; la guía aparece antes de iniciar. |
| R02 | La guía explica la secuencia antes de iniciar; las marcas se conservan al ir y volver, con indicador de guardado real. | Tras marcar, avanzar, volver y recargar, las marcas y campos guardados se recuperan en A08. Una excepción de almacenamiento se muestra como Sin guardar. |
| R03 | Editar, cancelar o regresar sin perder datos pertinentes. | Volver conserva título, código, métricas y marcas; nueva sesión requiere una acción explícita. |
| R04 | Comunicar estado normal, validación, procesamiento, error y resultado. | Un campo inválido se identifica y enfoca; Verificando precede al cierre y el guardado refleja su resultado real. |
| R05 | Permitir teclado, foco visible y nombres semánticos de las acciones. | Tab y Enter operan etapas y casillas; el paso actual tiene texto, número y aria-current; el cambio enfoca encabezado o campo inválido. |
| R06 | Cumplir la restricción contextual: Conservar marcas e informar el estado de guardado. | Tras marcar, avanzar, volver y recargar, las marcas y campos guardados se recuperan en A08. Una excepción de almacenamiento se muestra como Sin guardar. |

### Arquitectura, componentes y trazabilidad
- [Sitemap](../../diagramas/IHC-A-08-sitemap.mmd).
- [Flujo F1/E1/X1](../../diagramas/IHC-A-08-flujo.mmd).
- Componente crítico: Guía inicial, checklist e indicador de guardado.
- Implementación: `storageKey A08 / saveStorage / loadStorage / save-status` en `assets/app.js`, con estilos en `assets/styles.css`.

| Requisito | Flujo | Pantalla | Componente | Wireframe |
|---|---|---|---|---|
| R01 | F1 | Datos y guía | Guía inicial, checklist e indicador de guardado | [inicio](../../wireframes/IHC-A-08-inicio.svg) |
| R02 | F1/E1/X1 | Checklist / Datos | Guía inicial, checklist e indicador de guardado | [accion](../../wireframes/IHC-A-08-accion.svg) |
| R03 | E1 | Edición y retorno | Guía inicial, checklist e indicador de guardado | [accion](../../wireframes/IHC-A-08-accion.svg) |
| R04 | F1/E1/X1 | Revisión / verificación / cierre | Guía inicial, checklist e indicador de guardado | [confirmacion](../../wireframes/IHC-A-08-confirmacion.svg) |
| R05 | F1/E1/X1 | Controles de la etapa actual | Guía inicial, checklist e indicador de guardado | [accion](../../wireframes/IHC-A-08-accion.svg) |
| R06 | F1/E1/X1 | Estado crítico y recuperación | Guía inicial, checklist e indicador de guardado | [error](../../wireframes/IHC-A-08-error.svg) |

## Fase 3 · Prototipos y estados
- v1: `prototipo/v1/index.html`, implementación independiente que conserva el fallo de referencia.
- v2: `prototipo/v2/index.html`, aplicación corregida compartida para doce tarjetas.
- Fidelidad: Lo-Fi en SVG para estructura; media/alta en HTML/CSS/JS para validar interacción real de navegador.
- El prototipo local no integra pagos, cocina, red de pedidos ni un servicio de investigación real.
- v1 y v2 tienen catálogos distintos: sánduche USD 2,25 en v1 y USD 2,75 en v2. Comparar comportamiento y calcular cada importe con su catálogo.

## Fase 4 · Verificación técnica y prueba con participante
- [Captura técnica v1](../../evidencias/ejecucion-actual/IHC-A-08-v1.png) y [captura técnica v2](../../evidencias/ejecucion-actual/IHC-A-08-v2.png).
- Casos: `IHC-A-08-v2` y `IHC-A-08-v2`, ejecutados por `tests/navegador_integral.py` sobre las entradas HTTP reales.
- [Resultado, entorno y huellas de fuentes](../../evidencias/ejecucion-actual/README.md). Estas comprobaciones no son una sesión humana.
- [Acta de la tarjeta](../../pruebas/IHC-A-08-sesion.md): registrar participante de otro equipo, tarea sin ayuda, tiempo, errores, pausas, resultado y cita literal cuando se ejecute.
- La mejora técnica puede comprobarse en código/navegador; la mejora de experiencia exige observación. No se infieren tiempos o satisfacción de las capturas.

## Fase 5 · Incidencia y control de cambios
- El laboratorio `incidencias/preparacion/` es material de ensayo; no representa incidencias oficiales adicionales asignadas a esta tarjeta.

## Estado de evidencia
- [x] Requisitos, flujo, sitemap, componentes y cuatro Lo-Fi específicos.
- [x] Pruebas técnicas de navegador y evidencia de la ejecución indicada en su registro.
- [ ] Sesión humana confirmada con registros originales y consentimiento.
- [ ] Ensayo con lector de pantalla cuando corresponda.
- [ ] Revisión personal fundamentada del PR de esta rama por otro integrante.
