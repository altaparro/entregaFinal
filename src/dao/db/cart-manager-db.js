import CartModel from "../models/cart.model.js";

class CartManager {
    async crearCarrito() {
        try {
            const nuevoCarrito = new CartModel({ products: [] });
            await nuevoCarrito.save();
            return nuevoCarrito;
        } catch (error) {
            console.log("Error al crear el carrito", error);
            throw error;
        }
    }

    async getCarritoById(cartId) {
        try {
            const carrito = await CartModel.findById(cartId).lean();
            if (!carrito) {
                console.log("No existe ese carrito");
                return null;
            }
            return carrito;
        } catch (error) {
            console.log("Error al obtener el carrito", error);
            throw error;
        }
    }

    async getAllCarts() {
        try {
            const carts = await CartModel.find().lean();
            return carts;
        } catch (error) {
            console.log("Error al obtener los carritos", error);
            throw error;
        }
    }

    async agregarProductoAlCarrito(cartId, productId, quantity = 1) {
        try {
            const carrito = await CartModel.findById(cartId);
            if (!carrito) throw new Error('Carrito no encontrado');

            const existeProducto = carrito.products.find(item => item.product.toString() === productId);

            if (existeProducto) {
                existeProducto.quantity += quantity;
            } else {
                carrito.products.push({ product: productId, quantity });
            }

            await carrito.save(); // Cambiado a save() para asegurar la actualización

            return carrito;
        } catch (error) {
            console.log("Error al agregar un producto", error);
            throw error;
        }
    }

    async vaciarCarrito(cartId) {
        try {
            const carrito = await CartModel.findById(cartId);
            if (!carrito) throw new Error('Carrito no encontrado');

            carrito.products = [];
            await carrito.save(); // Cambiado a save() para asegurar la actualización
            return carrito;
        } catch (error) {
            console.error('Error al vaciar el carrito', error);
            throw error;
        }
    }

    async actualizarCarrito(cartId, updatedProducts) {
        try {
            const carrito = await CartModel.findById(cartId);
            if (!carrito) throw new Error('Carrito no encontrado');

            carrito.products = updatedProducts;
            await carrito.save();

            return carrito;
        } catch (error) {
            console.error('Error al actualizar el carrito', error);
            throw error;
        }
    }

    async eliminarProductoDelCarrito(cartId, productId) {
        try {
            const carrito = await CartModel.findById(cartId);
            if (!carrito) throw new Error('Carrito no encontrado');

            carrito.products = carrito.products.filter(item => item.product.toString() !== productId);
            await carrito.save();
            return carrito;
        } catch (error) {
            console.error('Error al eliminar el producto del carrito', error);
            throw error;
        }
    }

    async actualizarCantidadProducto(cartId, productId, newQuantity) {
        try {
            const carrito = await CartModel.findById(cartId);
            if (!carrito) throw new Error('Carrito no encontrado');

            const productIndex = carrito.products.findIndex(item => item.product.toString() === productId);

            if (productIndex !== -1) {
                carrito.products[productIndex].quantity = newQuantity;
                await carrito.save(); // Cambiado a save() para asegurar la actualización
                return carrito;
            } else {
                throw new Error('Producto no encontrado');
            }
        } catch (error) {
            console.error('Error al actualizar la cantidad del producto', error);
            throw error;
        }
    }
}

export default CartManager;
