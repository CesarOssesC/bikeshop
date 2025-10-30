const express = require('express')
const router = express.Router()
const comprasController = require('../controllers/comprasController')


router.get('/', comprasController.index)
router.post('/', comprasController.create)
router.get('/new', comprasController.new)
router.get('/:id', comprasController.show)



module.exports = router