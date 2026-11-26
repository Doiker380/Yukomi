import { memoriesAt } from './memories.js?v=2.9.17';
/**
 * Contenido de Yukoteca.
 * - Los dibujos siguen tomando el catálogo de recuerdos del taller.
 * - Las fotos/capturas usan el material real cuando existe.
 * - Los álbumes muestran recuerdos reales si ya fueron integrados.
 */
const allWorkshopImages = memoriesAt('yukoteca','taller').filter(item=>item.type==='image');
const realWorkshopImages = allWorkshopImages.filter(item=>!item.demo);
const workshopImages = realWorkshopImages.length ? realWorkshopImages : allWorkshopImages;

const allPhotoImages = memoriesAt('yukoteca','fotos').filter(item=>item.type==='image');
const realPhotoImages = allPhotoImages.filter(item=>!item.demo);
const photoImages = realPhotoImages.length ? realPhotoImages : allPhotoImages;

export const LIBRARY_ARTWORKS = workshopImages.map(item=>({
  id:item.id,title:item.title,artist:item.demo?'Un dibujito de prueba':'Dibujo o ilustración',src:item.src,
  alt:item.title,caption:item.description,memoryId:item.id
}));

export const LIBRARY_PHOTOS = photoImages.map(item=>({
  id:item.id,
  title:item.title,
  artist:item.category === 'Skins match' ? 'Captura de skins' : 'Fotografía / captura',
  src:item.src,
  alt:item.title,
  caption:item.description,
  memoryId:item.id
}));

const hasRealPhotos = realPhotoImages.length > 0;
const REAL_ALBUMS = [
  {
    id: 'momentos',
    title: 'Un montón de momentos contigo',
    icon: '💜',
    description: 'Unos cuantos de los momentos que más me gustó guardar contigo. Que goood.',
    pages: [
      { id:'intro', type:'text', title:'Un montón de recuerdos', text:'Junté algunas fotos nuestras. Me hizo ilusión volver a verlas contigo.' },
      { id:'foto-01', type:'image', memoryId:'foto-01', title:'Primera foto contigo' },
      { id:'foto-03', type:'image', memoryId:'foto-03', title:'Tomando confianza' },
      { id:'foto-06', type:'image', memoryId:'foto-06', title:'Karaoke contigo' },
      { id:'foto-09', type:'image', memoryId:'foto-09', title:'Películas contigo' },
      { id:'foto-16', type:'image', memoryId:'foto-16', title:'Minecraft a tu lado' },
      { id:'foto-18', type:'image', memoryId:'foto-18', title:'Fortnite contigo' },
      { id:'foto-19', type:'image', memoryId:'foto-19', title:'Amo hacerte fotos' },
      { id:'foto-21', type:'image', memoryId:'foto-21', title:'Más de 200 horas' },
      { id:'cierre', type:'text', title:'Y todavía quedan más', text:'Si quieres seguir mirando, hay más en Fotos. Gracias por todas esas partidas y ratos contigo, Yukomi 💜.' }
    ]
  },
  {
    id: 'skins-match',
    title: 'Skins match',
    icon: '✨',
    description: 'Las veces que combinamos skins y guardamos capturas.',
    pages: [
      { id:'intro', type:'text', title:'Match de skins otra vez', text:'Hicimos match de skins tantas veces que terminé guardando un montón de capturas.' },
      { id:'foto-08', type:'image', memoryId:'foto-08', title:'Primer match de skins' },
      { id:'foto-10', type:'image', memoryId:'foto-10', title:'Con Warrior' },
      { id:'foto-12', type:'image', memoryId:'foto-12', title:'Más recuerdos de skins' },
      { id:'foto-13', type:'image', memoryId:'foto-13', title:'Para nada lo obligaron' },
      { id:'foto-14', type:'image', memoryId:'foto-14', title:'Demian y Aokari' },
      { id:'foto-22', type:'image', memoryId:'foto-22', title:'Berry' },
      { id:'cap-01', type:'image', memoryId:'captura-skin-01', title:'Skin match 01', caption:'Mira Que goood quedó esta skin match.' },
      { id:'cap-02', type:'image', memoryId:'captura-skin-02', title:'Skin match 02', caption:'Otra combinación que quedó muy bien.' },
      { id:'cap-03', type:'image', memoryId:'captura-skin-03', title:'Skin match 03', caption:'Y otra más para la colección de skins match.' },
      { id:'cap-04', type:'image', memoryId:'captura-skin-04', title:'Skin match 04', caption:'Aquí va otra de nuestras skins.' }
    ]
  }
];

const DEFAULT_ALBUMS = [
  {
    id: 'cuaderno',
    title: 'Cuaderno de creaciones',
    icon: '🎨',
    description: 'Un cuadernito de dibujos para ir llenando después.',
    pages: [
      {id:'portada', type:'image', memoryId:'boceto-pinguino', title:'Primer boceto', alt:'Boceto de un pingüino.', caption:'Aquí después pondremos un dibujito de verdad.'},
      {id:'flores', type:'image', memoryId:'jardin-ilustrado', title:'Una página de flores', alt:'Tres flores rosadas.', caption:'Los dibujos se muestran sin recortarse.'},
      {id:'nota', type:'text', title:'Una notita', text:'Aquí luego podemos poner la historia de algún personaje que inventamos.'}
    ]
  },
  {
    id: 'recuerdos',
    title: 'Álbum de recuerdos',
    icon: '📸',
    description: 'Aquí van nuestras fotitos y las cosas que nos acordamos al verlas.',
    pages: [
      {id:'portada', type:'image', memoryId:'postal-estelar', title:'Un espacio para una foto', alt:'Paisaje estrellado de muestra.', caption:'Una postal de estrellitas por ahora.'},
      {id:'planeta', type:'image', memoryId:'ejemplo-roblox', title:'Otro rincón del Yukoverso', alt:'Planeta violeta ilustrado.', caption:'Otro rinconcito para ir guardando nuestras fotos.'},
      {id:'nota', type:'text', title:'Algo para recordar', text:'Texto de prueba. Sustituye esta página por una anécdota real que quieras compartir.'}
    ]
  }
];

export const LIBRARY_ALBUMS = hasRealPhotos ? REAL_ALBUMS : DEFAULT_ALBUMS;
