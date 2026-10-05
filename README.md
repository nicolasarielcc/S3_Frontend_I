# Bookstore — eCommerce (React + Vite)

Proyecto de la **Actividad Sumativa de la Semana 8** de Desarrollo Frontend I (PFY2201): *"Mejorando funcionalidades clave en el eCommerce con React"*.

Continuación del eCommerce de la Semana 6 (JavaScript + Bootstrap 5), migrado a **React** con componentes funcionales, `useState`, `useEffect`, renderizado condicional y **flujo de compra (checkout)**. Los productos se cargan desde una **API pública** (dummyjson).

**Stack:** React + Vite (bundler/dev server con transpilación y minificación), **Bootstrap 5 vía CDN** (CSS + bundle JS en `index.html`), y despliegue con la librería `gh-pages` (Node local + `npm run deploy`, sin GitHub Actions).

## Estructura de archivos

```
proyecto-ecommerce-s8/
├── index.html
├── vite.config.js          # base configurada para GitHub Pages
├── package.json
└── public/
│   └── img/                # portadas y logo
└── src/
    ├── main.jsx            # punto de entrada
    ├── App.jsx             # estado global + integración
    ├── index.css           # estilos propios
    ├── utils/
    │   └── format.js       # formateo de moneda CLP
    └── components/
        ├── Navbar.jsx
        ├── Carousel.jsx
        ├── SearchBar.jsx
        ├── ProductList.jsx
        ├── ProductCard.jsx
        ├── Cart.jsx
        ├── CartTotal.jsx
        ├── Checkout.jsx    # modal de finalización de compra
        ├── ContactForm.jsx
        └── Toast.jsx
```

## Cómo ejecutar localmente

```bash
npm install
npm run dev        # abre http://localhost:5173
```

## Fuente de datos

El catálogo se obtiene desde la API pública de dummyjson mediante `fetch()` dentro de `useEffect`:

```
https://dummyjson.com/c/0ca1-f66c-42d1-be14
```

La respuesta incluye `id`, `titulo`, `autor`, `precio` e `img`. En `App.jsx` se normalizan los campos al modelo interno del proyecto (`titulo` → `nombre`).

## Requerimientos implementados (Semana 8)

| Requerimiento | Implementación |
|---|---|
| **useState** (catálogo, carrito, elemento interactivo) | `App.jsx` gestiona `productos`, `carrito`, `busqueda` y `mostrarCheckout`; el botón de cada tarjeta alterna entre "Agregar al carrito" y "En el carrito". |
| **useEffect** (carga de datos + actualización de estado) | Carga del catálogo desde la API pública al montar, con manejo de carga/error y persistencia del carrito en `localStorage`. |
| **Renderizado condicional** | Mensaje de "carrito vacío", mensaje de "sin resultados", indicador de carga, cambio de texto del botón y modal de checkout. |
| **Flujo de compra (checkout)** | Botón "Finalizar compra" abre un modal con el resumen del pedido; al confirmar se limpia el carrito y se muestra un mensaje de éxito. |
| **Buenas prácticas** | Estructura de carpetas por responsabilidad (`components/`, `utils/`) y código comentado. |

## Despliegue en GitHub Pages

1. Asegúrate de que `base` en `vite.config.js` coincida con el nombre del repositorio.
   ```js
   base: '/S3_Frontend_I/'
   ```
2. Verifica que el repositorio sea público y que la rama `gh-pages` esté habilitada (Settings → Pages).
3. Ejecuta:
   ```bash
   npm run deploy
   ```
4. El sitio quedará disponible en `https://nicolasarielcc.github.io/S3_Frontend_I/`.

> Nota: las imágenes se sirven desde la carpeta `public/`; la API pública (dummyjson) devuelve rutas relativas que se resuelven contra el `base` de Vite.
