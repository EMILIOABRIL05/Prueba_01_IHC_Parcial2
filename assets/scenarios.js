/**
 * Definición de escenarios de prueba IHC-A-01 a IHC-A-12
 * Proyecto: Prueba 01 · IHC · Parcial 2 (UTA)
 * Autor: Pablo Lozada (Fase 4 · Prototipo v2 y accesibilidad)
 */

window.SCENARIOS = {
  'IHC-A-01': {
    id: 'IHC-A-01',
    app: 'cafeu',
    title: 'CaféU · Recálculo de cantidades y total',
    persona: 'Estudiante de primer nivel que compra entre clases',
    task: 'Agregar café y sánduche; confirmar un pedido',
    constraint: '3 minutos, pantalla de 360 px',
    defectV1: 'El total no cambia al variar cantidades (Issue #6)',
    correctionV2: 'Editar cantidades recalcula subtotales y total, indica la diferencia y exige revisar antes de confirmar (R7)',
    initialCart: []
  },
  'IHC-A-02': {
    id: 'IHC-A-02',
    app: 'cafeu',
    title: 'CaféU · Accesibilidad por teclado y confirmación de quitar',
    persona: 'Estudiante que utiliza teclado por lesión temporal',
    task: 'Editar pedido y finalizar sin ratón',
    constraint: 'Tab, Enter y Escape con foco visible',
    defectV1: 'Quitar carece de nombre accesible y confirmación (Issue #7)',
    correctionV2: 'Botón con etiqueta accesible "Quitar", diálogo modal de confirmación con Enter y cancelación con Escape preservando foco',
    initialCart: []
  },
  'IHC-A-03': {
    id: 'IHC-A-03',
    app: 'cafeu',
    title: 'CaféU · Acuse de recibo y privacidad',
    persona: 'Estudiante que comparte dispositivo y sale rápido',
    task: 'Confirmar pedido y comprobar que se recibió',
    constraint: 'No exponer ni guardar datos sensibles',
    defectV1: 'Pantalla final muestra "Listo" sin número de pedido ni resumen',
    correctionV2: 'Título "Pedido recibido", número de pedido y resumen con items y total, sin almacenar datos sensibles',
    initialCart: []
  },
  'IHC-A-04': {
    id: 'IHC-A-04',
    app: 'cafeu',
    title: 'CaféU · Advertencia y reconocimiento de alérgenos',
    persona: 'Estudiante con alergia alimentaria declarada',
    task: 'Consultar producto y corregir pedido',
    constraint: 'Aviso de alérgenos antes de confirmar',
    defectV1: 'Permite confirmar sánduche sin advertir ni leer alérgenos',
    correctionV2: 'Aviso visible y checkbox de reconocimiento obligatorio antes de confirmar',
    initialCart: []
  },
  'IHC-A-05': {
    id: 'IHC-A-05',
    app: 'cafeu',
    title: 'CaféU · Control de presupuesto máximo',
    persona: 'Estudiante con presupuesto de USD 4,25',
    task: 'Añadir productos, ajustar cantidades y revisar total',
    constraint: 'Avisar antes de exceder USD 4,25',
    defectV1: 'Edición genera sobrecosto sin feedback y procesa pedido',
    correctionV2: 'Alerta en tiempo real si el total supera $4.25 y bloqueo de confirmación hasta corregir',
    initialCart: []
  },
  'IHC-A-06': {
    id: 'IHC-A-06',
    app: 'cafeu',
    title: 'CaféU · Prevención de doble envío y red inestable',
    persona: 'Estudiante con red móvil inestable',
    task: 'Confirmar pedido desde teléfono',
    constraint: 'No declarar éxito estando pendiente ni duplicar solicitudes',
    defectV1: 'Doble pulsación de confirmar duplica solicitudes (Hallazgo de referencia)',
    correctionV2: 'Bloqueo inmediato de botón confirmar, estados pendiente/error/acuse y reintento con solicitud única',
    initialCart: []
  },
  'IHC-A-07': {
    id: 'IHC-A-07',
    app: 'dashboard',
    title: 'Dashboard UX · Bloqueo de salto de etapas',
    persona: 'Investigadora novata que prepara una prueba',
    task: 'Configurar checklist y avanzar por etapas',
    constraint: 'Identificar siempre paso actual y secuencia lógica',
    defectV1: 'Stepper permite saltar a etapas finales omitiendo pasos obligatorios',
    correctionV2: 'Bloqueo estricto de navegación hacia adelante sin completar paso actual con alerta explicativa',
    initialCart: []
  },
  'IHC-A-08': {
    id: 'IHC-A-08',
    app: 'dashboard',
    title: 'Dashboard UX · Persistencia de checklist entre pasos',
    persona: 'Docente evaluador preparando sesión contrarreloj',
    task: 'Completar datos de prueba y checklist',
    constraint: 'Procedimiento claro antes de iniciar',
    defectV1: 'Casillas marcadas en el checklist se pierden al navegar entre pasos',
    correctionV2: 'Persistencia continua del estado de verificación al avanzar o retroceder',
    initialCart: []
  },
  'IHC-A-09': {
    id: 'IHC-A-09',
    app: 'dashboard',
    title: 'Dashboard UX · Privacidad y seudónimo de participante',
    persona: 'Investigadora con participantes anónimos',
    task: 'Registrar resultados y finalizar sesión',
    constraint: 'No mostrar nombres reales en evidencias',
    defectV1: 'Formulario exige nombre y apellido real, rechazando anonimato',
    correctionV2: 'Campo de código seudónimo (#code) con validación que rechaza nombres reales',
    initialCart: []
  },
  'IHC-A-10': {
    id: 'IHC-A-10',
    app: 'dashboard',
    title: 'Dashboard UX · Semántica accesible de paso activo',
    persona: 'Evaluador que utiliza lector de pantalla',
    task: 'Navegar Stepper y checklist',
    constraint: 'Anunciar semánticamente acción y resultado',
    defectV1: 'Paso activo se distingue únicamente por color',
    correctionV2: 'Atributo aria-current="step" y etiqueta textual "(actual)" audible por lectores de pantalla',
    initialCart: []
  },
  'IHC-A-11': {
    id: 'IHC-A-11',
    app: 'dashboard',
    title: 'Dashboard UX · Jerarquía usable en 360 px',
    persona: 'Evaluadora con monitor pequeño o teléfono móvil',
    task: 'Registrar etapa, errores y observaciones',
    constraint: 'Jerarquía usable y legible a 360 px',
    defectV1: 'Card UI con ancho fijo desborda pantalla a 360 px y se superpone',
    correctionV2: 'Layout responsive fluido (scrollWidth <= 360 px) sin desbordamiento ni superposiciones',
    initialCart: []
  },
  'IHC-A-12': {
    id: 'IHC-A-12',
    app: 'dashboard',
    title: 'Dashboard UX · Validación de checklist y reanudación',
    persona: 'Investigadora que retoma prueba interrumpida',
    task: 'Recuperar checklist y cerrar sesión',
    constraint: 'No perder pasos previamente finalizados ni emitir éxito falso (Issue #8)',
    defectV1: 'Permite finalizar sesión con checklist incompleto y pierde datos al recargar',
    correctionV2: 'R7: impedir éxito falso, volver con foco al ítem pendiente y conservar checklist, notas y métricas',
    initialCart: []
  }
};

window.PRODUCTS = {
  cafe: {
    id: 'cafe',
    name: 'Café americano',
    price: 1.50,
    desc: 'Café tostado artesanal, tamaño mediano (250 ml)',
    allergens: 'Ninguno'
  },
  sanduche: {
    id: 'sanduche',
    name: 'Sánduche de queso',
    price: 2.75,
    desc: 'Pan artesanal con queso pasteurizado y mantequilla',
    allergens: 'Contiene: Gluten, Lactosa'
  }
};
