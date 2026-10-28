"""Prueba las entradas HTTP reales de v1/v2. No registra participantes.

python -m pip install -r tests/requirements.txt
python -m playwright install chromium
python tests/navegador_integral.py --salida evidencias/ejecucion-actual
Opcional: --browser-path /ruta/chromium --revision SHA --grupo a02|complementarias|todo
"""
from __future__ import annotations
import argparse
from contextlib import contextmanager
from datetime import datetime, timezone
from functools import partial
import hashlib
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
import json
import os
from pathlib import Path
import platform
import tempfile
import threading

ROOT = Path(__file__).resolve().parents[1]


class QuietHandler(SimpleHTTPRequestHandler):
    def log_message(self, *args):
        pass


@contextmanager
def server():
    http = ThreadingHTTPServer(('127.0.0.1', 0), partial(QuietHandler, directory=str(ROOT)))
    thread = threading.Thread(target=http.serve_forever, daemon=True)
    thread.start()
    try:
        yield f'http://127.0.0.1:{http.server_port}'
    finally:
        http.shutdown()
        http.server_close()
        thread.join(timeout=2)


def action(page, name, **data):
    query = f'[data-action="{name}"]'
    for key, value in data.items():
        query += f'[data-{key}="{value}"]'
    page.locator(query).first.click()


def add(page, item='cafe'):
    action(page, 'goto', go='menu')
    action(page, 'add', item=item)


def cart(page):
    action(page, 'goto', go='cart')


def tab_to(page, selector):
    for _ in range(90):
        if page.locator(selector).first.evaluate('(el) => el === document.activeElement'):
            return
        page.keyboard.press('Tab')
    raise AssertionError(f'No se alcanzó {selector} con Tab')


def focus(page, ident):
    assert page.evaluate('document.activeElement.id') == ident


def select(page, card):
    page.locator('#card-select').select_option(f'IHC-A-{card:02d}')


def data(page, code='P-901', title='Prueba técnica local'):
    page.locator('#title').fill(title)
    page.locator('#code').fill(code)


def all_checks(page):
    for i in range(3):
        page.locator(f'#check-{i}').check()


def review(page):
    if page.locator('#review-total').count():
        action(page, 'review-total')
    if page.locator('#ack').count():
        page.locator('#ack').check()


def received(page):
    page.get_by_role('heading', name='Pedido recibido', exact=True).wait_for()


def closed(page):
    page.get_by_role('heading', name='Sesión cerrada', exact=True).wait_for()


def screenshot(page, out, name):
    destination = out / f'{name}.png'
    page.screenshot(path=str(destination), full_page=True, animations='disabled')
    return destination.name


def assert_mobile(page):
    assert page.evaluate('document.documentElement.scrollWidth <= document.documentElement.clientWidth')
    outside = page.locator('button:visible, input:visible, textarea:visible, select:visible').evaluate_all('''els => els.filter(el => {
      const r=el.getBoundingClientRect(); return r.width>0 && (r.left < -1 || r.right > innerWidth+1);
    }).map(el=>el.id || el.textContent)''')
    assert not outside, outside


def v1_case(page, n):
    if n <= 6:
        add(page, 'sanduche' if n == 4 else 'cafe')
        if n in (1, 5):
            add(page, 'sanduche')
        cart(page)
    if n == 1:
        assert page.locator('#total').inner_text() == '$3.75'
        action(page, 'qty', item='cafe', delta=1)
        assert page.locator('#total').inner_text() == '$3.75'
    elif n == 2:
        action(page, 'remove', item='cafe')
        assert page.locator('.cart-row').count() == 0
        assert page.locator('[role="dialog"]').count() == 0
    elif n == 3:
        action(page, 'confirm')
        page.get_by_role('heading', name='Listo', exact=True).wait_for()
    elif n in (4, 5):
        if n == 5:
            action(page, 'qty', item='cafe', delta=1)
        action(page, 'confirm')
        received(page)
    elif n == 6:
        action(page, 'confirm'); action(page, 'confirm')
        page.wait_for_function("document.querySelector('main').innerText.includes('Solicitudes confirmadas en esta sesión: 2')")
    elif n == 7:
        action(page, 'step', step=3)
        assert page.locator('.stage').inner_text().startswith('4.')
    elif n == 8:
        data(page); action(page, 'next'); page.locator('#check-0').check()
        action(page, 'next'); action(page, 'prev')
        assert not page.locator('#check-0').is_checked()
    elif n == 9:
        assert page.locator('#name').count() == 1
        assert page.locator('#code').count() == 0
    elif n == 10:
        assert page.locator('[aria-current="step"]').count() == 0
    elif n == 11:
        assert page.evaluate('document.documentElement.scrollWidth > 360')
    elif n == 12:
        action(page, 'step', step=3); action(page, 'finish'); closed(page)
        assert 'Checklist: 0/3' in page.locator('main').inner_text()


