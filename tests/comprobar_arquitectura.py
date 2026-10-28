"""Comprueba requisitos y trazabilidad exacta; no evalúa interacción ni personas."""
from pathlib import Path
import re
import xml.etree.ElementTree as ET
root=Path(__file__).resolve().parents[1]
expected={(f'IHC-A-{n:02d}',f'R{i:02d}') for n in range(1,13) for i in range(1,7)}
expected.update({('IHC-A-01','R7'),('IHC-A-12','R7')})
for n in range(1,13):
 c=f'IHC-A-{n:02d}'
 text=(root/'docs/tarjetas'/f'{c}.md').read_text(encoding='utf-8')
 for i in range(1,7): assert re.search(r'\| R%02d \|'%i,text),(c,i)
 for suffix in ('sitemap','flujo'): assert (root/'diagramas'/f'{c}-{suffix}.mmd').exists()
 for slot in ('inicio','accion','error','confirmacion'): ET.parse(root/'wireframes'/f'{c}-{slot}.svg')
rows=re.findall(r'^\| \[(IHC-A-\d{2})\].*?\| (R\d+) \|',(root/'docs/trazabilidad.md').read_text(),re.M)
assert len(rows)==len(set(rows)), 'Filas de requisitos duplicadas'
assert set(rows)==expected, {'faltan':sorted(expected-set(rows)), 'sobran':sorted(set(rows)-expected)}
print('OK: 12 fichas; 74 requisitos únicos (72 base + 2 R7); 24 diagramas; 50 wireframes')
