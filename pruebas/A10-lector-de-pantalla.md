# A10: verificación con lector de pantalla

**Estado: pendiente de ejecución con la tecnología real y una persona.** Chromium verificó estructura, foco y atributos; eso no demuestra qué anuncia un lector ni la experiencia del evaluador.

## Entorno a registrar

| Dato | Registro auténtico |
|---|---|
| Fecha, hora y zona | Pendiente |
| Participante anónimo y equipo externo | Pendiente |
| Observador | Pendiente |
| Sistema operativo y dispositivo | Pendiente |
| Lector, versión, idioma y configuración | Pendiente |
| Navegador, versión, zoom y ancho | Pendiente |
| Commit y versión del prototipo | Pendiente |
| Consentimiento y evidencia autorizada | Pendiente |

Usar la tecnología que la persona conozca. Activarla antes de comenzar y comprobar que el audio puede escucharse o registrarse con consentimiento. Seleccionar A10 en v1 y v2; no cambiar su configuración sin anotarlo.

## Recorrido y criterios

| Paso | Acción | Comportamiento esperado de v2 | Registro real |
|---|---|---|---|
| 1 | Llegar a Datos mediante teclado y lectura de encabezados. | Se identifica la pantalla y los campos tienen nombre reconocible. | Pendiente |
| 2 | Recorrer el Stepper. | Paso actual distinguible semánticamente y por texto; la frase hablada puede variar según lector. | Pendiente |
| 3 | Intentar avanzar sin título/código. | Se comunica qué falta y el foco se ubica en el campo que debe corregirse. | Pendiente |
| 4 | Completar título y P-001; avanzar a Checklist. | Se reconoce el cambio de pantalla y se localizan tres casillas etiquetadas. | Pendiente |
| 5 | Marcar con teclado y recorrer las demás casillas. | Cada nombre y estado es reconocible; no hay salto inesperado ni pérdida de foco. | Pendiente |
| 6 | Ir a Observaciones y volver con Anterior o Escape. | Se identifica el paso y se conservan las marcas. | Pendiente |
| 7 | Llegar a Cierre con una casilla incompleta e intentar finalizar. | Se informa del pendiente y el foco va a su casilla sin borrar datos. | Pendiente |
| 8 | Completar las tres casillas y finalizar. | Se distingue la verificación del cierre y se reconoce el resultado final. | Pendiente |
| 9 | Recorrer la tarea con Tab, Shift+Tab, Enter/Espacio y funciones habituales del lector. | No hay controles sin nombre, trampas de foco o acciones que requieran ratón. | Pendiente |

Registrar texto hablado exacto o transcripción autorizada, foco, resultado y problema reproducible. Si un aviso se repite excesivamente o no se anuncia, documentar lector/navegador y pasos. No exigir una frase idéntica entre lectores si la información y el estado se comunican de forma equivalente.

## Resultado y seguimiento

- Resultado v1/v2: pendiente.
- Barreras, severidad e impacto: pendiente.
- Issue, corrección y repetición: pendiente si se encuentra una barrera.
- Evidencias originales y acta: [IHC-A-10-sesion.md](IHC-A-10-sesion.md), por completar.

Una revisión asistida o el árbol de accesibilidad no se registra como ejecución de un lector. Este protocolo tampoco declara conformidad global WCAG.
