// Carrusel de imágenes destacadas (componente presentacional de Bootstrap).
// Se inicializa automáticamente mediante el atributo data-bs-ride y el bundle
// de JavaScript de Bootstrap cargado por CDN en index.html.

const BASE = import.meta.env.BASE_URL

const slides = [
  { img: 'img/libro-lobo-estepario.webp', titulo: 'El lobo estepario', autor: 'Hermann Hesse' },
  { img: 'img/libro-extranjero.webp', titulo: 'El extranjero', autor: 'Albert Camus' },
  { img: 'img/libro-demian.webp', titulo: 'Demian', autor: 'Hermann Hesse' },
]

export default function Carousel() {
  return (
    <div id="carrusel" className="carousel slide shadow-sm" data-bs-ride="carousel">
      <div className="carousel-indicators">
        {slides.map((_, i) => (
          <button
            key={i}
            type="button"
            data-bs-target="#carrusel"
            data-bs-slide-to={i}
            className={i === 0 ? 'active' : ''}
            aria-current={i === 0 ? 'true' : undefined}
            aria-label={`Slide ${i + 1}`}
          ></button>
        ))}
      </div>

      <div className="carousel-inner">
        {slides.map((slide, i) => (
          <div key={slide.titulo} className={`carousel-item${i === 0 ? ' active' : ''}`}>
            <img src={`${BASE}${slide.img}`} className="d-block w-100 carrusel-img" alt={slide.titulo} />
            <div className="carousel-caption d-none d-md-block">
              <h5>{slide.titulo}</h5>
              <p>{slide.autor}</p>
            </div>
          </div>
        ))}
      </div>

      <button className="carousel-control-prev" type="button" data-bs-target="#carrusel" data-bs-slide="prev">
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Anterior</span>
      </button>
      <button className="carousel-control-next" type="button" data-bs-target="#carrusel" data-bs-slide="next">
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Siguiente</span>
      </button>
    </div>
  )
}
