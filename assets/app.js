/**
 * Lógica interactiva del prototipo IHC (CaféU y Dashboard UX)
 * Soporta versiones v1 (con fallos intencionales para reproducción)
 * y v2 (con correcciones verificables, accesibilidad y WCAG 2.1 AA).
 * 
 * Autor: Pablo Lozada (Fase 4 · Prototipo v2)
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
    dashboardData: {
      title: '',
      code: '',
      name: '',
      checklist: [false, false, false],
      errors: '',
      notes: ''
    }
  };

  // Inicializar almacenamiento para IHC-A-12
  function loadStorage(cardId) {
    if (cardId === 'IHC-A-12' && isV2) {
      try {
        var raw = localStorage.getItem('ihc_a12_state');
        if (raw) {
          var saved = JSON.parse(raw);
          if (saved && Array.isArray(saved.checklist)) {
            state.dashboardData.checklist = saved.checklist;
          }
          if (saved && saved.title) state.dashboardData.title = saved.title;
          if (saved && saved.code) state.dashboardData.code = saved.code;
        }
      } catch (e) {
        console.warn('LocalStorage error:', e);
      }
    }
  }

  function saveStorage(cardId) {
    if (cardId === 'IHC-A-12' && isV2) {
      try {
        localStorage.setItem('ihc_a12_state', JSON.stringify({
          checklist: state.dashboardData.checklist,
          title: state.dashboardData.title,
          code: state.dashboardData.code
        }));
      } catch (e) {
        console.warn('LocalStorage save error:', e);
      }
    }
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
  function render() {
    var app = document.getElementById('app');
    if (!app) return;

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
    if (state.alertMessage) {
      html += '<div role="alert" class="status error" style="margin-bottom:16px;">' + state.alertMessage + '</div>';
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

    app.innerHTML = html;
    bindEvents();
    app.querySelectorAll('header, main').forEach(function (region) {
      region.inert = isV2 && state.dialogOpen;
    });
  }

  // --- Renderizado CaféU ---
  function renderCafeU() {
    var html = '';
    var totalActual = calculateCartTotal();
    var totalFormatted = formatMoney(totalActual);

    // En v1 el total no cambia al variar cantidades (IHC-A-01)
    var displayedTotal = totalFormatted;
    if (!isV2 && state.cardId === 'IHC-A-01') {
      displayedTotal = state.v1CachedTotal;
    }

    // Sub-navegación
    html += '<nav class="sub-nav" aria-label="Navegación CaféU">';
    html += '  <button class="nav-btn' + (state.view === 'home' ? ' active' : '') + '" data-action="goto" data-go="home">Inicio</button>';
    html += '  <button class="nav-btn' + (state.view === 'menu' ? ' active' : '') + '" data-action="goto" data-go="menu">Menú de hoy</button>';
    html += '  <button class="nav-btn' + (state.view === 'cart' ? ' active' : '') + '" data-action="goto" data-go="cart">Mi pedido (' + state.cart.length + ')</button>';
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
        html += '    <button class="btn-primary" data-action="add" data-item="' + p.id + '">Agregar al pedido</button>';
        html += '  </div>';
        html += '</div>';
      });
      html += '</div>';
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
      if (overBudget && isV2) {
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
          html += '  </div>';
          html += '  <div class="cart-controls">';
          html += '    <button class="qty-btn" id="qty-minus-' + p.id + '" data-action="qty" data-item="' + p.id + '" data-delta="-1" aria-label="Disminuir ' + p.name + '">-</button>';
          html += '    <span class="qty-val">' + c.qty + '</span>';
          html += '    <button class="qty-btn" data-action="qty" data-item="' + p.id + '" data-delta="1" aria-label="Aumentar ' + p.name + '">+</button>';
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
      html += '<p>Por favor espera un momento mientras enviamos tu solicitud a la cafetería.</p>';
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
        html += '  <div class="order-badge">#CU-104</div>';
        html += '  <p style="font-weight:600; margin-bottom:12px;">¡Gracias por tu compra! Tu pedido fue recibido en cocina.</p>';
        html += '  <section class="session-summary-box" aria-label="Resumen de la orden">';
        html += '    <h3 style="font-size:1rem; margin-bottom:8px;">Detalle del pedido</h3>';
        state.cart.forEach(function (c) {
          var p = window.PRODUCTS[c.id];
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
        html += '  <p style="font-size:0.85rem; color:var(--text-muted); margin:12px 0;">Presenta tu número #CU-104 en el mostrador. No se guardaron datos personales ni financieros.</p>';
        html += '  <div style="font-size:0.85rem; color:#1e3a8a; margin:10px 0;">Solicitudes confirmadas en esta sesión: ' + state.confirmedCount + '</div>';
        html += '  <button class="btn-secondary" data-action="goto" data-go="menu">Hacer otro pedido</button>';
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

    return html;
  }

  // --- Renderizado Dashboard UX ---
  function renderDashboard() {
    var html = '';
    var steps = ['1. Datos de sesión', '2. Checklist', '3. Observaciones', '4. Cierre'];

    // Stepper
    html += '<nav class="stepper" aria-label="Etapas de la evaluación">';
    steps.forEach(function (s, idx) {
      var active = (idx === state.dashboardStep);
      var ariaCurrent = (active && isV2) ? ' aria-current="step"' : '';
      var activeClass = active ? ' active' : '';

      html += '<button class="step-item' + activeClass + '" data-action="step" data-step="' + idx + '"' + ariaCurrent + '>';
      html += '  <span class="step-num">' + (idx + 1) + '</span>';
      html += '  <span>' + s + '</span>';
      if (active && isV2) {
        html += ' <span style="font-size:0.75rem; font-weight:700;">(actual)</span>';
      }
      html += '</button>';
    });
    html += '</nav>';

    // Contenido del paso en tarjeta Card UI (con clase .dashboard-card para A11)
    html += '<div class="dashboard-card" style="border:1px solid var(--border-color); border-radius:var(--radius); padding:20px; background:#fff;">';

    if (state.dashboardStep === 0) {
      html += '<h2 class="page-title">1. Datos de sesión</h2>';
      html += '<div class="form-group">';
      html += '  <label for="title">Título de la prueba / objetivo:</label>';
      html += '  <input type="text" id="title" class="form-control" value="' + state.dashboardData.title + '" placeholder="Ej: Prueba de usabilidad módulo CaféU">';
      html += '</div>';

      if (isV2) {
        // v2: código seudónimo (#code) para anonimato (IHC-A-09)
        html += '<div class="form-group">';
        html += '  <label for="code">Código anónimo del participante (ej: P-001):</label>';
        html += '  <input type="text" id="code" class="form-control" value="' + state.dashboardData.code + '" placeholder="P-001">';
        html += '  <small style="color:var(--text-muted); font-size:0.8rem;">Cumple norma de anonimato: no ingrese nombres ni cédulas.</small>';
        html += '</div>';
      } else {
        // v1: exige nombre real (#name)
        html += '<div class="form-group">';
        html += '  <label for="name">Nombre y apellido completo del participante:</label>';
        html += '  <input type="text" id="name" class="form-control" value="' + state.dashboardData.name + '" placeholder="Nombre completo">';
        html += '</div>';
      }

      html += '<div style="margin-top:20px; display:flex; justify-content:flex-end;">';
      html += '  <button class="btn-primary" data-action="next">Siguiente: Checklist</button>';
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
      html += '  <button class="btn-secondary" data-action="prev">Anterior</button>';
      html += '  <button class="btn-primary" data-action="next">Siguiente: Observaciones</button>';
      html += '</div>';

    } else if (state.dashboardStep === 2) {
      html += '<h2 class="page-title">3. Registro de observaciones</h2>';
      html += '<div class="form-group">';
      html += '  <label for="errors">Número de errores observados:</label>';
      html += '  <input type="text" id="errors" class="form-control" value="' + state.dashboardData.errors + '" placeholder="0">';
      html += '</div>';
      html += '<div class="form-group">';
      html += '  <label for="notes">Notas y citas del participante:</label>';
      html += '  <textarea id="notes" class="form-control" rows="4" placeholder="Observaciones cualitativas...">' + state.dashboardData.notes + '</textarea>';
      html += '</div>';

      html += '<div style="margin-top:20px; display:flex; justify-content:space-between;">';
      html += '  <button class="btn-secondary" data-action="prev">Anterior</button>';
      html += '  <button class="btn-primary" data-action="next">Siguiente: Revisión y Cierre</button>';
      html += '</div>';

    } else if (state.dashboardStep === 3) {
      html += '<h2 class="page-title">4. Revisión y Cierre</h2>';
      html += '<div class="session-summary-box">';
      html += '  <h3 style="font-size:1rem; margin-bottom:10px;">Resumen de la sesión</h3>';
      html += '  <p><strong>Título:</strong> ' + (state.dashboardData.title || '(Sin título)') + '</p>';
      html += '  <p><strong>Participante:</strong> ' + (isV2 ? (state.dashboardData.code || '(Sin código)') : (state.dashboardData.name || '(Sin nombre)')) + '</p>';

      var checkedCount = state.dashboardData.checklist.filter(function (x) { return x; }).length;
      html += '  <p><strong>Checklist verificado:</strong> ' + checkedCount + ' de 3 ítems</p>';
      html += '  <p><strong>Errores:</strong> ' + (state.dashboardData.errors || '0') + '</p>';
      html += '</div>';

      html += '<div style="margin-top:20px; display:flex; justify-content:space-between;">';
      html += '  <button class="btn-secondary" data-action="prev">Anterior</button>';
      html += '  <button class="btn-primary" data-action="finish">Finalizar sesión</button>';
      html += '</div>';

    } else if (state.dashboardStep === 4) {
      html += '<h2 class="page-title">Sesión cerrada</h2>';
      html += '<div class="status success">';
      html += '  <span>La sesión ha sido completada y guardada exitosamente con todos los requisitos verificados.</span>';
      html += '</div>';
      html += '<button class="btn-secondary" data-action="restart">Iniciar nueva sesión</button>';
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
    // Selector de tarjeta
    var cardSelect = document.getElementById('card-select');
    if (cardSelect) {
      cardSelect.addEventListener('change', function (e) {
        state.cardId = e.target.value;
        state.alertMessage = '';
        state.view = 'home';
        state.dashboardStep = 0;
        state.dialogOpen = false;
        state.cart = [];
        loadStorage(state.cardId);
        render();
      });
    }

    // Checkbox offline (IHC-A-06)
    var offlineCheckbox = document.getElementById('offline');
    if (offlineCheckbox) {
      offlineCheckbox.addEventListener('change', function (e) {
        state.offline = e.target.checked;
      });
    }

    // Checkbox alérgenos (IHC-A-04)
    var ackCheckbox = document.getElementById('ack');
    if (ackCheckbox) {
      ackCheckbox.addEventListener('change', function (e) {
        state.ackAllergens = e.target.checked;
      });
    }

    // Inputs de dashboard (sincronizar valor)
    var titleInput = document.getElementById('title');
    if (titleInput) {
      titleInput.addEventListener('input', function (e) {
        state.dashboardData.title = e.target.value;
        saveStorage(state.cardId);
      });
    }

    var codeInput = document.getElementById('code');
    if (codeInput) {
      codeInput.addEventListener('input', function (e) {
        state.dashboardData.code = e.target.value;
        saveStorage(state.cardId);
      });
    }

    var nameInput = document.getElementById('name');
    if (nameInput) {
      nameInput.addEventListener('input', function (e) {
        state.dashboardData.name = e.target.value;
      });
    }

    var errorsInput = document.getElementById('errors');
    if (errorsInput) {
      errorsInput.addEventListener('input', function (e) {
        state.dashboardData.errors = e.target.value;
      });
    }

    var notesInput = document.getElementById('notes');
    if (notesInput) {
      notesInput.addEventListener('input', function (e) {
        state.dashboardData.notes = e.target.value;
      });
    }

    // Checkboxes del checklist
    var checkBoxes = document.querySelectorAll('[data-check-index]');
    checkBoxes.forEach(function (cb) {
      cb.addEventListener('change', function (e) {
        var idx = parseInt(e.target.dataset.checkIndex, 10);
        state.dashboardData.checklist[idx] = e.target.checked;
        saveStorage(state.cardId);
      });
    });

    // Foco automático en botón aceptar del diálogo modal
    if (state.dialogOpen && isV2) {
      var cancelBtn = document.getElementById('remove-cancel');
      if (cancelBtn) cancelBtn.focus();
    }
  }

  // Delegación de eventos de click globales
  document.addEventListener('click', function (e) {
    var btn = e.target.closest('[data-action]');
    if (!btn) return;

    var action = btn.dataset.action;
    if (isV2 && state.dialogOpen && action !== 'remove-ok' && action !== 'remove-cancel') return;

    if (action === 'goto') {
      state.alertMessage = '';
      state.view = btn.dataset.go;
      render();
    } else if (action === 'add') {
      var itemId = btn.dataset.item;
      var existing = state.cart.find(function (c) { return c.id === itemId; });
      if (existing) {
        existing.qty += 1;
      } else {
        state.cart.push({ id: itemId, qty: 1 });
      }
      // Fijar cache de total en v1 para simular fallo de IHC-A-01
      if (!isV2 && state.cardId === 'IHC-A-01') {
        state.v1CachedTotal = formatMoney(calculateCartTotal());
      }
      render();
    } else if (action === 'qty') {
      var item = btn.dataset.item;
      var delta = parseInt(btn.dataset.delta, 10);
      var cartItem = state.cart.find(function (c) { return c.id === item; });
      if (cartItem) {
        if (isV2 && state.cardId === 'IHC-A-02' && delta < 0 && cartItem.qty === 1) {
          openRemoval(item, btn.id);
          return;
        }
        cartItem.qty += delta;
        if (cartItem.qty <= 0) {
          state.cart = state.cart.filter(function (c) { return c.id !== item; });
        }
      }
      // En v1: no recalcula el total mostrado en A01 (permanece desactualizado)
      render();
    } else if (action === 'remove') {
      var rmId = btn.dataset.item;
      if (isV2) {
        openRemoval(rmId, btn.id);
      } else {
        // v1: borra inmediatamente sin confirmación
        state.cart = state.cart.filter(function (c) { return c.id !== rmId; });
        render();
      }
    } else if (action === 'remove-ok') {
      if (isV2 && state.dialogOpen && state.itemToRemove) closeRemoval(true);
    } else if (action === 'remove-cancel') {
      if (isV2 && state.dialogOpen) closeRemoval(false);
    } else if (action === 'confirm') {
      handleConfirm();
    } else if (action === 'retry') {
      state.offline = false;
      handleConfirm();
    } else if (action === 'next') {
      handleDashboardNext();
    } else if (action === 'prev') {
      handleDashboardPrev();
    } else if (action === 'step') {
      var targetStep = parseInt(btn.dataset.step, 10);
      handleStepClick(targetStep);
    } else if (action === 'finish') {
      handleDashboardFinish();
    } else if (action === 'restart') {
      state.dashboardStep = 0;
      state.dashboardData = {
        title: '',
        code: '',
        name: '',
        checklist: [false, false, false],
        errors: '',
        notes: ''
      };
      if (isV2 && state.cardId === 'IHC-A-12') {
        localStorage.removeItem('ihc_a12_state');
      }
      render();
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
    if (confirmed) state.cart = state.cart.filter(function (c) { return c.id !== itemId; });
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
    if (!isV2 || !state.dialogOpen) return;
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

  // Confirmación de orden CaféU
  function handleConfirm() {
    state.alertMessage = '';

    // IHC-A-04: Alérgenos
    var hasSanduche = state.cart.some(function (c) { return c.id === 'sanduche'; });
    if (isV2 && hasSanduche && !state.ackAllergens) {
      state.alertMessage = 'Debe revisar las advertencias de alérgenos y aceptarlas antes de confirmar';
      render();
      return;
    }

    // IHC-A-05: Presupuesto USD 4,25
    var total = calculateCartTotal();
    if (isV2 && total > 4.25) {
      state.alertMessage = 'Presupuesto excedido: límite USD 4,25. Ajuste las cantidades antes de confirmar.';
      render();
      return;
    }

    // IHC-A-06: Duplicación y red
    if (isV2) {
      state.isSubmitting = true;
      render();

      setTimeout(function () {
        state.isSubmitting = false;
        if (state.offline) {
          state.view = 'error';
        } else {
          state.confirmedCount += 1;
          state.view = 'confirmation';
        }
        render();
      }, 700);
    } else {
      // v1: permite doble envío
      state.confirmedCount += 1;
      state.view = 'processing';
      render();

      setTimeout(function () {
        state.view = 'confirmation';
        render();
      }, 800);
    }
  }

  // Navegación Stepper en Dashboard
  function handleStepClick(targetStep) {
    state.alertMessage = '';
    if (isV2) {
      // Bloquea salto hacia adelante si los pasos previos están incompletos (IHC-A-07)
      if (targetStep > state.dashboardStep) {
        if (!state.dashboardData.title || state.dashboardData.title.trim() === '') {
          state.alertMessage = 'Introduce el título y datos requeridos antes de avanzar';
          render();
          return;
        }
        if (targetStep >= 3) {
          var allChecked = state.dashboardData.checklist.every(function (x) { return x; });
          if (!allChecked) {
            state.alertMessage = 'Checklist obligatorio pendiente. Complete todas las tareas antes de avanzar';
            render();
            return;
          }
        }
      }
      state.dashboardStep = targetStep;
      render();
    } else {
      // v1: permite saltar a cualquier paso
      state.dashboardStep = targetStep;
      render();
    }
  }

  function handleDashboardNext() {
    state.alertMessage = '';
    if (state.dashboardStep === 0) {
      if (isV2) {
        if (!state.dashboardData.title || state.dashboardData.title.trim() === '') {
          state.alertMessage = 'Introduce el título de la prueba antes de continuar';
          render();
          return;
        }
        // IHC-A-09: Validar código anónimo vs nombre real
        var code = state.dashboardData.code ? state.dashboardData.code.trim() : '';
        if (!code || code.indexOf(' ') !== -1 || /^[a-zA-ZáéíóúÁÉÍÓÚñÑ]+\s+[a-zA-ZáéíóúÁÉÍÓÚñÑ]+/.test(code)) {
          state.alertMessage = 'Debe ingresar un código anónimo válido (ej: P-001). No ingrese nombres reales.';
          render();
          return;
        }
      }
      state.dashboardStep = 1;
      render();
    } else if (state.dashboardStep === 1) {
      state.dashboardStep = 2;
      render();
    } else if (state.dashboardStep === 2) {
      state.dashboardStep = 3;
      render();
    }
  }

  function handleDashboardPrev() {
    state.alertMessage = '';
    if (!isV2 && state.cardId === 'IHC-A-08') {
      // v1 en IHC-A-08 pierde el checklist al retroceder
      state.dashboardData.checklist = [false, false, false];
    }
    if (state.dashboardStep > 0) {
      state.dashboardStep -= 1;
    }
    render();
  }

  function handleDashboardFinish() {
    state.alertMessage = '';
    if (isV2) {
      // IHC-A-12: Validar checklist obligatorio antes de cerrar
      var allChecked = state.dashboardData.checklist.every(function (x) { return x; });
      if (!allChecked) {
        state.alertMessage = 'Checklist obligatorio pendiente. Debe verificar todas las tareas antes de cerrar la sesión';
        render();
        return;
      }
    }
    // Finalizar sesión
    setTimeout(function () {
      state.dashboardStep = 4;
      render();
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
