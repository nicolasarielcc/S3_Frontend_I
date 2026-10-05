// Formulario de contacto con estado controlado y validación nativa de Bootstrap.
// Al enviar un formulario válido, notifica al usuario mediante la prop onEnviado.

import { useState } from 'react'

export default function ContactForm({ onEnviado }) {
  // Estado local del formulario (un solo objeto para los tres campos).
  const [form, setForm] = useState({ nombre: '', email: '', mensaje: '' })

  // Actualiza el campo correspondiente del estado al escribir.
  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    // Validación nativa: si el formulario no es válido, se marca y no se envía.
    if (!e.target.checkValidity()) {
      e.target.classList.add('was-validated')
      return
    }

    // Avisa a la app para mostrar el mensaje de confirmación.
    onEnviado()
    setForm({ nombre: '', email: '', mensaje: '' })
    e.target.classList.remove('was-validated')
  }

  return (
    <form className="row g-3 needs-validation" noValidate onSubmit={handleSubmit}>
      <div className="col-md-6">
        <label htmlFor="contacto-nombre" className="form-label">Nombre</label>
        <input
          id="contacto-nombre"
          name="nombre"
          className="form-control"
          placeholder="Tu nombre"
          required
          value={form.nombre}
          onChange={handleChange}
        />
        <div className="invalid-feedback">Ingresa tu nombre.</div>
      </div>

      <div className="col-md-6">
        <label htmlFor="contacto-email" className="form-label">Correo</label>
        <input
          id="contacto-email"
          name="email"
          type="email"
          className="form-control"
          placeholder="tucorreo@ejemplo.cl"
          required
          value={form.email}
          onChange={handleChange}
        />
        <div className="invalid-feedback">Ingresa un correo válido.</div>
      </div>

      <div className="col-12">
        <label htmlFor="contacto-motivo" className="form-label">Mensaje</label>
        <textarea
          id="contacto-motivo"
          name="mensaje"
          className="form-control"
          rows="3"
          placeholder="Escribe tu mensaje aquí"
          required
          value={form.mensaje}
          onChange={handleChange}
        ></textarea>
        <div className="invalid-feedback">Ingresa un mensaje.</div>
      </div>

      <div className="col-12">
        <button type="submit" className="btn btn-primary">Enviar</button>
      </div>
    </form>
  )
}
