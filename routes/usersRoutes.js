const express = require('express')
const router = express.Router()
const { protect } = require('../middleware/authMiddleware')

const { registerUser, loginUser, ownerData } = require('../controllers/usersControllers')

router.post('/', registerUser)
router.post('/login', loginUser)

router.get('/data', protect, ownerData)

module.exports = router