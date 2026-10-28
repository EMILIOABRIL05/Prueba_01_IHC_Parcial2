# Requisitos de interfaz · 12 tarjetas

**Alcance:** 72 requisitos de diseño en 12 fichas (R01–R06 por tarjeta). Preparación, no evidencia de prueba observada. El docente asignará una tarjeta al equipo.

| Tarjeta | Sistema | Restricción | Requisitos |
|---|---|---|---|
| [IHC-A-01](tarjetas/IHC-A-01.md) | CaféU | 3 minutos, pantalla de 360 px | R01–R07 |
| [IHC-A-02](tarjetas/IHC-A-02.md) | CaféU | Tab, Enter y Escape | R01–R06 |
| [IHC-A-03](tarjetas/IHC-A-03.md) | CaféU | No exponer ni guardar datos sensibles | R01–R06 |
| [IHC-A-04](tarjetas/IHC-A-04.md) | CaféU | Aviso de alérgenos antes de confirmar | R01–R06 |
| [IHC-A-05](tarjetas/IHC-A-05.md) | CaféU | Avisar antes de exceder USD 4,25 | R01–R06 |
| [IHC-A-06](tarjetas/IHC-A-06.md) | CaféU | No declarar éxito estando pendiente | R01–R06 |
| [IHC-A-07](tarjetas/IHC-A-07.md) | Dashboard UX | Identificar siempre paso actual | R01–R06 |
| [IHC-A-08](tarjetas/IHC-A-08.md) | Dashboard UX | Procedimiento claro antes de iniciar | R01–R06 |
| [IHC-A-09](tarjetas/IHC-A-09.md) | Dashboard UX | No mostrar nombres reales en evidencias | R01–R06 |
| [IHC-A-10](tarjetas/IHC-A-10.md) | Dashboard UX | Anunciar semánticamente acción y resultado | R01–R06 |
| [IHC-A-11](tarjetas/IHC-A-11.md) | Dashboard UX | Jerarquía usable a 360 px | R01–R06 |
| [IHC-A-12](tarjetas/IHC-A-12.md) | Dashboard UX | No perder pasos previamente finalizados | R01–R07 |

## Reglas transversales
- Comunicar el estado del sistema mediante texto además de color.
- Distinguir normal, procesando, error y éxito cuando corresponda.
- Habilitar teclado y foco visible para acciones esenciales.
- Permitir recuperación de errores y edición.
- Separar prueba técnica de prueba cognitiva con participante externo.

## Verificación
Para la tarjeta asignada, usar los criterios de aceptación de su ficha y seguir los enlaces de la matriz global.


## Extensión R7 — dos incidencias seleccionadas

Las siguientes mejoras de la **versión v2** corresponden a la selección del equipo. Los requisitos R01–R06 no cambian y v1 conserva los defectos para comparación. Esta integración no se presenta como respuesta a un anuncio sorpresa fechado.

| Tarjeta | Requisito verificable R7 | Criterio de aceptación | Issue |
|---|---|---|---|
| [A01](tarjetas/IHC-A-01.md) | Actualizar subtotales y total al editar; comunicar diferencia; exigir revisión explícita antes de confirmar. | Tras pasar de un café a dos, el nuevo total y sus subtotales son correctos; confirmar antes de la revisión no tramita el pedido; tras revisar, permite continuar. | [#17](https://github.com/EMILIOABRIL05/Prueba_01_IHC_Parcial2/issues/17) |
| [A12](tarjetas/IHC-A-12.md) | Bloquear finalización falsa, señalar ítem obligatorio pendiente, recuperarlo sin borrar datos y revalidar antes del éxito. | Con 2/3 no finaliza, muestra ítem faltante y enfoca su casilla; con 3/3 permite finalizar; los datos se conservan al volver/recargar. | [#18](https://github.com/EMILIOABRIL05/Prueba_01_IHC_Parcial2/issues/18) |

**Verificación técnica:** `node tests/verificar_incidentes_r7.cjs`. Capturas de navegador, hora oficial del anuncio y validación humana se registran únicamente cuando realmente se produzcan.
