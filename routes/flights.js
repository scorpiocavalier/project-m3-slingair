const { reservations } = require('../public/js/reservations')
const { flights } = require('../public/js/flightSeating')
const { uuid } = require('uuidv4')
const express = require('express')
const router = express.Router()

router.get('/seat-select', async (req, res) => {
  res.status(200).render('flights/seat-select', {
    libs: ['seat-select']
  })
})

router.post('/seat-select', (req, res) => {
  const newReservation = { id: uuid(), ...req.body }
  reservations.push(newReservation)
  res.status(201).json(newReservation)
})

router.get('/:flightNumber', (req, res) => {
  const { flightNumber } = req.params
  const flight = flights[flightNumber]
  res.status(200).send(flight)
})

router.get('/confirmed', (req, res) => {
    const { flight, seat, givenName, surname, email } = req.query
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