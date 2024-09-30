import ProductService from "../services/product.services.js";

export const createProduct = async (req, res) => {
  try {
    const productDTO = await ProductService.createProduct(req.body);
    res.redirect('/api/sessions/realtimeproducts');
  } catch (error) {
    console.error('Error al crear el producto:', error);
    res.status(500).json({ message: 'Hubo un problema al crear el producto. Inténtalo de nuevo más tarde.' });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const { pid } = req.params;
    const updatedProductDTO = await ProductService.updateProduct(pid, req.body);
    if (!updatedProductDTO) {
      return res.status(404).json({ message: `Producto con ID ${pid} no encontrado.` });
    }
    res.redirect('');
  } catch (error) {
    console.error('Error al actualizar el producto:', error);
    res.status(500).json({ message: 'Hubo un problema al actualizar el producto. Inténtalo de nuevo más tarde.' });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const { pid } = req.params;
    await ProductService.deleteProduct(pid);
    res.redirect('/api/sessions/realtimeproducts');
  } catch (error) {
    console.error('Error al eliminar el producto:', error);
    res.status(500).json({ message: 'Hubo un problema al eliminar el producto. Inténtalo de nuevo más tarde.' });
  }
};

export const getAllProducts = async (req, res) => {
  try {
    const { limit = 10, page = 1 } = req.query;
    const productsData = await ProductService.getProducts({ limit, page });

    res.render('adminProducts', {
      products: productsData.docs,
      totalPages: productsData.totalPages,
      page: productsData.page,
      hasPrevPage: productsData.hasPrevPage,
      hasNextPage: productsData.hasNextPage,
      prevPage: productsData.prevPage,
      nextPage: productsData.nextPage,
      user: req.user,
    });
  } catch (error) {
    console.error('Error al cargar todos los productos:', error);
    res.status(500).render('error', { message: 'Hubo un problema al cargar los productos. Inténtalo de nuevo más tarde.' });
  }
};

export const getProductForEdit = async (req, res) => {
  try {
    const { pid } = req.params;
    const productDTO = await ProductService.getProductById(pid);
    if (!productDTO) {
      return res.status(404).render('error', { message: `Producto con ID ${pid} no encontrado.` });
    }
    res.render('editProduct', { product: productDTO, user: req.user });
  } catch (error) {
    console.error('Error al cargar el producto para editar:', error);
    res.status(500).render('error', { message: 'Hubo un problema al cargar el producto. Inténtalo de nuevo más tarde.' });
  }
};
