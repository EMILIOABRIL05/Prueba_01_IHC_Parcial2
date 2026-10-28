from pathlib import Path
import xml.etree.ElementTree as ET
root=Path(__file__).resolve().parents[1]
for n in range(1,13):
 c=f"IHC-A-{n:02}"
 text=(root/"docs/tarjetas"/f"{c}.md").read_text(encoding="utf-8")
 for i in range(1,7): assert f"R{i:02}" in text
 for suffix in ("sitemap","flujo"): assert (root/"diagramas"/f"{c}-{suffix}.mmd").exists()
 for slot in ("inicio","accion","error","confirmacion"):
  ET.parse(root/"wireframes"/f"{c}-{slot}.svg")
m=(root/"docs/trazabilidad.md").read_text(encoding="utf-8")
assert len([x for x in m.splitlines() if x.startswith("| [IHC-A-")])==72
print("OK: 12 fichas; 72 filas; 24 diagramas; 48 wireframes")
