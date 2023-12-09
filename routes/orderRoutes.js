const express = require('express')
const router = express.Router()
const { protect } = require('../middleware/authMiddleware')

const { getOrders, setOrder, updateOrder, deleteSoftOrder, deleteOrder } = require('../controllers/orderControllers')

router.route('/').get(protect, getOrders).post(protect, setOrder)

router.route('/:id').put(protect, updateOrder).delete(protect, deleteSoftOrder)

router.route('/delete/:id').delete(protect, deleteOrder)

module.exports = router