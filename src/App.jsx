// Componente principal: integra todos los componentes y gestiona el estado global.
//
// Estados (useState):
//   - productos : catálogo cargado desde una API pública (dummyjson).
//   - carrito   : productos seleccionados, con su cantidad.
//   - busqueda  : término de búsqueda (elemento interactivo).
//   - cargando/error : indicadores del proceso de carga.
//   - toast     : mensaje emergente de confirmación.
//   - mostrarCheckout : controla el modal de finalización de compra.
//
// Efectos (useEffect):
//   - Carga del catálogo al montar (con manejo de error y limpieza).
//   - Persistencia del carrito en localStorage cuando cambia.

import { useCallback, useEffect, useMemo, useState } from 'react'
import Navbar from './components/Navbar.jsx'
import Carousel from './components/Carousel.jsx'
import SearchBar from './components/SearchBar.jsx'
import ProductList from './components/ProductList.jsx'
import Cart from './components/Cart.jsx'
import Checkout from './components/Checkout.jsx'
import ContactForm from './components/ContactForm.jsx'
import Toast from './components/Toast.jsx'

const CARRITO_KEY = 'bookstore-carrito-s8'

// URL del catálogo: API pública (dummyjson) que devuelve el listado de libros.
const URL_PRODUCTOS = 'https://dummyjson.com/c/0ca1-f66c-42d1-be14'

