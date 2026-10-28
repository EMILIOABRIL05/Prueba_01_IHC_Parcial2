"""Comprobador de entregables de pruebas y evidencias · Jonathan Gamboa."""
import os
import sys

def main():
    print("=== Comprobación de entregables de Jonathan Gamboa (jhonatan/pruebas) ===")
    rutas_obligatorias = [
        "README-JHONATAN.md",
        "docs/defensa.md",
        "docs/revision_pr_emilio.md",
        "docs/incidencia-sorpresa-plantilla.md",
        "evidencias/IHC-A-12/README.md",
        "evidencias/capturas-tecnicas/IHC-A-12-v1.png",
        "evidencias/capturas-tecnicas/IHC-A-12-v2.png",
        "pruebas/README.md",
        "pruebas/sesion.md",
        "pruebas/IHC-A-12-sesion.md",
        "tests/casos-manuales.md",
        "tests/resultados_automatizados.md"
    ]
    
    faltantes = []
    for r in rutas_obligatorias:
        if os.path.exists(r):
            print(f" [OK] {r}")
        else:
            print(f" [FALTA] {r}")
            faltantes.append(r)
            
    # Comprobar las 12 actas de sesión
    for i in range(1, 13):
        acta = f"pruebas/IHC-A-{i:02d}-sesion.md"
        if not os.path.exists(acta):
            faltantes.append(acta)
            
    # Comprobar las 24 capturas técnicas
    for i in range(1, 13):
        for v in ["v1", "v2"]:
            cap = f"evidencias/capturas-tecnicas/IHC-A-{i:02d}-{v}.png"
            if not os.path.exists(cap):
                faltantes.append(cap)
                
    if faltantes:
        print(f"\nError: Hay {len(faltantes)} archivos faltantes.")
        sys.exit(1)
        
    print("\n[OK] Todos los entregables de pruebas, evidencias y defensa estan conformes (12 actas, 24 capturas, revision PR y defensa).")

if __name__ == "__main__":
    main()
