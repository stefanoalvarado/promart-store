import axios from 'axios'

const API_URL = 'https://fakestoreapi.com'


export const obtenerTodosLosProductos = async () => {
  const respuesta = await axios.get(`${API_URL}/products`)
  return respuesta.data
}

export const obtenerProductosPorCategoria = async (categoria) => {
  const respuesta = await axios.get(`${API_URL}/products/category/${categoria}`)
  return respuesta.data
}

export const obtenerProductoPorId = async (id) => {
  const respuesta = await axios.get(`${API_URL}/products/${id}`)
  return respuesta.data
}


export const obtenerCategorias = async () => {
  const respuesta = await axios.get(`${API_URL}/products/categories`)
  return respuesta.data
}