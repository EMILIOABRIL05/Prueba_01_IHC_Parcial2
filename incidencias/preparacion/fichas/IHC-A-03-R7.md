# IHC-A-03 · Estado de pedido pendiente · ensayo previo

> **PREPARACIÓN, NO INCIDENCIA OFICIAL**. No abrir un Issue de incidente real ni registrar un commit posterior ficticio.

**Área:** CaféU.

## Evento anunciado en la hoja de incidencias
La aplicación demora 8 segundos tras pulsar Confirmar y se vuelve a pulsar.

## Cambio obligatorio descrito
Deshabilitar repetición, mostrar pendiente, resolver confirmado/no confirmado sin duplicar.

## Requisito R7 propuesto (sin activar en trazabilidad oficial)
R7: una intención de confirmación mantiene una sola solicitud; pendiente no implica confirmación.

**Criterio de aceptación de ensayo:** Confirmar dos veces; 1 solicitud lógica; esperar 8 segundos; resolver sin éxito prematuro.

## Trazabilidad preparatoria
R7 (borrador) → [flujo propuesto](../flujos/IHC-A-03-R7.mmd) → vista de [simulador de ensayo](../index.html) → componente/estado «sin enviar, pendiente, no confirmado, confirmado» → evidencia por obtener en navegador real.

## Guion antes/después
1. Tomar referencia del problema descrito y, si existe un prototipo v1 disponible, reproducirlo sin atribuirlo a un participante.
2. Abrir `incidencias/preparacion/index.html`, seleccionar IHC-A-03 y ejecutar: **Confirmar dos veces; 1 solicitud lógica; esperar 8 segundos; resolver sin éxito prematuro.**
3. Registrar pantalla, estados, resultado, navegador y resolución con fecha real. No usar una ejecución de ensayo como prueba del incidente oficial.
4. Verificar manualmente accesibilidad y navegación con teclado cuando aplique.

## Defensa individual
**Pregunta:** ¿Cómo evita confundir clic efectuado con pedido confirmado?

**Respuesta de estudio:** Separar «solicitud emitida», «pendiente», «confirmado» y «no confirmado»; solo un acuse positivo declara éxito.

## Actuación real durante la evaluación
- [ ] El docente ha anunciado oficialmente IHC-A-03 en fecha/hora real: ______________.
- [ ] Issue **nuevo y específico** posterior al anuncio: ______________.
- [ ] Actualización de requisito/flujo/wireframe oficiales posterior al anuncio: ______________.
- [ ] Código funcional adaptado al prototipo asignado: ______________.
- [ ] Prueba y capturas antes/después del momento de evaluación: ______________.
- [ ] Commit posterior con SHA: ______________.
- [ ] PR y revisión por un compañero real: ______________.
- [ ] Defensa personal realizada: ______________.
