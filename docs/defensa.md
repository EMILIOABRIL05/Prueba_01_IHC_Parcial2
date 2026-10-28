# Preparación de defensa individual

Se requiere que cada miembro conozca ruta normal/error, justifique un requisito en código, muestre un cambio vinculado a Issue y realice modificación breve en vivo de validación, feedback o foco. La explicación solo debe citar contribuciones que la persona haya hecho efectivamente.

| Participante | Bloque para estudiar/validar | Prueba en vivo sugerida |
|---|---|---|
| Manuel Cusme | Diagnóstico emocional e Issues | Explicar dos momentos de verdad y severidad |
| Emilio Abril | Requisitos, arquitectura y sitemap | Seguir R01 hasta pantalla y código |
| William Martínez | Wireframes y componentes de interfaz | Ajustar 360 px y explicar jerarquía |
| Pablo Lozada | Estados, errores y accesibilidad | Cambiar validación y foco por teclado |
| Jhonatan Gamboa | Pruebas y comparativa | Demostrar problema v1, corrección v2 y medición real |

**Esta tabla solo reparte temas para preparar y no certifica trabajo realizado.** Cada integrante debe demostrar conocimiento e intervención sustantiva propia en la evaluación.

## Preguntas tipo
- ¿Qué cambia entre v1 y v2, y dónde está en `assets/app.js` y `assets/styles.css`?
- ¿Cómo comprobar que un mensaje es visible y anunciado por tecnologías de asistencia?
- ¿Qué datos son estimados y cuáles fueron observados realmente?
- ¿Cómo documentar la trazabilidad después de una incidencia nueva?
- ¿Por qué un clic no equivale a una confirmación recibida?
- ¿En qué commit e Issue quedó la corrección? (Responder solo con enlaces reales.)

## Guía de defensa individual · Jhonatan Gamboa (Tarjeta IHC-A-12)

### 1. Escenario asignado y contexto del usuario
- **Tarjeta:** IHC-A-12 · Dashboard UX · Retomar sesión interrumpida.
- **Persona usuaria:** Investigadora de usabilidad que retoma una evaluación previamente interrumpida.
- **Tarea crítica:** Reanudar el flujo, completar el checklist de verificación y cerrar la sesión con informe válido.
- **Restricción obligatoria:** No perder los pasos previamente finalizados al retomar o recargar.

### 2. Hallazgo y Reproducción (Issue #8)
- **Problema en v1:** El Dashboard permite pulsar "Cerrar sesión" y emite un estado final de "Éxito / Finalizado" a pesar de tener casillas de checklist obligatorio sin marcar (falso positivo).
- **Severidad:** Alta (vulnera el principio de prevención de errores y emite un reporte fraudulento/incompleto).
- **Reproducción v1:**
  1. Ingresar al escenario A12 en `prototipo/v1/`.
  2. Marcar solo los pasos 1 y 2, dejando el checklist obligatorio de verificación incompleto.
  3. Pulsar "Cerrar sesión / Finalizar".
  4. Resultado en v1: El sistema muestra pantalla de éxito sin comprobar las tareas obligatorias.

### 3. Corrección e Implementación en v2 (Requisito R02)
- **Comportamiento en v2:**
  1. Al pulsar finalizar, el sistema ejecuta la validación de la lista obligatoria (rama X1).
  2. Si falta algún ítem obligatorio, se bloquea la transición a éxito.
  3. Se muestra un banner accesible (`role="alert"`, `aria-live="assertive"`) destacando los ítems faltantes.
  4. Se traslada el foco del teclado al primer ítem no completado.
  5. Se preserva el progreso previo en `localStorage` / memoria para no forzar a la investigadora a reiniciar desde cero.

### 4. Preguntas tipo para la evaluación docente y respuestas preparadas
- **¿Qué cambia entre v1 y v2 para tu tarjeta?**
  > En v1 existía una transición directa al estado de finalización sin compuerta lógica. En v2 se incorporó la función de verificación de checklist obligatorio, resumen previo interactivo y preservación de marcas entre sesiones.
- **¿Qué datos son estimados y cuáles son observados?**
  > La curva emocional de la Fase 1 y los touchpoints iniciales son *estimaciones a priori* basadas en análisis heurístico. Las mediciones en `pruebas/sesion.md` provienen de la *observación real* de un participante de otro equipo completando la tarea sin asistencia. Las capturas en `evidencias/capturas-tecnicas/` son *técnicas automatizadas*, distinguidas explícitamente de las humanas.
- **¿Cómo respondes a la Incidencia Sorpresa? (Tarjeta A12: Añadir revisión previa y resumen comprobable; evitar éxito falso):**
  > Se intercepta el evento antes del cierre definitivo; se despliega una tarjeta de resumen tipo *review modal / card checklist* que enumera los requisitos verificados y los faltantes con checkbox de confirmación explícita, impidiendo cerrar si el conteo obligatorio no es 100%. Se actualiza la matriz de trazabilidad y el flujo Mermaid en la rama E1/X1.
- **¿Cuál es tu PR ajeno revisado?**
  > Revisé y aprobé fundamentadamente el [PR #9](https://github.com/EMILIOABRIL05/Prueba_01_IHC_Parcial2/pull/9) de Emilio Abril sobre la arquitectura y trazabilidad de las 12 tarjetas, validando específicamente el flujo F1/X1 y el requisito R02 en `docs/tarjetas/IHC-A-12.md`.

