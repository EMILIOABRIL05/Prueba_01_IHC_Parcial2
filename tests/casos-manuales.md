# Casos de verificación manual (no ejecutados automáticamente)

| Escenario | Versión | Pasos | Expectativa |
|---|---|---|---|
| A01 | v1 / v2 | Añadir dos productos, cambiar cantidad | v1 precio mostrado obsoleto; v2 refleja importe |
| A02 | v1 / v2 | Tab al botón Quitar; Enter; Escape | v2 nombre y confirmación, v1 omisión |
| A03 | v1 / v2 | Confirmar pedido | v2 identifica y resume; v1 solo Listo |
| A04 | v1 / v2 | Añadir sin reconocer alérgenos, confirmar | v2 exige revisión, v1 permite |
| A05 | v1 / v2 | Sobrepasar 4,25 con cantidades | v2 alerta y detiene envío |
| A06 | v1 / v2 | Confirmar dos veces y simular offline | v2 única confirmación y estados claros |
| A07 | v1 / v2 | Saltar al paso 4 sin completar | v2 bloquea salto con explicación |
| A08 | v1 / v2 | Marcar checklist, avanzar y volver | v2 conserva marcas |
| A09 | v1 / v2 | Registrar participante P-001 | v2 admite código, v1 pide nombre |
| A10 | v1 / v2 | Navegar stepper con lector | v2 anuncia paso actual con semántica |
| A11 | v1 / v2 | Ancho 360 px, recorrer pasos | v2 no superpone Card/Stepper |
| A12 | v1 / v2 | Finalizar incompleto y recargar | v2 recupera marcas y bloquea cierre inválido |
