import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/Login'
import Home  from './pages/Home'
import Cart  from './pages/Cart'


const RutaProtegida = ({ children }) => {
  const token = localStorage.getItem('token')
  return token ? children : <Navigate to="/ingresar" replace />
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/"         element={<Navigate to="/ingresar" />} />
        <Route path="/ingresar" element={<Login />} />
        <Route path="/inicio"   element={<RutaProtegida><Home /></RutaProtegida>} />
        <Route path="/carrito"  element={<RutaProtegida><Cart /></RutaProtegida>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App