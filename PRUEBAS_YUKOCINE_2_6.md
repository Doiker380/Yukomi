# Pruebas manuales — Yukocine 2.6

1. Entrar desde el mapa: carga a la primera sin vibraciones, fondo completo en altura y recorrido horizontal.
2. Tocar Cartelera: ver tres tarjetas; cada tarjeta abre ilustración y descripción; cerrar y regresar.
3. Tocar Taquilla: elegir un género; la reacción aparece y solo una opción queda seleccionada.
4. Tocar Proyector: aparecen filtros y recuerdos del catálogo; la lista no carga todos los videos al entrar.
5. Abrir `Proyección de demostración`: reproducir, cerrar y confirmar que el sonido termina.
6. Usar +, − y ⌖; tras + puede desplazarse verticalmente; ⌖ vuelve al encuadre panorámico.
7. Volver al mapa y entrar otra vez: no hay saltos/vibración.
8. Ver Yukopasaporte: los descubrimientos previos siguen; visitar los tres para marcar 3/3.
9. Comprobar que Yukobservatorio, Yukoteca, Yukofauna y Yukópolis conservan sus funciones.
10. En teléfono probar arrastre táctil, zoom y que los accesos no tapen información esencial.

Servidor Windows PowerShell:
```powershell
cd "$HOME\Desktop\Yukoverso_Fase1"
py -m http.server 8765 --bind 0.0.0.0
```

Pruebas automatizadas (Node.js opcional para ejecutar la web):
```powershell
node tests/validate.mjs
node tests/architecture.mjs
node tests/cinema-layout.mjs
```
