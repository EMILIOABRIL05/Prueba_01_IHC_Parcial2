# IHC-A-10 · Stepper sin color · ensayo previo

> **PREPARACIÓN, NO INCIDENCIA OFICIAL**. No abrir un Issue de incidente real ni registrar un commit posterior ficticio.

**Área:** Dashboard UX.

## Evento anunciado en la hoja de incidencias
El docente quita el color de la etapa activa.

## Cambio obligatorio descrito
Identificar etapa con texto y atributo semántico, operar por teclado.

## Requisito R7 propuesto (sin activar en trazabilidad oficial)
R7: paso activo legible en escala de grises y marcado por aria-current="step".

**Criterio de aceptación de ensayo:** Activar gris y navegar; verificar «(actual)», aria-current y Tab/Enter.

## Trazabilidad preparatoria
R7 (borrador) → [flujo propuesto](../flujos/IHC-A-10-R7.mmd) → vista de [simulador de ensayo](../index.html) → componente/estado «normal, gris, actual» → evidencia por obtener en navegador real.

## Guion antes/después
1. Tomar referencia del problema descrito y, si existe un prototipo v1 disponible, reproducirlo sin atribuirlo a un participante.
2. Abrir `incidencias/preparacion/index.html`, seleccionar IHC-A-10 y ejecutar: **Activar gris y navegar; verificar «(actual)», aria-current y Tab/Enter.**
3. Registrar pantalla, estados, resultado, navegador y resolución con fecha real. No usar una ejecución de ensayo como prueba del incidente oficial.
4. Verificar manualmente accesibilidad y navegación con teclado cuando aplique.

## Defensa individual
**Pregunta:** Demuestre cómo se conoce la etapa sin color.

**Respuesta de estudio:** Leer el texto «(actual)» y revisar aria-current; comprobar anuncio con un lector de pantalla real.

## Actuación real durante la evaluación
- [ ] El docente ha anunciado oficialmente IHC-A-10 en fecha/hora real: ______________.
- [ ] Issue **nuevo y específico** posterior al anuncio: ______________.
- [ ] Actualización de requisito/flujo/wireframe oficiales posterior al anuncio: ______________.
- [ ] Código funcional adaptado al prototipo asignado: ______________.
- [ ] Prueba y capturas antes/después del momento de evaluación: ______________.
- [ ] Commit posterior con SHA: ______________.
- [ ] PR y revisión por un compañero real: ______________.
- [ ] Defensa personal realizada: ______________.
