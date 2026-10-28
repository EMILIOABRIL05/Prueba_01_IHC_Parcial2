# Ejecución de A01 y A12: resultados actuales

Código verificado: [787a4fd22baded030dd132343295b952f6290790](https://github.com/EMILIOABRIL05/Prueba_01_IHC_Parcial2/commit/787a4fd22baded030dd132343295b952f6290790). Fecha UTC: 2026-10-28T21:20:34.474219+00:00. Chromium 153.0.8010.0; viewport 360 x 800; entradas HTTP reales de v1 y v2.

Resultado: **41/41 casos de navegador**, con 24 comparaciones de tarjeta/versión y 17 regresiones. [Reporte completo](../evidencias/ejecucion-actual/README.md) y [metadatos y huellas](../evidencias/ejecucion-actual/resultado.json).

## A01

- USD 4,25 → USD 5,75, subtotales y diferencia +USD 1,50.
- Confirmar sin revisión queda bloqueado y enfoca He revisado.
- Agregar y quitar después de revisar vuelven a exigir revisión.
- Recibo conserva el importe enviado; nueva intención genera otro identificador.

## A12

- Con 2/3, cierre bloqueado y foco en check-2; no se borran campos ni marcas.
- Al recargar se recupera el progreso, y después del cierre válido se restaura también el estado cerrado.
- Checklist persistido vacío y JSON dañado no permiten falso éxito.
- Errores negativos, códigos inválidos y campos vacíos se bloquean por todas las rutas.
- Fallo de almacenamiento no confirma cierre; al recuperar almacenamiento se puede reintentar.
- Un temporizador anterior no contamina otra tarjeta.

Esta ejecución no registra personas ni valida un lector de pantalla. Las actas, observaciones y hora de anuncio docente no se deducen de la automatización.
