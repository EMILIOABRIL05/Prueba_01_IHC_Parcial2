# IHC-A-06 · CaféU · Envío único y conexión inestable

**Procedencia:** arquitectura base de Emilio Abril y diagnóstico del equipo; revisión integral de William Martínez. Los commits de cada integrante se conservan en Git.

## Persona, tarea y contexto
- Persona: Estudiante que confirma desde una red móvil inestable.
- Tarea: Confirmar una vez, reconocer un fallo y reintentar sin duplicar.
- Restricción: Distinguir pendiente, no confirmado y recibido.
- Fallo de referencia en v1: Pulsar dos veces genera solicitudes duplicadas.
- Complemento entre recursos: se aplica arquitectura confirmar/editar de CaféU y evaluación emocional/Stepper/checklist del Dashboard.

## Fase 1 · Diagnóstico emocional
Las emociones siguientes son **estimaciones de diseño**, no mediciones de participantes. La curva inicial utiliza la misma escala de -3 a +3 y los mismos valores que esta tabla.

| Punto | Touchpoint | Importancia | Emoción estimada | Evidencia |
|---|---|---|---|---|
| T1 | Abrir inicio | Punto de contacto | +1 | Hipótesis, sin observación humana |
| T2 | Explorar menú | Punto de contacto | +1 | Hipótesis, sin observación humana |
| T3 | Consultar detalle | Punto de contacto | 0 | Hipótesis, sin observación humana |
| T4 | Agregar producto | Punto de contacto | −2 | Hipótesis, sin observación humana |
| T5 | Editar cantidades | Punto de contacto | −2 | Hipótesis, sin observación humana |
| T6 | Revisar total y advertencias | Punto de contacto | 0 | Hipótesis, sin observación humana |
| T7 | Enviar y esperar sin repetir la intención | Momento de verdad 1 | 0 | Hipótesis, sin observación humana |
| T8 | Distinguir el fallo del acuse confirmado | Momento de verdad 2 | 0 | Hipótesis, sin observación humana |

**Momentos de verdad:** T7 y T8. Visibilidad del estado, consistencia y recuperación de errores.
[Curva inicial](../../diagramas/IHC-A-06-curva-antes.svg). No se presenta una curva posterior como observada sin datos de una sesión.

| ID | Hallazgo candidato | Severidad preliminar | Fundamento |
|---|---|---|---|
| P1 | Pulsar dos veces genera solicitudes duplicadas | Alta | Visibilidad del estado, consistencia y recuperación de errores. |
| P2 | Incertidumbre durante transición o recuperación | Media | Visibilidad del estado: comprobar el mensaje y la posibilidad de recuperar. |
| P3 | Jerarquía o agrupación puede aumentar esfuerzo de búsqueda | Media | Gestalt y carga cognitiva: validar proximidad, orden y reconocimiento en la tarea concreta. |

Borradores: `github/issues/IHC-A-06-P1.md`, P2 y P3. Solo los Issues publicados y enlazados acreditan seguimiento en GitHub.

## Fase 2 · Requisitos verificables

| ID | Requisito | Criterio de aceptación |
|---|---|---|
| R01 | Completar la tarea: Confirmar una vez, reconocer un fallo y reintentar sin duplicar. | Recorrer Inicio, Menú, Detalle, Mi pedido y acuse; se permite volver antes de enviar. |
| R02 | Mientras se procesa se bloquean las mutaciones y el reenvío. El reintento conserva la referencia lógica y el recibo describe la instantánea enviada. | Durante pendiente no aparece éxito. Un fallo conserva datos y referencia; Reintentar puede completar una sola confirmación. Cambiar de tarjeta invalida callbacks anteriores. |
| R03 | Editar, cancelar o regresar sin perder datos pertinentes. | Cancelar o Escape desde el aviso mantiene productos; editar conserva las otras cantidades. |
| R04 | Comunicar estado normal, validación, procesamiento, error y resultado. | Pendiente no es éxito; un error ofrece recuperación y un acuse identifica el pedido. |
| R05 | Permitir teclado, foco visible y nombres semánticos de las acciones. | Tab y Enter operan los controles; Escape cancela el diálogo o vuelve de Detalle; la edición conserva el foco. |
| R06 | Cumplir la restricción contextual: Distinguir pendiente, no confirmado y recibido. | Durante pendiente no aparece éxito. Un fallo conserva datos y referencia; Reintentar puede completar una sola confirmación. Cambiar de tarjeta invalida callbacks anteriores. |

