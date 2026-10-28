"""Verificación automatizada de escenarios y capturas TÉCNICAS del proyecto.

Ejecutar: python tests/pruebas_automaticas.py
Requiere Playwright Python y Chromium. No sustituye una prueba cognitiva externa.
Se usa set_content porque esta ejecución aislada bloquea navegación file:// y localhost.
"""
from pathlib import Path
from datetime import datetime, timezone
from playwright.sync_api import sync_playwright

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / 'evidencias' / 'capturas-tecnicas'
OUT.mkdir(parents=True, exist_ok=True)
styles = (ROOT / 'assets/styles.css').read_text(encoding='utf-8')
scenarios = (ROOT / 'assets/scenarios.js').read_text(encoding='utf-8')
app = (ROOT / 'assets/app.js').read_text(encoding='utf-8')
records=[]


def create(page, card, version):
    # En un navegador de archivo real localStorage está disponible; aquí usamos
    # una implementación equivalente en memoria para comprobar el flujo del A12.
    mockstorage = '''<script>
    Object.defineProperty(window,'localStorage',{configurable:true,value:{
      _db:window.__fakeStorage||(window.__fakeStorage={}),
      getItem(k){return Object.prototype.hasOwnProperty.call(this._db,k)?this._db[k]:null},
      setItem(k,v){this._db[k]=String(v)},removeItem(k){delete this._db[k]}
    }});
    </script>'''
    html=f'<!doctype html><html lang="es"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><style>{styles}</style></head><body data-version="{version}"><div id="app"></div>{mockstorage}<script>{scenarios}</script><script>{app}</script></body></html>'
    page.set_content(html)
    page.locator('#card-select').select_option(card)
    return html


def action(page, name, **data):
    q=f'[data-action="{name}"]'
    for k, v in data.items():q+=f'[data-{k.replace("_","-")}="{v}"]'
    page.locator(q).first.click()


def add(page, item='cafe'):
    action(page,'goto',go='menu')
    action(page,'add',item=item)


def cart(page):action(page,'goto',go='cart')


def check(condition, desc):
    if not condition:raise AssertionError(desc)


