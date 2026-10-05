// Listado de productos (catálogo).
// Recibe la lista ya filtrada y renderiza una grilla de tarjetas.
// 'idsEnCarrito' es un Set con los ids ya agregados, para alternar el texto del botón.

import ProductCard from './ProductCard.jsx'

export default function ProductList({ productos, onAdd, idsEnCarrito }) {
  return (
    <div id="grid-productos" className="row g-3">
      {productos.map((producto) => (
        <ProductCard
          key={producto.id}
          producto={producto}
          estaEnCarrito={idsEnCarrito.has(producto.id)}
          onAdd={onAdd}
        />
      ))}
    </div>
  )
}
