import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String, 
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    images: {
        type: [String],
        required: false,
        default: []
    }
    // images: [{type:String}]
});


mongoose.models = {};
const Product = mongoose.models.Product || mongoose.model('Product', ProductSchema);
export default Product

