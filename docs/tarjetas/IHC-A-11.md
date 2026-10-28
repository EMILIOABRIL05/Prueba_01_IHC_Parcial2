# IHC-A-11 · Dashboard UX · Requisitos y trazabilidad

**Naturaleza:** especificación de diseño. No contiene mediciones de usuarios ni un incidente sorpresa resuelto.

## Datos del caso
- **Persona:** Evaluadora con monitor pequeño.
- **Tarea crítica:** Registrar etapa, errores y observaciones.
- **Restricción:** Jerarquía usable a 360 px.
- **Fallo descrito en tarjeta docente:** Card UI se superpone al Stepper.
- **Recurso complementario:** CaféU (editar/error y confirmación visible).

## Seis requisitos verificables

| ID | Requisito | Criterio de aceptación |
|---|---|---|
| R01 | Completar «Registrar etapa, errores y observaciones» siguiendo etapas identificables. | Recorrido llega a revisión y cierre desde inicio con Stepper. |
| R02 | Resolver condición crítica: A 360 px ningún campo queda superpuesto u oculto. | A 360 px ningún campo queda superpuesto u oculto. |
| R03 | Volver a una etapa anterior y corregir sin perder progreso válido. | Regresar y avanzar mantiene las selecciones anteriores. |
| R04 | Distinguir progreso, error de validación y cierre correcto. | Mensaje de estado comprensible; error indica cómo recuperar. |
| R05 | Permitir interacción por teclado con etiquetas semánticas. | Tab y Enter operan controles; foco visible; estado no depende del color. |
| R06 | Cumplir restricción contextual: Jerarquía usable a 360 px. | Orden de foco sigue la lectura vertical. |

## Arquitectura de información
- [Sitemap](../../diagramas/IHC-A-11-sitemap.mmd) con todas las páginas y regreso.
- [User flow](../../diagramas/IHC-A-11-flujo.mmd): **F1** principal, **E1** edición, **X1** error.
- **Secuencia principal:** Inicio → datos → Stepper → checklist → registro → revisión → cierre.
- **Condición principal a comprobar:** A 360 px ningún campo queda superpuesto u oculto.
- **Recuperación:** mostrar el problema en texto, ofrecer una ruta de edición y conservar los datos pertinentes.

## Componentes
Navegación y título de pantalla, Registro de errores, Stepper semántico y checklist, indicador de estado, aviso textual, botones etiquetados y foco visible.

## Matriz requisito → flujo → pantalla → componente → wireframe

| Requisito | Flujo | Pantalla | Componente | Wireframe |
|---|---|---|---|---|
| R01 | F1 | Stepper móvil | Stepper / navegación | [inicio](../../wireframes/IHC-A-11-inicio.svg) |
| R02 | F1/X1 | Registro de errores | Checklist / validación por etapa | [accion](../../wireframes/IHC-A-11-accion.svg) |
| R03 | E1 | Checklist / edición | Control anterior y estado | [accion](../../wireframes/IHC-A-11-accion.svg) |
| R04 | F1/X1 | Revisión móvil | Stepper / alerta / resumen | [confirmacion](../../wireframes/IHC-A-11-confirmacion.svg) |
| R05 | F1/E1 | Etapa actual | Campos accesibles y foco | [accion](../../wireframes/IHC-A-11-accion.svg) |
| R06 | X1 | Registro de errores | Condición contextual | [error](../../wireframes/IHC-A-11-error.svg) |

## Cuatro wireframes Lo-Fi
- [inicio](../../wireframes/IHC-A-11-inicio.svg)
- [accion](../../wireframes/IHC-A-11-accion.svg)
- [error](../../wireframes/IHC-A-11-error.svg)
- [confirmacion](../../wireframes/IHC-A-11-confirmacion.svg)

## Comprobación técnica al integrar el prototipo
1. Seleccionar IHC-A-11 y ejecutar **F1**; observar estados y resultado.
2. Probar la ruta **E1** y el error **X1**, preservando información pertinente.
3. Verificar R02: A 360 px ningún campo queda superpuesto u oculto.
4. Verificar R06: Orden de foco sigue la lectura vertical.
5. Guardar evidencia con versión, fecha, acción y resultado real.

La integración del prototipo pertenece a otras ramas. Este diseño no acredita por sí mismo una observación externa.

**Referencia GitHub:** [Issue #2](https://github.com/EMILIOABRIL05/Prueba_01_IHC_Parcial2/issues/2).
