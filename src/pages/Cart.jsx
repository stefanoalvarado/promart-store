import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCarrito } from '../context/CartContext'
import './Cart.css'
import { logout } from '../services/authService'
const Cart = () => {
  const navigate = useNavigate()
  const [mostrarPopup, setMostrarPopup] = useState(false)

  const {
    carrito,
    eliminarProducto,
    cambiarCantidad,
    vaciarCarrito,
    totalItems,
    totalPrecio,
  } = useCarrito()

const nombreUsuario = localStorage.getItem('nombreUsuario') || 'Usuario'
const [mostrarConfirmPago, setMostrarConfirmPago] = useState(false)


const handleProcederPago = () => setMostrarConfirmPago(true)

const confirmarPago = () => {
  setMostrarConfirmPago(false)
  setMostrarPopup(true) 
}
const [mostrarLogout, setMostrarLogout] = useState(false)


const handleLogout = () => setMostrarLogout(true)

const confirmarLogout = () => {
  logout()
  navigate('/ingresar')
}
  const CATEGORIAS = {
  'electronics':      'Electrónica',
  'jewelery':         'Joyería',
  "men's clothing":   'Ropa hombre',
  "women's clothing": 'Ropa mujer',
}



  const handleConfirmarPedido = () => {
    setMostrarPopup(false)
    vaciarCarrito()
    navigate('/inicio')
  }

  return (
    <div className="cart-page">
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

  {mostrarConfirmPago && (
  <div className="popup-overlay">
    <div className="popup-logout">
      <h3 className="popup-logout-titulo">¿Confirmar pedido?</h3>
      <p className="popup-logout-msg">
        Total a pagar: <strong>S/ {(totalPrecio * 0.95).toFixed(2)}</strong>
        <br />¿Deseas proceder con el pago?
      </p>
      <div className="popup-logout-btns">
        <button className="popup-logout-cancelar" onClick={() => setMostrarConfirmPago(false)}>
          Cancelar
        </button>
        <button className="popup-logout-confirmar" onClick={confirmarPago}>
          Confirmar
        </button>
      </div>
    </div>
  </div>
)}
      {/* ── Popup de confirmación ── */}
      {mostrarPopup && (
        <div className="popup-overlay">
          <div className="popup-card">

            <div className="popup-icono">✓</div>
            <h2 className="popup-titulo">¡Pedido realizado!</h2>
            <p className="popup-mensaje">
              Tu pedido ha sido procesado exitosamente.<br />
              Gracias por tu compra en MI TIENDA.
            </p>

            <div className="popup-resumen">
              <div className="popup-fila">
                <span>Productos</span>
                <span>{totalItems} artículos</span>
              </div>
              <div className="popup-fila">
                <span>Total pagado</span>
                <span className="popup-total">
                  S/ {(totalPrecio * 0.95).toFixed(2)}
                </span>
              </div>
            </div>

            <button
              className="btn-primary"
              onClick={handleConfirmarPedido}
            >
              Volver al inicio
            </button>

          </div>
        </div>
      )}

{/* ── Navbar ── */}
<nav className="cart-nav">
  <div className="nav-logo">
    <div className="nav-logo-icon">★</div>
    <span className="nav-logo-texto">MI TIENDA</span>
  </div>

  <div className="nav-acciones-cart">
    <span className="nav-saludo">Hola, {nombreUsuario}</span>
    <button className="cart-nav-volver" onClick={() => navigate('/inicio')}>
      ← Seguir comprando
    </button>
    <button className="nav-logout-btn" onClick={handleLogout}>
      Salir
    </button>
  </div>
</nav>

      <div className="cart-contenedor">

        <h1 className="cart-titulo">
          Mi carrito
          <span className="cart-titulo-count">
            ({totalItems} {totalItems === 1 ? 'producto' : 'productos'})
          </span>
        </h1>

        {/* ── Carrito vacío ── */}
        {carrito.length === 0 ? (
          <div className="cart-vacio">
            <span className="cart-vacio-icono">🛒</span>
            <p className="cart-vacio-texto">Tu carrito está vacío</p>
            <button
              className="btn-primary"
              style={{ maxWidth: '200px' }}
              onClick={() => navigate('/inicio')}
            >
              Ver productos
            </button>
          </div>
        ) : (

          <div className="cart-layout">

            {/* ── Lista de productos ── */}
            <div className="cart-lista">
{carrito.map(producto => (
  <div key={producto.id} className="cart-item">

    {/* Fila superior: imagen + info */}
    <div className="cart-item-imagen">
      <img src={producto.image} alt={producto.title} />
    </div>

    <div className="cart-item-info">
      <span className="cart-item-categoria">
        {CATEGORIAS[producto.category] || producto.category}
      </span>
      <h3 className="cart-item-nombre">{producto.title}</h3>
      <p className="cart-item-precio">
        S/ {(producto.price * 3.7).toFixed(2)}
      </p>

      {/* ── En mobile: cantidad y subtotal van dentro del info ── */}
      <div className="cart-item-acciones-mobile">
        <div className="cart-item-cantidad">
          <button className="cantidad-btn" onClick={() => cambiarCantidad(producto.id, producto.cantidad - 1)}>−</button>
          <span className="cantidad-num">{producto.cantidad}</span>
          <button className="cantidad-btn" onClick={() => cambiarCantidad(producto.id, producto.cantidad + 1)}>+</button>
        </div>
        <span className="cart-item-subtotal">
          S/ {(producto.price * 3.7 * producto.cantidad).toFixed(2)}
        </span>
        <button className="cart-item-eliminar" onClick={() => eliminarProducto(producto.id)} title="Eliminar">✕</button>
      </div>
    </div>

    {/* ── En desktop: cantidad, subtotal y eliminar en fila ── */}
    <div className="cart-item-cantidad cart-item-cantidad--desktop">
      <button className="cantidad-btn" onClick={() => cambiarCantidad(producto.id, producto.cantidad - 1)}>−</button>
      <span className="cantidad-num">{producto.cantidad}</span>
      <button className="cantidad-btn" onClick={() => cambiarCantidad(producto.id, producto.cantidad + 1)}>+</button>
    </div>
    <div className="cart-item-subtotal cart-item-subtotal--desktop">
      S/ {(producto.price * 3.7 * producto.cantidad).toFixed(2)}
    </div>
    <button className="cart-item-eliminar cart-item-eliminar--desktop" onClick={() => eliminarProducto(producto.id)} title="Eliminar">✕</button>

  </div>
))}
              
            </div>

            {/* ── Resumen del pedido ── */}
            <div className="cart-resumen">
              <h2 className="resumen-titulo">Resumen del pedido</h2>
              <div className="resumen-sep"></div>

              <div className="resumen-fila">
                <span className="resumen-label">Subtotal ({totalItems} artículos)</span>
                <span className="resumen-valor">S/ {totalPrecio.toFixed(2)}</span>
              </div>

              <div className="resumen-fila">
                <span className="resumen-label">Descuento</span>
                <span className="resumen-descuento">
                  − S/ {(totalPrecio * 0.05).toFixed(2)}
                </span>
              </div>

              <div className="resumen-fila">
                <span className="resumen-label">Envío</span>
                <span className="resumen-gratis">Gratis</span>
              </div>

              <div className="resumen-sep"></div>

              <div className="resumen-fila">
                <span className="resumen-total-label">Total</span>
                <span className="resumen-total-valor">
                  S/ {(totalPrecio * 0.95).toFixed(2)}
                </span>
              </div>

              <button
                className="btn-primary resumen-checkout"
                onClick={handleProcederPago}
              >
                Proceder al pago
              </button>

              <p className="resumen-seguro">
                🔒 Pago 100% seguro y protegido
              </p>
            </div>

          </div>
        )}

      </div>
    </div>
  )
}

export default Cart