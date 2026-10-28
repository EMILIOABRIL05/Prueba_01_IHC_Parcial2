# IHC-A-09 · Dashboard UX · Requisitos y trazabilidad

**Naturaleza:** especificación de diseño. No contiene mediciones de usuarios ni un incidente sorpresa resuelto.

## Datos del caso
- **Persona:** Investigadora con participantes anónimos.
- **Tarea crítica:** Registrar resultados y finalizar sesión.
- **Restricción:** No mostrar nombres reales en evidencias.
- **Fallo descrito en tarjeta docente:** Formulario exige nombre real, no admite código.
- **Recurso complementario:** CaféU (editar/error y confirmación visible).

## Seis requisitos verificables

| ID | Requisito | Criterio de aceptación |
|---|---|---|
| R01 | Completar «Registrar resultados y finalizar sesión» siguiendo etapas identificables. | Recorrido llega a revisión y cierre desde inicio con Stepper. |
| R02 | Resolver condición crítica: Se acepta código seudónimo P-001 sin exigir nombre. | Se acepta código seudónimo P-001 sin exigir nombre. |
| R03 | Volver a una etapa anterior y corregir sin perder progreso válido. | Regresar y avanzar mantiene las selecciones anteriores. |
| R04 | Distinguir progreso, error de validación y cierre correcto. | Mensaje de estado comprensible; error indica cómo recuperar. |
| R05 | Permitir interacción por teclado con etiquetas semánticas. | Tab y Enter operan controles; foco visible; estado no depende del color. |
| R06 | Cumplir restricción contextual: No mostrar nombres reales en evidencias. | No se imprimen nombres reales en pantallas ni evidencias. |

## Arquitectura de información
- [Sitemap](../../diagramas/IHC-A-09-sitemap.mmd) con todas las páginas y regreso.
- [User flow](../../diagramas/IHC-A-09-flujo.mmd): **F1** principal, **E1** edición, **X1** error.
- **Secuencia principal:** Inicio → datos → Stepper → checklist → registro → revisión → cierre.
- **Condición principal a comprobar:** Se acepta código seudónimo P-001 sin exigir nombre.
- **Recuperación:** mostrar el problema en texto, ofrecer una ruta de edición y conservar los datos pertinentes.

## Componentes
Navegación y título de pantalla, Código de participante, Stepper semántico y checklist, indicador de estado, aviso textual, botones etiquetados y foco visible.

## Matriz requisito → flujo → pantalla → componente → wireframe

| Requisito | Flujo | Pantalla | Componente | Wireframe |
|---|---|---|---|---|
| R01 | F1 | Datos de sesión | Stepper / navegación | [inicio](../../wireframes/IHC-A-09-inicio.svg) |
| R02 | F1/X1 | Código de participante | Checklist / validación por etapa | [accion](../../wireframes/IHC-A-09-accion.svg) |
| R03 | E1 | Checklist / edición | Control anterior y estado | [accion](../../wireframes/IHC-A-09-accion.svg) |
| R04 | F1/X1 | Resultados anónimos | Stepper / alerta / resumen | [confirmacion](../../wireframes/IHC-A-09-confirmacion.svg) |
| R05 | F1/E1 | Etapa actual | Campos accesibles y foco | [accion](../../wireframes/IHC-A-09-accion.svg) |
| R06 | X1 | Código de participante | Condición contextual | [error](../../wireframes/IHC-A-09-error.svg) |

## Cuatro wireframes Lo-Fi
- [inicio](../../wireframes/IHC-A-09-inicio.svg)
- [accion](../../wireframes/IHC-A-09-accion.svg)
- [error](../../wireframes/IHC-A-09-error.svg)
- [confirmacion](../../wireframes/IHC-A-09-confirmacion.svg)

## Comprobación técnica al integrar el prototipo
1. Seleccionar IHC-A-09 y ejecutar **F1**; observar estados y resultado.
2. Probar la ruta **E1** y el error **X1**, preservando información pertinente.
3. Verificar R02: Se acepta código seudónimo P-001 sin exigir nombre.
4. Verificar R06: No se imprimen nombres reales en pantallas ni evidencias.
5. Guardar evidencia con versión, fecha, acción y resultado real.

La integración del prototipo pertenece a otras ramas. Este diseño no acredita por sí mismo una observación externa.

**Referencia GitHub:** [Issue #2](https://github.com/EMILIOABRIL05/Prueba_01_IHC_Parcial2/issues/2).
