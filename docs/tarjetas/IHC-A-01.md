# IHC-A-01 · CaféU · Compra rápida y revisión del importe

**Procedencia:** arquitectura base de Emilio Abril y diagnóstico del equipo; revisión integral de William Martínez. Los commits de cada integrante se conservan en Git.

## Persona, tarea y contexto
- Persona: Estudiante de primer nivel que compra entre clases.
- Tarea: Agregar café y sánduche, variar cantidad y confirmar.
- Restricción: Tres minutos; pantalla de 360 px.
- Fallo de referencia en v1: El total permanece obsoleto al variar cantidades.
- Complemento entre recursos: se aplica arquitectura confirmar/editar de CaféU y evaluación emocional/Stepper/checklist del Dashboard.

## Fase 1 · Diagnóstico emocional
Las emociones siguientes son **estimaciones de diseño**, no mediciones de participantes. La curva inicial utiliza la misma escala de -3 a +3 y los mismos valores que esta tabla.

| Punto | Touchpoint | Importancia | Emoción estimada | Evidencia |
|---|---|---|---|---|
| T1 | Abrir inicio | Punto de contacto | +1 | Hipótesis, sin observación humana |
| T2 | Explorar menú | Punto de contacto | +1 | Hipótesis, sin observación humana |
| T3 | Consultar detalle | Punto de contacto | 0 | Hipótesis, sin observación humana |
| T4 | Agregar producto | Punto de contacto | −2 | Hipótesis, sin observación humana |
| T5 | Editar cantidades y comprobar el nuevo total | Momento de verdad 1 | −2 | Hipótesis, sin observación humana |
| T6 | Revisar total y advertencias | Punto de contacto | 0 | Hipótesis, sin observación humana |
| T7 | Confirmar solicitud | Punto de contacto | 0 | Hipótesis, sin observación humana |
| T8 | Comprobar el acuse y el importe del pedido recibido | Momento de verdad 2 | 0 | Hipótesis, sin observación humana |

**Momentos de verdad:** T5 y T8. Visibilidad del estado y prevención de errores: el importe revisado corresponde al pedido enviado.
[Curva inicial](../../diagramas/IHC-A-01-curva-antes.svg). No se presenta una curva posterior como observada sin datos de una sesión.

| ID | Hallazgo candidato | Severidad preliminar | Fundamento |
|---|---|---|---|
| P1 | El total permanece obsoleto al variar cantidades | Alta | Visibilidad del estado y prevención de errores: el importe revisado corresponde al pedido enviado. |
| P2 | Incertidumbre durante transición o recuperación | Media | Visibilidad del estado: comprobar el mensaje y la posibilidad de recuperar. |
| P3 | Jerarquía o agrupación puede aumentar esfuerzo de búsqueda | Media | Gestalt y carga cognitiva: validar proximidad, orden y reconocimiento en la tarea concreta. |

Borradores: `github/issues/IHC-A-01-P1.md`, P2 y P3. Solo los Issues publicados y enlazados acreditan seguimiento en GitHub.

## Fase 2 · Requisitos verificables

| ID | Requisito | Criterio de aceptación |
|---|---|---|
| R01 | Completar la tarea: Agregar café y sánduche, variar cantidad y confirmar. | Recorrer Inicio, Menú, Detalle, Mi pedido y acuse; se permite volver antes de enviar. |
| R02 | Cada cambio del pedido actualiza subtotales y total; en A01 se exige revisar la versión vigente del carrito antes de confirmar. | Un café y un sánduche suman USD 4,25; dos cafés y un sánduche USD 5,75. Agregar, quitar y variar cantidades invalidan la revisión. Antes de revisarla no se envía. |
| R03 | Editar, cancelar o regresar sin perder datos pertinentes. | Cancelar o Escape desde el aviso mantiene productos; editar conserva las otras cantidades. |
| R04 | Comunicar estado normal, validación, procesamiento, error y resultado. | Pendiente no es éxito; un error ofrece recuperación y un acuse identifica el pedido. |
| R05 | Permitir teclado, foco visible y nombres semánticos de las acciones. | Tab y Enter operan los controles; Escape cancela el diálogo o vuelve de Detalle; la edición conserva el foco. |
| R06 | Cumplir la restricción contextual: Tres minutos; pantalla de 360 px. | Un café y un sánduche suman USD 4,25; dos cafés y un sánduche USD 5,75. Agregar, quitar y variar cantidades invalidan la revisión. Antes de revisarla no se envía. |
| R7 | Toda mutación del pedido invalida la revisión del total vigente; mostrar diferencia y solicitar revisión antes de confirmar. | Un café y un sánduche suman USD 4,25; dos cafés y un sánduche USD 5,75. Agregar, quitar y variar cantidades invalidan la revisión. Antes de revisarla no se envía. |

