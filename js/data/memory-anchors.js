/**
 * Objetos de recuerdos colocados en escenarios panorámicos.
 * Para añadir un objeto nuevo, agrega una entrada aquí y un recuerdo en
 * memories.js con locations: [{region:'...', object:'ID_DEL_OBJETO'}].
 * NO necesitas cambiar la lógica de las escenas.
 * x/y representan % del escenario, no de la pantalla.
 * Los objetos sin recuerdos asignados no se dibujan (evita lugares vacíos).
 */
export const MEMORY_ANCHORS = {
  yukofauna: [], // Sin fotografía provisional. Podemos añadir dibujos reales más adelante.
  yukopolis: [
    { id:'museo', label:'Museo de partidas', icon:'🏆', x:54.5, y:34, painted:true, width:110, height:120 },
    { id:'computadora', label:'PC de recuerdos', icon:'💻', x:57, y:71, painted:true, width:140, height:150 }
  ],
  yukoteca: [
    // El marco está PINTADO en el fondo, a la izquierda. No superponer otro PNG.
    // El contorno no es rectangular: el SVG solo dibuja luz sobre la silueta inclinada.
    // Coordenadas del glow relativas al rectángulo táctil (142 × 156), no a la pantalla.
    {
      id:'marco', label:'Marco de recuerdos', icon:'🖼️',
      x:13.8, y:74, painted:true, width:142, height:156,
      glow: {
        viewBox:'0 0 142 156',
        path:'M 2 14 Q 4 11 10 11 L 106 11 Q 112 11 114 17 L 125 42 L 138 139 Q 140 146 133 147 L 38 152 Q 34 151 33 145 L 19 62 L 8 28 Q 4 21 2 14 Z',
        color:'#ffe3a1'
      }
    }
  ],
  yukobservatorio: [
    { id:'recuerdo', label:'Postal estelar', icon:'🖼️', x:58, y:80 }
  ]
};
export function anchorsFor(region){return MEMORY_ANCHORS[region] || [];}
