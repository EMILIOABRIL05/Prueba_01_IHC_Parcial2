# Evidencias Visuales · IHC-A-12 (Dashboard UX - Retomar sesión)

**Responsable:** Jonathan Gamboa ([@Jonathan305g](https://github.com/Jonathan305g))  
**Rama asignada:** `jhonatan/pruebas`  
**Escenario:** Dashboard UX · Tarjeta IHC-A-12  
**Tarea Crítica:** Reanudar sesión interrumpida, completar checklist y cerrar sesión.  

---

## 1. Captura v1: Fallo Reproducible (Falso positivo en checklist)

En la versión **v1**, la persona usuaria puede presionar *"Cerrar sesión"* dejando el checklist obligatorio incompleto (0/3 verificaciones). El sistema declara incorrectamente un estado final de **"Sesión cerrada / Éxito"** sin verificar las restricciones obligatorias ni alertar al usuario.

![Captura v1 - Fallo en estado final](IHC-A-12-v1-fallo.png)

- **Problema detectado:** Vulneración grave del principio de *Prevención de Errores* de Nielsen.
- **Resultado en v1:** Éxito declarado falsamente con `Checklist: 0/3`.
- **Severidad:** Alta.

---

## 2. Captura v2: Solución Implementada (Validación obligatoria y persistencia)

En la versión **v2**, el sistema incorpora una compuerta lógica (Requisito R02) que intercepta el intento de cierre prematuro. Si el checklist obligatorio no está completado, se bloquea la transición, se anuncia la alerta mediante accesibilidad (`role="alert"`) y solo cuando se han completado las 3 verificaciones obligatorias (`Checklist: 3/3`), se permite el cierre exitoso preservando el código y los datos.

![Captura v2 - Solución con validación](IHC-A-12-v2-solucion.png)

- **Mejora técnica comprobable:** Estado final solo alcanzable con validación completa (`Checklist: 3/3`).
- **Persistencia garantizada:** Conservación de marcas y notas previas al reanudar o recargar.
- **Código asignado:** Formato anónimo de prueba (`Código: P-001`).

---

## 3. Trazabilidad y Enlaces
- **Issue de Fallo:** [#8 (Cierre exitoso sin validar checklist obligatorio)](https://github.com/EMILIOABRIL05/Prueba_01_IHC_Parcial2/issues/8)
- **Issue de Pruebas y Defensa:** [#5 (Prueba cognitiva, evidencias y defensa)](https://github.com/EMILIOABRIL05/Prueba_01_IHC_Parcial2/issues/5)
- **Acta de Prueba Cognitiva:** [../../pruebas/IHC-A-12-sesion.md](../../pruebas/IHC-A-12-sesion.md)
- **Revisión Fundamentada de Arquitectura:** [../../docs/revision_pr_emilio.md](../../docs/revision_pr_emilio.md)
