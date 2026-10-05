// Formulario de búsqueda controlado.
// El término de búsqueda vive en App (estado), aquí solo se muestra y se emite el cambio.

export default function SearchBar({ value, onChange, onClear }) {
  return (
    <form
      className="row g-2 align-items-center mb-4"
      role="search"
      onSubmit={(e) => e.preventDefault()}
    >
      <div className="col-12 col-md-6">
        <label htmlFor="busqueda" className="form-label fw-semibold">
          Buscar producto
        </label>
        <input
          id="busqueda"
          name="busqueda"
          type="search"
          className="form-control"
          placeholder="Ej: lobo, Demian, coronel..."
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      </div>
      <div className="col-12 col-md-auto d-flex gap-2">
        <button type="button" className="btn btn-outline-secondary" onClick={onClear}>
          Limpiar
        </button>
      </div>
    </form>
  )
}
