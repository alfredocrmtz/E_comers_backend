const express = require('express')
const router = express.Router()
const { protect } = require('../middleware/authMiddleware')

const { getProducts, setProduct, updateProduct, deleteSoftProduct, deleteProduct } = require('../controllers/productControllers')

router.route('/').get(protect, getProducts).post(protect, setProduct)

router.route('/:id').put(protect, updateProduct).delete(protect, deleteSoftProduct)

router.route('/delete/:id').delete(protect, deleteProduct)

module.exports = router