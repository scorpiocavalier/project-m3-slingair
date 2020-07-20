const { uuid } = require('uuidv4')
const rp = require('request-promise')
const express = require('express')
const router = express.Router()

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
    body: data,
    json: true
  }
}

// Render homepage
router.get('/', (req, res) => res.render('homepage'))

// Render confirmation page of the flight booking
router.get(`/confirmed/:id`, async (req, res) => {
  const { id } = req.query
  const options = fetchOptions(`/slingair/users/${id}`)
  try {
    const { data: reservation, status } = await rp(options)
    res.status(status).render('confirmed', { ...reservation })
  } catch (err) {
    console.log(err.message)
  }
})

// Render seat-select page w/ dropdown info of all flights
router.get('/seat-select', async (req, res) => {
  const options = fetchOptions('/slingair/flights')
  try {
    const { flights, status } = await rp(options)
    res.status(status).render('seat-select', {
      flights,
      libs: ['seat-select']
    })
  } catch (err) {
    console.log(err.message)
  }
})

// Create a new user reservation
router.post('/seat-select', async (req, res) => {
  const id = uuid()
  const newReservation = { id, ...req.body }
  const options = postOptions('/slingair/users', newReservation)

  try {
    const { reservation, status } = await rp(options)
    res.status(status).send(reservation)
  } catch (err) {
    console.log(err.message)
  }
})

// Render seat-select page w/ info on a specific flight
router.get('/flights/:flightNumber', async (req, res) => {
  const { flightNumber } = req.params
  const options = fetchOptions(`/slingair/flights/${flightNumber}`)
  try {
    const { [flightNumber]: flight , status } = await rp(options)
    res.status(status).send(flight)
  } catch (err) {
    console.log(err.message)
  }
})

// Render all user reservations
router.get('/reservations', async (req, res) => {
  const options = fetchOptions(`/slingair/users`)

  try {
    const reservations = await rp(options)
    res.render('reservations-all', { reservations })
  } catch (err) {
    console.log(err.message)
  }
})

// Render a specific user reservation
router.get('/reservations/:email', async (req, res) => {
  const { email } = req.params
  const options = fetchOptions(`/slingair/users/${email}`)

  try {
    const { data: reservation, status } = await rp(options)
    res.status(status).render('reservations-one', { ...reservation })
  } catch (err) {
    console.log(err.message)
  }
})

module.exports = router