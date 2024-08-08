import { Router } from "express";
import ProductManager from "../dao/db/product-manager-db.js"; // Verifica que esta ruta sea correcta

const productRouter = Router();
const productManager = new ProductManager();

productRouter.post("/", async (req, res) => {
    try {
        const producto = await productManager.addProduct(req.body);
        if (producto) {
            res.status(201).json(producto);
        } else {
            res.status(400).json({ error: "Error al agregar producto" });
        }
    } catch (error) {
        console.error("Error al agregar producto:", error);
        res.status(500).json({ error: "Error al agregar producto" });
    }
});

productRouter.get("/", async (req, res) => {
    try {
        const productos = await productManager.getProducts(req.query);
        res.json(productos);
    } catch (error) {
        console.error("Error al obtener productos:", error);
        res.status(500).json({ error: "Error al obtener productos" });
    }
});

productRouter.get("/:id", async (req, res) => {
    const { id } = req.params;

    try {
        const producto = await productManager.getProductById(id);
        if (producto) {
            res.json(producto);
        } else {
            res.status(404).json({ error: "Producto no encontrado" });
        }
    } catch (error) {
        console.error("Error al buscar producto por ID:", error);
        res.status(500).json({ error: "Error al buscar producto por ID" });
    }
});

productRouter.put("/:id", async (req, res) => {
    const { id } = req.params;
    const productoActualizado = req.body;

    try {
        const actualizado = await productManager.updateProduct(id, productoActualizado);
        if (actualizado) {
            res.json(actualizado);
        } else {
            res.status(404).json({ error: "Producto no encontrado" });
        }
    } catch (error) {
        console.error("Error al actualizar producto:", error);
        res.status(500).json({ error: "Error al actualizar producto" });
    }
});

productRouter.delete("/:id", async (req, res) => {
    const { id } = req.params;

    try {
        const eliminado = await productManager.deleteProduct(id);
        if (eliminado) {
            res.json({ message: "Producto eliminado correctamente!" });
        } else {
            res.status(404).json({ error: "Producto no encontrado" });
        }
    } catch (error) {
        console.error("Error al eliminar producto:", error);
        res.status(500).json({ error: "Error al eliminar producto" });
    }
});

export default productRouter;
