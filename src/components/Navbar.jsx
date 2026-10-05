// Barra de navegación responsiva.
// Recibe por props el número de productos del carrito y muestra un contador en vivo.
// El menú colapsable usa el JS de Bootstrap (cargado por CDN en index.html).

const BASE = import.meta.env.BASE_URL

export default function Navbar({ count }) {
  return (
    <nav className="navbar navbar-expand-md navbar-dark bg-dark sticky-top" aria-label="Navegación principal">
      <div className="container">
        <a className="navbar-brand d-flex align-items-center gap-2" href="#inicio">
          <img src={`${BASE}img/logo.png`} alt="Logo Bookstore" width="36" height="36" />
          Bookstore
        </a>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#menu"
          aria-controls="menu"
          aria-expanded="false"
          aria-label="Alternar navegación"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div id="menu" className="collapse navbar-collapse">
          <ul className="navbar-nav ms-auto mb-2 mb-md-0">
            <li className="nav-item"><a className="nav-link" href="#inicio">Inicio</a></li>
            <li className="nav-item"><a className="nav-link" href="#catalogo">Novelas</a></li>
            <li className="nav-item"><a className="nav-link" href="#catalogo">Autoayuda</a></li>
            <li className="nav-item"><a className="nav-link" href="#catalogo">Ciencia ficción</a></li>
            <li className="nav-item"><a className="nav-link" href="#contacto">Contacto</a></li>
          </ul>

          {/* Contador de productos en el carrito (renderizado condicional de la etiqueta) */}
          <span className="navbar-text ms-md-3 d-flex align-items-center gap-2">
            🛒 Carrito:
            <span className="badge text-bg-warning">{count}</span>
            {count === 1 ? ' producto' : ' productos'}
          </span>
        </div>
      </div>
    </nav>
  )
}