def v2_case(page, n, out):
    if n <= 6:
        add(page, 'sanduche' if n == 4 else 'cafe')
        if n in (1, 5):
            add(page, 'sanduche')
        cart(page)
    if n == 1:
        assert page.locator('#total').inner_text() == '$4.25'
        screenshot(page, out, 'A01-R7-01-antes')
        action(page, 'qty', item='cafe', delta=1)
        assert page.locator('#total').inner_text() == '$5.75'
        assert 'Diferencia +$1.50' in page.locator('main').inner_text()
        screenshot(page, out, 'A01-R7-02-edicion')
        action(page, 'confirm'); focus(page, 'review-total')
        screenshot(page, out, 'A01-R7-03-bloqueo')
        review(page); action(page, 'confirm'); received(page)
        assert '$5.75' in page.locator('.receipt-card').inner_text()
        screenshot(page, out, 'A01-R7-04-recibido')
    elif n == 2:
        tab_to(page, '#qty-plus-cafe'); page.keyboard.press('Enter'); focus(page, 'qty-plus-cafe')
        tab_to(page, '#remove-cafe'); page.keyboard.press('Enter'); focus(page, 'remove-cancel')
        assert page.locator('main').evaluate('(el)=>el.inert')
        page.keyboard.press('Shift+Tab'); focus(page, 'remove-ok')
        page.keyboard.press('Tab'); focus(page, 'remove-cancel')
        screenshot(page, out, 'A02-dialogo-teclado')
        page.keyboard.press('Escape'); focus(page, 'remove-cafe')
        assert page.locator('.cart-row').count() == 1
        action(page, 'remove', item='cafe'); page.keyboard.press('Tab'); page.keyboard.press('Enter')
        assert page.locator('.cart-row').count() == 0
        assert page.evaluate('document.activeElement.dataset.go') == 'menu'
    elif n == 3:
        action(page, 'confirm'); received(page)
        assert page.locator('#order-id').inner_text().startswith('CU-')
        assert page.locator('.receipt-card .summ-total').inner_text() == '$1.50'
    elif n == 4:
        action(page, 'confirm'); focus(page, 'ack')
        assert 'alérgenos' in page.locator('[role="alert"]').inner_text()
        page.locator('#ack').check(); action(page, 'confirm'); received(page)
    elif n == 5:
        action(page, 'qty', item='cafe', delta=1); page.locator('#ack').check(); action(page, 'confirm')
        assert 'Presupuesto excedido' in page.locator('main [role="alert"]').first.inner_text()
        action(page, 'qty', item='cafe', delta=-1); review(page); action(page, 'confirm'); received(page)
    elif n == 6:
        page.locator('#offline').check(); action(page, 'confirm')
        assert page.locator('[data-action="confirm"]').count() == 0
        page.get_by_role('heading', name='No se pudo confirmar', exact=True).wait_for()
        reference = page.evaluate('App.state.pendingOrder.id')
        action(page, 'retry'); received(page)
        assert page.locator('#order-id').inner_text() == reference
        assert page.evaluate('App.state.confirmedCount') == 1
    elif n == 7:
        data(page); action(page, 'next'); action(page, 'next')
        focus(page, 'check-0'); assert page.locator('#check-0').count() == 1
        action(page, 'step', step=2); focus(page, 'check-0')
        all_checks(page); action(page, 'next'); action(page, 'next'); action(page, 'finish'); closed(page)
    elif n == 8:
        assert page.get_by_role('region', name='Procedimiento antes de iniciar').count() == 1
        data(page); action(page, 'next'); page.locator('#check-0').check()
        assert 'Guardado' in page.locator('#save-status').inner_text()
        action(page, 'next'); action(page, 'prev'); assert page.locator('#check-0').is_checked()
        page.reload(); select(page, 8); assert page.locator('#check-0').is_checked()
    elif n == 9:
        data(page, code='Carlo'); action(page, 'next'); focus(page, 'code')
        action(page, 'step', step=1); focus(page, 'code')
        page.locator('#code').fill('P-901'); action(page, 'next')
        assert page.locator('#check-0').count() == 1
    elif n == 10:
        assert page.locator('[aria-current="step"]').inner_text().endswith('(actual)')
        data(page); tab_to(page, '#next-step'); page.keyboard.press('Enter'); focus(page, 'page-heading')
        assert page.locator('#live-status').inner_text() == '2. Checklist de verificación'
    elif n == 11:
        assert_mobile(page); data(page); action(page, 'next'); assert_mobile(page)
        all_checks(page); action(page, 'next'); assert_mobile(page)
        page.locator('#notes').fill('Observación técnica local, sin participante.'); action(page, 'next'); assert_mobile(page)
        action(page, 'finish'); closed(page); assert_mobile(page)
    elif n == 12:
        data(page); action(page, 'next'); page.locator('#check-0').check(); page.locator('#check-1').check()
        action(page, 'next'); page.locator('#errors').fill('2'); page.locator('#notes').fill('Prueba técnica sin participante.'); action(page, 'next')
        screenshot(page, out, 'A12-R7-01-revision-2de3')
        action(page, 'finish'); focus(page, 'check-2')
        screenshot(page, out, 'A12-R7-02-bloqueo-foco')
        page.reload(); select(page, 12); assert page.locator('#check-0').is_checked(); assert page.locator('#check-1').is_checked()
        assert not page.locator('#check-2').is_checked()
        screenshot(page, out, 'A12-R7-03-recuperado')
        page.locator('#check-2').check(); action(page, 'step', step=3)
        assert '2' in page.locator('.session-summary-box').inner_text()
        action(page, 'finish'); closed(page)
        screenshot(page, out, 'A12-R7-04-cerrado')
        page.reload(); select(page, 12); closed(page)


