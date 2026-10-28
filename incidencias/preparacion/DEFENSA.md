# Preguntas de defensa · respuestas de estudio (no actas de evaluación)

## IHC-A-01 · Precio cambia al editar

**Pregunta:** ¿Qué parte de la rama de editar del user flow se modifica?

**Respuesta de práctica:** E1 deja de regresar directamente a confirmar y pasa por «Recalcular» → «Mostrar diferencia» → «Revisar desglose» → Confirmar.

## IHC-A-02 · Quitar con teclado

**Pregunta:** Demuestre edición, eliminación y confirmación sin ratón.

**Respuesta de práctica:** La ruta de edición conserva el foco: Quitar → aviso y Deshacer → restauración/continuar. Confirmación debe funcionar con teclado.

## IHC-A-03 · Estado de pedido pendiente

**Pregunta:** ¿Cómo evita confundir clic efectuado con pedido confirmado?

**Respuesta de práctica:** Separar «solicitud emitida», «pendiente», «confirmado» y «no confirmado»; solo un acuse positivo declara éxito.

## IHC-A-04 · Alergia añadida

**Pregunta:** ¿Cómo prueba que el usuario comprende y puede corregir su elección?

**Respuesta de práctica:** Solicitar a un participante real que explique el aviso y edite el producto, registrar observaciones sin atribuirlas al ensayo.

## IHC-A-05 · Presupuesto agotado

**Pregunta:** ¿Qué touchpoint pasa a momento de verdad y por qué?

**Respuesta de práctica:** La revisión del desglose antes de confirmar, porque allí se toma la decisión con el nuevo precio.

## IHC-A-06 · Falla de conexión

**Pregunta:** ¿Cómo diferencia visual y semánticamente los tres estados?

**Respuesta de práctica:** Usar textos/roles comprensibles y diferenciados: pendiente, no confirmado y confirmado; no solo color.

## IHC-A-07 · Paso obligatorio añadido

**Pregunta:** ¿Cómo aplica visibilidad del estado del sistema de Nielsen?

**Respuesta de práctica:** Mostrar etapa actual, verificaciones pendientes y motivo concreto del bloqueo.

## IHC-A-08 · Guardado inconsistente

**Pregunta:** ¿Qué evidencia muestra mejora real y no inferida?

**Respuesta de práctica:** Captura y registro de una ejecución observada con marcas conservadas; una hipótesis no basta.

## IHC-A-09 · Dato personal inesperado

**Pregunta:** ¿Qué requisito protege privacidad y dónde aparece en trazabilidad?

**Respuesta de práctica:** R7 enlaza Datos → Validación → Resumen y el campo «Código»; las métricas se mantienen.

## IHC-A-10 · Stepper sin color

**Pregunta:** Demuestre cómo se conoce la etapa sin color.

**Respuesta de práctica:** Leer el texto «(actual)» y revisar aria-current; comprobar anuncio con un lector de pantalla real.

## IHC-A-11 · Vista estrecha 320 px

**Pregunta:** ¿Qué ley Gestalt aplica y qué carga cognitiva reduce?

**Respuesta de práctica:** Proximidad y jerarquía: acciones agrupadas y orden estable reducen búsqueda visual y memoria de trabajo.

## IHC-A-12 · Finalización prematura

**Pregunta:** ¿Cómo representa momento de verdad y comprueba estado final?

**Respuesta de práctica:** La decisión de cerrar es el momento crítico; solo mostrar éxito tras comprobar 3/3 obligatorios.

