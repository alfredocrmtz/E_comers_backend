const asyncHandler = require('express-async-handler')
const Product = require('../model/productModel')

const getProducts = asyncHandler(async (req, res) => {
    if (req.user.isAdmin === true) {
        const orders = await Product.find()
        res.status(200).json(orders)
    } else {
        const orders = await Product.find({ user: req.user.id, enable: true })
        res.status(200).json(orders)
    }
})

const setProduct = asyncHandler(async (req, res) => {
    if (!req.body.name) {
        res.status(400)
        throw new Error("You shoul be put a name")
    } else if (!req.body.description) {
        res.status(400)
        throw new Error("You shoul be put a description")
    } else if (!req.body.stock) {
        res.status(400)
        throw new Error("You shoul be put a description")
    } else if (!req.body.price) {
        res.status(400)
        throw new Error("You shoul be put a price by unit")
    }

    if (!req.body.icon) {
        const product = await Product.create({
            name: req.body.name,
            user: req.user.id,
            description: req.user.description,
            stock: req.user.stock,
            price: req.user.price
        })
        res.status(201).json(product)
    } else {
        const product = await Product.create({
            name: req.body.name,
            user: req.user.id,
            icon: req.user.icon,
            description: req.user.description,
            stock: req.user.stock,
            price: req.user.price,
        })
        res.status(201).json(product)
    }
})

const updateProduct = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id)
    if (!product) {
        res.status(400)
        throw new Error("The order not found")
    }

    if (product.user.toString() !== req.user.id && req.user.isAdmin !== true) {
        res.status(401)
        throw new Error("Acces deniend")
    } else {
        const productUpdated = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true })
        res.status(200).json(productUpdated)
    }
})

const deleteSoftProduct = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id)
    if (!product) {
        res.status(400)
        throw new Error("The order not found")
    }

    if (product.user.toString() !== req.user.id && req.user.isAdmin !== true) {
        res.status(401)
        throw new Error("Acces deniend")
    } else {
        await Product.findByIdAndUpdate(req.params.id, { enable: false }, { new: true })
        //await Order.deleteOne(order)
        //await Order.findByIdAndDelete(req.params.id)

        res.status(200).json({ id: req.params.id })
    }
})

const deleteProduct = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id)
    if (!product) {
        res.status(400)
        throw new Error("The order not found")
    }

    if (req.user.isAdmin !== true) {
        res.status(401)
        throw new Error("Acces deniend")
    } else {
        await Product.deleteOne(product)
        //await Order.findByIdAndDelete(req.params.id)

        res.status(200).json({ id: req.params.id })
    }
})

module.exports = {
    getProducts,
    setProduct,
    updateProduct,
    deleteSoftProduct,
    deleteProduct
}