# Prototipo v1 y reproducción de fallos

Entrega para [Issue #3: William Martínez](https://github.com/EMILIOABRIL05/Prueba_01_IHC_Parcial2/issues/3).

Esta carpeta contiene la línea de base de CaféU (A01–A06) y Dashboard UX (A07–A12) procedente de `IHC_12_Tarjetas_Completo_Equipo5.zip`. Se organiza como una entrada independiente: sus recursos viven en `assets/` dentro de v1 y no dependen de la integración de otras ramas.

La versión se fija a `v1` en `assets/app.js`. Los fallos asociados a cada tarjeta se mantienen para poder reproducirlos. El archivo base conserva las condiciones de su fuente, pero esta entrada no ejecuta las correcciones de v2. La implementación y validación de v2 corresponden al Issue #4.

## Ejecutar localmente

1. Descargar o clonar esta rama y conservar la estructura de carpetas.
2. Abrir `prototipo/v1/index.html` en Chrome o Edge con JavaScript habilitado.
3. Seleccionar la tarjeta en la cabecera. También se puede abrir directamente `index.html?card=IHC-A-02`.
4. Usar **Reiniciar** para empezar un ensayo independiente.
5. Para A01 y A11, ajustar el ancho del viewport a **360 px**. Para el resto, registrar el ancho utilizado.

También puede servirse desde la raíz del repositorio:

```bash
python -m http.server 8000
```

Después abrir `http://localhost:8000/prototipo/v1/`.

No hacen falta npm, servidor de aplicación ni base de datos para abrir el prototipo. Los pedidos y la latencia pertenecen al modelo local de interacción; no se envían a un servicio comercial.

## Pantallas y estados incluidos

| Sistema | Pantallas / etapas | Estados y recuperación |
|---|---|---|
| CaféU | Inicio, Menú, Detalle, Mi pedido y recepción | Edición, carrito vacío, procesando, error de envío y recibido. Error → reintentar o editar. |
| Dashboard UX | Datos, Checklist, Registro, Revisión y cierre | Etapa normal, edición/anterior y cierre en proceso. La falta de ciertas validaciones y anuncios forma parte de los fallos de la línea de base. |

Los estados disponibles no acreditan por sí mismos que la interfaz sea accesible ni que todos los requisitos estén cumplidos. A02, A07, A08, A09, A10, A11 y A12 contienen precisamente barreras o pérdidas de estado que deben registrarse.

## Reproducción y verificación

- [Guiones de A01–A12 y comparación prevista con v2](REPRODUCCION.md).
- [Estado de las verificaciones y límites](VERIFICACION.md).
- [Procedencia de las capturas v1 suministradas](evidencias/README.md).
- `node prototipo/v1/tests/verificar_logica.mjs`: comprobaciones de fuente y lógica sin dependencias adicionales. Su informe se escribe fuera de los archivos originales en una carpeta temporal.
- `python prototipo/v1/tests/verificar_navegador.py`: recorrido automático en un navegador real, con capturas nuevas en una carpeta temporal. Requiere Playwright para Python y Chromium; consultar la cabecera del script. El script no se ha ejecutado en este entorno.

## Datos de esta línea de base

Se conservan los datos del ZIP: café USD 1,50, sánduche mixto USD 2,25, jugo USD 1,75 y galleta USD 1,00. Café y sánduche suman **USD 3,75**; dos cafés y un sánduche suman **USD 5,25**. El presupuesto de A05 sigue siendo **USD 4,25**. El Dashboard de esta base usa **cuatro etapas y tres casillas**.

Los diseños Figma preparados previamente tienen otros datos y una estructura más amplia. Sus enlaces de referencia son [CaféU](https://www.figma.com/design/XQP1LByW4KtPfTxyy5ouoV/) y [Dashboard UX](https://www.figma.com/design/bPSF7lzSTecjbFlwLtRzUE/). Para probar esta v1 se usan las condiciones de `REPRODUCCION.md`. La conciliación con el diseño final debe documentarse al integrar las versiones, evitando confundir diferencias del catálogo con fallos de cálculo.

## Procedencia y alcance

El código y las doce capturas identificadas como `base-zip` proceden del material compartido por el equipo. Los ajustes de esta rama son el aislamiento de v1, las rutas de carga locales, la versión fija, los guiones reproducibles y las comprobaciones técnicas. La preparación se realizó con asistencia de IA y no acredita una sesión humana ni una revisión de PR.

No se incluyen documentación de diagnóstico/arquitectura, solución v2, actas de participantes ni cambios de otros responsables. El PR y su revisión quedan pendientes de realizar por las personas del equipo. Se utiliza `Refs #3`, sin cerrar automáticamente el Issue.
