# Informe Técnico de Resolución de Hallazgo · IHC-A-01

**Issue:** [Issue #6 · [Hallazgo][A01][Alta] Total no se actualiza al cambiar cantidades](https://github.com/EMILIOABRIL05/Prueba_01_IHC_Parcial2/issues/6)  
**Responsables:** Pablo Lozada ([@idk-Damian](https://github.com/idk-Damian)) · Apoyo de Manuel Cusme ([@ManuelCusme](https://github.com/ManuelCusme))  
**Rama:** `pablo/prototipo-v2`  
**Commit:** [`2c4daa7`](https://github.com/EMILIOABRIL05/Prueba_01_IHC_Parcial2/commit/2c4daa7)  
**Pull Request:** [#12](https://github.com/EMILIOABRIL05/Prueba_01_IHC_Parcial2/pull/12)

---

## 1. Descripción del Fallo (v1)
- **Tarjeta:** IHC-A-01 · CaféU · Recálculo de cantidades y total
- **Heurística afectada:** Nielsen #1 (Visibilidad del estado del sistema) y Nielsen #5 (Prevención de errores).
- **Comportamiento defectuoso en v1:** Al agregar productos al carrito e incrementar/reducir unidades (por ejemplo, aumentando la cantidad de café de 1 a 2 unidades mediante el control `[data-action="qty"]`), el precio total renderizado en el elemento `#total` permanece inmutable en el valor inicial en caché (`$1.50` o `$4.25`), provocando que la persona usuaria confirme la compra visualizando un importe falso.
- **Severidad:** **Alta** (riesgo de discrepancia financiera entre lo anunciado en la interfaz y el cobro real en caja).

---

## 2. Reproducción Paso a Paso
1. Abrir `prototipo/v1/index.html` en el navegador con viewport de 360 px.
2. Seleccionar la tarjeta **IHC-A-01** en el selector superior.
3. Ir al catálogo mediante **Menú de hoy**, agregar 1 Café americano ($1.50) y 1 Sánduche ($2.75).
4. Ir a **Mi pedido**; el total inicial mostrado es `$4.25`.
5. Presionar el botón `+` para incrementar el Café a 2 unidades.
6. **Resultado observado en v1:** La cantidad del producto sube a 2, pero el elemento `#total` sigue mostrando `$4.25` (debiendo ser `$5.75`).

---

## 3. Corrección e Implementación en v2 (Requisito R02)
- **Solución implementada:** Se vinculó el cálculo dinámico reactivo en la función `renderCafeU()` y en los oyentes de acción `qty`. Cada pulsación recalcula la sumatoria de `precio * cantidad` de todos los ítems mediante `calculateCartTotal()` y actualiza inmediatamente el nodo de texto `#total`:
```javascript
// assets/app.js (v2)
var cartItem = state.cart.find(function (c) { return c.id === item; });
if (cartItem) {
  cartItem.qty += delta;
  if (cartItem.qty <= 0) {
    state.cart = state.cart.filter(function (c) { return c.id !== item; });
  }
}
// En v2 render() actualiza inmediatamente displayedTotal = formatMoney(calculateCartTotal())
```
- **Resultado en v2:** Al presionar `+`, el subtotal y el total `#total` se actualizan instantáneamente sin recargar la página.
- **Prevención de sobrecosto (R06):** Si al aumentar cantidades el total supera el límite de USD 4,25 establecido en el escenario complementario A05, el sistema emite una alerta accesible (`.status.error` / `role="alert"`) e impide confirmar con sobrecosto.

---

## 4. Evidencias Comparativas
- **Captura técnica v1 (Fallo reproducible):**  
  `evidencias/capturas-tecnicas/IHC-A-01-v1.png`
- **Captura técnica v2 (Total recalculado a $3.00 / $5.75):**  
  `evidencias/capturas-tecnicas/IHC-A-01-v2.png`

---

## 5. Trazabilidad de Requisitos
- **Requisito trazado:** R02 en `docs/tarjetas/IHC-A-01.md`: *"Modificar la cantidad actualiza subtotal y total sin recargar"*.
- **Criterio de aceptación:** Conforme (verificado tanto en prueba automatizada `tests/comprobar_prototipo_v2.py` como en interacción manual por teclado y ratón).
- **Distinción metodológica:** Esta mejora técnica queda comprobada formalmente a nivel de código y diseño responsivo. Su impacto psicométrico y tiempo de tarea será consolidado en las pruebas con participantes humanos (Fase 5).
