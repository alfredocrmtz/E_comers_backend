const asyncHandler = require('express-async-handler')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const User = require('../model/userModel')

const registerUser = asyncHandler(async (req, res) => {
    const { name, alias, email, password } = req.body

    if (!name || !email || !password || !alias) {
        res.status(400)
        throw new Error("Pleas enter data set")
    }
    const userExist = await User.findOne({ email })
    const aliasExist = await User.findOne({ alias })
    if (userExist || aliasExist) {
        res.status(400)
        throw new Error("User has register")
    }
    const salt = await bcrypt.genSalt(10)

    const hashPassword = await bcrypt.hash(password, salt)

    const user = await User.create({ name, alias, email, password: hashPassword })

    if (user) {
        res.status(201).json({ _id: user._id, name: user.name, alias: user.alias, email: user.email, admin: user.isAdmin })
    } else {
        res.status(400)
        throw new Error("Can create User")
    }
})

const loginUser = asyncHandler(async (req, res) => {
    const { email, alias, password } = req.body

    const user = await User.findOne({ email })
    const userAlias = await User.findOne({ alias })

    //verificamos al usuario y a la contraseña
    if ((user && (await bcrypt.compare(password, user.password))) || (userAlias && (await bcrypt.compare(password, userAlias.password)))) {
        res.status(200).json({
            _id: user.id,
            alias: user.alias,
            name: user.name,
            email: user.email,
            token: getToken(user.id)
        })
    } else {
        res.status(400)
        throw new Error('Credenciales incorrectas')
    }
})

const ownerData = asyncHandler(async (req, res) => {
    res.status(200).json(req.user)
})

const getToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30m' })
}

module.exports = {
    registerUser,
    loginUser,
    ownerData
}