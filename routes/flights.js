const { reservations }  = require('../public/js/reservations')
const { uuid }          = require('uuidv4')
const rp                = require('request-promise')
const express           = require('express')
const router            = express.Router()

const fetchAPIData = uri => {
  const options = {
    uri: `https://journeyedu.herokuapp.com${uri}`,
    headers: { 'User-Agent': 'Request-Promise' },
    json: true
  }

  try   { return rp(options) }
  catch { console.log("Error when fetching API data.") }
}

router.get('/', async (req, res) => {
  const data = await fetchAPIData('/slingair/flights')
  const flights = data['flights']
  res.status(200).send(flights)
})

router.post('/', (req, res) => res.send('POST /flights'))

router.get('/seat-select', async (req, res) => {
  const data = await fetchAPIData('/slingair/flights')
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

router.get('/:flightNumber', async (req, res) => {
  const { flightNumber } = req.params
  const data = await fetchAPIData(`/slingair/flights/${flightNumber}`)
  res.status(200).send(data[flightNumber])
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