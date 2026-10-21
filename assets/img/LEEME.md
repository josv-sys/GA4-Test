# Imágenes

## Portadas (`covers/`)
Cada álbum indica su archivo en `js/data.js` (campo `cover`), por ejemplo:
`{ id: 'blackwater-park', cover: 'BW park.jpg', ... }`

Para cambiar una portada, reemplaza el archivo con el mismo nombre o edita `cover`.
En GitHub Pages los nombres distinguen mayúsculas: `Orchid.jpg` ≠ `orchid.jpg`.
Si un archivo falta, se muestra la portada generada con CSS.

Tamaño ideal: cuadradas, ~1000×1000, menos de 300 KB.

## Opcionales
- `hero.jpg`: fondo de la portada del inicio (horizontal, ~1920×1080, oscuro)
