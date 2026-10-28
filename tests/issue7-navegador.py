"""Regresión A02 en Chromium. Requiere Playwright y Chromium instalados.
Uso desde la raíz: python tests/issue7-navegador.py
Produce capturas nuevas y resultado.json en una carpeta temporal. No registra participantes.
"""
from pathlib import Path
import json
import tempfile
from datetime import datetime, timezone

def main():
    from playwright.sync_api import sync_playwright
    root = Path(__file__).resolve().parents[1]
    out = Path(tempfile.mkdtemp(prefix='ihc-issue7-'))
    def click(page, action, item=None, go=None):
        q = f'[data-action="{action}"]'
        if item: q += f'[data-item="{item}"]'
        if go: q += f'[data-go="{go}"]'
        page.locator(q).first.click()
    def tab_to(page, selector):
        for _ in range(80):
            if page.locator(selector).evaluate('(el)=>el===document.activeElement'): return
            page.keyboard.press('Tab')
        raise AssertionError('Control no alcanzable con Tab: '+selector)
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page(viewport={'width':360,'height':800})
        # Línea de base independiente de William: no modificar para demostrar el fallo.
        page.goto((root/'prototipo/v1/index.html').as_uri())
        page.locator('#card-select').select_option('IHC-A-02')
        click(page,'goto',go='menu'); click(page,'add',item='cafe'); click(page,'goto',go='cart')
        page.screenshot(path=str(out/'A02-v1-antes.png'),full_page=True)
        tab_to(page,'[data-action="remove"][data-item="cafe"]')
        page.keyboard.press('Enter')
        assert page.locator('.cart-row').count()==0
        assert page.locator('[role="dialog"]').count()==0
        page.goto((root/'prototipo/v2/index.html').as_uri())
        page.locator('#card-select').select_option('IHC-A-02')
        click(page,'goto',go='menu'); click(page,'add',item='cafe'); click(page,'add',item='sanduche'); click(page,'goto',go='cart')
        tab_to(page,'#remove-sanduche'); page.keyboard.press('Enter')
        dialog=page.get_by_role('dialog',name='¿Quitar del pedido?')
        assert dialog.is_visible()
        assert page.locator('#remove-cancel').evaluate('(e)=>e===document.activeElement')
        page.screenshot(path=str(out/'A02-v2-dialogo.png'),full_page=True)
        page.keyboard.press('Shift+Tab')
        assert page.locator('#remove-ok').evaluate('(e)=>e===document.activeElement')
        page.keyboard.press('Tab')
        assert page.locator('#remove-cancel').evaluate('(e)=>e===document.activeElement')
        page.keyboard.press('Escape')
        assert page.locator('#remove-sanduche').evaluate('(e)=>e===document.activeElement')
        assert page.locator('.cart-row').count()==2
        page.keyboard.press('Space')
        assert dialog.is_visible()
        page.keyboard.press('Enter') # Cancelar tiene el foco inicial.
        assert page.locator('#remove-sanduche').evaluate('(e)=>e===document.activeElement')
        page.keyboard.press('Enter'); page.keyboard.press('Tab'); page.keyboard.press('Enter')
        assert page.locator('.cart-row').count()==1
        assert page.locator('#remove-cafe').evaluate('(e)=>e===document.activeElement')
        page.keyboard.press('Enter'); page.keyboard.press('Tab'); page.keyboard.press('Enter')
        assert page.locator('.cart-row').count()==0
        assert page.evaluate('document.activeElement.dataset.go')=='menu'
        page.screenshot(path=str(out/'A02-v2-vacio-foco.png'),full_page=True)
        browser.close()
    report={'generatedAt':datetime.now(timezone.utc).isoformat(),'status':'OK','scope':'Regresión técnica automática de A02, sin participantes','captures':['A02-v1-antes.png','A02-v2-dialogo.png','A02-v2-vacio-foco.png']}
    (out/'resultado.json').write_text(json.dumps(report,ensure_ascii=False,indent=2),encoding='utf-8')
    print(out)

if __name__=='__main__':main()
