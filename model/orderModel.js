const mongoose = require('mongoose')

const orderSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    product: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Product'
    },
    amount: {
        type: Number,
        require: [true, "Debe ingresar la cantidad de unidades requeridas"]
    },
    cancel: {
        type: Boolean,
        default: false
    }

}, {
    timestamps: true
})

module.exports = mongoose.model('Order', orderSchema)