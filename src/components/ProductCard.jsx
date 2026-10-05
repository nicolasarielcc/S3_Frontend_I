// Tarjeta de producto individual.
// Renderizado condicional del botón: si el producto ya está en el carrito,
// se muestra "En el carrito" (deshabilitado); si no, "Agregar al carrito".

import { formatearPrecio } from '../utils/format.js'

const BASE = import.meta.env.BASE_URL

export default function ProductCard({ producto, estaEnCarrito, onAdd }) {
  return (
    <div className="col-12 col-sm-6 col-lg-4">
      <div className="card card-producto h-100 shadow-sm">
        <img
          src={`${BASE}${producto.img}`}
          className="card-img-top"
          alt={`Portada de ${producto.nombre}`}
        />
        <div className="card-body d-flex flex-column">
          <h3 className="h5 card-title">{producto.nombre}</h3>
          <p className="card-text text-muted">{producto.autor}</p>
          <p className="card-text precio">{formatearPrecio(producto.precio)}</p>

          <div className="mt-auto">
            {/* Renderizado condicional: cambia el texto/estilo según el estado del carrito */}
            {estaEnCarrito ? (
              <button className="btn btn-success w-100" type="button" disabled>
                ✓ En el carrito
              </button>
            ) : (
              <button
                className="btn btn-primary w-100"
                type="button"
                onClick={() => onAdd(producto.id)}
              >
                Agregar al carrito
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
