# Registro de verificación en navegador: A01 y A12

## Alcance

Ejecución interactiva local del prototipo por HTTP en un navegador Edge. No fue una prueba con participantes ni acredita una fecha de anuncio docente. Se usaron únicamente datos ficticios de prueba local (`Verificación local de interfaz`, `QA-LOCAL`).

## A01 · CaféU (v2)

1. Se agregaron un café (USD 1,50) y un sánduche (USD 2,75): total USD 4,25.
2. Al aumentar el café a dos unidades, la interfaz mostró subtotales USD 3,00 y USD 2,75, total USD 5,75 y diferencia +USD 1,50.
3. Intentar confirmar antes de revisar fue bloqueado y mostró el aviso de revisar el importe; el foco pasó a **He revisado el nuevo total**.
4. Tras revisar el desglose y aceptar los alérgenos, la confirmación se completó y mostró el pedido con total abonado USD 5,75.

## A12 · Dashboard UX (v2)

1. Con 2/3 ítems marcados, el cierre fue bloqueado. La alerta indicó que faltaba el ítem obligatorio 3 y el foco quedó en su casilla.
2. Al recargar y volver a seleccionar A12, se conservaron el título/código ficticios, las dos marcas y la etapa Checklist.
3. Tras marcar el ítem 3, el resumen mostró 3/3; al finalizar se observó el estado **Verificando checklist…** y después **Sesión cerrada**.

## Comparación v1

- A01: después de aumentar el café de 1 a 2, v1 siguió mostrando el total USD 3,75, reproduciendo el total obsoleto de su propio catálogo (café USD 1,50, sánduche USD 2,25).
- A12: v1 permitió finalizar con checklist 0/3 y mostró **Sesión cerrada**; se conserva sin cambios como línea de base.

## Límites de esta ejecución

- Se observaron capturas durante la navegación, pero no se añadieron archivos de imagen ni evidencia de participantes.
- No se modificó, aprobó ni fusionó el PR #19.
- La comprobación específica de navegación Tab/Enter y el viewport emulado de 360 px quedan pendientes de una pasada dedicada; esta ejecución visual se realizó en el ancho de ventana disponible.
