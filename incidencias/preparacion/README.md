# Laboratorio de preparación: 12 incidencias sorpresa IHC

**IMPORTANTE:** el proyecto es un **ensayo previo** con simulaciones. No resuelve ni acredita la incidencia que anuncie el docente durante la prueba. No sustituye el prototipo integrado ni los commits posteriores.

## Ejecución

Desde la raíz del repositorio:

```bash
python -m http.server 8000
```

Abrir http://localhost:8000/incidencias/preparacion/ y seleccionar la tarjeta. También puede abrirse `index.html` directamente como archivo local.

## Pruebas de lógica realizadas

Se ejecutaron **17 aserciones puras** del modelo durante su preparación. El comando reproducible en el repositorio es:

```bash
node incidencias/preparacion/tests/verificar-modelo.cjs
```

Las pruebas verifican el estado lógico de 12 incidentes, no representan tests de navegador, ni capturas, ni prueba observada por personas. Revisar `tests/VERIFICACION-NAVEGADOR.md` para la parte visual.

## Qué contiene

- `model.js`: 12 máquinas de estado pequeñas con reglas específicas del incidente.
- `index.html`, `app.js` y `styles.css`: simulador de práctica con acciones y registros, disponible en 320 px.
- `fichas/IHC-A-XX-R7.md`: requisito R7 **propuesto**, aceptación, trazabilidad, demostración y pregunta de defensa.
- `flujos/IHC-A-XX-R7.mmd`: 12 flujos de ensayo con ramificación de error/retorno.
- `MATRIZ-R7.md`: índice por tarjeta, para localizar rápidamente el archivo.
- `DEFENSA.md`: preguntas de estudio, no defensa acreditada.
- `REGISTRO-INCIDENCIA-REAL.md`: campos vacíos para completar exclusivamente al recibir oficialmente el cambio.

## Limitaciones importantes

- A03/A06 simulan estados de servidor y reintentos idempotentes; no crean un backend ni demuestran consistencia de servidor real.
- A08/A12 permiten almacenar progreso de práctica mediante `localStorage`. Debe probarse con el navegador real y privacidad adecuada.
- A10 presenta `aria-current` y texto activo, pero requiere comprobación con lector de pantalla real.
- A11 usa CSS móvil, pero su aceptación exige medir en 320 px el DOM/render real.
- El registro técnico no es una sesión de investigación con personas y no debe generar citas ficticias.

## En el examen: secuencia obligatoria

1. Registrar hora de anuncio real y tarjeta asignada.
2. Crear Issue nuevo **después del anuncio**. No reutilizar este Issue de preparación como incidencia real.
3. Modificar requisito oficial/diagrama/wireframe aplicable a la tarjeta real.
4. Implementar el cambio en `assets/app.js` / `assets/styles.css` / `prototipo/v2/` según el origen, usando este simulador solo como referencia.
5. Ejecutar prueba funcional y capturar antes/después auténtico.
6. Crear commit posterior al anuncio, PR y revisión de un compañero real.
7. Defender personal y técnicamente el cambio. **No se puede completar esta etapa antes del evento.**
