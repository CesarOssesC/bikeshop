const express = require('express')
const router = express.Router()
const bicicletasController = require('../controllers/bicicletasController')

//lista todas las bicicletas
router.get('/', bicicletasController.index)
//rutas para la creacion de bicicletas
router.get('/new', bicicletasController.new)
router.post('/', bicicletasController.create)
//muestra 1 bicicleta en base a su id
router.get('/:id', bicicletasController.show)
//rutas para actualizar datos
router.get('/:id/edit', bicicletasController.edit)
router.put('/:id', bicicletasController.update)
//ruta para eliminar 1 bicicleta
router.delete('/:id', bicicletasController.delete)




module.exports = router