import cartModel from "./models/cart.model.js";

class CartDao {
  async create() {
    try {
      const newCart = new cartModel();
      return await newCart.save();
    } catch (error) {
      console.error("Error al crear un nuevo carrito:", error);
      throw new Error("No se pudo crear el carrito.");
    }
  }

  async getById(cartId) {
    try {
      return await cartModel.findById(cartId).populate('products.product');
    } catch (error) {
      console.error(`Error al obtener el carrito con ID ${cartId}:`, error);
      throw new Error("No se pudo obtener el carrito.");
    }
  }

  async addProductToCart(cartId, productId) {
    try {
      const cart = await cartModel.findById(cartId);
      if (!cart) {
        throw new Error("Carrito no encontrado");
      }
      cart.products.push({ product: productId, quantity: 1 });
      return await cart.save();
    } catch (error) {
      console.error(`Error al agregar producto ${productId} al carrito ${cartId}:`, error);
      throw new Error("No se pudo agregar el producto al carrito.");
    }
  }

  async removeProductFromCart(cartId, productId) {
    try {
      const cart = await cartModel.findById(cartId);
      if (!cart) {
        throw new Error("Carrito no encontrado");
      }
      cart.products = cart.products.filter(p => p.product.toString() !== productId.toString());
      return await cart.save();
    } catch (error) {
      console.error(`Error al eliminar el producto ${productId} del carrito ${cartId}:`, error);
      throw new Error("No se pudo eliminar el producto del carrito.");
    }
  }

  async update(cartId, cartData) {
    try {
      return await cartModel.findByIdAndUpdate(cartId, cartData, { new: true });
    } catch (error) {
      console.error(`Error al actualizar el carrito con ID ${cartId}:`, error);
      throw new Error("No se pudo actualizar el carrito.");
    }
  }

  async clearCart(cartId) {
    try {
      const cart = await cartModel.findById(cartId);
      if (!cart) {
        throw new Error("Carrito no encontrado");
      }
      cart.products = [];
      return await cart.save();
    } catch (error) {
      console.error(`Error al vaciar el carrito ${cartId}:`, error);
      throw new Error("No se pudo vaciar el carrito.");
    }
  }
}

export default new CartDao();