### Arquitectura, componentes y trazabilidad
- [Sitemap](../../diagramas/IHC-A-06-sitemap.mmd).
- [Flujo F1/E1/X1](../../diagramas/IHC-A-06-flujo.mmd).
- Componente crítico: Pendiente, referencia, error, reintento y recibo inmutable.
- Implementación: `operation / pendingOrder / handleConfirm / cancelOperation` en `assets/app.js`, con estilos en `assets/styles.css`.

| Requisito | Flujo | Pantalla | Componente | Wireframe |
|---|---|---|---|---|
| R01 | F1 | Inicio y menú | Pendiente, referencia, error, reintento y recibo inmutable | [inicio](../../wireframes/IHC-A-06-inicio.svg) |
| R02 | F1/E1/X1 | Mi pedido / Detalle | Pendiente, referencia, error, reintento y recibo inmutable | [accion](../../wireframes/IHC-A-06-accion.svg) |
| R03 | E1 | Edición y retorno | Pendiente, referencia, error, reintento y recibo inmutable | [accion](../../wireframes/IHC-A-06-accion.svg) |
| R04 | F1/E1/X1 | Procesando / error / acuse | Pendiente, referencia, error, reintento y recibo inmutable | [confirmacion](../../wireframes/IHC-A-06-confirmacion.svg) |
| R05 | F1/E1/X1 | Controles de la etapa actual | Pendiente, referencia, error, reintento y recibo inmutable | [accion](../../wireframes/IHC-A-06-accion.svg) |
| R06 | F1/E1/X1 | Estado crítico y recuperación | Pendiente, referencia, error, reintento y recibo inmutable | [error](../../wireframes/IHC-A-06-error.svg) |

## Fase 3 · Prototipos y estados
- v1: `prototipo/v1/index.html`, implementación independiente que conserva el fallo de referencia.
- v2: `prototipo/v2/index.html`, aplicación corregida compartida para doce tarjetas.
- Fidelidad: Lo-Fi en SVG para estructura; media/alta en HTML/CSS/JS para validar interacción real de navegador.
- El prototipo local no integra pagos, cocina, red de pedidos ni un servicio de investigación real.
- v1 y v2 tienen catálogos distintos: sánduche USD 2,25 en v1 y USD 2,75 en v2. Comparar comportamiento y calcular cada importe con su catálogo.

## Fase 4 · Verificación técnica y prueba con participante
- [Captura técnica v1](../../evidencias/ejecucion-actual/IHC-A-06-v1.png) y [captura técnica v2](../../evidencias/ejecucion-actual/IHC-A-06-v2.png).
- Casos: `A06-pedido-inmutable-y-sin-reenvio; A06-cancelar-operacion-al-cambiar-tarjeta` y `IHC-A-06-v2`, ejecutados por `tests/navegador_integral.py` sobre las entradas HTTP reales.
- [Resultado, entorno y huellas de fuentes](../../evidencias/ejecucion-actual/README.md). Estas comprobaciones no son una sesión humana.
- [Acta de la tarjeta](../../pruebas/IHC-A-06-sesion.md): registrar participante de otro equipo, tarea sin ayuda, tiempo, errores, pausas, resultado y cita literal cuando se ejecute.
- La mejora técnica puede comprobarse en código/navegador; la mejora de experiencia exige observación. No se infieren tiempos o satisfacción de las capturas.

## Fase 5 · Incidencia y control de cambios
- El laboratorio `incidencias/preparacion/` es material de ensayo; no representa incidencias oficiales adicionales asignadas a esta tarjeta.

## Estado de evidencia
- [x] Requisitos, flujo, sitemap, componentes y cuatro Lo-Fi específicos.
- [x] Pruebas técnicas de navegador y evidencia de la ejecución indicada en su registro.
- [ ] Sesión humana confirmada con registros originales y consentimiento.
- [ ] Ensayo con lector de pantalla cuando corresponda.
- [ ] Revisión personal fundamentada del PR de esta rama por otro integrante.
