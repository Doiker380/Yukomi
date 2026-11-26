/**
 * Yukoverso 2.9.7 — contornos de los objetos pintados en observatorio_v1.webp.
 * Coordenadas ABSOLUTAS del lienzo panorámico 1800 × 1000.
 * No son sprites ni nuevas zonas interactivas: solo iluminación no clicable.
 * Si se sustituye el fondo, será necesario redibujar estas siluetas.
 */
export const OBSERVATORY_GLOWS = Object.freeze([
  {
    id: 'camino', color: '#f1d4fa', intensity: 'subtle',
    // Tramo sinuoso del sendero del lado izquierdo, no un óvalo sobre el botón.
    path: 'M 21 813 C 70 755 153 771 178 722 C 204 687 95 656 124 624 C 151 590 226 581 236 531'
  },
  {
    id: 'telescopio', color: '#ffdf98',
    // Contornos locales trazados sobre una ampliación del telescopio.
    // La transformación alinea el recorte con el mismo escenario 1800 × 1000.
    transform: 'translate(525 206.25) scale(0.625)',
    path: [
      // Perfiles del cuerpo principal (sin cerrar polígonos sobre el cielo).
      'M 105 341 C 218 315 377 233 688 77',
      'M 111 387 C 241 377 440 306 719 198',
      // Aro de la lente de entrada.
      'M 711 56 C 752 42 785 96 792 145 C 803 195 779 219 742 213 C 710 205 685 164 679 114 C 675 88 688 62 711 56 Z',
      // Buscador pequeño paralelo al tubo.
      'M 222 210 L 395 135 Q 404 137 407 151 L 239 227',
      // Anillo del montaje bajo el tubo.
      'M 416 281 C 444 262 475 281 480 314 C 485 347 464 370 431 373 C 399 368 388 333 402 301 Q 408 288 416 281 Z',
      // Patas: cada línea acompaña el canto dorado, sin triángulos en el aire.
      'M 344 446 L 201 760 Q 193 781 218 783',
      'M 411 451 L 413 749',
      'M 485 443 L 622 758 Q 630 778 614 780'
    ].join(' ')
  },
  {
    id: 'carta', color: '#ffe6b6',
    // Silueta del sobre real sobre la mesa, no del escritorio completo.
    path: 'M 1272 543 L 1348 515 L 1405 535 L 1395 564 L 1290 564 Z M 1272 543 L 1342 548 L 1405 535'
  }
]);
