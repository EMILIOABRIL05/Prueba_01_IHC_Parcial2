"""Entrada compatible: delega a las pruebas HTTP de las implementaciones reales.
Usar --browser-path si Chromium no está instalado con Playwright.
La salida por defecto es temporal y no acredita participantes.
"""
import sys
from navegador_integral import main
if __name__ == '__main__':
    sys.argv.extend(['--grupo','a02'])
    raise SystemExit(main())
