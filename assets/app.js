/**
 * Lógica interactiva del prototipo IHC (CaféU y Dashboard UX)
 * Soporta versiones v1 (con fallos intencionales para reproducción)
 * y v2 (correcciones verificables; la conformidad accesible exige evaluación completa).
 * 
 * Base: Pablo Lozada (Fase 4). Correcciones de foco y revisión integral: William Martínez.
 * Aportes de arquitectura/incidencias: Emilio Abril. Historial completo en Git.
 */

(function () {
  'use strict';

  var version = document.body.dataset.version || 'v2';
  var isV2 = version === 'v2';

  var state = {
    cardId: 'IHC-A-01',
    view: 'home', // 'home', 'menu', 'cart', 'processing', 'confirmation', 'error'
    dashboardStep: 0, // 0: Datos, 1: Checklist, 2: Observaciones, 3: Cierre, 4: Finalizado
    cart: [],
    v1CachedTotal: '$0.00',
    confirmedCount: 0,
    isSubmitting: false,
    offline: false,
    ackAllergens: false,
    dialogOpen: false,
    itemToRemove: null,
    removalOpenerId: null,
    alertMessage: '',
    a01ReviewRequired: false,
    a01PreviousTotal: 0,
    a01ReviewNote: '',
    dashboardFinishing: false,
    detailItem: 'cafe',
    detailReturn: 'menu',
    cartRevision: 0,
    reviewedSignature: '',
    lastStatus: '',
    pendingOrder: null,
    receipt: null,
    orderSequence: 0,
    dashboardClosed: false,
    saveStatus: 'Sin guardar: nueva sesión.',
    storageError: '',
    dashboardData: {
      title: '',
      code: '',
      name: '',
      checklist: [false, false, false],
      errors: '0',
      notes: ''
    }
  };

  // Las operaciones asíncronas pertenecen a una tarjeta y a una intención concreta.
  var operation = 0;
  var activeTimer = null;
  function cancelOperation() {
    operation += 1;
    if (activeTimer !== null && typeof clearTimeout === 'function') clearTimeout(activeTimer);
    activeTimer = null;
    state.isSubmitting = false;
    state.dashboardFinishing = false;
  }
  function emptyDashboard() {
    return {title: '', code: '', name: '', checklist: [false, false, false], errors: '0', notes: ''};
  }
  function escapeHtml(value) {
    return String(value == null ? '' : value).replace(/[&<>"']/g, function (c) {
      return {'&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'}[c];
    });
  }
  function announce(text) {
    var live = document.getElementById('live-status');
    if (live && live.textContent !== text) live.textContent = text;
  }
  function storageKey(cardId) {
    return isV2 && (cardId === 'IHC-A-08' || cardId === 'IHC-A-12') ?
      (cardId === 'IHC-A-12' ? 'ihc_a12_state' : 'ihc_a08_state') : null;
  }
  function validChecklist(checklist) {
    return Array.isArray(checklist) && checklist.length === 3 &&
      checklist.every(function (value) { return value === true; });
  }
  function dataProblem() {
    if (!state.dashboardData.title.trim()) return {step: 0, field: 'title', message: 'Introduce el título de la prueba antes de avanzar.'};
    if (!/^P-(?!000)[0-9]{3}$/.test(state.dashboardData.code.trim())) return {
      step: 0, field: 'code', message: 'Debe ingresar un código anónimo válido entre P-001 y P-999. No ingrese nombres reales.'};
    return null;
  }
  function metricProblem() {
    if (!/^(0|[1-9][0-9]*)$/.test(String(state.dashboardData.errors))) return {
      step: 2, field: 'errors', message: 'El número de errores debe ser un entero no negativo (0, 1, 2...).'};
    return null;
  }
  function checklistProblem() {
    if (validChecklist(state.dashboardData.checklist)) return null;
    var original = state.dashboardData.checklist;
    state.dashboardData.checklist = [0, 1, 2].map(function (i) { return Array.isArray(original) && original[i] === true; });
    var missing = state.dashboardData.checklist.findIndex(function (value) { return value !== true; });
    return {step: 1, field: 'check-' + missing, message: 'No se puede finalizar o avanzar: falta completar el ítem obligatorio ' +
      (missing + 1) + '. Complete la casilla sin borrar los datos previos.'};
  }
  function loadStorage(cardId) {
    var key = storageKey(cardId);
    if (!key) return;
    try {
      var raw = localStorage.getItem(key);
      if (!raw) return;
      var saved = JSON.parse(raw);
      if (!saved || typeof saved !== 'object' || Array.isArray(saved)) throw new Error('Registro no válido');
      var schemaValid = Array.isArray(saved.checklist) && saved.checklist.length === 3 &&
        saved.checklist.every(function (value) { return typeof value === 'boolean'; });
      var data = emptyDashboard();
      ['title', 'code', 'errors', 'notes'].forEach(function (field) {
        if (typeof saved[field] === 'string') data[field] = saved[field].slice(0, field === 'notes' ? 4000 : 250);
      });
      data.checklist = [0, 1, 2].map(function (i) { return Array.isArray(saved.checklist) && saved.checklist[i] === true; });
      state.dashboardData = data;
      state.dashboardStep = Number.isInteger(saved.dashboardStep) && saved.dashboardStep >= 0 && saved.dashboardStep <= 4 ? saved.dashboardStep : 0;
      state.dashboardClosed = schemaValid && (saved.closed === true || saved.dashboardStep === 4) &&
        validChecklist(data.checklist) && !dataProblem() && !metricProblem();
      if (state.dashboardClosed) state.dashboardStep = 4;
      else if (dataProblem()) state.dashboardStep = 0;
      else if (state.dashboardStep === 4 || !schemaValid) state.dashboardStep = 1;
      else if (state.dashboardStep > 2 && metricProblem()) state.dashboardStep = 2;
      state.saveStatus = schemaValid ? 'Guardado en este navegador: progreso recuperado.' : 'Registro recuperado parcialmente: revise las tres casillas.';
      if (!schemaValid) state.alertMessage = 'El registro guardado tenía un checklist incompleto o inválido. Se conservó la información válida; verifique las tres casillas.';
    } catch (e) {
      state.storageError = 'No se pudo recuperar el progreso guardado. Puede continuar con una sesión nueva; revise el almacenamiento del navegador.';
      state.saveStatus = state.storageError;
      state.alertMessage = state.storageError;
    }
  }
  function saveStorage(cardId) {
    var key = storageKey(cardId);
    if (!key) { state.saveStatus = 'Conservado durante esta sesión; sin persistencia entre recargas.'; return true; }
    state.saveStatus = 'Guardando...';
    try {
      localStorage.setItem(key, JSON.stringify({schema: 2, checklist: state.dashboardData.checklist,
        title: state.dashboardData.title, code: state.dashboardData.code, errors: state.dashboardData.errors,
        notes: state.dashboardData.notes, dashboardStep: state.dashboardStep, closed: state.dashboardClosed}));
      state.storageError = '';
      state.saveStatus = 'Guardado en este navegador.';
      updateSaveStatus();
      return true;
    } catch (e) {
      state.storageError = 'Sin guardar: el navegador no permitió conservar los datos. Mantenga abierta esta página y vuelva a intentar.';
      state.saveStatus = state.storageError;
      updateSaveStatus();
      return false;
    }
  }
  function updateSaveStatus() {
    var status = document.getElementById('save-status');
    if (status && status.textContent !== state.saveStatus) status.textContent = state.saveStatus;
  }
  function cartSignature() {
    return JSON.stringify(state.cart.map(function (item) { return [item.id, item.qty, window.PRODUCTS[item.id].price]; }));
  }
  function cartChanged(beforeTotal) {
    state.cartRevision += 1;
    state.ackAllergens = false;
    state.pendingOrder = null;
    state.a01ReviewNote = '';
    state.a01PreviousTotal = beforeTotal;
    if (isV2 && state.cardId === 'IHC-A-01') state.a01ReviewRequired = state.cart.length > 0;
    state.lastStatus = 'Pedido actualizado. Total ' + formatMoney(calculateCartTotal()) + '.';
  }
  function startNewOrder() {
    cancelOperation();
    state.cart = [];
    state.pendingOrder = null;
    state.receipt = null;
    state.ackAllergens = false;
    state.offline = false;
    state.a01ReviewRequired = false;
    state.reviewedSignature = '';
    state.a01ReviewNote = '';
    state.lastStatus = 'Nuevo pedido vacío. Seleccione sus productos.';
    state.alertMessage = '';
    state.view = 'menu';
    render('page-heading');
  }

  function getScenario() {
    return window.SCENARIOS[state.cardId] || window.SCENARIOS['IHC-A-01'];
  }

  function calculateCartTotal() {
    var sum = 0;
    state.cart.forEach(function (c) {
      var prod = window.PRODUCTS[c.id];
      if (prod) sum += prod.price * c.qty;
    });
    return sum;
  }

  function formatMoney(amount) {
    return '$' + amount.toFixed(2);
  }

  // --- Renderizado Principal ---
  function render(focusId) {
    var app = document.getElementById('app');
    if (!app) return;

    var priorFocus = document.activeElement && document.activeElement.id;
    var scenario = getScenario();
    var isCafe = scenario.app === 'cafeu';

    var html = '';

    // Encabezado
    html += '<header class="app-header">';
    html += '  <div class="header-top">';
    html += '    <div class="app-title-group">';
    html += '      <h1>' + (isCafe ? 'CaféU · Servicio de Cafetería' : 'Dashboard UX · Registro de Pruebas') + '</h1>';
    html += '      <span class="version-badge">' + version + ' · ' + (isV2 ? 'Mejora con accesibilidad' : 'Prototipo base inicial') + '</span>';
    html += '    </div>';
    html += '    <div class="card-selector-group">';
    html += '      <label for="card-select">Tarjeta asignada:</label>';
    html += '      <select id="card-select" aria-label="Seleccionar tarjeta">';
    Object.keys(window.SCENARIOS).forEach(function (key) {
      var s = window.SCENARIOS[key];
      var selected = (key === state.cardId) ? ' selected' : '';
      html += '        <option value="' + key + '"' + selected + '>' + key + ': ' + s.title + '</option>';
    });
    html += '      </select>';
    html += '    </div>';
    html += '  </div>';

    // Banner de contexto
    html += '  <div class="scenario-info-banner">';
    html += '    <div><span class="crumb">[' + scenario.id + '] ' + scenario.title + '</span></div>';
    html += '    <div style="font-size:0.8rem; color:var(--text-secondary); margin-top:4px;">';
    html += '      <strong>Restricción:</strong> ' + scenario.constraint + ' | ';
    html += '      <strong>' + (isV2 ? 'Corrección v2:' : 'Defecto v1:') + '</strong> ' + (isV2 ? scenario.correctionV2 : scenario.defectV1);
    html += '    </div>';
    html += '  </div>';
    html += '</header>';

    // Cuerpo
    html += '<main>';
    if (state.lastStatus) html += '<p class="status info" role="status">' + escapeHtml(state.lastStatus) + '</p>';
    if (state.alertMessage) {
      html += '<div role="alert" class="status error" style="margin-bottom:16px;">' + escapeHtml(state.alertMessage) + '</div>';
    }

    if (isCafe) {
      html += renderCafeU();
    } else {
      html += renderDashboard();
    }
    html += '</main>';

    // Diálogo modal para IHC-A-02 (v2)
    if (state.dialogOpen && isV2) {
      html += renderDialog();
    }

    html = html.replace('<h2 class="page-title">', '<h2 class="page-title" id="page-heading" tabindex="-1">');
    app.innerHTML = html;
    bindEvents();
    app.querySelectorAll('header, main').forEach(function (region) {
      region.inert = isV2 && state.dialogOpen;
    });
    if (isV2 && !state.dialogOpen) {
      var focus = document.getElementById(focusId || priorFocus || '');
      if (focus) focus.focus();
      var heading = document.getElementById('page-heading');
      announce(state.alertMessage || state.lastStatus || (heading && heading.textContent) || 'Pantalla actualizada.');
    }
  }

  // --- Renderizado CaféU ---
  function renderCafeU() {
    var html = '';
    var totalActual = state.view === 'confirmation' && state.receipt ? state.receipt.total : calculateCartTotal();
    var totalFormatted = formatMoney(totalActual);

    // En v1 el total no cambia al variar cantidades (IHC-A-01)
    var displayedTotal = totalFormatted;
    if (!isV2 && state.cardId === 'IHC-A-01') {
      displayedTotal = state.v1CachedTotal;
    }

    // Sub-navegación
    html += '<nav class="sub-nav" aria-label="Navegación CaféU">';
    html += '  <button class="nav-btn' + (state.view === 'home' ? ' active' : '') + '" id="nav-home" data-action="goto" data-go="home">Inicio</button>';
    html += '  <button class="nav-btn' + (state.view === 'menu' ? ' active' : '') + '" id="nav-menu" data-action="goto" data-go="menu">Menú de hoy</button>';
    html += '  <button class="nav-btn' + (state.view === 'cart' ? ' active' : '') + '" id="nav-cart" data-action="goto" data-go="cart">Mi pedido (' + state.cart.length + ')</button>';
    html += '</nav>';

    // Vistas CaféU
    if (state.view === 'home') {
      html += '<h2 class="page-title">Bienvenido a CaféU</h2>';
      html += '<p style="margin-bottom:16px;">Pide tus alimentos antes de llegar y retira sin hacer filas.</p>';
      html += '<button class="btn-primary" data-action="goto" data-go="menu">Ver menú disponible</button>';
    } else if (state.view === 'menu') {
      html += '<h2 class="page-title">Menú disponible</h2>';
      html += '<div class="products-grid">';
      Object.keys(window.PRODUCTS).forEach(function (k) {
        var p = window.PRODUCTS[k];
        html += '<div class="product-card">';
        html += '  <div>';
        html += '    <h3>' + p.name + '</h3>';
        html += '    <p>' + p.desc + '</p>';
        if (p.allergens !== 'Ninguno') {
          html += '    <span class="allergens-tag">' + p.allergens + '</span>';
        }
        html += '  </div>';
        html += '  <div>';
        html += '    <div class="price">' + formatMoney(p.price) + '</div>';
        html += '    <button class="btn-secondary" id="detail-' + p.id + '" data-action="detail" data-item="' + p.id + '">Ver detalle</button> ';
        html += '    <button class="btn-primary" id="add-' + p.id + '" data-action="add" data-item="' + p.id + '">Agregar al pedido</button>';
        html += '  </div>';
        html += '</div>';
      });
      html += '</div>';
    } else if (state.view === 'detail') {
      var detail = window.PRODUCTS[state.detailItem];
      html += '<h2 class="page-title">' + escapeHtml(detail.name) + '</h2>';
      html += '<p>' + escapeHtml(detail.desc) + '</p><p class="price">' + formatMoney(detail.price) + '</p>';
      html += '<div class="status info" role="note"><strong>Ingredientes y alérgenos:</strong> ' + escapeHtml(detail.allergens) + '</div>';
      html += '<button class="btn-primary" id="detail-add" data-action="add" data-item="' + detail.id + '">Agregar al pedido</button> ';
      html += '<button class="btn-secondary" id="detail-back" data-action="detail-back">Volver sin cambiar el pedido (Esc)</button>';
    } else if (state.view === 'cart') {
      html += '<h2 class="page-title">Mi Pedido</h2>';

      // Simulación offline para IHC-A-06
      if (state.cardId === 'IHC-A-06') {
        html += '<div style="background:#fef3c7; border:1px solid #fde047; padding:10px 14px; border-radius:6px; margin-bottom:16px; font-size:0.875rem;">';
        html += '  <label style="display:flex; align-items:center; gap:8px; cursor:pointer;">';
        html += '    <input type="checkbox" id="offline"' + (state.offline ? ' checked' : '') + '> ';
        html += '    <strong>Simular fallo de red (conexión inestable / offline)</strong>';
        html += '  </label>';
        html += '</div>';
      }

      // Alerta de presupuesto para IHC-A-05
      var overBudget = totalActual > 4.25;
      if (overBudget && isV2 && state.cardId === 'IHC-A-05') {
        html += '<div class="status error" role="alert">';
        html += '  <span><strong>Alerta de presupuesto:</strong> El total actual (' + totalFormatted + ') excede el límite de USD 4,25. Ajuste las cantidades antes de continuar.</span>';
        html += '</div>';
      }

      if (state.cart.length === 0) {
        html += '<p style="color:var(--text-muted); margin:24px 0;">Tu carrito está vacío.</p>';
        html += '<button class="btn-secondary" data-action="goto" data-go="menu">Volver al menú</button>';
      } else {
        html += '<div class="cart-table">';
        state.cart.forEach(function (c) {
          var p = window.PRODUCTS[c.id];
          html += '<div class="cart-row">';
          html += '  <div class="cart-item-info">';
          html += '    <div class="cart-item-name">' + p.name + '</div>';
          html += '    <div class="cart-item-price">' + formatMoney(p.price) + ' c/u</div>';
          if (isV2 && state.cardId === 'IHC-A-01') html += '    <div class="cart-item-subtotal">Subtotal: ' + formatMoney(p.price * c.qty) + '</div>';
          html += '  </div>';
          html += '  <div class="cart-controls">';
          html += '    <button class="qty-btn" id="qty-minus-' + p.id + '" data-action="qty" data-item="' + p.id + '" data-delta="-1" aria-label="Disminuir ' + p.name + '">-</button>';
          html += '    <span class="qty-val">' + c.qty + '</span>';
          html += '    <button class="qty-btn" id="qty-plus-' + p.id + '" data-action="qty" data-item="' + p.id + '" data-delta="1" aria-label="Aumentar ' + p.name + '">+</button>';
          if (isV2) {
            html += '    <button class="btn-remove" id="remove-' + p.id + '" data-action="remove" data-item="' + p.id + '" aria-label="Quitar ' + p.name + ' del pedido">Quitar</button>';
          } else {
            // v1: botón sin nombre accesible "×"
            html += '    <button class="btn-remove" data-action="remove" data-item="' + p.id + '">×</button>';
          }
          html += '  </div>';
          html += '</div>';
        });
        html += '</div>';

        // Alérgenos para IHC-A-04
        var hasSanduche = state.cart.some(function (c) { return c.id === 'sanduche'; });
        if (hasSanduche) {
          html += '<div class="status info" style="margin-top:14px;">';
          html += '  <div>';
          html += '    <strong>Advertencia de alérgenos:</strong> El sánduche contiene Gluten y Lactosa.';
          if (isV2) {
            html += '    <div style="margin-top:8px;">';
            html += '      <label style="display:flex; align-items:center; gap:8px; cursor:pointer;">';
            html += '        <input type="checkbox" id="ack"' + (state.ackAllergens ? ' checked' : '') + '> He leído las advertencias de alérgenos y acepto el pedido';
            html += '      </label>';
            html += '    </div>';
          }
          html += '  </div>';
          html += '</div>';
        }

        html += '<div class="cart-summary">';
        html += '  <div class="summary-row">';
        html += '    <span>Total a pagar:</span>';
        html += '    <span id="total" class="summ-total">' + displayedTotal + '</span>';
        html += '  </div>';

        if (isV2 && state.cardId === 'IHC-A-01' && state.a01ReviewRequired) {
          var difference = totalActual - state.a01PreviousTotal;
          html += '  <div class="status info review-change" role="status" aria-live="polite">';
          html += '    <span>El pedido cambió: total anterior ' + formatMoney(state.a01PreviousTotal) + ', nuevo total ' + totalFormatted + '. ';
          html += 'Diferencia ' + (difference >= 0 ? '+' : '-') + formatMoney(Math.abs(difference)) + '. Revise antes de confirmar.</span>';
          html += '  </div><button class="btn-secondary" id="review-total" data-action="review-total">He revisado el nuevo total</button>';
        } else if (isV2 && state.cardId === 'IHC-A-01' && state.a01ReviewNote) {
          html += '  <div class="status success" role="status">' + state.a01ReviewNote + '</div>';
        }
        html += '  <div style="display:flex; justify-content:space-between; gap:12px; margin-top:16px;">';
        html += '    <button class="btn-secondary" data-action="goto" data-go="menu">Seguir comprando</button>';

        // Botón de confirmación
        if (isV2 && state.isSubmitting) {
          html += '    <button class="btn-primary" disabled>Procesando pedido...</button>';
        } else {
          html += '    <button class="btn-primary" data-action="confirm">Confirmar pedido</button>';
        }
        html += '  </div>';
        html += '</div>';
      }
    } else if (state.view === 'processing') {
      html += '<h2 class="page-title">Procesando pedido...</h2>';
      html += '<p role="status">Pedido pendiente: todavía no se ha confirmado. El contenido enviado permanece sin cambios.</p>';
      if (isV2) html += '<button class="btn-primary" disabled>Procesando pedido...</button>';
      if (!isV2 && state.cardId === 'IHC-A-06') {
        html += '<div style="margin-top:16px;">';
        html += '  <p style="color:#b91c1c;">(v1: botón sigue activo, permitiendo duplicación)</p>';
        html += '  <button class="btn-primary" data-action="confirm">Confirmar pedido</button>';
        html += '</div>';
      }
    } else if (state.view === 'error') {
      html += '<h2 class="page-title">No se pudo confirmar</h2>';
      html += '<div class="status error" role="alert">';
      html += '  <span>Error de conexión de red. No se envió la solicitud.</span>';
      html += '</div>';
      html += '<button class="btn-primary" data-action="retry">Reintentar</button>';
      html += ' <button class="btn-secondary" data-action="goto" data-go="cart">Volver a Mi Pedido</button>';
    } else if (state.view === 'confirmation') {
      if (isV2) {
        html += '<h2 class="page-title">Pedido recibido</h2>';
        html += '<div class="receipt-card">';
        html += '  <div class="order-badge" id="order-id">' + escapeHtml(state.receipt ? state.receipt.id : '') + '</div>';
        html += '  <p style="font-weight:600; margin-bottom:12px;">¡Gracias por tu compra! Tu pedido fue recibido en cocina.</p>';
        html += '  <section class="session-summary-box" aria-label="Resumen de la orden">';
        html += '    <h3 style="font-size:1rem; margin-bottom:8px;">Detalle del pedido</h3>';
        (state.receipt ? state.receipt.items : state.cart).forEach(function (c) {
          var p = c.name ? c : window.PRODUCTS[c.id];
          html += '    <div style="display:flex; justify-content:space-between; font-size:0.9rem; margin-bottom:4px;">';
          html += '      <span>' + c.qty + 'x ' + p.name + '</span>';
          html += '      <span>' + formatMoney(p.price * c.qty) + '</span>';
          html += '    </div>';
        });
        html += '    <div class="summary-row" style="margin-top:10px; border-top:1px solid var(--border-color); padding-top:8px;">';
        html += '      <span>Total abonado:</span>';
        html += '      <span class="summ-total">' + totalFormatted + '</span>';
        html += '    </div>';
        html += '  </section>';
        html += '  <p style="font-size:0.85rem; color:var(--text-muted); margin:12px 0;">Presenta el identificador de este pedido en el mostrador. No se guardaron datos personales ni financieros.</p>';
        html += '  <div style="font-size:0.85rem; color:#1e3a8a; margin:10px 0;">Solicitudes confirmadas en esta sesión: ' + state.confirmedCount + '</div>';
        html += '  <button class="btn-secondary" id="new-order" data-action="new-order">Hacer otro pedido</button>';
        html += '</div>';
      } else {
        // v1: título escueto "Listo" sin resumen ni número
        html += '<h2 class="page-title">Listo</h2>';
        html += '<div class="receipt-card">';
        html += '  <p>Tu orden ha sido procesada.</p>';
        html += '  <div style="font-size:0.85rem; color:#1e3a8a; margin:10px 0;">Solicitudes confirmadas en esta sesión: ' + state.confirmedCount + '</div>';
        html += '  <button class="btn-secondary" data-action="goto" data-go="menu">Volver</button>';
        html += '</div>';
      }
    }

    if (isV2 && state.isSubmitting) html = html.replace(/(<button class="nav-btn[^>]*)(>)/g, '$1 disabled$2');
    return html;
  }

  // --- Renderizado Dashboard UX ---
  function renderDashboard() {
    var html = '';
    var steps = ['1. Datos de sesión', '2. Checklist', '3. Observaciones', '4. Cierre'];

    // Stepper
    html += '<nav class="stepper" aria-label="Etapas de la evaluación">';
    steps.forEach(function (s, idx) {
      var active = (idx === state.dashboardStep || (state.dashboardStep === 4 && idx === 3));
      var ariaCurrent = (active && isV2) ? ' aria-current="step"' : '';
      var activeClass = active ? ' active' : '';

      html += '<button class="step-item' + activeClass + '" id="step-' + idx + '" data-action="step" data-step="' + idx + '"' + (isV2 && (state.dashboardClosed || state.dashboardFinishing) ? ' disabled' : '') + ariaCurrent + '>';
      html += '  <span class="step-num">' + (idx + 1) + '</span>';
      html += '  <span>' + s + '</span>';
      if (active && isV2) {
        html += ' <span style="font-size:0.75rem; font-weight:700;">(actual)</span>';
      }
      html += '</button>';
    });
    html += '</nav>';

    if (isV2) html += '<p id="save-status" class="save-status" role="status">' + escapeHtml(state.saveStatus) + '</p>';

    // Contenido del paso en tarjeta Card UI (con clase .dashboard-card para A11)
    html += '<div class="dashboard-card" style="border:1px solid var(--border-color); border-radius:var(--radius); padding:20px; background:#fff;">';

    if (state.dashboardStep === 0) {
      html += '<h2 class="page-title">1. Datos de sesión</h2>';
      if (isV2) html += '<section class="procedure" aria-label="Procedimiento antes de iniciar"><h3>Antes de iniciar</h3><p>1. Defina el objetivo y un código P-001 a P-999. 2. Complete el checklist. 3. Registre errores y observaciones sin ayudar al participante. 4. Revise y cierre. Puede volver para corregir; las marcas se conservan.</p><p>' + (storageKey(state.cardId) ? 'A08 y A12 guardan el progreso en este navegador; compruebe el indicador de guardado.' : 'En esta tarjeta el progreso se conserva mientras la página siga abierta.') + '</p></section>';
      html += '<div class="form-group">';
      html += '  <label for="title">Título de la prueba / objetivo:</label>';
      html += '  <input type="text" id="title" maxlength="250" class="form-control" value="' + escapeHtml(state.dashboardData.title) + '" placeholder="Ej: Prueba de usabilidad módulo CaféU">';
      html += '</div>';

      if (isV2) {
        // v2: código seudónimo (#code) para anonimato (IHC-A-09)
        html += '<div class="form-group">';
        html += '  <label for="code">Código anónimo del participante (ej: P-001):</label>';
        html += '  <input type="text" id="code" maxlength="5" pattern="P-[0-9]{3}" class="form-control" value="' + escapeHtml(state.dashboardData.code) + '" placeholder="P-001">';
        html += '  <small style="color:var(--text-muted); font-size:0.8rem;">Cumple norma de anonimato: no ingrese nombres ni cédulas.</small>';
        html += '</div>';
      } else {
        // v1: exige nombre real (#name)
        html += '<div class="form-group">';
        html += '  <label for="name">Nombre y apellido completo del participante:</label>';
        html += '  <input type="text" id="name" class="form-control" value="' + escapeHtml(state.dashboardData.name) + '" placeholder="Nombre completo">';
        html += '</div>';
      }

      html += '<div style="margin-top:20px; display:flex; justify-content:flex-end;">';
      html += '  <button class="btn-primary" id="next-step" data-action="next">Siguiente: Checklist</button>';
      html += '</div>';

    } else if (state.dashboardStep === 1) {
      html += '<h2 class="page-title">2. Checklist de verificación</h2>';
      html += '<p style="font-size:0.9rem; margin-bottom:12px;">Complete todos los ítems obligatorios antes de continuar.</p>';

      var items = [
        'Explicar objetivo y tiempo límite al participante',
        'Verificar visualización adecuada a 360 px',
        'Validar registro de errores sin interrupción'
      ];

      html += '<div class="checkbox-group">';
      items.forEach(function (label, idx) {
        var checked = state.dashboardData.checklist[idx] ? ' checked' : '';
        html += '<label class="checkbox-label" for="check-' + idx + '">';
        html += '  <input type="checkbox" id="check-' + idx + '"' + checked + ' data-check-index="' + idx + '">';
        html += '  <span><strong>Ítem ' + (idx + 1) + ':</strong> ' + label + '</span>';
        html += '</label>';
      });
      html += '</div>';

      html += '<div style="margin-top:20px; display:flex; justify-content:space-between;">';
      html += '  <button class="btn-secondary" id="previous-step" data-action="prev">Anterior</button>';
      html += '  <button class="btn-primary" id="next-step" data-action="next">Siguiente: Observaciones</button>';
      html += '</div>';

    } else if (state.dashboardStep === 2) {
      html += '<h2 class="page-title">3. Registro de observaciones</h2>';
      html += '<div class="form-group">';
      html += '  <label for="errors">Número de errores observados:</label>';
      html += '  <input type="number" min="0" step="1" inputmode="numeric" id="errors" class="form-control" value="' + escapeHtml(state.dashboardData.errors) + '" placeholder="0">';
      html += '</div>';
      html += '<div class="form-group">';
      html += '  <label for="notes">Notas y citas del participante:</label>';
      html += '  <textarea id="notes" maxlength="4000" class="form-control" rows="4" placeholder="Observaciones cualitativas...">' + escapeHtml(state.dashboardData.notes) + '</textarea>';
      html += '</div>';

      html += '<div style="margin-top:20px; display:flex; justify-content:space-between;">';
      html += '  <button class="btn-secondary" id="previous-step" data-action="prev">Anterior</button>';
      html += '  <button class="btn-primary" id="next-step" data-action="next">Siguiente: Revisión y Cierre</button>';
      html += '</div>';

    } else if (state.dashboardStep === 3) {
      html += '<h2 class="page-title">4. Revisión y Cierre</h2>';
      html += '<div class="session-summary-box">';
      html += '  <h3 style="font-size:1rem; margin-bottom:10px;">Resumen de la sesión</h3>';
      html += '  <p><strong>Título:</strong> ' + escapeHtml(state.dashboardData.title || '(Sin título)') + '</p>';
      html += '  <p><strong>Participante:</strong> ' + escapeHtml(isV2 ? (state.dashboardData.code || '(Sin código)') : (state.dashboardData.name || '(Sin nombre)')) + '</p>';

      var checkedCount = state.dashboardData.checklist.filter(function (x) { return x; }).length;
      html += '  <p><strong>Checklist verificado:</strong> ' + checkedCount + ' de 3 ítems</p>';
      if (isV2 && state.cardId === 'IHC-A-12') {
        html += '  <p role="status">' + (checkedCount === 3 ? 'Todas las verificaciones obligatorias están completas.' : 'Pendientes: ' + (3 - checkedCount) + ' ítem(s). No se puede finalizar todavía.') + '</p>';
        if (checkedCount < 3) html += '  <button class="btn-secondary" data-action="step" data-step="1">Completar checklist pendiente</button>';
      }
      html += '  <p><strong>Errores:</strong> ' + escapeHtml(state.dashboardData.errors || '0') + '</p>';
      html += '</div>';

      html += '<div style="margin-top:20px; display:flex; justify-content:space-between;">';
      html += '  <button class="btn-secondary" id="previous-step" data-action="prev">Anterior</button>';
      if (isV2 && state.dashboardFinishing) {
        html += '  <span class="status info" role="status">Verificando checklist…</span>';
        html += '  <button class="btn-primary" disabled>Verificando…</button>';
      } else {
        html += '  <button class="btn-primary" id="finish-session" data-action="finish">Finalizar sesión</button>';
      }
      html += '</div>';

    } else if (state.dashboardStep === 4) {
      html += '<h2 class="page-title">Sesión cerrada</h2>';
      html += '<div class="status success">';
      html += '  <span>La sesión ha sido completada con los tres requisitos verificados. Consulte el indicador de guardado para conocer su conservación.</span>';
      html += '</div>';
      html += '<button class="btn-secondary" id="restart-session" data-action="restart">Iniciar nueva sesión</button>';
    }

    html += '</div>';
    return html;
  }

  // --- Renderizado Diálogo Modal de Quitar (IHC-A-02 v2) ---
  function renderDialog() {
    var p = window.PRODUCTS[state.itemToRemove] || { name: 'producto' };
    var html = '';
    html += '<div class="dialog-backdrop" id="modal-backdrop">';
    html += '  <div class="dialog-content" tabindex="-1" role="dialog" aria-modal="true" aria-labelledby="dialog-title" aria-describedby="dialog-desc">';
    html += '    <h3 id="dialog-title" class="dialog-title">¿Quitar del pedido?</h3>';
    html += '    <p id="dialog-desc" class="dialog-desc">¿Estás seguro de que deseas eliminar <strong>' + p.name + '</strong> de tu carrito? Esta acción no se puede deshacer.</p>';
    html += '    <div class="dialog-actions">';
    html += '      <button class="btn-secondary" id="remove-cancel" data-action="remove-cancel">Cancelar (Esc)</button>';
    html += '      <button class="btn-primary" id="remove-ok" data-action="remove-ok">Quitar producto</button>';
    html += '    </div>';
    html += '  </div>';
    html += '</div>';
    return html;
  }

  // --- Manejadores de Eventos ---
  function bindEvents() {
    var select = document.getElementById('card-select');
    if (select) select.addEventListener('change', function (event) {
      cancelOperation();
      state.cardId = event.target.value;
      state.alertMessage = '';
      state.lastStatus = '';
      state.view = 'home';
      state.dashboardStep = 0;
      state.dashboardClosed = false;
      state.dialogOpen = false;
      state.itemToRemove = null;
      state.removalOpenerId = null;
      state.cart = [];
      state.receipt = null;
      state.pendingOrder = null;
      state.confirmedCount = 0;
      state.ackAllergens = false;
      state.offline = false;
      state.a01ReviewRequired = false;
      state.reviewedSignature = '';
      state.a01ReviewNote = '';
      state.dashboardData = emptyDashboard();
      state.saveStatus = 'Sin guardar: nueva sesión.';
      state.storageError = '';
      loadStorage(state.cardId);
      render('card-select');
    });
    var offline = document.getElementById('offline');
    if (offline) offline.addEventListener('change', function (event) { if (!state.isSubmitting) state.offline = event.target.checked; });
    var ack = document.getElementById('ack');
    if (ack) ack.addEventListener('change', function (event) { if (!state.isSubmitting) state.ackAllergens = event.target.checked; });
    ['title', 'code', 'name', 'errors', 'notes'].forEach(function (field) {
      var input = document.getElementById(field);
      if (input) input.addEventListener('input', function (event) {
        if (state.dashboardFinishing || state.dashboardClosed) return;
        state.dashboardData[field] = event.target.value;
        saveStorage(state.cardId);
      });
    });
    document.querySelectorAll('[data-check-index]').forEach(function (checkbox) {
      checkbox.addEventListener('change', function (event) {
        if (state.dashboardFinishing || state.dashboardClosed) return;
        state.dashboardData.checklist[Number(event.target.dataset.checkIndex)] = event.target.checked === true;
        saveStorage(state.cardId);
      });
    });
    if (isV2 && state.dialogOpen) {
      var cancel = document.getElementById('remove-cancel');
      if (cancel) cancel.focus();
    }
  }

  document.addEventListener('click', function (event) {
    var btn = event.target.closest('[data-action]');
    if (!btn || btn.disabled) return;
    var action = btn.dataset.action;
    if (isV2 && state.dialogOpen && action !== 'remove-ok' && action !== 'remove-cancel') return;
    if (isV2 && (state.isSubmitting || state.dashboardFinishing)) return;
    if (isV2 && state.receipt && ['add', 'qty', 'remove', 'confirm', 'retry'].indexOf(action) >= 0) {
      state.view = 'confirmation';
      state.alertMessage = 'Este pedido ya fue recibido. Para otra compra elija Hacer otro pedido.';
      render('new-order');
      return;
    }
    if (action === 'goto') {
      state.alertMessage = '';
      state.view = state.receipt && btn.dataset.go === 'cart' ? 'confirmation' : btn.dataset.go;
      render('page-heading');
    } else if (action === 'new-order') {
      startNewOrder();
    } else if (action === 'detail') {
      state.detailItem = btn.dataset.item;
      state.detailReturn = state.view;
      state.view = 'detail';
      render('page-heading');
    } else if (action === 'detail-back') {
      state.view = state.detailReturn;
      render('detail-' + state.detailItem);
    } else if (action === 'add') {
      var before = calculateCartTotal();
      var existing = state.cart.find(function (item) { return item.id === btn.dataset.item; });
      if (existing) existing.qty += 1;
      else if (window.PRODUCTS[btn.dataset.item]) state.cart.push({id: btn.dataset.item, qty: 1});
      if (isV2) cartChanged(before);
      else if (state.cardId === 'IHC-A-01') state.v1CachedTotal = formatMoney(calculateCartTotal());
      render(btn.id);
    } else if (action === 'qty') {
      var item = state.cart.find(function (entry) { return entry.id === btn.dataset.item; });
      if (!item) return;
      var delta = Number(btn.dataset.delta);
      if (delta !== 1 && delta !== -1) return;
      if (isV2 && state.cardId === 'IHC-A-02' && delta === -1 && item.qty === 1) { openRemoval(item.id, btn.id); return; }
      var previous = calculateCartTotal();
      item.qty += delta;
      state.cart = state.cart.filter(function (entry) { return entry.qty > 0; });
      if (isV2) cartChanged(previous);
      render(item.qty > 0 ? btn.id : 'page-heading');
    } else if (action === 'remove') {
      if (isV2) openRemoval(btn.dataset.item, btn.id);
      else { state.cart = state.cart.filter(function (entry) { return entry.id !== btn.dataset.item; }); render(); }
    } else if (action === 'remove-ok') {
      if (isV2 && state.dialogOpen) closeRemoval(true);
    } else if (action === 'remove-cancel') {
      if (isV2 && state.dialogOpen) closeRemoval(false);
    } else if (action === 'review-total') {
      state.reviewedSignature = cartSignature();
      state.a01ReviewRequired = false;
      state.a01ReviewNote = 'Desglose revisado. Puede confirmar este pedido mientras no cambie.';
      state.lastStatus = '';
      state.alertMessage = '';
      render();
      var confirm = document.querySelector('button[data-action="confirm"]');
      if (confirm) confirm.focus();
    } else if (action === 'confirm') handleConfirm();
    else if (action === 'retry') { state.offline = false; handleConfirm(); }
    else if (action === 'next') handleDashboardNext();
    else if (action === 'prev') handleDashboardPrev();
    else if (action === 'step') handleStepClick(Number(btn.dataset.step));
    else if (action === 'finish') handleDashboardFinish();
    else if (action === 'restart') {
      if (storageKey(state.cardId)) {
        try { localStorage.removeItem(storageKey(state.cardId)); }
        catch (e) { state.alertMessage = 'No se pudo borrar el registro anterior. Mantenga la sesión y revise el almacenamiento antes de iniciar otra.'; render('restart-session'); return; }
      }
      cancelOperation();
      state.dashboardStep = 0;
      state.dashboardClosed = false;
      state.dashboardData = emptyDashboard();
      state.alertMessage = '';
      state.lastStatus = '';
      state.saveStatus = 'Sin guardar: nueva sesión.';
      state.storageError = '';
      render('title');
    }
  });

  // Issue #7: diálogo modal y restitución del foco tras reconstruir el DOM.
  function openRemoval(itemId, openerId) {
    if (state.dialogOpen || !state.cart.some(function (c) { return c.id === itemId; })) return;
    state.itemToRemove = itemId;
    state.removalOpenerId = openerId || 'remove-' + itemId;
    state.dialogOpen = true;
    render();
  }

  function closeRemoval(confirmed) {
    var itemId = state.itemToRemove;
    var openerId = state.removalOpenerId;
    var index = state.cart.findIndex(function (c) { return c.id === itemId; });
    if (confirmed) {
      var previousTotal = calculateCartTotal();
      state.cart = state.cart.filter(function (c) { return c.id !== itemId; });
      cartChanged(previousTotal);
    }
    state.dialogOpen = false;
    state.itemToRemove = null;
    state.removalOpenerId = null;
    render();
    var target = !confirmed ? document.getElementById(openerId) : null;
    if (!target && state.cart.length) {
      var next = state.cart[Math.min(Math.max(index, 0), state.cart.length - 1)];
      target = document.getElementById('remove-' + next.id);
    }
    if (!target) target = document.querySelector('main [data-action="goto"][data-go="menu"]');
    if (target) target.focus();
  }

  document.addEventListener('keydown', function (e) {
    if (!isV2) return;
    if (!state.dialogOpen) {
      if (e.key === 'Escape' && !state.isSubmitting && !state.dashboardFinishing) {
        if (state.view === 'detail') { e.preventDefault(); state.view = state.detailReturn; render('detail-' + state.detailItem); }
        else if (getScenario().app === 'dashboard' && state.dashboardStep > 0 && !state.dashboardClosed) { e.preventDefault(); handleDashboardPrev(); }
      }
      return;
    }
    if (e.key === 'Escape') {
      e.preventDefault();
      closeRemoval(false);
      return;
    }
    if (e.key === 'Tab') {
      var first = document.getElementById('remove-cancel');
      var last = document.getElementById('remove-ok');
      if (e.shiftKey && (document.activeElement === first || document.activeElement !== last)) {
        e.preventDefault();
        if (last) last.focus();
      } else if (!e.shiftKey && document.activeElement !== first) {
        e.preventDefault();
        if (first) first.focus();
      }
    }
  });

  document.addEventListener('focusin', function (e) {
    if (!isV2 || !state.dialogOpen) return;
    var dialog = document.querySelector('[role="dialog"]');
    if (dialog && !dialog.contains(e.target)) {
      var cancel = document.getElementById('remove-cancel');
      if (cancel) cancel.focus();
    }
  });

  // Confirmación local de una intención de pedido; el prototipo no usa backend.
  function handleConfirm() {
    state.alertMessage = '';
    if (isV2 && (state.isSubmitting || state.receipt)) return;
    if (isV2 && !state.cart.length) {
      state.alertMessage = 'Agregue al menos un producto antes de confirmar.';
      state.view = 'cart'; render('page-heading'); return;
    }
    if (isV2 && state.cardId === 'IHC-A-01' && (state.a01ReviewRequired || state.reviewedSignature !== cartSignature())) {
      state.a01ReviewRequired = true;
      state.alertMessage = 'El importe cambió: revise el nuevo total antes de confirmar el pedido.';
      state.view = 'cart'; render('review-total'); return;
    }
    var hasSanduche = state.cart.some(function (entry) { return entry.id === 'sanduche'; });
    if (isV2 && hasSanduche && !state.ackAllergens) {
      state.alertMessage = 'Debe revisar las advertencias de alérgenos y aceptarlas antes de confirmar.';
      state.view = 'cart'; render('ack'); return;
    }
    if (isV2 && state.cardId === 'IHC-A-05' && calculateCartTotal() > 4.25) {
      state.alertMessage = 'Presupuesto excedido: límite USD 4,25. Ajuste las cantidades antes de confirmar.';
      state.view = 'cart'; render('page-heading'); return;
    }
    if (!isV2) {
      state.confirmedCount += 1; state.view = 'processing'; render();
      setTimeout(function () { state.view = 'confirmation'; render(); }, 800); return;
    }
    if (!state.pendingOrder) {
      state.orderSequence += 1;
      state.pendingOrder = {id: 'CU-' + Date.now().toString(36).toUpperCase() + '-' + state.orderSequence,
        total: calculateCartTotal(), signature: cartSignature(), items: state.cart.map(function (entry) {
          var product = window.PRODUCTS[entry.id];
          return {id: entry.id, qty: entry.qty, name: product.name, price: product.price};
        })};
    }
    state.isSubmitting = true;
    state.view = 'processing';
    state.lastStatus = '';
    var token = ++operation, card = state.cardId, offline = state.offline;
    render('page-heading');
    activeTimer = setTimeout(function () {
      if (token !== operation || card !== state.cardId) return;
      activeTimer = null; state.isSubmitting = false;
      if (offline) state.view = 'error';
      else {
        state.confirmedCount += 1;
        state.receipt = JSON.parse(JSON.stringify(state.pendingOrder));
        state.view = 'confirmation';
      }
      render('page-heading');
    }, 700);
  }

  function reportProblem(problem) {
    state.dashboardFinishing = false;
    state.dashboardStep = problem.step;
    state.alertMessage = problem.message;
    saveStorage(state.cardId);
    render(problem.field);
  }
  function navigationProblem(target) {
    var problem = target > 0 ? dataProblem() : null;
    if (!problem && target > 1 && state.cardId === 'IHC-A-07') problem = checklistProblem();
    if (!problem && target > 2) problem = metricProblem();
    return problem;
  }
  function handleStepClick(target) {
    if (!Number.isInteger(target) || target < 0 || target > 3 || state.dashboardFinishing || state.dashboardClosed) return;
    if (isV2 && target > state.dashboardStep) {
      var problem = navigationProblem(target);
      if (problem) { reportProblem(problem); return; }
    }
    state.alertMessage = '';
    state.dashboardStep = target;
    saveStorage(state.cardId);
    render('page-heading');
  }
  function handleDashboardNext() { handleStepClick(Math.min(3, state.dashboardStep + 1)); }
  function handleDashboardPrev() {
    if (!isV2 && state.cardId === 'IHC-A-08') state.dashboardData.checklist = [false, false, false];
    handleStepClick(Math.max(0, state.dashboardStep - 1));
  }
  function finishProblem() { return dataProblem() || metricProblem() || checklistProblem(); }
  function handleDashboardFinish() {
    if (state.dashboardFinishing || state.dashboardClosed) return;
    if (!isV2) { setTimeout(function () { state.dashboardStep = 4; render(); }, 300); return; }
    var problem = finishProblem();
    if (problem) { reportProblem(problem); return; }
    state.alertMessage = '';
    state.dashboardFinishing = true;
    state.dashboardStep = 3;
    var token = ++operation, card = state.cardId;
    render('page-heading');
    activeTimer = setTimeout(function () {
      if (token !== operation || card !== state.cardId) return;
      activeTimer = null; state.dashboardFinishing = false;
      var changed = finishProblem();
      if (changed) { reportProblem(changed); return; }
      state.dashboardClosed = true; state.dashboardStep = 4;
      if (!saveStorage(state.cardId)) {
        state.dashboardClosed = false; state.dashboardStep = 3;
        state.alertMessage = 'Cierre no confirmado: no se pudo guardar. Se mantienen sus datos; vuelva a intentar Finalizar sesión.';
        render('finish-session'); return;
      }
      render('page-heading');
    }, 300);
  }

  // Exponer API y ejecutar inicialización
  window.App = {
    state: state,
    render: render
  };

  document.addEventListener('DOMContentLoaded', function () {
    loadStorage(state.cardId);
    render();
  });

  // Si ya cargó el DOM
  if (document.readyState === 'complete' || document.readyState === 'interactive') {
    loadStorage(state.cardId);
    render();
  }
})();
