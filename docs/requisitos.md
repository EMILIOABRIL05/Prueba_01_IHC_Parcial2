# Requisitos de interfaz: 74 requisitos

El proyecto desarrolla doce tarjetas: **72 requisitos base (R01–R06)** y **dos extensiones R7**, para A01 y A12. Los criterios de aceptación están en cada ficha y la matriz global.

| Tarjeta | Restricción | Requisitos |
|---|---|---|
| [IHC-A-01](tarjetas/IHC-A-01.md) | Tres minutos; pantalla de 360 px | R01–R06 + R7 |
| [IHC-A-02](tarjetas/IHC-A-02.md) | Operar sin ratón y mantener el foco visible | R01–R06 |
| [IHC-A-03](tarjetas/IHC-A-03.md) | No solicitar ni conservar datos personales o financieros | R01–R06 |
| [IHC-A-04](tarjetas/IHC-A-04.md) | Mostrar advertencias antes de confirmar y permitir volver sin perder el carrito | R01–R06 |
| [IHC-A-05](tarjetas/IHC-A-05.md) | Advertir el exceso y no enviar un pedido superior a USD 4,25 | R01–R06 |
| [IHC-A-06](tarjetas/IHC-A-06.md) | Distinguir pendiente, no confirmado y recibido | R01–R06 |
| [IHC-A-07](tarjetas/IHC-A-07.md) | Identificar el paso actual y bloquear omisiones de pasos obligatorios | R01–R06 |
| [IHC-A-08](tarjetas/IHC-A-08.md) | Conservar marcas e informar el estado de guardado | R01–R06 |
| [IHC-A-09](tarjetas/IHC-A-09.md) | Usar códigos de participante y conservar las métricas | R01–R06 |
| [IHC-A-10](tarjetas/IHC-A-10.md) | Comunicar acción, estado y resultado sin depender del color | R01–R06 |
| [IHC-A-11](tarjetas/IHC-A-11.md) | Evitar superposición y controles ocultos a 360 px | R01–R06 |
| [IHC-A-12](tarjetas/IHC-A-12.md) | No perder verificaciones ni declarar éxito incompleto | R01–R06 + R7 |

## Reglas comunes

Mensajes textuales además de color; recuperación de errores; edición que conserva datos; validación idéntica por todas las rutas; foco visible y nombres de controles; separación entre técnica y observación humana. En Dashboard el código es P-001 a P-999 y errores un entero no negativo; A08/A12 informan guardado y validan el estado recuperado.

## Extensiones de las dos incidencias

- A01 R7: mostrar subtotales, total anterior/nuevo y diferencia; exigir revisión vigente tras agregar, quitar o variar cantidad.
- A12 R7: impedir cierre incompleto, explicar y enfocar el faltante, conservar progreso, validar datos recuperados y revalidar/guardar antes del cierre.

[Matriz completa](trazabilidad.md) · [Incidencias](incidencias-seleccionadas-A01-A12.md) · [Verificación de coherencia](../tests/comprobar_arquitectura.py).
