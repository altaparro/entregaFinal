import { Router } from "express";
import CartManager from "../dao/db/cart-manager-db.js"; // Verifica que esta ruta sea correcta

const cartRouter = Router();
const cartManager = new CartManager();

cartRouter.post("/", async (req, res) => {
    try {
        const carrito = await cartManager.crearCarrito();
        res.status(201).json(carrito);
    } catch (error) {
        console.error("Error al crear el carrito:", error);
        res.status(500).json({ error: "Error al crear el carrito" });
    }
});

cartRouter.get("/", async (req, res) => {
    try {
        const carritos = await cartManager.getAllCarts();
        res.json(carritos);
    } catch (error) {
        console.error("Error al obtener carritos:", error);
        res.status(500).json({ error: "Error al obtener carritos" });
    }
});

cartRouter.get("/:id", async (req, res) => {
    const { id } = req.params;

    try {
        const carrito = await cartManager.getCarritoById(id);
        if (carrito) {
            res.json(carrito);
        } else {
            res.status(404).json({ error: "Carrito no encontrado" });
        }
    } catch (error) {
        console.error("Error al buscar carrito por ID:", error);
        res.status(500).json({ error: "Error al buscar carrito por ID" });
    }
});

cartRouter.put("/:id/products/:productId", async (req, res) => {
    const { id, productId } = req.params;
    const { quantity } = req.body;

    try {
        const carrito = await cartManager.agregarProductoAlCarrito(id, productId, quantity);
        res.json(carrito);
    } catch (error) {
        console.error("Error al agregar producto al carrito:", error);
        res.status(500).json({ error: "Error al agregar producto al carrito" });
    }
});

cartRouter.delete("/:id", async (req, res) => {
    const { id } = req.params;

    try {
        const carrito = await cartManager.vaciarCarrito(id);
        res.json(carrito);
    } catch (error) {
        console.error("Error al vaciar el carrito:", error);
        res.status(500).json({ error: "Error al vaciar el carrito" });
    }
});

cartRouter.put("/:id", async (req, res) => {
    const { id } = req.params;
    const updatedProducts = req.body;

    try {
        const carrito = await cartManager.actualizarCarrito(id, updatedProducts);
        res.json(carrito);
    } catch (error) {
        console.error("Error al actualizar el carrito:", error);
        res.status(500).json({ error: "Error al actualizar el carrito" });
    }
});

cartRouter.delete("/:id/products/:productId", async (req, res) => {
    const { id, productId } = req.params;

    try {
        const carrito = await cartManager.eliminarProductoDelCarrito(id, productId);
        res.json(carrito);
    } catch (error) {
        console.error("Error al eliminar producto del carrito:", error);
        res.status(500).json({ error: "Error al eliminar producto del carrito" });
    }
});

export default cartRouter;
