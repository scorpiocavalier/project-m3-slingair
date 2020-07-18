'use strict'

const express           = require('express')
const expressLayouts    = require('express-ejs-layouts')
const bodyParser        = require('body-parser')
const morgan            = require('morgan')
const indexRouter       = require('./routes/index')
const flightsRouter     = require('./routes/flights')
const app               = express()

app.set('view engine', 'ejs')
app.set('views', `${__dirname}/views`)
app.set('layout', 'layouts/layout')
app.set('layout extractScripts', true)

app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(expressLayouts)
app.use(express.static('public'))
app.use(express.urlencoded({ extended: false }))

app.use('/', indexRouter)
app.use('/flights', flightsRouter)

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
    next()
})

app.listen(process.env.PORT || 8000)