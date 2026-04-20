import { createContext, useContext, useState, useEffect } from 'react'
import { sincronizarCarrito } from '../services/cartService'

const CartContext = createContext()

export const useCarrito = () => useContext(CartContext)

export const CartProvider = ({ children }) => {


  const [carrito, setCarrito] = useState(() => {
    const guardado = localStorage.getItem('carrito')
    return guardado ? JSON.parse(guardado) : []
  })


useEffect(() => {
  localStorage.setItem('carrito', JSON.stringify(carrito))

  if (carrito.length > 0 && localStorage.getItem('token')) {
    
    const userId = parseInt(localStorage.getItem('userId')) || 1

    sincronizarCarrito(userId, carrito)
      .catch(err => console.warn('No se pudo sincronizar:', err))
  }
}, [carrito])

 
  const agregarProducto = (producto) => {
    setCarrito(prev => {
      const existe = prev.find(p => p.id === producto.id)
      if (existe) {
        return prev.map(p =>
          p.id === producto.id
            ? { ...p, cantidad: p.cantidad + 1 }
            : p
        )
      }
      return [...prev, { ...producto, cantidad: 1 }]
    })
  }


  const eliminarProducto = (id) => {
    setCarrito(prev => prev.filter(p => p.id !== id))
  }


  const cambiarCantidad = (id, nuevaCantidad) => {
    if (nuevaCantidad < 1) {
      eliminarProducto(id)
      return
    }
    setCarrito(prev =>
      prev.map(p =>
        p.id === id ? { ...p, cantidad: nuevaCantidad } : p
      )
    )
  }


  const vaciarCarrito = () => {
    setCarrito([])
    localStorage.removeItem('carrito')
  }


  const totalItems = carrito.reduce((acc, p) => acc + p.cantidad, 0)


  const totalPrecio = carrito.reduce(
    (acc, p) => acc + (p.price * 3.7 * p.cantidad), 0
  )

  return (
    <CartContext.Provider value={{
      carrito,
      agregarProducto,
      eliminarProducto,
      cambiarCantidad,
      vaciarCarrito,
      totalItems,
      totalPrecio,
    }}>
      {children}
    </CartContext.Provider>
  )
}