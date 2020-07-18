const { reservations }  = require('../public/js/reservations')
const { uuid }          = require('uuidv4')
const rp                = require('request-promise')
const express           = require('express')
const router            = express.Router()

router.get('/', async (req, res) => {
  const options = {
    uri: 'https://journeyedu.herokuapp.com/slingair/flights',
    headers: {
      'User-Agent': 'Request-Promise'
    },
    json: true
  }
  response = await rp(options)
  const flights = response['flights']
  res.status(200).send(flights)
})

router.post('/', (req, res) => res.send('POST /flights'))

router.get('/seat-select', async (req, res) => {
  const options = {
    uri: 'https://journeyedu.herokuapp.com/slingair/flights',
    headers: { 'User-Agent': 'Request-Promise' },
    json: true
  }

  try   { data = await rp(options) }
  catch { console.log("Error when fetching all flights.") }

  res.status(200).render('flights/seat-select', {
    flights: data['flights'],
    libs: ['seat-select']
  })
})

router.post('/seat-select', (req, res) => {
  const newReservation = { id: uuid(), ...req.body }
  reservations.push(newReservation)
  res.status(201).end()
})

router.get('/:flightNumber', (req, res) => {
  const { flightNumber } = req.params
  const flight = flights[flightNumber]
  res.status(200).send(flight)
})

router.get('/confirmed', (req, res) => {
    // const { flight, seat, givenName, surname, email } = req.query
    res.status(200).render('flights/confirmed', {
      libs: ['confirmed']
    })
})

router.get('/view-reservation', (req, res) => {
  res.status(200).render('flights/view-reservation', {
    libs: ['view-reservation']
  })
})

// router.get('/confirmed?flight=flight&seat=seat&givenName=givenName&surname=surname&email=email',
//   (req, res) => {
//     const { flight, seat, givenName, surname, email } = req.query
//     res.status(200).render('flights/confirmed', {
//       libs: ['confirmed']
//     })
//   })
// app.

module.exports = router