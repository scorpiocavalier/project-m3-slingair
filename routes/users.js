const express           = require('express')
const router            = express.Router()


router.get('/view-reservation', (req, res) => {
  res.status(200).render('users/view-reservation', {
    libs: ['view-reservation']
  })
})

module.exports = router