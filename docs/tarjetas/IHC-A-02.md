# IHC-A-02 · CaféU · Pedido completo por teclado

**Procedencia:** arquitectura base de Emilio Abril y diagnóstico del equipo; revisión integral de William Martínez. Los commits de cada integrante se conservan en Git.

## Persona, tarea y contexto
- Persona: Estudiante que usa teclado por una lesión temporal.
- Tarea: Editar y finalizar un pedido con Tab, Enter y Escape.
- Restricción: Operar sin ratón y mantener el foco visible.
- Fallo de referencia en v1: Quitar no identifica el producto y elimina sin confirmación.
- Complemento entre recursos: se aplica arquitectura confirmar/editar de CaféU y evaluación emocional/Stepper/checklist del Dashboard.

## Fase 1 · Diagnóstico emocional
Las emociones siguientes son **estimaciones de diseño**, no mediciones de participantes. La curva inicial utiliza la misma escala de -3 a +3 y los mismos valores que esta tabla.

| Punto | Touchpoint | Importancia | Emoción estimada | Evidencia |
|---|---|---|---|---|
| T1 | Abrir inicio | Punto de contacto | +1 | Hipótesis, sin observación humana |
| T2 | Explorar menú | Punto de contacto | +1 | Hipótesis, sin observación humana |
| T3 | Consultar detalle | Punto de contacto | 0 | Hipótesis, sin observación humana |
| T4 | Agregar producto | Punto de contacto | −2 | Hipótesis, sin observación humana |
| T5 | Quitar un producto y decidir si se conserva | Momento de verdad 1 | −2 | Hipótesis, sin observación humana |
| T6 | Revisar total y advertencias | Punto de contacto | 0 | Hipótesis, sin observación humana |
| T7 | Confirmar solicitud | Punto de contacto | 0 | Hipótesis, sin observación humana |
| T8 | Confirmar el resultado sin perder la ubicación del teclado | Momento de verdad 2 | 0 | Hipótesis, sin observación humana |

**Momentos de verdad:** T5 y T8. Control y libertad; reconocimiento de la acción; prevención del borrado accidental.
[Curva inicial](../../diagramas/IHC-A-02-curva-antes.svg). No se presenta una curva posterior como observada sin datos de una sesión.

| ID | Hallazgo candidato | Severidad preliminar | Fundamento |
|---|---|---|---|
| P1 | Quitar no identifica el producto y elimina sin confirmación | Alta | Control y libertad; reconocimiento de la acción; prevención del borrado accidental. |
| P2 | Incertidumbre durante transición o recuperación | Media | Visibilidad del estado: comprobar el mensaje y la posibilidad de recuperar. |
| P3 | Jerarquía o agrupación puede aumentar esfuerzo de búsqueda | Media | Gestalt y carga cognitiva: validar proximidad, orden y reconocimiento en la tarea concreta. |

Borradores: `github/issues/IHC-A-02-P1.md`, P2 y P3. Solo los Issues publicados y enlazados acreditan seguimiento en GitHub.

## Fase 2 · Requisitos verificables

| ID | Requisito | Criterio de aceptación |
|---|---|---|
| R01 | Completar la tarea: Editar y finalizar un pedido con Tab, Enter y Escape. | Recorrer Inicio, Menú, Detalle, Mi pedido y acuse; se permite volver antes de enviar. |
| R02 | Quitar identifica acción y producto; abre un diálogo con Cancelar inicial, Escape, ciclo de foco y retorno al disparador. | Cancelar o Escape conserva el producto y enfoca el control que abrió el aviso; confirmar elimina solo el elegido. Reducir la última unidad también pide confirmación. |
| R03 | Editar, cancelar o regresar sin perder datos pertinentes. | Cancelar o Escape desde el aviso mantiene productos; editar conserva las otras cantidades. |
| R04 | Comunicar estado normal, validación, procesamiento, error y resultado. | Pendiente no es éxito; un error ofrece recuperación y un acuse identifica el pedido. |
| R05 | Permitir teclado, foco visible y nombres semánticos de las acciones. | Tab y Enter operan los controles; Escape cancela el diálogo o vuelve de Detalle; la edición conserva el foco. |
| R06 | Cumplir la restricción contextual: Operar sin ratón y mantener el foco visible. | Cancelar o Escape conserva el producto y enfoca el control que abrió el aviso; confirmar elimina solo el elegido. Reducir la última unidad también pide confirmación. |