def run_case(page, n, version):
    card=f'IHC-A-{n:02d}';v2=version=='v2';create(page,card,version)
    check(card in page.locator('.crumb').first.inner_text(), 'Tarjeta incorrecta')
    if n==1:
        add(page);cart(page)
        first=page.locator('#total').inner_text()
        action(page,'qty',item='cafe',delta='1')
        now=page.locator('#total').inner_text()
        check((first!=now)==v2,'Recalcular total v1/v2')
    elif n==2:
        add(page);cart(page)
        rem=page.locator('[data-action=remove]').first
        check(('Quitar' in rem.inner_text())==v2,'Etiqueta de Quitar')
        rem.click()
        if v2:
            check(page.locator('[role=dialog]').count()==1,'Diálogo de quitar')
            page.keyboard.press('Escape')
            check(page.locator('.cart-row').count()==1,'Escape cancela quitar')
            action(page,'remove',item='cafe')
            action(page,'remove-ok')
            check(page.locator('.cart-row').count()==0,'Quitar borra producto')
        else:check(page.locator('.cart-row').count()==0,'v1 quita sin confirmación')
    elif n==3:
        add(page);cart(page);action(page,'confirm')
        page.wait_for_timeout(980)
        check(page.locator('h2.page-title').inner_text()==('Pedido recibido' if v2 else 'Listo'),'Confirmación clara')
        check((page.locator('section .summ-total').count()>0)==v2,'Resumen en estado final')
    elif n==4:
        add(page,'sanduche');cart(page);action(page,'confirm')
        check((page.locator('#ack').count()>0)==v2,'Aceptación de alérgenos')
        if v2:check('revisar las advertencias' in page.locator('.status.error').first.inner_text(),'Aviso de alérgenos')
    elif n==5:
        add(page,'cafe');add(page,'sanduche');cart(page)
        action(page,'qty',item='cafe',delta='1')
        check((page.locator('.status.error').count()>0)==v2,'Alerta presupuesto')
        action(page,'confirm')
        if v2:check(page.locator('.cart-row').count()==2,'Impedir confirmación con sobrecosto')
        else:check('Procesando' in page.locator('h2').all_inner_texts()[-1], 'v1 procesa sin alerta')
    elif n==6:
        add(page);cart(page);action(page,'confirm')
        check((page.locator('[data-action=confirm]').count()>0)==(not v2),'Botón doble envío')
        if not v2:action(page,'confirm')
        page.wait_for_timeout(1100)
        check(('Solicitudes confirmadas' in page.locator('main').inner_text()),'Contador de solicitudes')
        if not v2:check('2' in page.locator('main').inner_text().split('Solicitudes confirmadas en esta sesión:')[-1],'Duplicación en v1')
        else:check('Solicitudes confirmadas en esta sesión: 1' in page.locator('main').inner_text(),'Una sola confirmación')
    elif n==7:
        action(page,'step',step='3')
        check((page.locator('h2.page-title').last.inner_text().startswith('4.'))==(not v2),'Bloqueo de salto de etapa')
        if v2:check('Introduce el título' in page.locator('[role=alert]').inner_text(),'Explicación del bloqueo')
    elif n==8:
        page.locator('#title').fill('Prueba');page.locator('#code').fill('P-001')
        action(page,'next');page.locator('#check-0').check();action(page,'next');action(page,'prev')
        check(page.locator('#check-0').is_checked()==v2,'Persistencia de checklist al navegar')
    elif n==9:
        check((page.locator('#code').count()>0)==v2,'Código seudónimo frente a nombre real')
        if v2:
            page.locator('#title').fill('Prueba');page.locator('#code').fill('P-001');action(page,'next')
            check(page.locator('h2.page-title').last.inner_text().startswith('2.'),'Acepta seudónimo')
        else:check(page.locator('#name').count()>0,'v1 pide nombre')
    elif n==10:
        check((page.locator('[aria-current=step]').count()>0)==v2,'Paso accesible')
        if v2:check('(actual)' in page.locator('.stepper').inner_text(),'Etiqueta de paso actual')
    elif n==11:
        # Layout deliberadamente defectuoso en v1, normalizado en v2 a 360 px.
        width=page.evaluate('document.documentElement.scrollWidth')
        check((width<=360)==v2, f'Responsive 360px ({width})')
    elif n==12:
        action(page,'step',step='3')
        if not v2:
            action(page,'finish');page.wait_for_timeout(780)
            check('Sesión cerrada' in page.locator('h2.page-title').inner_text(),'v1 permite finalizar sin checklist')
        else:
            check(page.locator('#title').count()==1,'Paso incompleto bloqueado')
            page.locator('#title').fill('Prueba');page.locator('#code').fill('P-001');action(page,'next')
            # Marcamos una sola casilla y comprobamos que el cierre se bloquea.
            page.locator('#check-0').check();
            # Comprobar que el progreso se recupera al reabrir el prototipo.
            create(page,card,version)
            action(page,'step',step='1')
            check(page.locator('#check-0').is_checked(),'Recuperación de checklist al recargar A12')
            action(page,'next')
            page.locator('#errors').fill('0');page.locator('#notes').fill('Observación de ejemplo, no sesión real.');action(page,'next');action(page,'finish')
            check('Checklist obligatorio pendiente' in page.locator('[role=alert]').inner_text(),'Bloquea finalización incompleta')
            page.locator('#check-1').check();page.locator('#check-2').check();
            action(page,'step',step='3');action(page,'finish');page.wait_for_timeout(780)
            check('Sesión cerrada' in page.locator('h2.page-title').inner_text(),'Finaliza checklist completo')
    if n==2 and v2:
        # Mostrar la confirmación en la captura técnica.
        add(page);cart(page);action(page,'remove',item='cafe')
    # Imagen captura de ejecución del navegador, nunca evidencia de humano.
    page.screenshot(path=str(OUT / f'{card}-{version}.png'),full_page=True,animations='disabled')


def main():
    with sync_playwright() as p:
        browser=p.chromium.launch(headless=True,executable_path='/usr/bin/chromium',args=['--no-sandbox'])
        for n in range(1,13):
            for version in ['v1','v2']:
                page=browser.new_page(viewport={'width':360 if n in [1,11] else 1000,'height':780},device_scale_factor=1)
                errs=[];page.on('pageerror',lambda e: errs.append(str(e)))
                try:
                    run_case(page,n,version)
                    check(not errs, '; '.join(errs))
                    records.append((n,version,'OK','Recorrido automático y captura técnica'))
                except Exception as ex:
                    records.append((n,version,'FALLO',str(ex)))
                finally: page.close()
        browser.close()
    lines=['# Resultados de verificación técnica automatizada','',f'Fecha UTC: {datetime.now(timezone.utc).isoformat(timespec="seconds")}.','',
           '> Las comprobaciones son automatizadas, **no** sesiones cognitivas con personas externas. Las capturas se generan con un navegador sin intervención humana.','',
           '| Tarjeta | Versión | Resultado | Nota |','|---|---|---|---|']
    lines += [f'| IHC-A-{n:02d} | {v} | {status} | {note.replace("|","/")} |' for n,v,status,note in records]
    lines += ['',f'**Total:** {sum(r[2]=="OK" for r in records)}/{len(records)} verificaciones conformes.', '',
              '## Qué no se ha demostrado','- Eficacia cognitiva con participantes de otro equipo.','- Observación presencial, duración de tarea, errores humanos y cita textual.','- Publicación de Issues, commits, ramas o PR reales.','- Compatibilidad real con lector de pantalla y otros navegadores.','']
    (ROOT/'tests/resultados_automatizados.md').write_text('\n'.join(lines),encoding='utf-8')
    for n,v,status,note in records: print(f'{n:02d} {v}: {status}: {note}')
    failed=sum(r[2]!='OK' for r in records)
    return failed

if __name__=='__main__':
    raise SystemExit(main())
