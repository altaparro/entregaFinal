import mongoose from "mongoose";

const Schema = mongoose.Schema;

const productSchema = new Schema({
    title: {
        type: String,
        required: [true, 'El título es obligatorio'],
        trim: true,
    },
    description: {
        type: String,
        required: [true, 'La descripción es obligatoria'],
        trim: true,
    },
    price: {
        type: Number,
        required: [true, 'El precio es obligatorio'],
        min: [0, 'El precio no puede ser negativo'],
    },
    img: String,
    code: {
        type: String,
        required: [true, 'El código es obligatorio'],
        unique: true,
        trim: true,
    },
    stock: {
        type: Number,
        required: [true, 'El stock es obligatorio'],
        min: [0, 'El stock no puede ser negativo'],
    },
    category: {
        type: String,
        required: [true, 'La categoría es obligatoria'],
        trim: true,
    },
    status: {
        type: Boolean,
        default: true,
    },
    thumbnails: {
        type: [String],
        validate: [arrayLimit, 'Excede el número máximo de miniaturas permitidas (10)'],
    },
});

// Validación personalizada para limitar la cantidad de miniaturas
function arrayLimit(val) {
    return val.length <= 10;
}

const ProductModel = mongoose.model("Product", productSchema);

export default ProductModel;
