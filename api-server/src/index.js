require('dotenv').config()

const express = require('express')
const routes = require('./routes')
const mongoose = require('mongoose')
const cors = require('cors')

const mongo = {
    host: process.env.MONGO_HOST,
    port: process.env.MONGO_PORT,
    database: process.env.MONGO_DB,
}

with(mongo) {
    mongoose.connect(`mongodb://${host}:${port}/${database}`)
}

const app = express()

app.use(cors())

app.use('/api', routes)



const port = process.env.PORT

app.listen(port, () => console.log(`users api running on port ${port}`))