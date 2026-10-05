// Mensaje emergente (toast) controlado por estado.
// Se muestra cuando 'mensaje' no es nulo y se oculta solo tras unos segundos.
// useEffect maneja el temporizador y su limpieza (cleanup).

import { useEffect } from 'react'

export default function Toast({ mensaje, onClose }) {
  // Efecto secundario: cuando aparece un mensaje, programamos su cierre automático.
  useEffect(() => {
    if (!mensaje) return

    const timer = setTimeout(onClose, 2500)

    // Cleanup: limpiamos el temporizador si el componente se desmonta o cambia el mensaje.
    return () => clearTimeout(timer)
  }, [mensaje, onClose])

  // Renderizado condicional: el toast solo se muestra si hay mensaje.
  if (!mensaje) return null

  return (
    <div className="toast-container position-fixed bottom-0 end-0 p-3">
      <div className="toast show align-items-center text-bg-primary border-0" role="alert" aria-live="assertive">
        <div className="d-flex">
          <div className="toast-body">{mensaje}</div>
          <button
            type="button"
            className="btn-close btn-close-white me-2 m-auto"
            aria-label="Cerrar"
            onClick={onClose}
          ></button>
        </div>
      </div>
    </div>
  )
}
