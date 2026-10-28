"""Comprobaciones complementarias de foco, fallos de red y diseño móvil.
Ejecutar: python tests/verificaciones_adicionales.py
No sustituye la prueba cognitiva con un participante humano.
"""
from playwright.sync_api import sync_playwright
from pruebas_automaticas import create, action, add, cart, check

results=[]
def record(name,fn):
    try:fn(); results.append((name,'OK'))
    except Exception as ex:results.append((name,f'FALLO: {ex}'))

with sync_playwright() as p:
    browser=p.chromium.launch(headless=True,executable_path='/usr/bin/chromium',args=['--no-sandbox'])
    def keyboard():
        page=browser.new_page(viewport={'width':360,'height':800})
        create(page,'IHC-A-02','v2');add(page);cart(page)
        page.locator('[data-action="remove"]').focus()
        check(page.evaluate('document.activeElement.dataset.action')=='remove','Quitar debe recibir foco')
        page.keyboard.press('Enter')
        check(page.locator('[role="dialog"]').count()==1,'Enter abre diálogo')
        check(page.evaluate('document.activeElement.id')=='remove-ok','Foco inicial en confirmación')
        page.keyboard.press('Escape')
        check(page.locator('[role="dialog"]').count()==0,'Escape cierra diálogo')
        check(page.locator('.cart-row').count()==1,'Escape conserva producto')
        page.close()
    record('Tarjeta 02: Enter y Escape con foco',keyboard)
    def offline():
        page=browser.new_page()
        create(page,'IHC-A-06','v2')
        page.locator('#offline').check();add(page);cart(page);action(page,'confirm')
        page.wait_for_timeout(980)
        check(page.locator('h2.page-title').inner_text()=='No se pudo confirmar','Fallo de red no declara éxito')
        action(page,'retry');page.wait_for_timeout(980)
        check(page.locator('h2.page-title').inner_text()=='Pedido recibido','Reintento recupera la tarea')
        check('Solicitudes confirmadas en esta sesión: 1' in page.locator('main').inner_text(),'No duplicación tras reintento')
        page.close()
    record('Tarjeta 06: desconexión y recuperación',offline)
    def allergy():
        page=browser.new_page()
        create(page,'IHC-A-04','v2');add(page,'sanduche');cart(page)
        page.locator('#ack').check();action(page,'confirm');page.wait_for_timeout(980)
        check(page.locator('h2.page-title').inner_text()=='Pedido recibido','Confirmación tras reconocimiento')
        page.close()
    record('Tarjeta 04: confirmar tras leer advertencia',allergy)
    def privacy():
        page=browser.new_page()
        create(page,'IHC-A-09','v2');page.locator('#title').fill('Prueba anónima');page.locator('#code').fill('Juan Pérez');action(page,'next')
        check('código anónimo válido' in page.locator('[role=alert]').inner_text(),'Rechaza formato de nombre real')
        page.locator('#code').fill('P-123');action(page,'next')
        check(page.locator('h2.page-title').last.inner_text().startswith('2.'),'Permite código seudónimo')
        page.close()
    record('Tarjeta 09: validación seudónimos',privacy)
    def mobile():
        page=browser.new_page(viewport={'width':360,'height':800})
        for n in range(1,13):
            create(page,f'IHC-A-{n:02d}','v2')
            width=page.evaluate('document.documentElement.scrollWidth')
            check(width<=360,f'IHC-A-{n:02d}: overflow a 360 px ({width}px)')
            if n<=6:
                add(page);cart(page)
                width=page.evaluate('document.documentElement.scrollWidth')
                check(width<=360,f'IHC-A-{n:02d}: overflow en carrito ({width}px)')
        page.close()
    record('12 tarjetas: pantalla de 360px en v2',mobile)
    browser.close()

from pathlib import Path
p=Path(__file__).resolve().parents[0]/'resultados_adicionales.md'
p.write_text('# Verificaciones complementarias automatizadas\n\n'+
 '> Estas verificaciones en navegador no son observación humana.\n\n'+
 '| Caso | Resultado |\n|---|---|\n' + '\n'.join(f'| {name} | {out} |' for name,out in results) + '\n',encoding='utf-8')
for name,res in results:print(name+': '+res)
raise SystemExit(any(not res=='OK' for _,res in results))
