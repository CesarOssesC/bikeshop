const express = require('express')
const router = express.Router();
const reviewsController = require('../controllers/reviewsController')

router.get('/new', reviewsController.new)
router.post('/', reviewsController.create)
router.get('/:id/edit', reviewsController.edit)
router.put('/:id', reviewsController.update)
router.delete('/:id', reviewsController.delete)

module.exports = router