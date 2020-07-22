'use strict'

const express = require('express')
const expressLayouts = require('express-ejs-layouts')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const indexRouter = require('./routes/indexRouter')
const app = express()

app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(expressLayouts)
app.use(express.static('public'))
app.use(express.urlencoded({ extended: false }))


app.use((req, res, next) => {
	res.header("Access-Control-Allow-Origin", "*")
	res.header(
		"Access-Control-Allow-Headers",
		"Origin, X-Requested-With, Content-Type, Accept"
		)
		next()
	})

app.use('/', indexRouter)
app.set('view engine', 'ejs')
app.listen(process.env.PORT || 8000)