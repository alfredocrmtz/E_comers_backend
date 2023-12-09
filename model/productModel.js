const mongoose = require('mongoose')

const productSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    name: {
        type: String,
        require: [true, "Debe ingresar el nombre del producto"]
    },
    description: {
        type: String,
        require: [true, "Debe ingresar brebe descripción del producto"]
    },
    icon: {
        type: String,
        default: "SURL"
    },
    stock: {
        type: Number,
        require: [true, "Debe ingresar la cantidad de productos en stock"]
    },
    price: {
        type: Number,
        require: [true, "Debe ingresar el precio por unidad"]
    },
    enable: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('Product', productSchema)