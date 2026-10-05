// Resumen del carrito de compras.
// Renderizado condicional: si está vacío muestra un mensaje; si no, lista + total.

import CartTotal from './CartTotal.jsx'
import { formatearPrecio } from '../utils/format.js'

const BASE = import.meta.env.BASE_URL

export default function Cart({ items, productos, onQuitar, onVaciar, onComprar }) {
  return (
    <section id="carrito" className="mb-4" aria-label="Resumen del carrito de compras">
      <h2 className="h5 fw-bold mb-3">Carrito de compras</h2>

      <div className="card shadow-sm">
        <div className="card-body">
          {/* Renderizado condicional: mensaje de carrito vacío */}
          {items.length === 0 ? (
            <p className="text-muted mb-0">El carrito está vacío. Agrega productos desde el catálogo.</p>
          ) : (
            <>
              <ul className="list-group list-group-flush mb-2">
                {items.map((entrada) => {
                  // Buscamos el detalle del producto por su id para mostrar nombre, precio e imagen.
                  const producto = productos.find((p) => p.id === entrada.id)
                  if (!producto) return null

                  const subtotal = producto.precio * entrada.cantidad

                  return (
                    <li
                      key={entrada.id}
                      className="list-group-item d-flex justify-content-between align-items-center"
                    >
                      <span className="d-flex align-items-center gap-2">
                        <img
                          src={`${BASE}${producto.img}`}
                          alt={`Portada de ${producto.nombre}`}
                          width="40"
                          height="40"
                          style={{ objectFit: 'cover', borderRadius: 6 }}
                        />
                        <span>
                          {producto.nombre}{' '}
                          <span className="badge bg-secondary rounded-pill">x{entrada.cantidad}</span>
                        </span>
                      </span>

                      <span className="d-flex align-items-center gap-2">
                        <span>{formatearPrecio(subtotal)}</span>
                        <button
                          className="btn btn-sm btn-outline-danger"
                          type="button"
                          onClick={() => onQuitar(entrada.id)}
                          aria-label="Quitar una copia"
                          title="Quitar una copia"
                        >
                          &minus;
                        </button>
                      </span>
                    </li>
                  )
                })}
              </ul>

              <div className="d-flex justify-content-between align-items-center">
                <span className="fw-bold">Total:</span>
                <CartTotal items={items} productos={productos} />
              </div>

              <div className="d-flex justify-content-between align-items-center mt-2">
                <button className="btn btn-sm btn-outline-danger" type="button" onClick={onVaciar}>
                  Vaciar carrito
                </button>
                <button className="btn btn-sm btn-success" type="button" onClick={onComprar}>
                  Finalizar compra
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  )
}
