import express from "express";
import exphbs from "express-handlebars";
import path from "path";
import url from "url";
import "./database.js";

import productsRouter from "./routes/products.router.js";
import cartsRouter from "./routes/carts.router.js";
import viewsRouter from "./routes/views.router.js";

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PUERTO = 8080;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Configura la ruta para los archivos estáticos
app.use('/public', express.static(path.join(__dirname, 'public')));

// Configura el motor de plantillas Handlebars
app.engine("handlebars", exphbs.engine());
app.set("view engine", "handlebars");

// Configura la ruta de las vistas
app.set("views", path.join(__dirname, "views"));

app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);
app.use("/", viewsRouter);

app.listen(PUERTO, () => {
    console.log(`Servidor escuchando en el puerto ${PUERTO}`);
});