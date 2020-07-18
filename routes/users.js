const express           = require('express')
const router            = express.Router()


router.get('/view-reservation', (req, res) => {
  res.status(200).render('users/view-reservation', {
    libs: ['view-reservation']
  })
})

router.get('/:flightNumber/confirmed', (req, res) => {
  res.status(200).render('users/confirmed', {
    data: {
      flight: "SA111",
      seat: "1A",
      givenName: "Bob",
      surname: "Marley",
      email: "haha@gmail.com"
    },
    libs: ['confirmed']
  })
})

module.exports = router