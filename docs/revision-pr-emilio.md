# Formulario de Revisión Técnica de Pull Request

**Revisor:** Pablo Lozada ([@idk-Damian](https://github.com/idk-Damian))  
**Pull Request evaluado:** [#9 · [IHC] Arquitectura y trazabilidad de las 12 tarjetas (Emilio Abril)](https://github.com/EMILIOABRIL05/Prueba_01_IHC_Parcial2/pull/9)  
**Rama revisada:** `emilio/arquitectura`  
**Fecha:** 28 de octubre de 2026  
**Resultado de la revisión:** **APROBADO CON OBSERVACIONES TÉCNICAS (Approved)**

---

## 1. Verificación del Alcance Entregado
Se inspeccionó la totalidad de los entregables aportados por Emilio Abril en la rama `emilio/arquitectura`:
- **12 fichas de especificación (`docs/tarjetas/IHC-A-01.md` a `IHC-A-12.md`):** Cada una define Persona, Tarea crítica, Restricción, Fallo del docente y 6 requisitos verificables (R01 a R06). Conforme.
- **Matriz de trazabilidad global (`docs/trazabilidad.md`):** 72 filas completas que vinculan Requisito → Flujo → Pantalla → Componente → Wireframe. Conforme.
- **Diagramas de arquitectura (`diagramas/`):** 12 sitemaps y 12 flujos de usuario en formato Mermaid, distinguiendo la ruta principal (F1), edición (E1) y error (X1). Conforme.
- **Wireframes Lo-Fi (`wireframes/`):** 48 archivos SVG vectoriales (inicio, acción, error y confirmación para cada una de las 12 tarjetas). Conforme.
- **Guía de defensa y tableros Figma:** Documentación metodológica en `docs/guia-arquitectura-emilio.md` y tableros preparados en `figma/tableros/`. Conforme.

---

## 2. Observaciones Técnicas Fundamentadas

### Observación 1: Coherencia con el Prototipo v2 (Rutas X1 y Componentes de Error)
- **Constatación:** En los diagramas de flujo Mermaid de las tarjetas CaféU (`IHC-A-01-flujo.mmd` a `IHC-A-06-flujo.mmd`), la ruta de error **X1** modela la interrupción del flujo antes del cobro o confirmación definitiva.
- **Validación en Prototipo v2:** En la implementación del prototipo refinado (`prototipo/v2/`), se comprobó que esta ruta X1 se materializa fielmente:
  - En **A04**, la omisión del checkbox `#ack` dispara la rama X1 impidiendo la transición a confirmación.
  - En **A05**, superar los USD 4,25 activa la alerta y retiene al usuario en la pantalla de edición sin generar sobrecosto.
  - En **A06**, el fallo de conectividad (`#offline`) bifurca el flujo hacia la pantalla de error recuperable con reintento unívoco (`retry`).
- **Comentario técnico:** Excelente correspondencia entre la arquitectura teórica y el comportamiento de la interfaz implementada.

### Observación 2: Accesibilidad de Componentes en la Matriz de Trazabilidad (Requisito R05)
- **Constatación:** En `docs/trazabilidad.md`, el requisito R05 de todas las tarjetas exige "Operar controles esenciales con teclado y foco visible" y mapea al componente "Botones etiquetados y foco".
- **Observación constructiva:** Los wireframes SVG Lo-Fi representan los estados estáticos. En el prototipo interactivo v2 se reforzó esta definición incorporando el indicador de foco visible estandarizado (`outline: 3px solid #2563eb; outline-offset: 2px`) para dar cumplimiento formal a la pauta WCAG 2.1 AA (Criterio 2.4.7).

### Observación 3: Prevención de Falso Positivo en Dashboard UX (Tarjeta IHC-A-12)
- **Constatación:** En `docs/tarjetas/IHC-A-12.md`, el requisito R02 estipula: *"Bloquear la finalización exitosa si existen ítems obligatorios sin marcar y preservar el estado previo"*.
- **Validación técnica:** Se verificó que el wireframe `IHC-A-12-error.svg` ilustra la pantalla con el banner de checklist incompleto. En v2 se enlazó este diseño con la persistencia en `localStorage`, garantizando que la investigadora no pierda el progreso al recargar.

---

## 3. Conclusión y Visto Bueno
El trabajo de arquitectura y trazabilidad presentado en el PR #9 es riguroso, metodológicamente consistente y sienta las bases estructurales sobre las cuales se construyeron los prototipos interactivos v1 y v2. Se aprueba la integración hacia `main`.
