'use strict'

const express           = require('express')
const bodyParser        = require('body-parser')
const morgan            = require('morgan')
const { uuid }			= require('uuidv4')
const { flights }       = require('./test-data/flightSeating')
const { reservations }  = require('./test-data/reservations')

const PORT = process.env.PORT || 8000

express()
    .use(function(req, res, next) {
        res.header("Access-Control-Allow-Origin", "*")
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
        next()
    })
	.use(morgan('dev'))
	.use(express.static('public'))
    .use(bodyParser.json())
    .use(express.urlencoded({extended: false}))

    // endpoints
    .get('/', (req, res) => res.send("Root"))

    .get('/flights/:flightNumber', (req, res) => {
        const { flightNumber } = req.params
        const flight = flights[flightNumber]
        res.send(flight)
    })

    .get('/confirmed?flight=flight&seat=seat&givenName=givenName&surname=surname&email=email',
        (req, res) => {
            // const { flight, seat, givenName, surname, email } = req.query
            // res.redirect('/confirmed')
            // res.send(req.query)
        }
    )

    .post('/seat-select', (req, res) => {
        const newReservation = { id:uuid(), ...req.body }
        reservations.push(newReservation)
        res.send(newReservation)
    })

    .listen(PORT, () => console.log(`Listening on port ${PORT}`))