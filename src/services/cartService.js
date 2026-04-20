import axios from 'axios'

const API_URL = 'https://fakestoreapi.com'

export const sincronizarCarrito = async (userId, carrito) => {

  const productos = carrito.map(p => ({
    productId: p.id,
    quantity:  p.cantidad,
  }))

  const respuesta = await axios.post(`${API_URL}/carts`, {
    userId,
    date: new Date().toISOString().split('T')[0], 
    products: productos,
  })

  return respuesta.data
}


export const obtenerCarritoPorId = async (cartId) => {
  const respuesta = await axios.get(`${API_URL}/carts/${cartId}`)
  return respuesta.data
}


export const actualizarCarrito = async (cartId, userId, carrito) => {
  const productos = carrito.map(p => ({
    productId: p.id,
    quantity:  p.cantidad,
  }))

  const respuesta = await axios.put(`${API_URL}/carts/${cartId}`, {
    userId,
    date: new Date().toISOString().split('T')[0],
    products: productos,
  })

  return respuesta.data
}


export const eliminarCarrito = async (cartId) => {
  const respuesta = await axios.delete(`${API_URL}/carts/${cartId}`)
  return respuesta.data
}