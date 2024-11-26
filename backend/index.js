require('dotenv').config()

const express = require('express')
const app = express()
const cors = require('cors')

const port = process.env.PORT
const host = process.env.host

const corsOptions = { 
    origin: ['http://localhost:5173']
};

app.use(cors(corsOptions))
app.use(express.json())
app.use(express.urlencoded({ extended: false}))

const pricingSchemeRoute = require('./routes/pricing_scheme')
app.use(pricingSchemeRoute)

const validator = require('./middleware/validator')
app.use(validator.errorHandler)

app.listen(port, host, () => {
    console.log(`Server running on ${host}:${port}`)
})