### Arquitectura, componentes y trazabilidad
- [Sitemap](../../diagramas/IHC-A-01-sitemap.mmd).
- [Flujo F1/E1/X1](../../diagramas/IHC-A-01-flujo.mmd).
- Componente crítico: Subtotal, total, diferencia y revisión explícita.
- Implementación: `cartChanged / cartSignature / handleConfirm` en `assets/app.js`, con estilos en `assets/styles.css`.

| Requisito | Flujo | Pantalla | Componente | Wireframe |
|---|---|---|---|---|
| R01 | F1 | Inicio y menú | Subtotal, total, diferencia y revisión explícita | [inicio](../../wireframes/IHC-A-01-inicio.svg) |
| R02 | F1/E1/X1 | Mi pedido / Detalle | Subtotal, total, diferencia y revisión explícita | [accion](../../wireframes/IHC-A-01-accion.svg) |
| R03 | E1 | Edición y retorno | Subtotal, total, diferencia y revisión explícita | [accion](../../wireframes/IHC-A-01-accion.svg) |
| R04 | F1/E1/X1 | Procesando / error / acuse | Subtotal, total, diferencia y revisión explícita | [confirmacion](../../wireframes/IHC-A-01-confirmacion.svg) |
| R05 | F1/E1/X1 | Controles de la etapa actual | Subtotal, total, diferencia y revisión explícita | [accion](../../wireframes/IHC-A-01-accion.svg) |
| R06 | F1/E1/X1 | Estado crítico y recuperación | Subtotal, total, diferencia y revisión explícita | [error](../../wireframes/IHC-A-01-error.svg) |
| R7 | E1/X1/F1 | Mi pedido / Detalle | Subtotal, total, diferencia y revisión explícita | [Estado R7](../../wireframes/IHC-A-01-revision-R7.svg) |

## Fase 3 · Prototipos y estados
- v1: `prototipo/v1/index.html`, implementación independiente que conserva el fallo de referencia.
- v2: `prototipo/v2/index.html`, aplicación corregida compartida para doce tarjetas.
- Fidelidad: Lo-Fi en SVG para estructura; media/alta en HTML/CSS/JS para validar interacción real de navegador.
- El prototipo local no integra pagos, cocina, red de pedidos ni un servicio de investigación real.
- v1 y v2 tienen catálogos distintos: sánduche USD 2,25 en v1 y USD 2,75 en v2. Comparar comportamiento y calcular cada importe con su catálogo.

## Fase 4 · Verificación técnica y prueba con participante
- [Captura técnica v1](../../evidencias/ejecucion-actual/IHC-A-01-v1.png) y [captura técnica v2](../../evidencias/ejecucion-actual/IHC-A-01-v2.png).
- Casos: `A01-agregar-invalida-revision; A01-quitar-invalida-revision` y `IHC-A-01-v2`, ejecutados por `tests/navegador_integral.py` sobre las entradas HTTP reales.
- [Resultado, entorno y huellas de fuentes](../../evidencias/ejecucion-actual/README.md). Estas comprobaciones no son una sesión humana.
- [Acta de la tarjeta](../../pruebas/IHC-A-01-sesion.md): registrar participante de otro equipo, tarea sin ayuda, tiempo, errores, pausas, resultado y cita literal cuando se ejecute.
- La mejora técnica puede comprobarse en código/navegador; la mejora de experiencia exige observación. No se infieren tiempos o satisfacción de las capturas.

## Fase 5 · Incidencia y control de cambios
- Incidencia seleccionada: [Issue #17](https://github.com/EMILIOABRIL05/Prueba_01_IHC_Parcial2/issues/17), integrada inicialmente por [PR #19](https://github.com/EMILIOABRIL05/Prueba_01_IHC_Parcial2/pull/19).
- Esta rama completa regresiones y documentación; la fecha de anuncio docente solo se registra si existe evidencia auténtica.
- [Trazabilidad de las dos incidencias](../incidencias-seleccionadas-A01-A12.md).

## Estado de evidencia
- [x] Requisitos, flujo, sitemap, componentes y cuatro Lo-Fi específicos.
- [x] Pruebas técnicas de navegador y evidencia de la ejecución indicada en su registro.
- [ ] Sesión humana confirmada con registros originales y consentimiento.
- [ ] Ensayo con lector de pantalla cuando corresponda.
- [ ] Revisión personal fundamentada del PR de esta rama por otro integrante.
