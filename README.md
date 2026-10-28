# Prueba 01 · Interacción Humano-Computador · Parcial 2

Proyecto académico de la Universidad Técnica de Ambato, Carrera de Ingeniería de Software. Integra diagnóstico emocional, arquitectura, prototipos, validación y trazabilidad para **las doce tarjetas IHC-A-01 a IHC-A-12**.

- **CaféU, A01–A06:** compra y edición de pedidos, total, teclado, privacidad, alérgenos, presupuesto y conexión inestable.
- **Dashboard UX, A07–A12:** secuencia, checklist, guardado, códigos anónimos, semántica accesible, adaptación móvil y recuperación/cierre.
- **Incidencias seleccionadas:** A01 «Precio cambia al editar» ([#17](https://github.com/EMILIOABRIL05/Prueba_01_IHC_Parcial2/issues/17)) y A12 «Finalización prematura» ([#18](https://github.com/EMILIOABRIL05/Prueba_01_IHC_Parcial2/issues/18)). R7 y regresiones están integrados en v2.

## Abrir y ejecutar

Desde la raíz del repositorio:

```bash
python -m http.server 8000
```

Abrir:

- [v1, línea de base](prototipo/v1/index.html): `http://localhost:8000/prototipo/v1/`.
- [v2, versión corregida](prototipo/v2/index.html): `http://localhost:8000/prototipo/v2/`.
- [Laboratorio de preparación](incidencias/preparacion/index.html): `http://localhost:8000/incidencias/preparacion/`.

Elegir tarjeta en la cabecera. No se necesita backend ni una instalación de Node para usar los prototipos. Se recomienda HTTP para que almacenamiento y pruebas tengan un origen estable. Las esperas y fallos de conectividad son demostraciones locales: no se realizan pagos ni pedidos a una cafetería real.

## Documentación principal

- [Documentación integral en PDF](docs/Documentacion_Integral_IHC.pdf): fundamentos, actividad, doce tarjetas, dos incidencias, requisitos, arquitectura, decisiones, pruebas, evidencias y GitHub.
- [Fuente editable de la documentación](docs/Documentacion_Integral_IHC.md).
- [Diagnóstico emocional](docs/diagnostico.md), [requisitos](docs/requisitos.md) y [74 filas de trazabilidad](docs/trazabilidad.md).
- [Decisiones de implementación](docs/decisiones.md), [guía de ejecución](docs/guia-ejecucion.md) y [correcciones de la revisión](docs/correcciones-integrales.md).
- [Incidencias A01/A12](docs/incidencias-seleccionadas-A01-A12.md).
- [Colaboración y estado Git](docs/colaboracion.md), [registro consultado](docs/registro-git.json) y [pendientes de cierre](docs/seguimiento-cierre-equipo.md).
- [Estado posterior al PR #20](docs/estado-post-merge.json), [nueva verificación de main](evidencias/verificacion-post-merge/README.md) y [guía para completar la validación con el equipo](pruebas/GUIA-EJECUCION-EQUIPO.md).
- [Ensayo de pruebas de las doce tarjetas](pruebas/ensayos/README.md): PDF de 15 páginas con matriz y actas de ejemplo. Sus personajes, métricas y frases son ficticios y están identificados como material de práctica; las sesiones humanas siguen pendientes de registro auténtico.

## Organización del repositorio

| Ruta | Contenido |
|---|---|
| `assets/` | Lógica, catálogo y estilos de v2. |
| `prototipo/v1/` | Línea de base independiente, recursos, reproducción y pruebas de conservación del fallo. |
| `prototipo/v2/` | Entrada de la versión corregida que usa `assets/`. |
| `docs/tarjetas/` | Doce fichas: persona, tarea, restricción, diagnóstico, requisitos, arquitectura y criterios de aceptación. |
| `diagramas/` | Doce sitemaps, doce flujos F1/E1/X1 y doce curvas emocionales iniciales estimadas. |
| `wireframes/` | Cuarenta y ocho Lo-Fi específicos y dos estados R7. |
| `figma/` | Doce tableros SVG y enlaces/registro de Figma. |
| `pruebas/` | Protocolo y actas para observación humana; histórico A12 por validar. |
| `pruebas/ensayos/` | PDF didáctico con doce actas y matriz ficticias, separado de los registros humanos. |
| `evidencias/ejecucion-actual/` | Capturas nuevas, 41 resultados de navegador y SHA-256 de las fuentes usadas. |
| `evidencias/historicas/` | Capturas anteriores conservadas con procedencia; no se presentan como evidencia actual. |
| `tests/` | Pruebas de lógica, regresiones HTTP y comprobaciones de coherencia. |
| `github/` | Borradores de hallazgos y plantilla de revisión; no equivalen a Issues publicados. |
| `incidencias/preparacion/` | Ensayo de doce incidentes, separado de las dos incidencias implementadas. |
| `scripts/` | Generación reproducible del PDF desde su fuente Markdown. |

## Cobertura de tarjetas

| Tarjetas | Tema | Especificación |
|---|---|---|
| A01 | Compra rápida y revisión del importe | [Ficha](docs/tarjetas/IHC-A-01.md) |
| A02 | Pedido completo por teclado | [Ficha](docs/tarjetas/IHC-A-02.md) |
| A03 | Acuse visible y privacidad | [Ficha](docs/tarjetas/IHC-A-03.md) |
| A04 | Ingredientes, alérgenos y corrección | [Ficha](docs/tarjetas/IHC-A-04.md) |
| A05 | Pedido dentro del presupuesto | [Ficha](docs/tarjetas/IHC-A-05.md) |
| A06 | Envío único y conexión inestable | [Ficha](docs/tarjetas/IHC-A-06.md) |
| A07 | Secuencia obligatoria y paso actual | [Ficha](docs/tarjetas/IHC-A-07.md) |
| A08 | Procedimiento y guardado del checklist | [Ficha](docs/tarjetas/IHC-A-08.md) |
| A09 | Resultados con código anónimo | [Ficha](docs/tarjetas/IHC-A-09.md) |
| A10 | Stepper y estados accesibles | [Ficha](docs/tarjetas/IHC-A-10.md) |
| A11 | Jerarquía y controles a 360 px | [Ficha](docs/tarjetas/IHC-A-11.md) |
| A12 | Reanudación y cierre verificado | [Ficha](docs/tarjetas/IHC-A-12.md) |

## Resultados de verificación

- **41/41 en Chromium 153.0.8010.0**, sobre las entradas HTTP reales de v1/v2, a 360 × 800. [Resultados y capturas](evidencias/ejecucion-actual/README.md).
- **14/14 regresiones de lógica**, **7/7 casos R7**, **11/11 de modal A02**, **24/24 de v1** y **17/17 del modelo preparatorio**. Los alcances se registran en [tests/README.md](tests/README.md).
- Arquitectura: 12 fichas, 72 requisitos base + 2 R7, 24 diagramas de navegación y 50 Lo-Fi; curvas y severidades coherentes.
- La ejecución técnica no acredita una prueba cognitiva con participante ni conformidad global WCAG. Las actas y el ensayo con lector de pantalla se registran por separado.

### Repetir las pruebas

```bash
python -m pip install -r tests/requirements.txt
python -m playwright install chromium
python tests/navegador_integral.py
node tests/regresiones_integrales.cjs
node tests/verificar_incidentes_r7.cjs
node tests/issue7-logica.mjs
node prototipo/v1/tests/verificar_logica.mjs
python tests/comprobar_arquitectura.py
python tests/comprobar_prototipo_v2.py
python tests/comprobar_pruebas_jhonatan.py
node incidencias/preparacion/tests/verificar-modelo.cjs
node incidencias/preparacion/tests/verificar-documentacion.cjs
```

La prueba de navegador crea un servidor temporal y guarda la salida en una carpeta temporal. Para conservar otra ejecución: `--salida ruta/nueva`; si ya existe Chromium: `--browser-path ruta/al/ejecutable`. No requiere una ruta Linux fija.

## Diferencias entre versiones y datos

- v1 conserva intencionalmente los fallos descritos; **un caso v1 OK significa que se reprodujo el fallo**, no que la interfaz inicial sea correcta.
- En v1, café USD 1,50 + sánduche USD 2,25 = USD 3,75; dos cafés + sánduche = USD 5,25.
- En v2, café USD 1,50 + sánduche USD 2,75 = USD 4,25; dos cafés + sánduche = USD 5,75.
- El límite de USD 4,25 corresponde a A05. A01 debe permitir revisar y confirmar USD 5,75.
- Dashboard implementa cuatro etapas de trabajo y un estado final. No se confunde con diseños previos de seis etapas.

## Equipo y GitHub

| Integrante | Cuenta | Aporte registrado |
|---|---|---|
| Manuel Cusme | `ManuelCusme` | Diagnóstico y hallazgos. |
| Emilio Abril | `EMILIOABRIL05` | Arquitectura, trazabilidad y primeras implementaciones R7. |
| William Martínez | `william-martinez5101` | v1, recuperación del foco y correcciones/documentación integral de esta rama. |
| Pablo Lozada | `idk-Damian` | Base del prototipo v2 y accesibilidad. |
| Jonathan Gamboa | `Jonathan305g` | Protocolos, aportes de prueba y evidencias anteriores. |

Los PR de las fases originales y de las primeras incidencias están fusionados. La rama `william/correcciones-integrales-documentacion` se integró mediante el [PR #20](https://github.com/EMILIOABRIL05/Prueba_01_IHC_Parcial2/pull/20), fusionado el 28 de octubre de 2026 a las 17:04 (America/Guayaquil), en el commit `49abf9cadd269553594142be02dfb068fa53efc3`. La nueva comprobación de sus 361 archivos dio 41/41 casos de navegador. El PR #20 no tenía revisiones ni comentarios de compañeros al consultar; la fusión no acredita esa actuación personal. La rama `william/actualizacion-cierre-y-validacion` actualiza este registro y las guías de validación, sin cambiar la aplicación.

## Figma y recursos de la actividad

- [CaféU en Figma](https://www.figma.com/design/XQP1LByW4KtPfTxyy5ouoV/).
- [Dashboard UX en Figma](https://www.figma.com/design/bPSF7lzSTecjbFlwLtRzUE/).
- [Registro de enlaces y actualización pendiente](figma/REGISTRO-FIGMA.md). Esta rama actualiza los tableros del repositorio; la sincronización del lienzo y sus conexiones se verifica en Figma.
- Recursos indicados por la guía: [CaféU / arquitectura](https://github.com/Sax300-cpu/HCI-2026-G2), [presentación](https://github.com/Sax300-cpu/HCI-2026-G2/tree/main/presentacion), [Dashboard / UX emocional](https://github.com/maribelsailema/HCI_2026_G1).

## Qué falta acreditar con personas

Consultar [pruebas/sesion.md](pruebas/sesion.md): actas auténticas por tarjeta, validación del aporte histórico A12, lector de pantalla cuando corresponda y revisión fundamentada de un PR ajeno por cada integrante. No se completan estas actividades mediante resultados inventados ni copiando las capturas técnicas.

Material preparado: [tareas y registro por tarjeta](pruebas/GUIA-EJECUCION-EQUIPO.md), [recorrido A10 con lector de pantalla](pruebas/A10-lector-de-pantalla.md), [revisión personal de PR](github/pr/GUIA-REVISION-PERSONAL.md) y [contraste Figma/HTML](figma/CONTRASTE-CON-HTML.md). La lectura remota de ambos Figma se intentó, pero el servicio devolvió límite de llamadas del plan Starter; no se declara su correspondencia visual como comprobada.
