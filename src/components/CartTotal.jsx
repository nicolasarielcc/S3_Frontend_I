// Calcula y muestra el total del carrito usando el método reduce().

import { formatearPrecio } from '../utils/format.js'

export default function CartTotal({ items, productos }) {
  // Reduce suma el precio de cada entrada (precio unitario x cantidad).
  const total = items.reduce((acc, entrada) => {
    const producto = productos.find((p) => p.id === entrada.id)
    if (!producto) return acc
    return acc + producto.precio * entrada.cantidad
  }, 0)

  return <span className="fw-bold">{formatearPrecio(total)}</span>
}
