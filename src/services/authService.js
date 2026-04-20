import axios from 'axios'
import { jwtDecode } from 'jwt-decode'

const API_URL = 'https://fakestoreapi.com'


export const login = async (username, password) => {
  const respuesta = await axios.post(`${API_URL}/auth/login`, { username, password })
  const token = respuesta.data.token
  localStorage.setItem('token', token)
  localStorage.setItem('username', username)
  return token
}

export const obtenerDatosUsuario = async (username) => {
  const { data: usuarios } = await axios.get(`${API_URL}/users`)
  const encontrado = usuarios.find(u => u.username === username)
  if (encontrado) {
    const nombre = encontrado.name.firstname.charAt(0).toUpperCase()
      + encontrado.name.firstname.slice(1)
    localStorage.setItem('nombreUsuario', nombre)
    localStorage.setItem('userId', String(encontrado.id))
  }
}

export const logout = () => {
  localStorage.removeItem('token')
  localStorage.removeItem('username')
  localStorage.removeItem('carrito')
  localStorage.removeItem('nombreUsuario')
  localStorage.removeItem('userId')
}

export const obtenerToken = () => localStorage.getItem('token')

export const obtenerUsername = () => localStorage.getItem('username')


export const estaAutenticado = () => !!localStorage.getItem('token')

export const obtenerUserIdPorUsername = async (username) => {
  const respuesta = await axios.get(`${API_URL}/users`)
  const usuarios = respuesta.data

  const usuario = usuarios.find(u => u.username === username)
  return usuario ? usuario.id : 1 
}