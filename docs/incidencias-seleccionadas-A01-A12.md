# Dos incidencias seleccionadas: A01 CaféU y A12 Dashboard UX

## A01: precio cambia al editar · Issue #17

R7 exige recalcular subtotales y total, explicar la diferencia y solicitar revisión antes de confirmar. En v2, USD 4,25 pasa a USD 5,75 al agregar un café adicional; diferencia +USD 1,50. `cartChanged` invalida revisión ante cantidad, alta o eliminación; `cartSignature` comprueba que el pedido revisado siga vigente. El envío captura productos, precios y total; el acuse no toma un carrito posterior modificado.

[Ficha](tarjetas/IHC-A-01.md) → [Flujo](../diagramas/IHC-A-01-flujo.mmd) → Mi pedido / revisión → total, diferencia y botón He revisado → [wireframe](../wireframes/IHC-A-01-revision-R7.svg) → [capturas](../evidencias/ejecucion-actual/README.md).

## A12: finalización prematura · Issue #18

R7 exige impedir cierre falso, explicar el faltante y permitir corregir sin borrar datos. `finishProblem` valida datos, métricas y tres booleanos verdaderos. El error enfoca la casilla pendiente. Tras Verificando se revalida y guarda; si falla el guardado, se conserva la revisión y no se confirma el cierre. `loadStorage` normaliza datos dañados, conserva los válidos y restaura el cierre completo coherente.

[Ficha](tarjetas/IHC-A-12.md) → [Flujo](../diagramas/IHC-A-12-flujo.mmd) → Revisión / Checklist → validación, aviso, foco y almacenamiento → [wireframe](../wireframes/IHC-A-12-pendiente-R7.svg) → [capturas](../evidencias/ejecucion-actual/README.md).

## Git y resultados

Implementación inicial: [PR #19](https://github.com/EMILIOABRIL05/Prueba_01_IHC_Parcial2/pull/19). Revisión integral: rama `william/correcciones-integrales-documentacion`, commit de código [787a4fd](https://github.com/EMILIOABRIL05/Prueba_01_IHC_Parcial2/commit/787a4fd22baded030dd132343295b952f6290790). La [ejecución actual](../evidencias/ejecucion-actual/resultado.json) identifica esa revisión y SHA-256 de cada fuente: **41/41 casos de navegador**.

El [registro de Edge aportado por Emilio](verificacion-navegador-real-A01-A12.md) se incorpora con su procedencia. Las nuevas capturas acreditan una ejecución técnica. Participante, lector de pantalla, revisión personal de PR y hora oficial del anuncio se documentan únicamente cuando existan.
