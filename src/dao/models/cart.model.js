import mongoose from "mongoose";

const Schema = mongoose.Schema;

const cartSchema = new Schema({
    products: [
        {
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Product",
                required: [true, 'El producto es obligatorio'],
            },
            quantity: {
                type: Number,
                default: 1,
                min: [1, 'La cantidad debe ser al menos 1'],
            },
        },
    ],
});

const CartModel = mongoose.model("Cart", cartSchema);

export default CartModel;
