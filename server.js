const express = require('express')
const dotenv = require('dotenv').config()
const port = process.env.PORT || 3000
const connectDB = require('./config/dbs')
const { errorHandler } = require('./middleware/errorMiddleware')
const colors = require('colors')

connectDB()

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))



app.use(errorHandler)

app.listen(port, () => console.log(`Server start in port ${port}`))