def regressions():
    def a01_add(page):
        add(page); cart(page); review(page); add(page); cart(page); action(page, 'confirm'); focus(page, 'review-total')
    def a01_remove(page):
        add(page); add(page, 'sanduche'); cart(page); review(page)
        action(page, 'remove', item='sanduche'); action(page, 'remove-ok'); action(page, 'confirm'); focus(page, 'review-total')
    def immutable(page):
        add(page); cart(page); action(page, 'confirm')
        assert page.locator('#nav-menu').is_disabled(); assert page.locator('#add-cafe').count() == 0
        received(page); assert page.locator('.receipt-card .summ-total').inner_text() == '$1.50'
        cart(page); assert page.evaluate('App.state.confirmedCount') == 1
    def new_order(page):
        add(page); cart(page); action(page, 'confirm'); received(page); ident=page.locator('#order-id').inner_text()
        action(page, 'new-order'); assert page.evaluate('App.state.cart.length') == 0
        add(page); cart(page); action(page, 'confirm'); received(page); assert page.locator('#order-id').inner_text() != ident
    def ack_context(page):
        add(page, 'sanduche'); cart(page); page.locator('#ack').check(); select(page, 4)
        add(page, 'sanduche'); cart(page); assert not page.locator('#ack').is_checked(); action(page, 'confirm'); focus(page, 'ack')
    def detail_escape(page):
        action(page, 'goto', go='menu'); tab_to(page, '#detail-sanduche'); page.keyboard.press('Enter')
        assert 'Gluten' in page.locator('main').inner_text(); page.keyboard.press('Escape'); focus(page, 'detail-sanduche')
    def pending_abort(page):
        add(page); cart(page); action(page, 'confirm'); select(page, 7); page.wait_for_timeout(850)
        assert page.evaluate('App.state.cardId') == 'IHC-A-07'; assert page.locator('#title').count() == 1
        assert page.evaluate('App.state.receipt') is None
    def malformed(page):
        page.evaluate("localStorage.setItem('ihc_a12_state',JSON.stringify({title:'Prueba técnica',code:'P-901',errors:'0',checklist:[],dashboardStep:3}))")
        page.reload(); select(page, 12)
        assert page.locator('[data-check-index]:checked').count() == 0
        action(page, 'next'); action(page, 'next'); action(page, 'finish'); focus(page, 'check-0')
    def malformed_json(page):
        page.evaluate("localStorage.setItem('ihc_a12_state','{')"); page.reload(); select(page, 12)
        assert 'No se pudo recuperar' in page.locator('[role="alert"]').inner_text()
        assert page.evaluate('App.state.dashboardClosed') is False
    def invalid_metrics(page):
        data(page); action(page, 'next'); all_checks(page); action(page, 'next'); page.locator('#errors').fill('-1')
        action(page, 'step', step=3); focus(page, 'errors')
        page.locator('#errors').fill('1.5'); action(page, 'next'); focus(page, 'errors')
    def html_input(page):
        payload='<img src=x onerror="window.executed=true">'
        data(page, title=payload); action(page, 'next'); all_checks(page); action(page, 'next')
        page.locator('#notes').fill('</textarea><img src=x onerror="window.executed=true">'); action(page, 'next')
        assert page.locator('main img').count() == 0
        assert payload in page.locator('.session-summary-box').inner_text()
        assert page.evaluate('window.executed === true') is False
    def data_bypass(page):
        data(page); action(page, 'next'); all_checks(page); action(page, 'step', step=0); page.locator('#title').fill('')
        action(page, 'step', step=3); focus(page, 'title')
    def storage_failure(page):
        page.evaluate("() => {window.originalSet=Storage.prototype.setItem;Storage.prototype.setItem=function(){throw new Error('Prueba controlada de cuota');};}")
        data(page); action(page, 'next'); all_checks(page); action(page, 'next'); action(page, 'next'); action(page, 'finish')
        page.get_by_role('alert').filter(has_text='Cierre no confirmado').wait_for()
        assert page.evaluate('App.state.dashboardClosed') is False
        assert page.locator('#check-0').count() == 0
        page.evaluate('() => {Storage.prototype.setItem=window.originalSet;}'); action(page, 'finish'); closed(page)
    def finish_abort(page):
        data(page); action(page, 'next'); all_checks(page); action(page, 'next'); action(page, 'next'); action(page, 'finish')
        select(page, 9); page.wait_for_timeout(450); assert page.locator('#title').count() == 1
        assert page.evaluate('App.state.dashboardStep') == 0
    def anonymous_bounds(page):
        data(page, code='P-000'); action(page, 'step', step=1); focus(page, 'code')
        page.locator('#code').fill('P-999'); action(page, 'step', step=1); assert page.locator('#check-0').count() == 1
    def mobile_all(page):
        for n in range(1,13):
            select(page,n); assert_mobile(page)
            if n <= 6:
                add(page); cart(page); assert_mobile(page)
    def empty_cart(page):
        cart(page); assert page.locator('[data-action="confirm"]').count() == 0
    return [(1,'A01-agregar-invalida-revision',a01_add),(1,'A01-quitar-invalida-revision',a01_remove),
        (6,'A06-pedido-inmutable-y-sin-reenvio',immutable),(3,'A03-pedido-nuevo-e-identificador',new_order),
        (4,'A04-aceptacion-contextual',ack_context),(4,'A04-detalle-Escape',detail_escape),
        (6,'A06-cancelar-operacion-al-cambiar-tarjeta',pending_abort),(12,'A12-checklist-persistido-vacio',malformed),
        (12,'A12-JSON-danado',malformed_json),(7,'Dashboard-errores-enteros-no-negativos',invalid_metrics),
        (9,'Dashboard-texto-no-inserta-HTML',html_input),(12,'Dashboard-datos-invalidos-via-Stepper',data_bypass),
        (12,'A12-fallo-guardado-y-reintento',storage_failure),(12,'A12-cierre-no-contamina-otra-tarjeta',finish_abort),
        (9,'A09-limites-de-codigo',anonymous_bounds),(11,'12-tarjetas-controles-dentro-de-360px',mobile_all),
        (3,'CafeU-carrito-vacio',empty_cart)]


