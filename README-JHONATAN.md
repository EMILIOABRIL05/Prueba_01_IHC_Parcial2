# Entrega de Pruebas y Evidencias · Jonathan Gamboa

**Responsable:** Jonathan Gamboa ([@Jonathan305g](https://github.com/Jonathan305g))  
**Rama asignada:** `jhonatan/pruebas`  
**Issues asignados:**
- [Issue #5 · [Fases 4-5][Jhonatan Gamboa] Prueba cognitiva, evidencias y defensa](https://github.com/EMILIOABRIL05/Prueba_01_IHC_Parcial2/issues/5)
- [Issue #8 · [Hallazgo][A12][Alta] Cierre exitoso sin validar checklist obligatorio](https://github.com/EMILIOABRIL05/Prueba_01_IHC_Parcial2/issues/8)

---

## 1. Alcance y responsabilidades
1. **Fase 4 (Pruebas cognitivas y evidencias):**
   - Protocolo y 12 actas de sesión cognitiva en `pruebas/` (con énfasis en `pruebas/IHC-A-12-sesion.md`).
   - Evidencias técnicas v1 vs v2 para las 12 tarjetas en `evidencias/capturas-tecnicas/`.
   - Evidencias visuales e incrustadas de la tarjeta asignada en `evidencias/IHC-A-12/`.
   - Distinción metodológica estricta entre evidencia técnica automatizada y observación humana externa.
2. **Fase 5 (Hallazgo A12, defensa e incidencia sorpresa):**
   - Resolución del fallo A12: bloqueo de finalización sin checklist obligatorio y prevención de pérdida de datos.
   - Preparación individual para la defensa oral de la tarjeta IHC-A-12 en `docs/defensa.md`.
   - Plantilla para incorporar la incidencia sorpresa del docente en `docs/incidencia-sorpresa-plantilla.md`.
3. **Revisión cruzada obligatoria:**
   - Revisión fundamentada del [PR #9](https://github.com/EMILIOABRIL05/Prueba_01_IHC_Parcial2/pull/9) de Emilio Abril documentada en `docs/revision_pr_emilio.md`.

---

## 2. Mapa de archivos aportados
- `pruebas/sesion.md`: Protocolo general y resumen del acta ejecutada de la tarjeta IHC-A-12.
- `pruebas/IHC-A-12-sesion.md`: Acta individual completada con participante de otro equipo (citas, métricas y capturas).
- `evidencias/IHC-A-12/README.md`: Documentación con imágenes incrustadas del fallo v1 y la solución v2.
- `evidencias/IHC-A-12/IHC-A-12-v1-fallo.png`: Captura de pantalla de la falla reproducible en v1.
- `evidencias/IHC-A-12/IHC-A-12-v2-solucion.png`: Captura de pantalla de la solución con validación en v2.
- `evidencias/capturas-tecnicas/`: 24 capturas automatizadas v1 y v2 de los 12 escenarios.
- `tests/casos-manuales.md`: Matriz de 12 casos de prueba manuales.
- `tests/resultados_automatizados.md`: Reporte de ejecución de pruebas técnicas (24/24 conformes).
- `tests/comprobar_pruebas_jhonatan.py`: Script de validación de entregables.
- `docs/defensa.md`: Guía de respuestas a preguntas de evaluación y justificación de principios IHC.
- `docs/revision_pr_emilio.md`: Formulario de revisión técnica del PR #9.

---

## 3. Comandos de verificación rápida
```bash
# Ejecutar verificación de entregables de pruebas y evidencias
py tests/comprobar_pruebas_jhonatan.py

# Ejecutar comprobación de arquitectura integrada
py tests/comprobar_arquitectura.py
```
