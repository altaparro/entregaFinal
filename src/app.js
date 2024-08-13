import express from 'express';
import displayRoutes from 'express-routemap';
import { engine } from 'express-handlebars';
import { Server } from 'socket.io';
import productsRouter from './routes/products.router.js';
import cartsRouter from './routes/carts.router.js';
import viewsRouter from './routes/views.router.js';
import "./database.js"

const app = express();
const port = 8080;

// Middleware para parsear JSON, datos de formularios y servir archivos estáticos
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// Configuración de Express Handlebars
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './src/views');

// Rutas de la aplicación
app.use('/', productsRouter);
app.use('/', cartsRouter);
app.use('/', viewsRouter);

// Iniciando el servidor HTTP
const httpServer = app.listen(port, () => {
  displayRoutes(app);
  console.log(`Servidor escuchando en http://localhost:${port}`);
});

// Configuración de WebSocket con Socket.io
import ProductManager from './dao/db/product-manager-db.js';
const productManager = new ProductManager('./dao/fs/data/productos.json');
import CartManager from './dao/db/cart-manager-db.js';
const cartManager = new CartManager('./dao/fs/data/cart.json');
const io = new Server(httpServer);

io.on('connection', (socket) => {
  console.log('Cliente conectado');

  // Función para enviar la lista actualizada de productos a los clientes
  const sendProducts = async () => {
    try {
      const productsData = await productManager.getProducts();
      io.emit('products', productsData.docs);
    } catch (error) {
      console.error('Error al obtener productos:', error);
    }
  };

  // Enviar la lista de productos al conectar un cliente
  sendProducts();

  // Manejar el evento para agregar un producto
  socket.on('addProduct', async (producto) => {
    try {
      await productManager.addProduct(producto);
      sendProducts();
    } catch (error) {
      console.error('Error al agregar producto:', error);
    }
  });

  // Manejar el evento para eliminar un producto
  socket.on('removeProduct', async (id) => {
    try {
      await productManager.deleteProduct(id);
      sendProducts();
    } catch (error) {
      console.error('Error al eliminar producto:', error);
    }
  });

  // Manejar la desconexión de un cliente
  socket.on('disconnect', () => {
    console.log('Cliente desconectado');
  });
});