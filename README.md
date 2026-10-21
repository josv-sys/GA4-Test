# Opeth Rules · Laboratorio GA4

Sitio estático de fans de Opeth (historia, tienda simulada y videos) para practicar **Google Analytics 4**. Usa HTML, Bootstrap 5 y JavaScript sin dependencias de build, y se publica con GitHub Pages.

## Configurar GA4

1. En GA4, crea una propiedad y un **flujo de datos web** con la URL de GitHub Pages (`https://<usuario>.github.io/<repo>/`).
2. Copia el ID de medición `G-XXXXXXXXXX` en `js/analytics.js` (`GA_MEASUREMENT_ID`).
3. Haz commit y push. Abre el sitio, **acepta las cookies** y revisa **Informes → Tiempo real**.
4. Para usar **DebugView**, abre cualquier página con `?debug=1`.

El botón **GA4** de la esquina inferior izquierda muestra cada evento que dispara el sitio, aunque todavía no tengas un ID configurado.

## Probar en local

```bash
npx serve .        # o la extensión Live Server de VS Code
```

En `localhost`, el modo debug se activa automáticamente.

## Mapa de eventos

| Página | Eventos |
|---|---|
| Todas | `page_view` (auto), `consent_update`, clics salientes y descargas (Enhanced Measurement) |
| Inicio | `cta_click`, `view_item_list`, `select_item`, `add_to_cart`, `view_promotion`, `select_promotion`, `sign_up`, `select_content` |
| Historia | `select_content` (Conocer más / índice), `cta_click` |
| Tienda | `view_item_list`, `select_item`, `add_to_cart`, `filter_items`, `sort_items` |
| Álbum | `view_item`, `select_variant`, `add_to_cart`, `add_to_wishlist`, `share`, `select_item` |
| Carrito | `view_cart`, `add_to_cart`, `remove_from_cart`, `apply_coupon`, `begin_checkout` |
| Checkout | `add_shipping_info`, `add_payment_info` |
| Gracias | `purchase` (sin duplicados al recargar), `refund` |
| Videos | `video_open` |
| Contacto | `generate_lead`, `sign_up`, `select_content` (FAQ), `form_start` (Enhanced Measurement) |

Cupones de prueba: `OPETH10` y `DAMNATION20`.

### Dimensiones personalizadas sugeridas (Admin → Definiciones personalizadas)

`cta_name`, `cta_location`, `filter_value`, `sort_by`, `lead_source`, `lead_reason`, `video_title`, `open_mode`, `form_location`

## Estructura

```
index.html  historia.html  tienda.html  album.html  carrito.html
checkout.html  gracias.html  videos.html  contacto.html  404.html
css/style.css
js/analytics.js   ← ID de GA4, consentimiento y OR.track()
js/data.js        ← catálogo, videos y formato de items GA4
js/cart.js        ← carrito en localStorage
js/main.js        ← navbar, footer, banner de cookies y panel GA4
assets/img/       ← imágenes opcionales (ver LEEME.md)
```

> Sitio de fans sin afiliación con Opeth. La tienda es ficticia y no cobra nada.
