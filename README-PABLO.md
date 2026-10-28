# Entrega de Fase 4 · Pablo Lozada

**Responsable:** Pablo Lozada ([@idk-Damian](https://github.com/idk-Damian))  
**Rama asignada:** `pablo/prototipo-v2`  
**Issues vinculados:**
- [Issue #4 · [Fase 4][Pablo Lozada] Corrección v2, accesibilidad y antes/después](https://github.com/EMILIOABRIL05/Prueba_01_IHC_Parcial2/issues/4)
- [Issue #6 · [Hallazgo][A01][Alta] Total no se actualiza al cambiar cantidades](https://github.com/EMILIOABRIL05/Prueba_01_IHC_Parcial2/issues/6)
- [Issue #7 · [Hallazgo][A02][Alta] Quitar carece de nombre accesible y confirmación](https://github.com/EMILIOABRIL05/Prueba_01_IHC_Parcial2/issues/7)
- [Issue #8 · [Hallazgo][A12][Alta] Cierre exitoso sin validar checklist obligatorio](https://github.com/EMILIOABRIL05/Prueba_01_IHC_Parcial2/issues/8)

---

## 1. Alcance y Responsabilidades
Como responsable de la **Fase 4 (Prototipo v2, correcciones, accesibilidad y antes/después)**, se han implementado y verificado las siguientes contribuciones:

1. **Prototipos Interactivos v1 y v2:**
   - `prototipo/v1/index.html`: Prototipo interactivo base que reproduce los fallos heurísticos y barreras de accesibilidad de partida para las 12 tarjetas (A01 a A12).
   - `prototipo/v2/index.html`: Prototipo interactivo refinado que implementa las correcciones de diseño, estados de carga, feedback inmediato y cumplimiento de WCAG 2.1 AA.
   - `assets/scenarios.js`: Catálogo de datos y especificación de restricciones para los 12 escenarios.
   - `assets/styles.css`: Hojas de estilo con diseño responsive a 360 px para v2, contraste adecuado y foco visible estandarizado (`outline: 3px solid #2563eb`).
   - `assets/app.js`: Motor reactivo que gestiona estados, diálogos modales, validaciones de teclado y persistencia en `localStorage`.

2. **Resolución de Hallazgos Críticos:**
   - **IHC-A-01 (Issue #6):** Recálculo dinámico e inmediato de subtotal y total al variar cantidades sin recarga. Documentado en `evidencias/IHC-A-01/informe-hallazgo-a01.md`.
   - **IHC-A-02 (Issue #7):** Botón `Quitar` con nombre accesible, diálogo modal con `role="dialog"`, foco en confirmación y cancelación con `Escape`.
   - **IHC-A-06 (Hallazgo de referencia):** Inhabilitación inmediata del botón al confirmar, estados procesando / error de red y registro unívoco de confirmación.
   - **IHC-A-12 (Issue #8):** Validación de checklist obligatorio y persistencia de marcas en `localStorage`.

3. **Matriz de Decisiones de Diseño y Accesibilidad (`docs/decisiones.md`):**
   - Documentación exhaustiva para los 12 escenarios siguiendo la estructura requerida:
     **problema | decisión | fragmento antes | fragmento después | prueba**.
   - Distinción metodológica clara entre mejoras técnicas verificables y mejoras observadas con usuarios reales.

4. **Evidencias Comparativas:**
   - 24 capturas técnicas en `evidencias/capturas-tecnicas/` (versiones v1 y v2 para IHC-A-01 a IHC-A-12).

5. **Revisión Cruzada de PR ajeno:**
   - Evaluación técnica fundamentada del [PR #9](https://github.com/EMILIOABRIL05/Prueba_01_IHC_Parcial2/pull/9) de Emilio Abril en `docs/revision-pr-emilio.md` y publicada en el hilo del PR.

6. **Preparación de Defensa Individual:**
   - Guía estratégica y respuestas para la defensa en `docs/guia-defensa-pablo.md`, con instrucciones de modificación en vivo de código.

---

## 2. Mapa de Archivos Aportados en esta Rama
```text
├── README-PABLO.md                     # Documento central de la entrega de Pablo Lozada
├── assets/
│   ├── app.js                          # Lógica reactiva v1 vs v2
│   ├── scenarios.js                    # Modelos de datos para las 12 tarjetas
│   └── styles.css                      # Estilos responsivos y accesibilidad WCAG 2.1 AA
├── prototipo/
│   ├── v1/index.html                   # Prototipo ejecutable v1 (reproducción de fallos)
│   └── v2/index.html                   # Prototipo ejecutable v2 (correcciones integradas)
├── docs/
│   ├── decisiones.md                   # Matriz problema / decisión / antes / después / prueba
│   ├── guia-defensa-pablo.md           # Guía de defensa oral y cambios en vivo
│   └── revision-pr-emilio.md           # Revisión técnica del Pull Request #9
├── evidencias/
│   ├── IHC-A-01/
│   │   └── informe-hallazgo-a01.md    # Informe de resolución técnica del Issue #6
│   └── capturas-tecnicas/              # 24 capturas comparativas (IHC-A-01 a 12 en v1 y v2)
└── tests/
    └── comprobar_prototipo_v2.py       # Script de verificación automatizada de entregables
```

---

## 3. Comprobación y Ejecución Local
No requiere Node.js ni servidores externos. Para probar los prototipos:
- Abrir directamente en el navegador `prototipo/v1/index.html` o `prototipo/v2/index.html`.
- Para ejecutar la suite de comprobación automatizada de la rama:
```bash
python tests/comprobar_prototipo_v2.py
```
