# Integración de incidencias seleccionadas: CaféU A01 y Dashboard UX A12

## Alcance y autenticidad

Se eligió una incidencia para cada sistema. Los cambios son **funcionales en el prototipo v2 compartido** (`assets/app.js`) y no sustituyen la evidencia del anuncio oficial del docente. La versión v1 sigue reproduciendo los defectos históricos para comparar.

### A01 · Total al editar — Issue #17

- **R7:** al variar una cantidad se actualizan subtotales y total; se informa total anterior, nuevo y diferencia; una revisión explícita es necesaria antes de confirmar.
- **Ejemplo real del catálogo actual:** Café = USD 1,50; sánduche = USD 2,75. Un café más un sánduche totaliza USD 4,25; dos cafés más un sánduche, USD 5,75. Cambio **+USD 1,50**.
- **Componentes:** Carrito, subtotales, `#total`, `#review-total`, estado `a01ReviewRequired` y protección en `handleConfirm`.
- **Ramas:** [Flujo principal/editar/error](../diagramas/IHC-A-01-flujo.mmd), [wireframe Lo-Fi R7](../wireframes/IHC-A-01-revision-R7.svg).
- **Regresión importante:** el límite USD 4,25 corresponde a **A05**, no a A01; se restringió su validación a A05.

### A12 · Finalización prematura — Issue #18

- **R7:** rechazar finalización si falta una verificación; explicar el número del primer ítem pendiente, regresar al checklist y posicionar el foco sobre la casilla; permitir completar sin perder datos.
- **Componentes:** Checklist, resumen del estado 0/3–3/3, mensaje `role="alert"`, `handleDashboardFinish`, estado `dashboardFinishing` y persistencia `localStorage` (título, código, errores, notas, pasos marcados y etapa actual).
- **Estados:** Revisión incompleta → error con retorno y foco; completado → verificando → sesión cerrada.
- **Ramas:** [Flujo principal/editar/error](../diagramas/IHC-A-12-flujo.mmd), [wireframe Lo-Fi R7](../wireframes/IHC-A-12-pendiente-R7.svg).
- **Privacidad:** introducir solo códigos y datos ficticios o anónimos; los datos del ejemplo se guardan únicamente en el navegador local de la demostración.

## Reproducir

Desde la raíz del repositorio:

```bash
python -m http.server 8000
node tests/verificar_incidentes_r7.cjs
```

Abrir `http://localhost:8000/prototipo/v2/` y seleccionar A01 o A12. Para comparar, abrir `http://localhost:8000/prototipo/v1/` sin alterar sus defectos base.

## Trazabilidad completa

| Incidencia | Requisito | Flujo | Pantalla | Componente | Wireframe | Prueba |
|---|---|---|---|---|---|---|
| A01 | [R7](tarjetas/IHC-A-01.md) | [E1/X1/F1](../diagramas/IHC-A-01-flujo.mmd) | Mi pedido | Total y diferencia + revisión | [Lo-Fi](../wireframes/IHC-A-01-revision-R7.svg) | [Test integrado](../tests/verificar_incidentes_r7.cjs) |
| A12 | [R7](tarjetas/IHC-A-12.md) | [X1/E1/F1](../diagramas/IHC-A-12-flujo.mmd) | Revisión y Checklist | Validación, alerta, foco y persistencia | [Lo-Fi](../wireframes/IHC-A-12-pendiente-R7.svg) | [Test integrado](../tests/verificar_incidentes_r7.cjs) |

## Evidencia aún necesaria

La verificación técnica disponible está descrita en [pruebas/incidencias-R7-ejecucion.md](../pruebas/incidencias-R7-ejecucion.md). **No** se ha acreditado una sesión presencial, mediciones de participantes, un commit posterior a la hora de anuncio ni capturas de navegador reales. Si el docente exige esos elementos, deben generarse y fecharse durante una ejecución auténtica, no reconstruirse retrospectivamente.
