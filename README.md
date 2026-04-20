# 🛒 Promart Store

Ecommerce desarrollado como reto técnico para el proceso de selección de Promart.

## Demo
https://promart-store.vercel.app

## Mockup de referencia
Login
<img width="2398" height="1115" alt="InicioPromart" src="https://github.com/user-attachments/assets/7c71dca7-becf-4df2-96c4-bd56b54138b7" />
Inicio
<img width="2451" height="1002" alt="HomePromart" src="https://github.com/user-attachments/assets/7798aa24-3224-408f-ac99-84c025282df0" />
Carrito
<img width="2464" height="618" alt="CarritoP´romat" src="https://github.com/user-attachments/assets/f91107c9-5b47-4599-bcde-9c176ab7dba4" />

## Tecnologías
- React + Vite
- CSS puro con variables CSS
- Context API (manejo de estado global)
- Axios (llamadas a API REST)
- React Router DOM

## Instalación

1. Clona el repositorio:
git clone https://github.com/stefanoalvarado/promart-store.git

2. Instala las dependencias:
cd promart-store
npm install

3. Inicia el servidor de desarrollo:
npm run dev

4. Abre http://localhost:5173 en tu navegador

## Credenciales de prueba
| Usuario | Contraseña |
|---------|------------|
| johnd | m38rmF$ |
| mor_2314 | 83r5^_ |
| kevinryan | kev02937@ |

## Estructura del proyecto
src/
  context/     → CartContext (estado global del carrito)
  pages/       → Login, Home, Cart
  services/    → authService, productService, cartService
  index.css    → Variables globales de color

## API
Se utiliza FakeStore API como backend simulado:
https://fakestoreapi.com
