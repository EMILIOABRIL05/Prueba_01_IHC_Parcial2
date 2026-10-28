# IHC-A-06 · Falla de conexión · ensayo previo

> **PREPARACIÓN, NO INCIDENCIA OFICIAL**. No abrir un Issue de incidente real ni registrar un commit posterior ficticio.

**Área:** CaféU.

## Evento anunciado en la hoja de incidencias
La conexión se corta al confirmar; no se conoce el resultado del servidor.

## Cambio obligatorio descrito
Mostrar «no confirmado», conservar los datos y reintentar con identidad lógica estable.

## Requisito R7 propuesto (sin activar en trazabilidad oficial)
R7: error de conexión no es éxito; reintento reutiliza identificador de intención para evitar duplicados.

**Criterio de aceptación de ensayo:** Enviar→pendiente→desconexión→no confirmado→reintento con misma referencia.

## Trazabilidad preparatoria
R7 (borrador) → [flujo propuesto](../flujos/IHC-A-06-R7.mmd) → vista de [simulador de ensayo](../index.html) → componente/estado «sin enviar, pendiente, no confirmado, confirmado» → evidencia por obtener en navegador real.

## Guion antes/después
1. Tomar referencia del problema descrito y, si existe un prototipo v1 disponible, reproducirlo sin atribuirlo a un participante.
2. Abrir `incidencias/preparacion/index.html`, seleccionar IHC-A-06 y ejecutar: **Enviar→pendiente→desconexión→no confirmado→reintento con misma referencia.**
3. Registrar pantalla, estados, resultado, navegador y resolución con fecha real. No usar una ejecución de ensayo como prueba del incidente oficial.
4. Verificar manualmente accesibilidad y navegación con teclado cuando aplique.

## Defensa individual
**Pregunta:** ¿Cómo diferencia visual y semánticamente los tres estados?

**Respuesta de estudio:** Usar textos/roles comprensibles y diferenciados: pendiente, no confirmado y confirmado; no solo color.

## Actuación real durante la evaluación
- [ ] El docente ha anunciado oficialmente IHC-A-06 en fecha/hora real: ______________.
- [ ] Issue **nuevo y específico** posterior al anuncio: ______________.
- [ ] Actualización de requisito/flujo/wireframe oficiales posterior al anuncio: ______________.
- [ ] Código funcional adaptado al prototipo asignado: ______________.
- [ ] Prueba y capturas antes/después del momento de evaluación: ______________.
- [ ] Commit posterior con SHA: ______________.
- [ ] PR y revisión por un compañero real: ______________.
- [ ] Defensa personal realizada: ______________.
