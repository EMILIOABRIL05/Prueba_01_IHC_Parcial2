# IHC-A-02 · Quitar con teclado · ensayo previo

> **PREPARACIÓN, NO INCIDENCIA OFICIAL**. No abrir un Issue de incidente real ni registrar un commit posterior ficticio.

**Área:** CaféU.

## Evento anunciado en la hoja de incidencias
Tras Quitar con teclado desaparece el foco y no queda claro qué se eliminó.

## Cambio obligatorio descrito
Anunciar eliminación, recuperar foco y permitir Deshacer simulado.

## Requisito R7 propuesto (sin activar en trazabilidad oficial)
R7: eliminar con teclado produce anuncio semántico, foco recuperable y opción Deshacer.

**Criterio de aceptación de ensayo:** Usar Tab+Enter para Quitar, verificar aviso y foco; deshacer mediante Enter.

## Trazabilidad preparatoria
R7 (borrador) → [flujo propuesto](../flujos/IHC-A-02-R7.mmd) → vista de [simulador de ensayo](../index.html) → componente/estado «normal, eliminado, restaurado» → evidencia por obtener en navegador real.

## Guion antes/después
1. Tomar referencia del problema descrito y, si existe un prototipo v1 disponible, reproducirlo sin atribuirlo a un participante.
2. Abrir `incidencias/preparacion/index.html`, seleccionar IHC-A-02 y ejecutar: **Usar Tab+Enter para Quitar, verificar aviso y foco; deshacer mediante Enter.**
3. Registrar pantalla, estados, resultado, navegador y resolución con fecha real. No usar una ejecución de ensayo como prueba del incidente oficial.
4. Verificar manualmente accesibilidad y navegación con teclado cuando aplique.

## Defensa individual
**Pregunta:** Demuestre edición, eliminación y confirmación sin ratón.

**Respuesta de estudio:** La ruta de edición conserva el foco: Quitar → aviso y Deshacer → restauración/continuar. Confirmación debe funcionar con teclado.

## Actuación real durante la evaluación
- [ ] El docente ha anunciado oficialmente IHC-A-02 en fecha/hora real: ______________.
- [ ] Issue **nuevo y específico** posterior al anuncio: ______________.
- [ ] Actualización de requisito/flujo/wireframe oficiales posterior al anuncio: ______________.
- [ ] Código funcional adaptado al prototipo asignado: ______________.
- [ ] Prueba y capturas antes/después del momento de evaluación: ______________.
- [ ] Commit posterior con SHA: ______________.
- [ ] PR y revisión por un compañero real: ______________.
- [ ] Defensa personal realizada: ______________.
