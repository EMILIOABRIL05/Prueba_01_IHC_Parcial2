# IHC-A-12 · Finalización prematura · ensayo previo

> **PREPARACIÓN, NO INCIDENCIA OFICIAL**. No abrir un Issue de incidente real ni registrar un commit posterior ficticio.

**Área:** Dashboard UX.

## Evento anunciado en la hoja de incidencias
Una sesión aparece finalizada aunque queda un ítem obligatorio sin completar.

## Cambio obligatorio descrito
Impedir éxito falso, explicar pendiente y conservar progreso.

## Requisito R7 propuesto (sin activar en trazabilidad oficial)
R7: validar todos los obligatorios antes de finalizar y devolver control al primer pendiente.

**Criterio de aceptación de ensayo:** Intentar cerrar 2/3, recibir aviso y conservar marcas; completar 3/3 y cerrar.

## Trazabilidad preparatoria
R7 (borrador) → [flujo propuesto](../flujos/IHC-A-12-R7.mmd) → vista de [simulador de ensayo](../index.html) → componente/estado «revisión, bloqueado, completo, confirmado» → evidencia por obtener en navegador real.

## Guion antes/después
1. Tomar referencia del problema descrito y, si existe un prototipo v1 disponible, reproducirlo sin atribuirlo a un participante.
2. Abrir `incidencias/preparacion/index.html`, seleccionar IHC-A-12 y ejecutar: **Intentar cerrar 2/3, recibir aviso y conservar marcas; completar 3/3 y cerrar.**
3. Registrar pantalla, estados, resultado, navegador y resolución con fecha real. No usar una ejecución de ensayo como prueba del incidente oficial.
4. Verificar manualmente accesibilidad y navegación con teclado cuando aplique.

## Defensa individual
**Pregunta:** ¿Cómo representa momento de verdad y comprueba estado final?

**Respuesta de estudio:** La decisión de cerrar es el momento crítico; solo mostrar éxito tras comprobar 3/3 obligatorios.

## Actuación real durante la evaluación
- [ ] El docente ha anunciado oficialmente IHC-A-12 en fecha/hora real: ______________.
- [ ] Issue **nuevo y específico** posterior al anuncio: ______________.
- [ ] Actualización de requisito/flujo/wireframe oficiales posterior al anuncio: ______________.
- [ ] Código funcional adaptado al prototipo asignado: ______________.
- [ ] Prueba y capturas antes/después del momento de evaluación: ______________.
- [ ] Commit posterior con SHA: ______________.
- [ ] PR y revisión por un compañero real: ______________.
- [ ] Defensa personal realizada: ______________.
