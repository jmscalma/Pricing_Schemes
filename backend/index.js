require('dotenv').config()

const express = require('express')
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false}))

const port = process.env.PORT
const host = process.env.host

const pricingSchemeRoute = require('./routes/pricing_scheme')
app.use(pricingSchemeRoute)

const validator = require('./middleware/validator')
app.use(validator.errorHandler)

app.listen(port, host, () => {
    console.log(`Server running on ${host}:${port}`)
})