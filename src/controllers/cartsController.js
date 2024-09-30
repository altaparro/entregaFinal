import CartService from '../services/carts.services.js';

export const addProductToCart = async (req, res) => {
  try {
    const { cart } = req.user;
    const { productId } = req.body;
    const updatedCart = await CartService.addProductToCart(cart, productId);
    res.status(200).json({ message: 'Producto añadido correctamente al carrito.', cart: updatedCart });
  } catch (error) {
    console.error('Error al agregar producto al carrito:', error);
    res.status(500).json({ message: 'Hubo un problema al añadir el producto al carrito. Inténtalo de nuevo más tarde.' });
  }
};

export const removeProductFromCart = async (req, res) => {
  try {
    const { cart } = req.user;
    const { productId } = req.body;
    const updatedCart = await CartService.removeProductFromCart(cart, productId);
    res.status(200).json({ message: 'Producto eliminado correctamente del carrito.', cart: updatedCart });
  } catch (error) {
    console.error('Error al eliminar producto del carrito:', error);
    res.status(500).json({ message: 'Hubo un problema al eliminar el producto del carrito. Inténtalo de nuevo más tarde.' });
  }
};

export const purchaseCart = async (req, res) => {
  try {
    const { cart, email } = req.user;
    const ticketDto = await CartService.purchaseCart(cart, email);
    res.render('ticket', { ticket: ticketDto, user: req.user });
  } catch (error) {
    console.error('Error al procesar la compra:', error);
    res.status(500).json({ message: 'Hubo un problema al procesar la compra. Inténtalo de nuevo más tarde.' });
  }
};

export const clearCart = async (req, res) => {
  try {
    const { cart } = req.user;
    const clearedCart = await CartService.clearCart(cart);
    res.status(200).json({ message: 'Carrito vaciado correctamente.', cart: clearedCart });
  } catch (error) {
    console.error('Error al vaciar el carrito:', error);
    res.status(500).json({ message: 'Hubo un problema al vaciar el carrito. Inténtalo de nuevo más tarde.' });
  }
};