### Arquitectura, componentes y trazabilidad
- [Sitemap](../../diagramas/IHC-A-02-sitemap.mmd).
- [Flujo F1/E1/X1](../../diagramas/IHC-A-02-flujo.mmd).
- Componente crítico: Quitar, diálogo, Cancelar y foco por producto.
- Implementación: `openRemoval / closeRemoval / render` en `assets/app.js`, con estilos en `assets/styles.css`.

| Requisito | Flujo | Pantalla | Componente | Wireframe |
|---|---|---|---|---|
| R01 | F1 | Inicio y menú | Quitar, diálogo, Cancelar y foco por producto | [inicio](../../wireframes/IHC-A-02-inicio.svg) |
| R02 | F1/E1/X1 | Mi pedido / Detalle | Quitar, diálogo, Cancelar y foco por producto | [accion](../../wireframes/IHC-A-02-accion.svg) |
| R03 | E1 | Edición y retorno | Quitar, diálogo, Cancelar y foco por producto | [accion](../../wireframes/IHC-A-02-accion.svg) |
| R04 | F1/E1/X1 | Procesando / error / acuse | Quitar, diálogo, Cancelar y foco por producto | [confirmacion](../../wireframes/IHC-A-02-confirmacion.svg) |
| R05 | F1/E1/X1 | Controles de la etapa actual | Quitar, diálogo, Cancelar y foco por producto | [accion](../../wireframes/IHC-A-02-accion.svg) |
| R06 | F1/E1/X1 | Estado crítico y recuperación | Quitar, diálogo, Cancelar y foco por producto | [error](../../wireframes/IHC-A-02-error.svg) |

## Fase 3 · Prototipos y estados
- v1: `prototipo/v1/index.html`, implementación independiente que conserva el fallo de referencia.
- v2: `prototipo/v2/index.html`, aplicación corregida compartida para doce tarjetas.
- Fidelidad: Lo-Fi en SVG para estructura; media/alta en HTML/CSS/JS para validar interacción real de navegador.
- El prototipo local no integra pagos, cocina, red de pedidos ni un servicio de investigación real.
- v1 y v2 tienen catálogos distintos: sánduche USD 2,25 en v1 y USD 2,75 en v2. Comparar comportamiento y calcular cada importe con su catálogo.

## Fase 4 · Verificación técnica y prueba con participante
- [Captura técnica v1](../../evidencias/ejecucion-actual/IHC-A-02-v1.png) y [captura técnica v2](../../evidencias/ejecucion-actual/IHC-A-02-v2.png).
- Casos: `IHC-A-02-v2; A04-detalle-Escape` y `IHC-A-02-v2`, ejecutados por `tests/navegador_integral.py` sobre las entradas HTTP reales.
- [Resultado, entorno y huellas de fuentes](../../evidencias/ejecucion-actual/README.md). Estas comprobaciones no son una sesión humana.
- [Acta de la tarjeta](../../pruebas/IHC-A-02-sesion.md): registrar participante de otro equipo, tarea sin ayuda, tiempo, errores, pausas, resultado y cita literal cuando se ejecute.
- La mejora técnica puede comprobarse en código/navegador; la mejora de experiencia exige observación. No se infieren tiempos o satisfacción de las capturas.

## Fase 5 · Incidencia y control de cambios
- El laboratorio `incidencias/preparacion/` es material de ensayo; no representa incidencias oficiales adicionales asignadas a esta tarjeta.

## Estado de evidencia
- [x] Requisitos, flujo, sitemap, componentes y cuatro Lo-Fi específicos.
- [x] Pruebas técnicas de navegador y evidencia de la ejecución indicada en su registro.
- [ ] Sesión humana confirmada con registros originales y consentimiento.
- [ ] Ensayo con lector de pantalla cuando corresponda.
- [ ] Revisión personal fundamentada del PR de esta rama por otro integrante.
