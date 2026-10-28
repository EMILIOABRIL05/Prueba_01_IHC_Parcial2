# Guía para registrar una revisión personal de PR

Cada integrante usa su propia cuenta y revisa un PR de otra persona. Esta guía prepara la revisión; no contiene aprobaciones hechas ni se publica automáticamente. El PR #20 ya se fusionó y no tenía reviews al consultar. Una revisión posterior debe indicar su fecha y no presentarse como aprobación anterior al merge.

## Opciones de revisión

Propuestas de organización, no actuaciones atribuidas al equipo:

| Revisor propuesto | PR ajeno disponible | Caso concreto |
|---|---|---|
| William | #19, de Emilio | R7 de A01/A12: requisito, flujo, cambio y diferencias entre el código inicial del PR y la corrección posterior #20. |
| Emilio | #20, de William | A12: JSON dañado, checklist 2/3 y fallo de guardado; documentación y evidencia. |
| Manuel | #20, de William | A01: revisión invalidada al agregar/quitar y total 5,75; comparar v1/v2. |
| Jonathan | #20, de William | Procedencia de capturas y acta histórica A12; resultados técnicos frente a humanos. |
| Pablo | #20, de William | A02: cancelar/confirmar, Escape, foco y diálogo; A07: Siguiente y Stepper. |

Pablo ya tiene un comentario técnico en PR #9. Manuel y Emilio tienen aprobaciones genéricas en otros PR; una revisión fundamentada requiere explicar una comprobación concreta. No se afirma que las propuestas ya se realizaron.

## Ejecutar y registrar

1. Abrir Files changed y anotar el SHA del PR. Si se prueba main en lugar del commit del PR, indicarlo: sus resultados no validan por sí solos una versión anterior.
2. Leer archivos relevantes y localizar requisito, comportamiento y evidencia. Usar los comandos del README cuando corresponda.
3. Ejecutar el caso, incluidos error y recuperación. Registrar entorno, pasos, resultado observado y diferencia con el esperado.
4. Escribir una observación concreta: archivo/función, caso y efecto. Si hay un problema, solicitar el cambio de forma reproducible; si no lo hay, explicar la conformidad y su alcance.
5. Publicar personalmente la review o comentario desde la cuenta del revisor. En PR fusionados, describirlo como revisión posterior.
6. Guardar el enlace real en colaboración. Un borrador local o «todo correcto» no explica una comprobación fundamentada.

## Formato a completar después de revisar

```text
Revisión personal posterior / previa a la fusión: [según fecha real]
PR y commit examinados: [URL y SHA]
Cuenta del revisor: [cuenta propia]
Archivos y funciones: [rutas concretas]
Entorno: [navegador y dispositivo / comando]
Caso y pasos: [acciones reales]
Esperado: [criterio del requisito]
Observado: [resultado real]
Observación o cambio solicitado: [explicación técnica]
Conclusión y alcance: [conforme / requiere cambio; límites]
Fecha real: [fecha y zona]
```

La [plantilla original](plantilla_revision.md) sigue disponible. No copiar un resultado como si se hubiera probado ni publicar bajo la cuenta de otro integrante.
