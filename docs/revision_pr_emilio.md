# Revisión fundamentada de Pull Request ajeno (PR #9)

- **Revisor (cuenta propia):** Jonathan Gamboa ([@Jonathan305g](https://github.com/Jonathan305g))
- **PR ajeno revisado:** [PR #9 · [IHC] Arquitectura y trazabilidad de las 12 tarjetas (Emilio Abril)](https://github.com/EMILIOABRIL05/Prueba_01_IHC_Parcial2/pull/9)
- **Tarjeta e Issue vinculados:** Tarjeta **IHC-A-12** (Dashboard UX - Retomar sesión) | Issue #2 (Arquitectura) y vinculado al Hallazgo Issue #8 / Issue #5
- **Archivos y líneas examinados:**
  - `docs/tarjetas/IHC-A-12.md`: Definición de persona (investigadora), tarea (reanudar, completar lista y cerrar), fallo específico (declara fin sin checklist), 6 requisitos verificables (R01-R06) y matriz de trazabilidad completa.
  - `diagramas/IHC-A-12-flujo.mmd`: Ramas F1 (flujo principal de checklist a cierre), E1 (edición/retorno a paso previo), y X1 (validación de error cuando faltan obligatorios).
  - `diagramas/IHC-A-12-sitemap.mmd`: Estructura jerárquica de pantallas de Dashboard UX para retomar sesión.
  - `wireframes/IHC-A-12-inicio.svg`, `IHC-A-12-accion.svg`, `IHC-A-12-error.svg`, `IHC-A-12-confirmacion.svg`: Los cuatro wireframes Lo-Fi requeridos.
- **Comportamiento probado (pasos + resultado):**
  1. Se contrastó el requisito R02 (*"No se muestra éxito con checklist obligatorio incompleto"*) con la matriz de trazabilidad y el diagrama de flujo `IHC-A-12-flujo.mmd`.
  2. En el flujo, se validó la existencia de la bifurcación condicional X1 (*Validación de checklist obligatorio*), que intercepta el intento de cierre prematuro y redirige a la pantalla de corrección con advertencia accesible.
  3. En la matriz de trazabilidad, se verificó el mapeo unívoco: Requisito R02 -> Flujo F1/X1 -> Pantalla Revisión -> Componente "recuperación y verificación previa" -> Wireframe `IHC-A-12-accion.svg` y `IHC-A-12-error.svg`.
- **Observación técnica específica sobre navegación, foco, estados o trazabilidad:**
  - La arquitectura modela adecuadamente los cuatro estados fundamentales (normal, editando, error de validación y confirmación).
  - Como observación para el prototipo v2 (Pablo Lozada / Issue #4 y #8): asegurar que al recargar o volver tras el error de validación en la rama E1, la sesión retome el estado persistido en `localStorage` o memoria sin desmarcar los ítems ya completados por la investigadora (respetando la restricción obligatoria de la tarjeta: *no perder los pasos previamente finalizados*).
- **Cambio solicitado / aprobación fundamentada:**
  - **APROBADO CON RECOMENDACIÓN TÉCNICA.** La trazabilidad y los diagramas cumplen con los criterios de aceptación y permiten sustentar la defensa del requisito R02.
- **Fecha y autor:** 2026-10-28 · Jonathan Gamboa (@Jonathan305g).