def main():
    parser=argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--browser-path', default=os.environ.get('IHC_BROWSER_PATH'))
    parser.add_argument('--salida')
    parser.add_argument('--revision', default='copia de trabajo; consulte SHA-256 de fuentes')
    parser.add_argument('--grupo', choices=['todo','a02','complementarias'], default='todo')
    args=parser.parse_args()
    out=Path(args.salida).resolve() if args.salida else Path(tempfile.mkdtemp(prefix='ihc-navegador-'))
    out.mkdir(parents=True,exist_ok=True)
    from playwright.sync_api import sync_playwright
    results=[]
    with server() as base, sync_playwright() as p:
        options={'headless':True,'args':['--no-sandbox','--disable-dev-shm-usage']}
        if args.browser_path: options['executable_path']=str(Path(args.browser_path).resolve())
        browser=p.chromium.launch(**options)
        browser_version=browser.version
        cases=[]
        if args.grupo!='complementarias':
            for n in range(1,13):
                if args.grupo=='a02' and n!=2: continue
                for version in ['v1','v2']:
                    fn=(lambda page,n=n: v1_case(page,n)) if version=='v1' else (lambda page,n=n: v2_case(page,n,out))
                    cases.append((n,version,f'IHC-A-{n:02d}-{version}',fn,True))
        if args.grupo!='a02':
            cases += [(n,'v2',name,fn,False) for n,name,fn in regressions()]
        for n,version,name,fn,capture in cases:
            context=browser.new_context(viewport={'width':360,'height':800},device_scale_factor=1)
            page=context.new_page();page.set_default_timeout(7000);errors=[]
            page.on('pageerror',lambda error: errors.append(str(error)))
            try:
                page.goto(f'{base}/prototipo/{version}/')
                select(page,n);fn(page)
                assert not errors, errors
                image_name=screenshot(page,out,name) if capture else None
                results.append({'case':name,'status':'OK','capture':image_name})
                print('[OK]',name,flush=True)
            except Exception as exc:
                results.append({'case':name,'status':'FALLO','detail':str(exc),'pageErrors':errors})
                screenshot(page,out,name+'-FALLO')
                print('[FALLO]',name,str(exc),flush=True)
            finally:
                context.close()
        browser.close()
    sources=['assets/app.js','assets/scenarios.js','assets/styles.css','prototipo/v2/index.html',
        'prototipo/v1/index.html','prototipo/v1/assets/app.js','prototipo/v1/assets/scenarios.js','prototipo/v1/assets/styles.css']
    report={'generatedAt':datetime.now(timezone.utc).isoformat(),'revision':args.revision,
        'scope':'Navegador Chromium real por HTTP; ejecución automática, sin participantes ni lector de pantalla.',
        'browser':browser_version,'platform':platform.platform(),'viewport':{'width':360,'height':800},
        'sourceSha256':{name:hashlib.sha256((ROOT/name).read_bytes()).hexdigest() for name in sources},
        'passed':sum(r['status']=='OK' for r in results),'total':len(results),'results':results,
        'captures':{f.name:hashlib.sha256(f.read_bytes()).hexdigest() for f in sorted(out.glob('*.png'))}}
    (out/'resultado.json').write_text(json.dumps(report,ensure_ascii=False,indent=2),encoding='utf-8')
    rows=['# Ejecución técnica en navegador','',f"Fecha UTC: {report['generatedAt']}",f"Chromium: {browser_version}; viewport 360 x 800.",
        f"Revisión de código: {args.revision}",'','Pruebas automáticas sobre las entradas HTTP reales. No son sesiones con participantes ni evaluación con lector de pantalla.','',
        '| Caso | Resultado | Evidencia |','|---|---|---|']
    for r in results:
        evidence=f"[{r['capture']}]({r['capture']})" if r.get('capture') else r.get('detail','Aserciones de interacción y estado')
        rows.append(f"| {r['case']} | {r['status']} | {evidence.replace(chr(10),' ').replace('|','/')} |")
    rows += ['',f"**Resultado: {report['passed']}/{report['total']}.**",'',
        'El JSON adjunto registra revisión, entorno, SHA-256 de fuentes y capturas. Los datos P-901 y las notas de ensayo son ficticios de prueba técnica.']
    (out/'README.md').write_text('\n'.join(rows)+'\n',encoding='utf-8')
    print(f"{report['passed']}/{report['total']} - {out}",flush=True)
    return 0 if report['passed']==report['total'] else 1


if __name__=='__main__':
    raise SystemExit(main())
