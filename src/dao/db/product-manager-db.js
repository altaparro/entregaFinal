import ProductModel from "../models/product.model.js";

class ProductManager {

    async addProduct({ title, description, price, img, code, stock, category, thumbnails }) {
        try {
            if (!title || !description || !price || !code || !stock || !category) {
                console.log("Todos los campos son obligatorios");
                return null; // Cambiado a null para indicar error
            }

            const existeProducto = await ProductModel.findOne({ code });

            if (existeProducto) {
                console.log("El producto existe");
                return null; // Cambiado a null para indicar error
            }

            const newProduct = new ProductModel({
                title,
                description,
                price,
                img,
                code,
                stock,
                category,
                status: true,
                thumbnails: thumbnails || []
            });

            await newProduct.save();
            return newProduct; // Devuelve el nuevo producto

        } catch (error) {
            console.log("Error al agregar producto", error);
            throw error;
        }
    }

    async getProducts({ limit = 10, page = 1, sort, query } = {}) {
        try {
            const skip = (page - 1) * limit;

            let queryOptions = {};

            if (query) {
                queryOptions = { category: query };
            }

            const sortOptions = {};
            if (sort) {
                if (sort === 'asc' || sort === 'desc') {
                    sortOptions.price = sort === 'asc' ? 1 : -1;
                }
            }

            const productos = await ProductModel
                .find(queryOptions)
                .sort(sortOptions)
                .skip(skip)
                .limit(limit);

            const totalProducts = await ProductModel.countDocuments(queryOptions);

            const totalPages = Math.ceil(totalProducts / limit);
            const hasPrevPage = page > 1;
            const hasNextPage = page < totalPages;

            return {
                docs: productos,
                totalPages,
                prevPage: hasPrevPage ? page - 1 : null,
                nextPage: hasNextPage ? page + 1 : null,
                page,
                hasPrevPage,
                hasNextPage,
                prevLink: hasPrevPage ? `/api/products?limit=${limit}&page=${page - 1}&sort=${sort}&query=${query}` : null,
                nextLink: hasNextPage ? `/api/products?limit=${limit}&page=${page + 1}&sort=${sort}&query=${query}` : null,
            };
        } catch (error) {
            console.log("Error al obtener los productos", error);
            throw error;
        }
    }

    async getProductById(id) {
        try {
            const producto = await ProductModel.findById(id);

            if (!producto) {
                console.log("Producto no encontrado");
                return null;
            }
            return producto;
        } catch (error) {
            console.log("Error al buscar el producto por id", error);
            throw error; // Añadido throw error para propagar el error
        }
    }

    async updateProduct(id, productoActualizado) {
        try {
            const actualizado = await ProductModel.findByIdAndUpdate(id, productoActualizado, { new: true });

            if (!actualizado) {
                console.log("No se encuentra el producto");
                return null;
            }
            return actualizado;
        } catch (error) {
            console.log("Error al actualizar el producto", error);
            throw error; // Añadido throw error para propagar el error
        }
    }

    async deleteProduct(id) {
        try {
            const eliminado = await ProductModel.findByIdAndDelete(id);

            if (!eliminado) {
                console.log("No se encuentra el producto");
                return null;
            }

            console.log("Producto eliminado correctamente!");
            return eliminado; // Devuelve el producto eliminado
        } catch (error) {
            console.log("Error al eliminar el producto", error);
            throw error; // Añadido throw error para propagar el error
        }
    }
}

export default ProductManager;
