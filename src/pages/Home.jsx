import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCarrito } from '../context/CartContext'
import {
  obtenerTodosLosProductos,
  obtenerProductosPorCategoria
} from '../services/productService'
import './Home.css'
import { logout } from '../services/authService'

const CATEGORIAS = {
  'todas':            'Todos',
  'electronics':      'Electrónica',
  'jewelery':         'Joyería',
  "men's clothing":   'Ropa hombre',
  "women's clothing": 'Ropa mujer',
}

const scrollAProductos = () => {
  const s = document.getElementById('seccion-productos')
  if (s) {
    const y = s.getBoundingClientRect().top + window.pageYOffset - 57
    window.scrollTo({ top: y, behavior: 'smooth' })
  }
}

const Home = () => {

  const [productos, setProductos]             = useState([])
  const [categoriaActiva, setCategoriaActiva] = useState('todas')
  const [cargando, setCargando]               = useState(true)
  const [error, setError]                     = useState('')
  const [seccionActiva, setSeccionActiva]     = useState('inicio') 

  const { agregarProducto, totalItems } = useCarrito()
  const navigate = useNavigate()



  useEffect(() => {
    cargarProductos('todas')
  }, [])


  useEffect(() => {
    const handleScroll = () => {
      const seccion = document.getElementById('seccion-productos')
      if (seccion) {
        if (window.scrollY >= seccion.offsetTop - 80) {
          setSeccionActiva('productos')
        } else {
          setSeccionActiva('inicio')
        }
      }
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const cargarProductos = async (categoria) => {
    try {
      setCargando(true)
      setError('')
      const datos = categoria === 'todas'
        ? await obtenerTodosLosProductos()
        : await obtenerProductosPorCategoria(categoria)
      setProductos(datos)
    } catch (err) {
      setError('Error al cargar los productos. Intenta de nuevo.')
    } finally {
      setCargando(false)
    }
  }

  const handleCategoria = (clave) => {
    setCategoriaActiva(clave)
    cargarProductos(clave)
  }

const nombreUsuario = localStorage.getItem('nombreUsuario') || 'Usuario'


const [mostrarLogout, setMostrarLogout] = useState(false)


const handleLogout = () => setMostrarLogout(true)

const confirmarLogout = () => {
  logout()
  navigate('/ingresar')
}
  return (
    <div className="home-page">
  {mostrarLogout && (
    <div className="popup-overlay">
      <div className="popup-logout">
        <h3 className="popup-logout-titulo">¿Cerrar sesión?</h3>
        <p className="popup-logout-msg">¿Estás seguro que deseas salir?</p>
        <div className="popup-logout-btns">
          <button className="popup-logout-cancelar" onClick={() => setMostrarLogout(false)}>
            Cancelar
          </button>
          <button className="popup-logout-confirmar" onClick={confirmarLogout}>
            Sí, salir
          </button>
        </div>
      </div>
    </div>
  )}
      {/* ── Navbar ── */}
      <nav className="home-nav">
        <div className="nav-logo">
          <div className="nav-logo-icon">★</div>
          <span className="nav-logo-texto">MI TIENDA</span>
        </div>

        <div className="nav-links">
          <span
            className={`nav-link ${seccionActiva === 'inicio' ? 'active' : ''}`}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            Inicio
          </span>
          <span
            className={`nav-link ${seccionActiva === 'productos' ? 'active' : ''}`}
            onClick={scrollAProductos}
          >
            Productos
          </span>
        </div>

<div className="nav-acciones">

  {/* Saludo al usuario */}
  <span className="nav-saludo">Hola, {nombreUsuario}</span>

  <button className="nav-carrito-btn" onClick={() => navigate('/carrito')}>
    🛒
    {totalItems > 0 && (
      <span className="nav-carrito-badge">{totalItems}</span>
    )}
  </button>

  <button className="nav-logout-btn" onClick={handleLogout}>
    Salir
  </button>

</div>
      </nav>

      {/* ── Hero Banner ── */}
      <div className="home-hero">
        <div className="hero-contenido">
          <span className="hero-tag">NUEVA TEMPORADA</span>
          <h1 className="hero-titulo">Descubre los<br />mejores productos</h1>
          <p className="hero-subtitulo">
            Electrónica, joyería, ropa y accesorios.<br />
            Envío gratis en tu primera compra.
          </p>
          <button className="hero-btn" onClick={scrollAProductos}>
            Ver colección
          </button>
        </div>

        <div className="hero-imagenes">
          <div className="hero-img-card" onClick={() => { handleCategoria('electronics'); setTimeout(scrollAProductos, 700) }}>
            <img src="https://fakestoreapi.com/img/81QpkIctqPL._AC_SX679_t.png" alt="Electrónica" className="hero-img-producto" />
            <span className="hero-img-label">Electrónica</span>
          </div>
          <div className="hero-img-card" onClick={() => { handleCategoria('jewelery'); setTimeout(scrollAProductos, 700) }}>
            <img src="https://fakestoreapi.com/img/71pWzhdJNwL._AC_UL640_QL65_ML3_t.png" alt="Joyería" className="hero-img-producto" />
            <span className="hero-img-label">Joyería</span>
          </div>
          <div className="hero-img-card" onClick={() => { handleCategoria("men's clothing"); setTimeout(scrollAProductos, 700) }}>
            <img src="https://fakestoreapi.com/img/71li-ujtlUL._AC_UX679_t.png" alt="Ropa hombre" className="hero-img-producto" />
            <span className="hero-img-label">Ropa hombre</span>
          </div>
          <div className="hero-img-card" onClick={() => { handleCategoria("women's clothing"); setTimeout(scrollAProductos, 700) }}>
            <img src="https://fakestoreapi.com/img/51Y5NI-I5jL._AC_UX679_t.png" alt="Ropa mujer" className="hero-img-producto" />
            <span className="hero-img-label">Ropa mujer</span>
          </div>
        </div>
      </div>

      {/* ── Sección de productos ── */}
      <div className="home-productos" id="seccion-productos">
        <div className="productos-header">
          <h2 className="productos-titulo">Productos</h2>
        </div>

        <div className="categorias">
          {Object.entries(CATEGORIAS).map(([clave, etiqueta]) => (
            <button
              key={clave}
              className={`categoria-btn ${categoriaActiva === clave ? 'activa' : ''}`}
              onClick={() => handleCategoria(clave)}
            >
              {etiqueta}
            </button>
          ))}
        </div>

        {cargando && <div className="productos-estado">Cargando productos...</div>}
        {error && <div className="productos-error">{error}</div>}

        {!cargando && !error && (
          <div className="productos-grid">
            {productos.map(producto => (
              <div key={producto.id} className="producto-card">
                <div className="producto-badge">-10%</div>
                <div className="producto-imagen-contenedor">
                  <img src={producto.image} alt={producto.title} className="producto-imagen" />
                </div>
                <div className="producto-info">
                {/* Categoría */}
                <span className="producto-categoria">
                    {CATEGORIAS[producto.category] || producto.category}
                </span>

                {/* Nombre */}
                <h3 className="producto-nombre">{producto.title}</h3>

                {/* Rating — entre nombre y precio */}
                <div className="producto-rating">
                    <span className="producto-estrellas">
                    {'★'.repeat(Math.round(producto.rating.rate))}
                    {'☆'.repeat(5 - Math.round(producto.rating.rate))}
                    </span>
                    <span className="producto-rating-num">({producto.rating.count})</span>
                </div>

                {/* Precio */}
                <p className="producto-precio">S/ {(producto.price * 3.7).toFixed(2)}</p>

                {/* Botón */}
                <button className="producto-agregar-btn" onClick={() => agregarProducto(producto)}>
                    + Agregar al carrito
                </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Home