/** Textos de Yukópolis, escritos en tono cercano para Yuko. */
export const CITY_MONTHS = [
  {name:'Yukoero', detail:'Otro año empezando y ya se me ocurrió otra tontería para este planeta.'},
  {name:'Yukobrero', detail:'Mes de chistes malos. No acepto reclamos JAJA.'},
  {name:'Yukomarzo', detail:'Salimos a explorar y terminamos perdiendo la noción del tiempo, como siempre.'},
  {name:'Yukobril', detail:'Apareció otro evento random. Nadie sabe por qué, pero Que goood.'},
  {name:'Yukomayo', detail:'Una canción más. Bueno, dos. Bueno, ya perdimos la cuenta JAJA.'},
  {name:'Yukonio', detail:'Hora de viciarnos un ratito. Un ratito de 5 horas, claro.'},
  {name:'Yukolio', detail:'Nos toca probar otro juego random. ¿Lo abandonaremos después? Probablemente JAJA.'},
  {name:'Yukogosto', detail:'Alguien puso karaoke y ahora nadie se quiere ir.'},
  {name:'Yukotiembre', detail:'Nos hacen falta más capturas. Aunque ya guardé un montónnn.'},
  {name:'Yukotubre', detail:'Mes de sustos. No vale gritar tan fuerte (mentira, sí vale).'},
  {name:'Yukoviembre', detail:'El MES de Yuko. Obvio es el mejor del calendario.'},
  {name:'Yukociembre', detail:'Hora de mirar fotos viejitas y decir «aaah, me acuerdo».'}
];

export const CITY_MAIL = [
  {id:'saludo', icon:'💜', from:'David (desde la plaza)', subject:'Yukomooo estás', message:'Yukoooo, te hice una ciudad con tu nombre JAJA. Date una vuelta, hay cositas por todos lados.'},
  {id:'musica', icon:'🎵', from:'David otra vez', subject:'Una cosita random', message:'Todavía me acuerdo de nuestras veces haciendo karaoke. Me gusta un montón cuando cantamos, aunque nos pongamos bien random JAJA.'},
  {id:'cumple', icon:'🎂', from:'El Yukoplaneta (y yo)', subject:'HOY ES TU DÍA', message:'Yukooo, feliz cumpleaños 💜. Sí, todo este planeta es para ti. Espero que te guste y que encuentres un montón de cosas que te hagan reír.'}
];

export const CITY_DIALOGUE = {
  greeter: [
    'Yukomooo estás JAJA. Bienvenida a esta ciudad que ya tiene tu nombre por todos lados.',
    'Por aquí está el calendario, el correo y el teatro. Ve a donde quieras, tú mandas.',
    'Y si encuentras nombres bien raros... sí, fui yo. No preguntes JAJA.'
  ]
};

// Rótulos y mensajes de interfaz; conservar claves y editar solo valores.
export const CITY_UI = {
  "banners": "✦　✧　✦　✧",
  "walkerLeft": "🧑‍🎨",
  "walkerRight": "🎩",
  "residentIcon": "👩‍💼",
  "residentLabel": "Habitante",
  "calendarIcon": "📅",
  "calendarLabel": "Calendario",
  "mailIcon": "💌",
  "mailLabel": "Yukocorreo",
  "theaterIcon": "🎭",
  "theaterLabel": "Teatro",
  "sceneSign": "✦ Yukooo, llegaste ✦",
  "confetti": "✧　★　✦　♪　✧",
  "toolbarTitle": "🏰 La ciudad más Yuko de todas",
  "toolbarHint": "Muévete por aquí, dejé cositas escondidas jaja.",
  "tabPlaza": "⛲ Plaza",
  "tabCalendar": "📅 Ayuntamiento",
  "tabMail": "💌 Correo",
  "tabTheater": "🎭 Teatro",
  "tabMuseum": "🏆 Museo",
  "tabComputer": "💻 PC",
  "messageIcon": "🏰",
  "closeMessage": "✕",
  "zoomIn": "+",
  "zoomOut": "−",
  "reset": "⌖",
  "panHint": "↔ Desliza y curiosea",
  "diaryEyebrow": "EL YUKODIARIO",
  "diaryTitle": "Lo que ya encontraste",
  "initialCount": "0/4",
  "diaryHint": "Pásate por el calendario, abre los sobres y habla con la gente. Hay sorpresitas.",
  "diaryInitial": "A ver qué encuentras por aquí JAJA.",
  "stamp": "✧ Encontraste los cuatro rincones. Que goood, Yuko.",
  "closePopup": "✕",
  "calendarTitle": "📅 El Yukocalendario",
  "calendarDescription": "Sí, le cambié el nombre a TODOS los meses JAJA. Toca uno para ver qué se me ocurrió.",
  "birthdayButton": "🎂 26 de Yukoviembre · TU DÍA",
  "birthdayTitle": "YUKOOOO, FELIZ CUMPLE",
  "birthdayText": "Hoy te toca a ti. Feliz cumpleaños, Yuko 💜. Que sea un día bien goood.",
  "birthdayDone": "✓ Que goood 💜",
  "calendarHint": "Hay 12 meses y obviamente todos están yukificados. JAJA.",
  "mailTitle": "💌 Yukocorreo para ti",
  "mailDescription": "Te dejé tres sobrecitos. Abre el que quieras primero.",
  "mailOpenedTitle": "Ya abriste un sobrecito",
  "mailHint": "Hay tres sobres aquí. Ábrelos a ver qué dicen jaja.",
  "residentTitle": "Alguien de Yukópolis",
  "theaterTitle": "El Yukoteatro",
  "theaterText": "Obviamente tenía que poner un teatro, con todos los musicales que te gustan JAJA. Este rinconcito es para eso.",
  "selectEnvelope": "Toca un sobrecito, a ver qué hay.",
  "mailOpened": "Abriste «{subject}» 💌",
  "mailSender": "De: {from}",
  "openLetter": "Abrir carta: {subject}",
  "calendarAnnouncement": "Yukocalendario",
  "mailAnnouncement": "Yukocorreo"
};
export function cityText(key,values={}) { return CITY_UI[key].replace(/\{(\w+)\}/g,(_,name)=>String(values[name] ?? '')); }