export default function App() {
  // --- Gestión de estados con useState ---
  const [productos, setProductos] = useState([])
  const [carrito, setCarrito] = useState(() => {
    // Estado inicial del carrito: recupera la copia guardada en localStorage.
    try {
      const datos = JSON.parse(localStorage.getItem(CARRITO_KEY))
      if (Array.isArray(datos)) {
        return datos.filter((i) => i && typeof i.id === 'number' && typeof i.cantidad === 'number')
      }
    } catch {
      /* si el dato guardado está corrupto, se ignora */
    }
    return []
  })
  const [busqueda, setBusqueda] = useState('')
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState(null)
  const [toast, setToast] = useState(null)
  const [mostrarCheckout, setMostrarCheckout] = useState(false)

  // --- Manejo de efectos con useEffect ---

  // Carga el catálogo de productos al montar el componente (una sola vez).
  useEffect(() => {
    let activo = true

    setCargando(true)
    fetch(URL_PRODUCTOS)
      .then((res) => {
        if (!res.ok) throw new Error('Error HTTP ' + res.status)
        return res.json()
      })
      .then((data) => {
        if (activo) {
          // Normaliza los campos de la API (titulo -> nombre, ruta de imagen relativa).
          setProductos(
            data.map((libro) => ({
              id: libro.id,
              nombre: libro.titulo,
              autor: libro.autor,
              precio: libro.precio,
              img: libro.img.replace(/^\.\//, ''),
            })),
          )
        }
      })
      .catch((err) => {
        if (activo) setError('No se pudieron cargar los productos. Intenta nuevamente más tarde.')
        console.error('Error al cargar productos:', err)
      })
      .finally(() => {
        if (activo) setCargando(false)
      })

    // Cleanup: evita actualizar el estado si el componente se desmonta.
    return () => {
      activo = false
    }
  }, [])

  // Persiste el carrito en localStorage cada vez que cambia.
  useEffect(() => {
    localStorage.setItem(CARRITO_KEY, JSON.stringify(carrito))
  }, [carrito])

  // --- Valores derivados ---

  // Filtra el catálogo según el término de búsqueda.
  const productosFiltrados = useMemo(() => {
    const termino = busqueda.trim().toLowerCase()
    if (!termino) return productos
    return productos.filter((p) => p.nombre.toLowerCase().includes(termino))
  }, [productos, busqueda])

  // Set de ids que ya están en el carrito (para alternar el botón de cada tarjeta).
  const idsEnCarrito = useMemo(() => new Set(carrito.map((i) => i.id)), [carrito])

  // Total de productos (suma de cantidades) para el contador de la barra de navegación.
  const totalProductos = carrito.reduce((acc, i) => acc + i.cantidad, 0)

  // --- Acciones ---

  // Agrega una unidad al carrito (o incrementa la cantidad si ya existe).
  const agregarAlCarrito = (id) => {
    setCarrito((prev) => {
      const existente = prev.find((i) => i.id === id)
      if (existente) {
        return prev.map((i) => (i.id === id ? { ...i, cantidad: i.cantidad + 1 } : i))
      }
      return [...prev, { id, cantidad: 1 }]
    })
    setToast('Libro añadido al carrito')
  }

  // Quita una copia del producto; si llega a cero, se elimina del carrito.
  const quitarCopia = (id) => {
    setCarrito((prev) =>
      prev
        .map((i) => (i.id === id ? { ...i, cantidad: i.cantidad - 1 } : i))
        .filter((i) => i.cantidad > 0),
    )
  }

  // Vacía el carrito por completo.
  const vaciarCarrito = () => {
    setCarrito([])
    setToast('Carrito vaciado')
  }

  // Confirma la compra: cierra el checkout, limpia el carrito y notifica al usuario.
  const confirmarCompra = () => {
    setMostrarCheckout(false)
    setCarrito([])
    setToast('¡Compra realizada con éxito! Gracias por tu pedido.')
  }

  // Callback estable para cerrar el toast (evita reiniciar su temporizador).
  const cerrarToast = useCallback(() => setToast(null), [])

  return (
    <div className="bg-light d-flex flex-column min-vh-100">
      {/* Barra de navegación con contador de carrito */}
      <Navbar count={totalProductos} />

      {/* Carrusel de imágenes destacadas */}
      <div id="inicio" className="container mt-4">
        <Carousel />
      </div>

      <main className="container py-4 flex-grow-1">
        {/* Búsqueda de productos */}
        <SearchBar value={busqueda} onChange={setBusqueda} onClear={() => setBusqueda('')} />

        {/* Catálogo de productos */}
        <section id="catalogo" className="mb-5">
          <h2 className="h5 fw-bold mb-3">Catálogo de productos (API pública + useEffect)</h2>

          {/* Renderizado condicional según el estado de carga */}
          {cargando && <p className="text-muted" aria-live="polite">Cargando productos...</p>}

          {error && (
            <div className="alert alert-danger" role="alert">
              {error}
            </div>
          )}

          {!cargando && !error && (
            productosFiltrados.length === 0 ? (
              <div className="alert alert-info">Sin resultados para la búsqueda.</div>
            ) : (
              <ProductList
                productos={productosFiltrados}
                onAdd={agregarAlCarrito}
                idsEnCarrito={idsEnCarrito}
              />
            )
          )}
        </section>

        {/* Carrito de compras */}
        <Cart
          items={carrito}
          productos={productos}
          onQuitar={quitarCopia}
          onVaciar={vaciarCarrito}
          onComprar={() => setMostrarCheckout(true)}
        />

        {/* Formulario de contacto */}
        <section id="contacto" className="mb-5">
          <h2 className="h5 fw-bold mb-3">Contacto</h2>
          <p className="text-muted">Completa el formulario y enviaremos tu requerimiento.</p>
          <ContactForm onEnviado={() => setToast('Mensaje enviado')} />
        </section>
      </main>

      {/* Pie de página */}
      <footer className="py-4 border-top bg-white">
        <div className="container">
          <div className="row text-center text-md-start g-3">
            <div className="col-12 col-md-4">
              <h6 className="fw-bold">Contacto</h6>
              <ul className="list-unstyled small mb-0">
                <li>Av. Siempre Viva 123</li>
                <li>contacto@bookstore.cl</li>
                <li>+56 2 2123 4567</li>
              </ul>
            </div>
            <div className="col-12 col-md-4">
              <h6 className="fw-bold">Redes sociales</h6>
              <ul className="list-unstyled small mb-0">
                <li><a href="#" className="text-decoration-none">Instagram</a></li>
                <li><a href="#" className="text-decoration-none">Facebook</a></li>
                <li><a href="#" className="text-decoration-none">X (Twitter)</a></li>
              </ul>
            </div>
            <div className="col-12 col-md-4">
              <h6 className="fw-bold">Bookstore</h6>
              <p className="small text-muted mb-0">Actividad sumativa — Desarrollo Frontend I (PFY2201).</p>
            </div>
          </div>
        </div>
      </footer>

      {/* Mensaje emergente de confirmación */}
      <Toast mensaje={toast} onClose={cerrarToast} />

      {/* Modal de confirmación de compra (renderizado condicional) */}
      {mostrarCheckout && (
        <Checkout
          items={carrito}
          productos={productos}
          onConfirmar={confirmarCompra}
          onCancelar={() => setMostrarCheckout(false)}
        />
      )}
    </div>
  )
}
