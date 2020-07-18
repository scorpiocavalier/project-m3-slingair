const { reservations }  = require('../public/js/reservations')
const { uuid }          = require('uuidv4')
const rp                = require('request-promise')
const express           = require('express')
const router            = express.Router()

// API GET Options
const fetchOptions = uri => {
  return {
    uri: `https://journeyedu.herokuapp.com${uri}`,
    headers: { 'User-Agent': 'Request-Promise' },
    json: true
  }
}

// API POST Options
const postOptions = (uri, data) => {
  return {
    method: 'POST',
    uri: `https://journeyedu.herokuapp.com${uri}`,
    body: { data },
    json: true
  }
}

// Render seat-select page w/ dropdown info of all flights
router.get('/seat-select', async (req, res) => {
  const options = fetchOptions('/slingair/flights')
  try {
    const data = await rp(options)
    res.status(200).render('flights/seat-select', {
      flights: data['flights'],
      libs: ['seat-select']
    })
  } catch (err) {
    console.log(err.message)
  }
})

// Create a new user reservation
router.post('/seat-select', (req, res) => {
  const newReservation = { id: uuid(), ...req.body }
  reservations.push(newReservation)
  res.status(201).end()
})

// Render seat-select page w/ info on a specific flight
router.get('/:flightNumber', async (req, res) => {
  const { flightNumber } = req.params
  const options = fetchOptions(`/slingair/flights/${flightNumber}`)
  console.log(options)
  try {
    const data = await rp(options)
    res.status(200).send(data[flightNumber])
  } catch (err) {
    console.log(err.message)
  }
})

module.exports = router