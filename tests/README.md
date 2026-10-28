# Pruebas reproducibles

## Navegador real

```bash
python -m pip install -r tests/requirements.txt
python -m playwright install chromium
python tests/navegador_integral.py
```

Usa un servidor HTTP temporal y las entradas reales de v1/v2. No reconstruye la página con set_content ni reemplaza el almacenamiento en los recorridos normales. `--browser-path` permite un Chromium existente; `--salida` elige una carpeta nueva. La suite contiene 24 casos de tarjeta/versión y 17 regresiones. Casos de cuota/JSON dañados introducen expresamente una falla controlada.

Las entradas antiguas `pruebas_automaticas.py`, `verificaciones_adicionales.py` y `issue7-navegador.py` delegan a esta suite o a su grupo; se eliminaron las expectativas obsoletas y la ruta fija Linux.

Última ejecución conservada: **41/41**, Chromium 153.0.8010.0, código 787a4fd22baded030dd132343295b952f6290790, fecha UTC 2026-10-28T21:20:34.474219+00:00. [Capturas y reporte](../evidencias/ejecucion-actual/README.md).

## Lógica y coherencia

- `node tests/regresiones_integrales.cjs`: 14 regresiones de estado, sin navegador.
- `node tests/verificar_incidentes_r7.cjs`: siete casos R7/controles de regresión.
- `node tests/issue7-logica.mjs`: once casos de manejadores/HTML del modal.
- `node prototipo/v1/tests/verificar_logica.mjs`: 24 comprobaciones de la línea base.
- `python tests/comprobar_arquitectura.py`: conjunto exacto de 74 requisitos, sin duplicados, y archivos de diseño.
- `python tests/comprobar_prototipo_v2.py`: existencia y referencias estáticas; no certifica accesibilidad.
- `python tests/comprobar_pruebas_jhonatan.py`: existencia de entregables; no considera una acta ejecutada solo por existir.
- `node incidencias/preparacion/tests/verificar-modelo.cjs`: 17 casos del laboratorio preparatorio.
- `node incidencias/preparacion/tests/verificar-documentacion.cjs`: doce curvas y severidades coherentes.

Los reportes anteriores se conservan como históricos. Los tests de lógica no verifican layout nativo, lector de pantalla ni desempeño de participantes. El navegador verifica atributos/foco/360 px e interacción, pero tampoco acredita una sesión humana ni conformidad global WCAG.
