"""
Script de comprobación técnica de entregables de la Fase 4: Prototipo v2 y Accesibilidad.
Responsable: Pablo Lozada (Issue #4).
Ejecutar: python tests/comprobar_prototipo_v2.py
"""

from pathlib import Path
import re
import sys

ROOT = Path(__file__).resolve().parents[1]

def test_archivos_obligatorios():
    print("1. Comprobando existencia de archivos obligatorios...")
    archivos = [
        "assets/scenarios.js",
        "assets/styles.css",
        "assets/app.js",
        "prototipo/v1/index.html",
        "prototipo/v2/index.html",
        "docs/decisiones.md",
        "docs/revision-pr-emilio.md",
        "docs/guia-defensa-pablo.md",
        "README-PABLO.md"
    ]
    faltantes = []
    for a in archivos:
        p = ROOT / a
        if not p.exists():
            faltantes.append(a)
            print(f"  [FALTA] {a}")
        else:
            print(f"  [OK] {a}")
    if faltantes:
        raise AssertionError(f"Faltan {len(faltantes)} archivos requeridos.")

def test_evidencias_capturas():
    print("2. Comprobando capturas técnicas comparativas (24 imágenes)...")
    dir_cap = ROOT / "evidencias" / "ejecucion-actual"
    if not dir_cap.exists():
        raise AssertionError("Directorio evidencias/ejecucion-actual no existe.")
    
    faltantes = []
    for i in range(1, 13):
        for v in ["v1", "v2"]:
            img_name = f"IHC-A-{i:02d}-{v}.png"
            img_path = dir_cap / img_name
            if not img_path.exists():
                faltantes.append(img_name)
    if faltantes:
        raise AssertionError(f"Faltan capturas: {faltantes}")
    print("  [OK] 24 capturas técnicas comparativas presentes.")

def test_matriz_decisiones():
    print("3. Validando contenido de docs/decisiones.md...")
    decisiones = (ROOT / "docs/decisiones.md").read_text(encoding="utf-8")
    for i in range(1, 13):
        cid = f"IHC-A-{i:02d}"
        assert cid in decisiones, f"Falta escenario {cid} en docs/decisiones.md"
    assert "Fragmento antes" in decisiones
    assert "Fragmento después" in decisiones
    assert "Prueba técnica" in decisiones
    print("  [OK] 12 escenarios documentados con formato problema/decisión/antes/después/prueba.")

def test_scenarios_js():
    print("4. Validando escenarios en assets/scenarios.js...")
    scenarios_text = (ROOT / "assets/scenarios.js").read_text(encoding="utf-8")
    for i in range(1, 13):
        cid = f"IHC-A-{i:02d}"
        assert f"'{cid}'" in scenarios_text, f"Escenario {cid} ausente en scenarios.js"
    assert "cafe" in scenarios_text and "sanduche" in scenarios_text
    print("  [OK] 12 tarjetas y catálogo configurados en scenarios.js.")

def test_prototipos_html():
    print("5. Validando plantillas HTML de prototipos...")
    v1_html = (ROOT / "prototipo/v1/index.html").read_text(encoding="utf-8")
    v2_html = (ROOT / "prototipo/v2/index.html").read_text(encoding="utf-8")
    assert 'data-version="v1"' in v1_html, "v1 debe tener data-version='v1'"
    assert 'data-version="v2"' in v2_html, "v2 debe tener data-version='v2'"
    assert 'id="app"' in v1_html and 'id="app"' in v2_html
    print("  [OK] Plantillas HTML de prototipo v1 y v2 correctas.")

def test_codigo_app_js():
    print("6. Validando funciones de accesibilidad y correcciones en assets/app.js...")
    app_text = (ROOT / "assets/app.js").read_text(encoding="utf-8")
    
    # Comprobaciones clave de los hallazgos:
    assert "IHC-A-01" in app_text, "A01 presente"
    assert "calculateCartTotal" in app_text, "A01 recálculo total"
    assert "role=\"dialog\"" in app_text or 'role="dialog"' in app_text, "A02 modal accesible"
    assert "remove-ok" in app_text, "A02 confirmación de borrado"
    assert "Escape" in app_text, "A02 tecla escape"
    assert "state.receipt.id" in app_text and "orderSequence" in app_text, "A03 referencia por pedido"
    assert "summ-total" in app_text, "A03 resumen final"
    assert "ackAllergens" in app_text or 'ack' in app_text, "A04 alérgenos"
    assert "4.25" in app_text, "A05 presupuesto límite"
    assert "disabled" in app_text, "A06 bloqueo doble click"
    assert "offline" in app_text and "retry" in app_text, "A06 modo offline y reintento"
    assert "navigationProblem" in app_text and "checklistProblem" in app_text, "A07 validadores compartidos"
    assert "check-" in app_text, "A08 checklist"
    assert "code" in app_text, "A09 código anónimo"
    assert "aria-current" in app_text, "A10 semántica activa"
    assert "ihc_a12_state" in app_text or "localStorage" in app_text, "A12 persistencia"
    print("  [OK] Referencias de implementación presentes; ejecutar navegador_integral.py para comprobar comportamiento.")

def main():
    print("=== Comprobación de Entregables · Pablo Lozada (Fase 4) ===")
    try:
        test_archivos_obligatorios()
        test_evidencias_capturas()
        test_matriz_decisiones()
        test_scenarios_js()
        test_prototipos_html()
        test_codigo_app_js()
        print("\n[ÉXITO] Comprobaciones estáticas conformes; no acreditan conformidad WCAG, pruebas humanas ni cierre total del trabajo.")
        return 0
    except AssertionError as e:
        print(f"\n[FALLO] {e}")
        return 1

if __name__ == "__main__":
    sys.exit(main())
