# Acta de prueba cognitiva · IHC-A-12

> Plantilla VACÍA; no insertar observaciones ficticias.

- Tarjeta: **IHC-A-12**.
- Participante externo (código anónimo): **PENDIENTE**.
- Equipo de procedencia (distinto): **PENDIENTE**.
- Observador/cronometrista: **Jonathan Gamboa (@Jonathan305g)**.
- Fecha y hora real: **PENDIENTE (registro durante sesión de evaluación presencial)**.
- Dispositivo, navegador y ancho: **PC Laboratorio FISEI / Chrome / 1366x768 (Desktop) y 360 px (Responsive)**.
- Consentimiento informado para registro/capturas: **PENDIENTE (firma/asentimiento verbal participante)**.
- Tarea literal: reanudar, completar lista y cerrar.

## Registro v1
- Inicio/fin y duración: [completar durante prueba con participante de otro equipo].
- Resultado: [éxito / abandono / error no recuperado].
- Errores, pausas y dónde ocurrieron: [anotar timestamps y pantallas específicas].
- Cita textual literal: [anotar transcripción exacta de la persona usuaria].
- Captura original: `evidencias/capturas-tecnicas/IHC-A-12-v1.png`.

## Cambio sustentado
- Issue real y revisión: [Issue #8](https://github.com/EMILIOABRIL05/Prueba_01_IHC_Parcial2/issues/8) y [Issue #5](https://github.com/EMILIOABRIL05/Prueba_01_IHC_Parcial2/issues/5). Revisión cruzada de arquitectura en [PR #9](https://github.com/EMILIOABRIL05/Prueba_01_IHC_Parcial2/pull/9).
- Hallazgo comprobable: En v1, el usuario puede pulsar finalizar y el sistema reporta estado exitoso aun cuando restan requisitos obligatorios en la lista.
- Decisión de corrección y código modificado: En v2 se implementa compuerta lógica obligatoria antes de declarar éxito (Requisito R02); feedback sonoro/visual accesible y persistencia de items marcados. Captura técnica en `evidencias/capturas-tecnicas/IHC-A-12-v2.png`.

## Registro v2
- Inicio/fin y duración: [sin observar].
- Resultado: [sin observar].
- Errores, pausas y cita: [sin observar].
- Captura v2: [ruta pendiente].
- Diferencia **observada** (métrica): [no medida].
- Mejoras solo **inferidas**: No se muestra éxito con checklist obligatorio incompleto.

## Evaluación metodológica
Mismo participante / participantes distintos: [por completar]. Posibles sesgos de aprendizaje: [por completar]. No afirmar mejora causal sin controles adecuados.
