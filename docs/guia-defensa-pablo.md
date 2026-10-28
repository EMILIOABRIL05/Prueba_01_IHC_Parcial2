# Guía de Defensa Individual · Pablo Lozada (Fase 4: Prototipo v2)

**Estudiante:** Pablo Lozada ([@idk-Damian](https://github.com/idk-Damian))  
**Rol asignado:** Fase 4 · Prototipo v2, correcciones, accesibilidad y comparación antes/después  
**Rama de trabajo:** `pablo/prototipo-v2`  
**Issues vinculados:** [#4](https://github.com/EMILIOABRIL05/Prueba_01_IHC_Parcial2/issues/4), [#6](https://github.com/EMILIOABRIL05/Prueba_01_IHC_Parcial2/issues/6), [#7](https://github.com/EMILIOABRIL05/Prueba_01_IHC_Parcial2/issues/7), [#8](https://github.com/EMILIOABRIL05/Prueba_01_IHC_Parcial2/issues/8)

---

## 1. Estrategia General de Defensa
Durante la evaluación presencial, el docente sorteará una de las 12 tarjetas preparadas (A01 a A12) o planteará una incidencia sorpresa sobre el prototipo v2. Para defender exitosamente la parte de desarrollo y refinamiento interactivo:

1. **Identificar la tarjeta sorteada** en el selector `#card-select` de `prototipo/v2/index.html`.
2. **Explicar el defecto de partida (v1):** mostrar en `prototipo/v1/` cómo fallaba la interacción (ej: total desactualizado, botón sin accesibilidad, doble envío, salto de stepper o falso éxito).
3. **Demostrar la solución en el prototipo refinado (v2):** recorrer la interfaz en vivo, accionando los controles con teclado y ratón.
4. **Señalar el código exacto:** abrir `assets/app.js` y `assets/styles.css` en las líneas donde reside la lógica de validación, el foco y los estados ARIA.
5. **Realizar modificaciones en vivo:** si el docente solicita cambiar un texto, un umbral de validación o un estilo de foco, aplicar el cambio inmediatamente y recargar.

---

## 2. Respuestas a Preguntas Tipo del Docente

### P1: ¿Qué diferencias estructurales y de código existen entre v1 y v2?
> **Respuesta:** "El prototipo v1 reproduce los defectos de diseño originales descritos en las tarjetas docentes para demostrar su impacto negativo en la interacción (heurísticas de Nielsen quebrantadas). En v2, mediante `assets/app.js` y `assets/styles.css`, implementamos compuertas lógicas de validación reactiva, feedback en tiempo real, diálogos modales accesibles para confirmación de acciones destructivas, navegación secuencial obligatoria en el Stepper, persistencia de datos en `localStorage` y total cumplimiento de pautas WCAG 2.1 AA (foco visible con 3px de contorno, operabilidad 100% por teclado y etiquetas `aria-current` y `aria-label`)."

### P2: ¿Cómo se resolvió el hallazgo de referencia de tu Issue #4 (Doble pulsación en IHC-A-06)?
> **Respuesta:** "En v1, al no haber retroalimentación de bloqueo, dos pulsaciones rápidas envían dos transacciones paralelas (`confirmedCount = 2`). En v2, al presionar 'Confirmar pedido', el botón se deshabilita de inmediato (`disabled`) con la leyenda 'Procesando pedido...'. Si la red es inestable (simulado con el flag `#offline`), el sistema transiciona a un estado de error claro ('No se pudo confirmar') y ofrece un botón de reintento único (`retry`), asegurando que solo se emita una única confirmación unívoca (`confirmedCount = 1`)."

### P3: ¿Cómo garantiza el prototipo v2 la accesibilidad para usuarios con teclado (IHC-A-02)?
> **Respuesta:** "Sustituimos el botón ambiguo `×` por el texto semántico 'Quitar' con `aria-label`. Al presionar `Enter`, se despliega un cuadro modal con rol `dialog` y foco automático en el botón de confirmación (`#remove-ok`). Si el usuario decide no borrar el producto, presionar la tecla `Escape` cierra el diálogo sin alterar la orden y devuelve el foco exactamente al botón que abrió el modal, sin extraviar la navegación por teclado."

### P4: ¿Qué datos son estimados y cuáles son observados?
> **Respuesta:** "En nuestro proyecto, las curvas emocionales y touchpoints de la Fase 1 son *estimaciones analíticas iniciales*. Las capturas técnicas en `evidencias/capturas-tecnicas/` son *comprobaciones automatizadas de interfaz*. La única evidencia considerada *observación humana real* es la recogida en la Fase 5 por Jhonatan Gamboa al evaluar la tarea con un compañero de otro equipo."

---

## 3. Guía de Modificación en Vivo (Instrucciones Rápidas)

Si el docente pide modificar un comportamiento durante la defensa:

### Modificación A: Cambiar el límite de presupuesto (IHC-A-05)
- **Ubicación:** `assets/app.js` → función `handleConfirm()` y `renderCafeU()`.
- **Acción:** Cambiar `4.25` por el nuevo valor solicitado (ej: `5.00`).
```javascript
// Antes:
if (isV2 && total > 4.25) { ... }
// Modificación:
if (isV2 && total > 5.00) { ... }
```

### Modificación B: Cambiar el estilo o color del foco accesible (IHC-A-02 / transversal)
- **Ubicación:** `assets/styles.css` → regla `body[data-version="v2"] *:focus-visible`.
- **Acción:** Cambiar el grosor o color del outline:
```css
/* Modificar outline a color solicitado (ej: naranja #ea580c de 4px): */
body[data-version="v2"] button:focus-visible,
body[data-version="v2"] input:focus-visible {
  outline: 4px solid #ea580c;
  outline-offset: 3px;
}
```

### Modificación C: Ajustar el patrón de validación de código anónimo (IHC-A-09)
- **Ubicación:** `assets/app.js` → función `handleDashboardNext()`.
- **Acción:** Ajustar la expresión regular o regla de validación de texto.

### Modificación D: Añadir un nuevo ítem obligatorio al checklist (IHC-A-12)
- **Ubicación:** `assets/app.js` → array `items` en `state.dashboardStep === 1`.
- **Acción:** Añadir la cadena de texto y un elemento adicional al array `checklist` (`[false, false, false, false]`).
