# IHC-A-05 · Presupuesto agotado · ensayo previo

> **PREPARACIÓN, NO INCIDENCIA OFICIAL**. No abrir un Issue de incidente real ni registrar un commit posterior ficticio.

**Área:** CaféU.

## Evento anunciado en la hoja de incidencias
Un producto aumenta USD 0,50 antes de confirmar.

## Cambio obligatorio descrito
Actualizar total, explicar incremento y permitir editar cantidad o cancelar.

## Requisito R7 propuesto (sin activar en trazabilidad oficial)
R7: un cambio de precio de USD 0,50 solicita revisión y ofrece editar/cancelar.

**Criterio de aceptación de ensayo:** Aumentar precio 2,25→2,75, revisar el nuevo total y cancelar o modificar.

## Trazabilidad preparatoria
R7 (borrador) → [flujo propuesto](../flujos/IHC-A-05-R7.mmd) → vista de [simulador de ensayo](../index.html) → componente/estado «normal, revisar, bloqueado, revisado, cancelado» → evidencia por obtener en navegador real.

## Guion antes/después
1. Tomar referencia del problema descrito y, si existe un prototipo v1 disponible, reproducirlo sin atribuirlo a un participante.
2. Abrir `incidencias/preparacion/index.html`, seleccionar IHC-A-05 y ejecutar: **Aumentar precio 2,25→2,75, revisar el nuevo total y cancelar o modificar.**
3. Registrar pantalla, estados, resultado, navegador y resolución con fecha real. No usar una ejecución de ensayo como prueba del incidente oficial.
4. Verificar manualmente accesibilidad y navegación con teclado cuando aplique.

## Defensa individual
**Pregunta:** ¿Qué touchpoint pasa a momento de verdad y por qué?

**Respuesta de estudio:** La revisión del desglose antes de confirmar, porque allí se toma la decisión con el nuevo precio.

## Actuación real durante la evaluación
- [ ] El docente ha anunciado oficialmente IHC-A-05 en fecha/hora real: ______________.
- [ ] Issue **nuevo y específico** posterior al anuncio: ______________.
- [ ] Actualización de requisito/flujo/wireframe oficiales posterior al anuncio: ______________.
- [ ] Código funcional adaptado al prototipo asignado: ______________.
- [ ] Prueba y capturas antes/después del momento de evaluación: ______________.
- [ ] Commit posterior con SHA: ______________.
- [ ] PR y revisión por un compañero real: ______________.
- [ ] Defensa personal realizada: ______________.
