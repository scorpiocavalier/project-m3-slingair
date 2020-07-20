const { uuid } = require('uuidv4')
const { rpFetch, rpPost } = require('../public/js/slingair-api')
const express = require('express')
const router = express.Router()

// Render homepage
router.get('/', (req, res) => res.render('homepage'))

// Render confirmation page of the flight booking
router.get(`/confirmed/:id`, async (req, res) => {
  const { id } = req.query
  const { data: reservation, status } = await rpFetch(`/slingair/users/${id}`)
  res.status(status).render('confirmed', { ...reservation })
})

// Render seat-select page w/ dropdown info of all flights
router.get('/seat-select', async (req, res) => {
  const { flights, status } = await rpFetch('/slingair/flights')
  res.status(status).render('seat-select', {
    flights,
    libs: ['seat-select']
  })
})

// Create a new user reservation
router.post('/seat-select', async (req, res) => {
  const id = uuid()
  const newReservation = { id, ...req.body }
  const { reservation, status } = await rpPost('/slingair/users', newReservation)
  res.status(status).send(reservation)
})

// Render seat-select page w/ info on a specific flight
router.get('/flights/:flightNumber', async (req, res) => {
  const { flightNumber } = req.params
  const { [flightNumber]: flight, status } = await rpFetch(`/slingair/flights/${flightNumber}`)
  res.status(status).send(flight)
})

// Render all user reservations
router.get('/reservations', async (req, res) => {
  const reservations = await rpFetch(`/slingair/users`)
  res.status(200).render('reservations-all', { reservations })
})

// Render a specific user reservation
router.get('/reservations/:email', async (req, res) => {
  const { email } = req.params
  const { data: reservation, status } = await rpFetch(`/slingair/users/${email}`)
  res.status(status).render('reservations-one', { ...reservation })
})

module.exports = router