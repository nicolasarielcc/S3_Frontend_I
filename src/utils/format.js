// Utilidades de formato reutilizables.

// Formatea un número como moneda chilena (CLP) sin decimales.
export function formatearPrecio(valor) {
  return valor.toLocaleString('es-CL', {
    style: 'currency',
    currency: 'CLP',
    maximumFractionDigits: 0,
  })
}
