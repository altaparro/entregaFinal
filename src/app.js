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