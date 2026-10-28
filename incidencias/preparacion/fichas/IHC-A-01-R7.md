# IHC-A-01 · Precio cambia al editar · ensayo previo

> **PREPARACIÓN, NO INCIDENCIA OFICIAL**. No abrir un Issue de incidente real ni registrar un commit posterior ficticio.

**Área:** CaféU.

## Evento anunciado en la hoja de incidencias
Tras pasar de uno a dos cafés, se sigue mostrando USD 4,25 aunque el total cambió.

## Cambio obligatorio descrito
Recalcular subtotal/total, mostrar diferencia y exigir revisar antes de confirmar.

## Requisito R7 propuesto (sin activar en trazabilidad oficial)
R7: tras editar cantidad, actualizar subtotal y total y bloquear confirmación hasta revisión del desglose.

**Criterio de aceptación de ensayo:** Edición 1→2, total actualizado (ensayo USD 5,75), revisión antes de confirmar.

## Trazabilidad preparatoria
R7 (borrador) → [flujo propuesto](../flujos/IHC-A-01-R7.mmd) → vista de [simulador de ensayo](../index.html) → componente/estado «normal, diferencia pendiente, bloqueado, revisado, confirmado» → evidencia por obtener en navegador real.

**Supuesto de simulación:** el documento da un total anterior de USD 4,25 sin detallar todos los productos. El ensayo conserva ese total y aplica +USD 1,50 por un café adicional según el catálogo base: nuevo total de práctica USD 5,75. El cálculo oficial debe utilizar el carrito realmente asignado.

## Guion antes/después
1. Tomar referencia del problema descrito y, si existe un prototipo v1 disponible, reproducirlo sin atribuirlo a un participante.
2. Abrir `incidencias/preparacion/index.html`, seleccionar IHC-A-01 y ejecutar: **Edición 1→2, total actualizado (ensayo USD 8,50), revisión antes de confirmar.**
3. Registrar pantalla, estados, resultado, navegador y resolución con fecha real. No usar una ejecución de ensayo como prueba del incidente oficial.
4. Verificar manualmente accesibilidad y navegación con teclado cuando aplique.

## Defensa individual
**Pregunta:** ¿Qué parte de la rama de editar del user flow se modifica?

**Respuesta de estudio:** E1 deja de regresar directamente a confirmar y pasa por «Recalcular» → «Mostrar diferencia» → «Revisar desglose» → Confirmar.

## Actuación real durante la evaluación
- [ ] El docente ha anunciado oficialmente IHC-A-01 en fecha/hora real: ______________.
- [ ] Issue **nuevo y específico** posterior al anuncio: ______________.
- [ ] Actualización de requisito/flujo/wireframe oficiales posterior al anuncio: ______________.
- [ ] Código funcional adaptado al prototipo asignado: ______________.
- [ ] Prueba y capturas antes/después del momento de evaluación: ______________.
- [ ] Commit posterior con SHA: ______________.
- [ ] PR y revisión por un compañero real: ______________.
- [ ] Defensa personal realizada: ______________.
