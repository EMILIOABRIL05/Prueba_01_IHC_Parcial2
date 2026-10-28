"""Verificaciones de v1 en un navegador real. No son sesiones con participantes.

Uso: python prototipo/v1/tests/verificar_navegador.py
Requiere Playwright para Python y su Chromium disponible. Opcional:
  --browser-path /ruta/al/chromium
  --salida /ruta/nueva/para/evidencias
La salida por defecto se crea en un directorio temporal. No sobrescribe las
capturas del ZIP ni se atribuye una ejecución antes de realizarla.
"""
from pathlib import Path
from datetime import datetime, timezone
import argparse
import json
import tempfile

ROOT = Path(__file__).resolve().parents[1]


def action(page, name, **data):
    selector = f'[data-action="{name}"]'
    for key, value in data.items():
        selector += f'[data-{key}="{value}"]'
    page.locator(selector).first.click()


def add(page, item='cafe'):
    action(page, 'goto', go='menu')
    action(page, 'add', item=item)


def cart(page):
    action(page, 'goto', go='cart')


def tab_to(page, selector, limit=70):
    for _ in range(limit):
        if page.locator(selector).first.evaluate('(el) => el === document.activeElement'):
            return
        page.keyboard.press('Tab')
    raise AssertionError(f'No se alcanzó con Tab: {selector}')


def run_case(page, number):
    card = f'IHC-A-{number:02d}'
    page.goto(f'{(ROOT / "index.html").as_uri()}?card={card}')
    page.locator('#card-select').wait_for()
    assert card in page.locator('.crumb').first.inner_text()
    assert page.locator('body').get_attribute('data-version') == 'v1'
    page.keyboard.press('Tab')
    assert page.evaluate('document.activeElement.tagName') != 'BODY'
    notes = []
    if number == 1:
        add(page); add(page, 'sanduche'); cart(page)
        assert page.locator('#total').inner_text() == '$3.75'
        action(page, 'qty', item='cafe', delta='1')
        assert page.locator('#total').inner_text() == '$3.75'
        notes.append('Cantidad editada; total obsoleto reproducido a 360 px.')
    elif number == 2:
        add(page); cart(page)
        selector = '[data-action="remove"][data-item="cafe"]'
        tab_to(page, selector)
        assert page.locator(selector).get_attribute('aria-label') == ''
        page.keyboard.press('Enter')
        assert page.locator('.cart-row').count() == 0
        assert page.locator('[role="dialog"]').count() == 0
        notes.append('Tab y Enter: quita sin confirmación. Foco posterior: ' + page.evaluate('document.activeElement.tagName'))
        action(page, 'goto', go='menu'); action(page, 'detail', item='cafe')
        page.keyboard.press('Escape')
        assert page.locator('#cart-heading').count() == 1
        notes.append('Escape desde detalle vuelve al carrito. No acredita recorrido completo ni lector de pantalla.')
    elif number == 3:
        add(page); cart(page); action(page, 'confirm')
        page.get_by_role('heading', name='Listo', exact=True).wait_for()
        assert page.locator('section .summ-total').count() == 0
        notes.append('Listo sin identificador/desglose en panel final.')
    elif number == 4:
        add(page, 'sanduche'); cart(page)
        assert page.locator('#ack').count() == 0
        action(page, 'confirm')
        page.get_by_role('heading', name='Pedido recibido', exact=True).wait_for()
        notes.append('El envío no exigió reconocimiento de advertencias.')
    elif number == 5:
        add(page); add(page, 'sanduche'); cart(page)
        action(page, 'qty', item='cafe', delta='1')
        assert page.locator('#total').inner_text() == '$5.25'
        assert page.locator('.status.error').count() == 0
        action(page, 'confirm')
        page.get_by_role('heading', name='Pedido recibido', exact=True).wait_for()
        notes.append('Procesó USD 5,25 sin aviso específico del exceso.')
    elif number == 6:
        add(page); cart(page); action(page, 'confirm'); action(page, 'confirm')
        page.wait_for_function("document.querySelector('main')?.innerText.includes('Solicitudes confirmadas en esta sesión: 2')")
        notes.append('Duplicación reproducida: 2 confirmaciones.')
    elif number == 7:
        action(page, 'step', step='3')
        assert page.locator('.stage').inner_text().startswith('4. Revisión final')
        notes.append('Salto a revisión sin datos previos reproducido.')
    elif number == 8:
        page.locator('#title').fill('Ensayo técnico'); page.locator('#code').fill('P-001')
        action(page, 'next'); page.locator('#check-0').check()
        action(page, 'next'); action(page, 'prev')
        assert not page.locator('#check-0').is_checked()
        notes.append('Marca perdida al volver al checklist.')
    elif number == 9:
        assert page.locator('#name').count() == 1
        assert page.locator('#code').count() == 0
        notes.append('Formulario nominal: sin campo de código. Sin introducir identidad real.')
    elif number == 10:
        assert page.locator('[aria-current="step"]').count() == 0
        assert '(actual)' not in page.locator('.stepper').inner_text()
        notes.append('No hay estado actual semántico. Lector de pantalla no evaluado por este script.')
    elif number == 11:
        width = page.evaluate('document.documentElement.scrollWidth')
        assert width > 360, f'No se reprodujo desbordamiento esperado: {width}'
        notes.append(f'Ancho real {width}px con viewport de 360px. Revisar superposición visualmente.')
    elif number == 12:
        action(page, 'step', step='3'); action(page, 'finish')
        page.get_by_role('heading', name='Sesión cerrada', exact=True).wait_for()
        assert 'Checklist: 0/3' in page.locator('main').inner_text()
        notes.append('Se cerró con 0/3 requisitos; fallo reproducido.')
    return notes


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument('--browser-path')
    parser.add_argument('--salida')
    args = parser.parse_args()
    try:
        from playwright.sync_api import sync_playwright
    except ImportError:
        raise SystemExit('No se ejecutó: Playwright para Python no está disponible. No hay resultados de navegador.')
    output = Path(args.salida) if args.salida else Path(tempfile.mkdtemp(prefix='ihc-v1-navegador-'))
    output.mkdir(parents=True, exist_ok=True)
    records = []
    with sync_playwright() as playwright:
        options = {'headless': True}
        if args.browser_path:
            options['executable_path'] = args.browser_path
        browser = playwright.chromium.launch(**options)
        for number in range(1, 13):
            page = browser.new_page(viewport={'width': 360 if number in (1, 11) else 1000, 'height': 800})
            errors = []
            page.on('pageerror', lambda error: errors.append(str(error)))
            try:
                notes = run_case(page, number)
                assert not errors, errors
                image = f'IHC-A-{number:02d}-v1.png'
                page.screenshot(path=str(output / image), full_page=True)
                records.append({'card': number, 'status': 'OK', 'notes': notes, 'capture': image})
            except Exception as error:
                records.append({'card': number, 'status': 'FALLO', 'detail': str(error)})
            finally:
                page.close()
        browser.close()
    report = {'generatedAt': datetime.now(timezone.utc).isoformat(), 'scope': 'Prueba técnica automática, sin participantes', 'records': records}
    (output / 'resultado.json').write_text(json.dumps(report, ensure_ascii=False, indent=2), encoding='utf-8')
    print(json.dumps({'output': str(output), **report}, ensure_ascii=False, indent=2))
    return int(any(row['status'] != 'OK' for row in records))


if __name__ == '__main__':
    raise SystemExit(main())
