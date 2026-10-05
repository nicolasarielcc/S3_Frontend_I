// Modal de confirmación de compra (checkout), controlado por estado en React.
// Muestra el resumen del pedido (productos y total) y permite confirmar o cancelar.
// Se renderiza condicionalmente desde App cuando el usuario pulsa "Finalizar compra".

import { formatearPrecio } from '../utils/format.js'

const BASE = import.meta.env.BASE_URL

export default function Checkout({ items, productos, onConfirmar, onCancelar }) {
  // Total del pedido usando reduce().
  const total = items.reduce((acc, entrada) => {
    const producto = productos.find((p) => p.id === entrada.id)
    if (!producto) return acc
    return acc + producto.precio * entrada.cantidad
  }, 0)

  return (
    <div
      className="modal d-block"
      tabIndex="-1"
      role="dialog"
      aria-modal="true"
      aria-labelledby="checkout-titulo"
      style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="checkout-titulo">Finalizar compra</h5>
            <button type="button" className="btn-close" aria-label="Cerrar" onClick={onCancelar}></button>
          </div>

          <div className="modal-body">
            <ul className="list-group list-group-flush mb-3">
              {items.map((entrada) => {
                const producto = productos.find((p) => p.id === entrada.id)
                if (!producto) return null
                return (
                  <li key={entrada.id} className="list-group-item d-flex justify-content-between align-items-center">
                    <span className="d-flex align-items-center gap-2">
                      <img
                        src={`${BASE}${producto.img}`}
                        alt={`Portada de ${producto.nombre}`}
                        width="32"
                        height="32"
                        style={{ objectFit: 'cover', borderRadius: 6 }}
                      />
                      <span>
                        {producto.nombre}{' '}
                        <span className="badge bg-secondary rounded-pill">x{entrada.cantidad}</span>
                      </span>
                    </span>
                    <span>{formatearPrecio(producto.precio * entrada.cantidad)}</span>
                  </li>
                )
              })}
            </ul>

            <div className="d-flex justify-content-between fw-bold">
              <span>Total a pagar:</span>
              <span>{formatearPrecio(total)}</span>
            </div>
          </div>

          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onCancelar}>Cancelar</button>
            <button type="button" className="btn btn-success" onClick={onConfirmar}>Confirmar compra</button>
          </div>
        </div>
      </div>
    </div>
  )
}
