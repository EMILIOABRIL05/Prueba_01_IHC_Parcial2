# Registro técnico de incidencias A01 y A12 (R7)

**Origen:** cambios de implementación de las dos incidencias seleccionadas en el prototipo v2. Documento de verificación técnica, **no** acta de participante ni evidencia de una incidencia anunciada en clase.

## Prueba lógica realizada sobre el JS integrado

Se ejecutaron 7 comprobaciones mediante un **DOM simulado**, a partir del contenido de `assets/app.js` y `assets/scenarios.js` obtenido del repositorio, sin alterar la versión v1.

| Caso | Resultado de comprobación lógica |
|---|---|
| A01: 1→2 cafés, subtotales, total USD 5,75 y diferencia +USD 1,50 | OK |
| A01: bloqueo previo a revisión y confirmación posterior | OK |
| A01: segunda edición exige otra revisión | OK |
| A01 v1: conserva total obsoleto para comparación | OK |
| A12: 2/3 bloquea el cierre, localiza faltante y enfoca `check-2` | OK |
| A12: 3/3 pasa por verificando y luego muestra éxito | OK |
| A12: guarda y recupera título, código, notas, errores, checklist y etapa | OK |
| Regresión A05: continúa bloqueando exceso sobre USD 4,25 | OK |

**Nota metodológica:** hay ocho filas de resultados porque el primer caso técnico agrupa recálculo y el bloqueo; la suite ejecuta **7 funciones de prueba**. Comando reproducible: `node tests/verificar_incidentes_r7.cjs`.

## Evidencias que faltan — NO ejecutadas

- [ ] Abrir `prototipo/v2/` en Chrome/Edge y probar las rutas completas con clic y teclado real.
- [ ] Captura real de A01 antes de editar, después de editar, advertencia y revisión confirmada.
- [ ] Captura real de A12 con 2/3 pendiente, foco en casilla faltante y éxito tras 3/3.
- [ ] Contraste de v1 y v2 **en navegador** con fecha auténtica de ejecución.
- [ ] Verificar acceso sin ratón (Tab/Enter/Escape), lector de pantalla si aplica y ancho de 360 px.
- [ ] Si el examen lo requiere: hora oficial del anuncio, Issue específico creado conforme al protocolo, commits posteriores y revisión personal de otro integrante.

## Comprobaciones de navegador propuestas

**A01:** abrir A01 → agregar café y sánduche → revisar total USD 4,25 → aumentar café a 2 → subtotal café USD 3,00, subtotal sánduche USD 2,75 y total USD 5,75 → intentar confirmar (bloqueo) → revisar → aceptar advertencia de alérgenos cuando proceda → confirmar → verificar acuse. Repetir una edición posterior y comprobar que se solicita otra revisión.

**A12:** abrir A12 → escribir título y código ficticio P-001 → marcar solamente las casillas 1 y 2 → navegar hasta Revisión y finalizar → confirmar error y enfoque de ítem 3 sin pérdida de datos → completar → volver a Revisión → finalizar → observar Verificando y éxito. Repetir recargando navegador y comprobar que se conservan los datos del ensayo.

## Resguardos

No completar esta hoja con capturas o mediciones inventadas. Si se recopilan datos humanos, usar identificador anónimo y consentimiento adecuado.
