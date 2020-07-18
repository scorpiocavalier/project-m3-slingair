const { flights }       = require('../test-data/flightSeating')
const { reservations }  = require('../test-data/reservations')
const { uuid }          = require('uuidv4')
const express           = require('express')
const router            = express.Router()
const app               = express()

app.set('layout extractScripts', true)

router.get('/seat-select', async (req, res) => {
  res.render('flights/seat-select')
})

router.post('/seat-select', (req, res) => {
  const newReservation = { id: uuid(), ...req.body }
  reservations.push(newReservation)
  res.send(newReservation)
})

router.get('/:flightNumber', (req, res) => {
  const { flightNumber } = req.params
  const flight = flights[flightNumber]
  res.send(flight)
})

router.get('/confirmed', (req, res) => {
  res.render('flights/confirmed')
})

router.get('/view-reservation', (req, res) => {
  res.render('flights/view-reservation')
})

// app.get('/confirmed?flight=flight&seat=seat&givenName=givenName&surname=surname&email=email',
//     (req, res) => {
//         const { flight, seat, givenName, surname, email } = req.query
//         res.redirect('/confirmed')
//         res.send(req.query)
//     }
// )

module.exports = router