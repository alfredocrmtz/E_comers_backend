const asyncHandler = require('express-async-handler')
const Order = require('../model/orderModel')

const getOrders = asyncHandler(async (req, res) => {
    if (req.user.isAdmin === true) {
        const orders = await Order.find({ cancel: false })
        res.status(200).json(orders)
    } else {
        const orders = await Order.find({ user: req.user.id, cancel: false })
        res.status(200).json(orders)
    }
})

const setOrder = asyncHandler(async (req, res) => {
    if (!req.body.product) {
        res.status(400)
        throw new Error("You shoul be select to product")
    } else if (!req.body.amount) {
        res.status(400)
        throw new Error("You shoul be put amount of product")
    }

    const order = await Order.create({
        product: req.body.product,
        user: req.user.id,
        amount: req.user.amount
    })
    res.status(201).json(order)
})

const updateOrder = asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id)
    if (!order) {
        res.status(400)
        throw new Error("The order not found")
    }

    if (order.user.toString() !== req.user.id) {
        res.status(401)
        throw new Error("Acces deniend")
    } else {
        const orderUpdated = await Order.findByIdAndUpdate(req.params.id, { amount: req.body.amount }, { new: true })
        res.status(200).json(tareaUpdated)
    }
})

const deleteSoftOrder = asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id)
    if (!order) {
        res.status(400)
        throw new Error("The order not found")
    }

    if (order.user.toString() !== req.user.id && req.user.isAdmin !== true) {
        res.status(401)
        throw new Error("Acces deniend")
    } else {
        await Order.findByIdAndUpdate(req.params.id, { cancel: true }, { new: true })
        //await Order.deleteOne(order)
        //await Order.findByIdAndDelete(req.params.id)

        res.status(200).json({ id: req.params.id })
    }
})

const deleteOrder = asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id)
    if (!order) {
        res.status(400)
        throw new Error("The order not found")
    }

    if (req.user.isAdmin !== true) {
        res.status(401)
        throw new Error("Acces deniend")
    } else {
        await Order.deleteOne(order)
        //await Order.findByIdAndDelete(req.params.id)

        res.status(200).json({ id: req.params.id })
    }
})

module.exports = {
    getOrders,
    setOrder,
    updateOrder,
    deleteSoftOrder,
    deleteOrder
}