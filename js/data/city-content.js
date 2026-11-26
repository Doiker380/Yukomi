/** Textos de Yukópolis, escritos en tono cercano para Yuko. */
export const CITY_MONTHS = [
  {name:'Yukoero', detail:'Otro año empezando y ya se me ocurrió otra tontería para este planeta.'},
  {name:'Yukobrero', detail:'Mes de chistes malos. No acepto reclamos.'},
  {name:'Yukomarzo', detail:'Salimos a explorar y terminamos perdiendo la noción del tiempo, como siempre.'},
  {name:'Yukobril', detail:'Apareció otro evento random. Nadie sabe por qué, pero Que goood.'},
  {name:'Yukomayo', detail:'Otra canción para poner a todo volumen.'},
  {name:'Yukonio', detail:'Hora de viciarnos un ratito. Un ratito de 5 horas, claro.'},
  {name:'Yukolio', detail:'Nos toca probar otro juego random. Ya veremos cuánto nos dura.'},
  {name:'Yukogosto', detail:'Alguien puso karaoke y ahora nadie se quiere ir.'},
  {name:'Yukotiembre', detail:'Nos hacen falta más capturas. Aunque ya guardé un montónnn.'},
  {name:'Yukotubre', detail:'Mes de sustos. No vale gritar tan fuerte (mentira, sí vale).'},
  {name:'Yukoviembre', detail:'El MES de Yuko. Obvio es el mejor del calendario.'},
  {name:'Yukociembre', detail:'Hora de mirar fotos viejitas y decir «aaah, me acuerdo».'}
];

export const CITY_MAIL = [
  {id:'saludo', icon:'💜', from:'David (desde la plaza)', subject:'Yukomi, llegaste', message:'Te hice una ciudad con tu nombre. Date una vuelta; hay cosas por descubrir.'},
  {id:'musica', icon:'🎵', from:'David otra vez', subject:'Una cosita random', message:'Todavía me acuerdo de las veces que hicimos karaoke. Me gusta mucho cantar contigo.'},
  {id:'cumple', icon:'🎂', from:'El Yukoplaneta (y yo)', subject:'HOY ES TU DÍA', message:'Yukooo, feliz cumpleaños 💜. Sí, todo este planeta es para ti. Espero que te guste y que encuentres un montón de cosas que te hagan reír.'}
];

export const CITY_DIALOGUE = {
  greeter: [
    'Yukomi, bienvenida a tu ciudad. Te estaba esperando.',
    'Por aquí está el calendario, el correo y el teatro. Ve a donde quieras, tú mandas.',
    'Si encuentras nombres raros por aquí, sí, fui yo.'
  ]
};

export const CITY_MUSICALS = [
  { id:'epic', title:'EPIC: The Musical', kind:'Lista de reproducción', url:'https://www.youtube.com/playlist?list=PLNQpggnSpD4oj3PCsZTzbzLFjHmOxTRHr' },
  { id:'epic-es', title:'EPIC: The Musical en español (en proceso)', kind:'Lista de reproducción', url:'https://www.youtube.com/playlist?list=PLJsE5AiHMLdI' },
  { id:'heathers', title:'Heathers', kind:'Video', url:'https://www.youtube.com/watch?v=VhPN8X-uGAw' },
  { id:'hamilton', title:'Hamilton', kind:'Lista de reproducción', url:'https://www.youtube.com/playlist?list=PLK1wqzZ8S6Rxh4Lird7421tcLNvtpD8uQ' }
];

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
  "sceneSign": "✦ Bienvenida, Yukomi ✦",
  "confetti": "✧　★　✦　♪　✧",
  "toolbarTitle": "🏰 La ciudad de Yukomi",
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
  "diaryInitial": "A ver qué encuentras por aquí.",
  "stamp": "✧ Encontraste los cuatro rincones. Me alegra que los hayas recorrido, Yukomi.",
  "closePopup": "✕",
  "calendarTitle": "📅 El Yukocalendario",
  "calendarDescription": "Le cambié el nombre a los doce meses. Toca uno para verlo.",
  "birthdayButton": "🎂 26 de Yukoviembre · TU DÍA",
  "birthdayTitle": "YUKOOOO, FELIZ CUMPLE",
  "birthdayText": "Hoy te toca a ti. Feliz cumpleaños, Yuko 💜. Que sea un día bien goood.",
  "birthdayDone": "✓ Que goood 💜",
  "calendarHint": "Hay doce meses, todos con un nombre nuevo.",
  "mailTitle": "💌 Yukocorreo para ti",
  "mailDescription": "Te dejé tres sobrecitos. Abre el que quieras primero.",
  "mailOpenedTitle": "Ya abriste un sobrecito",
  "mailHint": "Hay tres sobres aquí. Ábrelos a ver qué dicen jaja.",
  "residentTitle": "Alguien de Yukópolis",
  "theaterTitle": "El Yukoteatro",
  "theaterText": "Yukomi, te dejé aquí los musicales que me compartiste. Elige uno cuando quieras.",
  "selectEnvelope": "Toca un sobrecito, a ver qué hay.",
  "mailOpened": "Abriste «{subject}» 💌",
  "mailSender": "De: {from}",
  "openLetter": "Abrir carta: {subject}",
  "calendarAnnouncement": "Yukocalendario",
  "mailAnnouncement": "Yukocorreo"
};
export function cityText(key,values={}) { return CITY_UI[key].replace(/\{(\w+)\}/g,(_,name)=>String(values[name] ?? '')); }
