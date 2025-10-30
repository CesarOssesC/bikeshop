const { Bicicleta, Review } = require('../models/associations')

exports.index = async (req, res, next) => {
    try {
        const bicicletas = await Bicicleta.findAll({
            order: [['id', 'ASC']],
            raw: true
        })
        const { success } = req.query
        res.render('bicicletas/index', { bicicletas, success })
    } catch (error) {
        next(error)
    }
} 

exports.show = async (req, res, next) => {
    try {
        const { id } = req.params
        const { success } = req.query
        const bicicleta = await Bicicleta.findByPk(id, {
            include: [{model: Review, order: [['updatedAt', 'DESC']]}]
        })
        if(!bicicleta) return res.status(404).send(`Bicicleta con el id: ${id} no encontrada.`);

        const biciDatoPlano = {
            ...bicicleta.get({ plain: true }),
            reviews: bicicleta.reviews.map(r => r.get({ plain: true }))
        }
        res.render('bicicletas/show', { bicicleta: biciDatoPlano, success })
    } catch (error) {
        next(error)
    }
}

exports.new = async (req, res, next) => {
    res.render('bicicletas/new')
}

exports.create = async (req, res, next) => {
    const { marca, modelo, tipo, precio, disponible, year } = req.body

    if (!marca || !modelo || !tipo || !precio || !year) {
        res.status(400).send("Faltan datos obligatorios.")
    }

    const nuevaBici = await Bicicleta.create({
        marca, modelo, tipo, precio: parseFloat(precio), disponible, year: parseInt(year)
    })
    console.log('Bicicleta creada exitosamente: ', nuevaBici)
    const msg = encodeURIComponent('Bicicleta creada exitosamente')
    res.redirect(`/bicicletas?success=${msg}`)
}

exports.edit = async (req, res, next) => {
    try {
        const bicicleta = await Bicicleta.findByPk(req.params.id)
    
        if (!bicicleta) return res.status(404).send('Bicicleta no encontrada');

        const biciDatoPlano = {
            ...bicicleta.get({ plain: true })
        }

        const tipos = ['mtb', 'ruta', 'enduro', 'trail', 'bmx'].map(tipo => ({
            value: tipo,
            selected: tipo === biciDatoPlano.tipo
        }));
        
        res.render('bicicletas/edit', { bicicleta: biciDatoPlano, tipos})
    } catch (error) {
        next(error)
    }
}

exports.update = async (req, res, next) => {
    try {
        const { id } = req.params
        const { marca, modelo, tipo, precio, disponible, year } = req.body

        const bici = await Bicicleta.findByPk(id)
        if (!bici) return res.status(404).send('Bicicleta no encontrada');

        
        const biciAtualizada = bici.update({
            marca, modelo, tipo, precio: parseFloat(precio), disponible, year: parseInt(year)
        })

        console.log('Bicicleta actualizada exitosamente: ', biciAtualizada)
        const msg = encodeURIComponent('Bicicleta actualizada exitosamente')

        res.redirect(`/bicicletas/${id}?success=${msg}`)
    } catch (error) {
        next(error)
    }
}

exports.delete = async (req, res, next) => {
    try {
        const { id } = req.params
        const bici = await Bicicleta.findByPk(id)
        if (!bici) return res.status(404).send('Bicicleta no encontrada');

        const biciEliminada = bici.destroy()
        
        console.log('Bicicleta eliminada exitosamente: ', biciEliminada)
        const msg = encodeURIComponent('Bicicleta eliminada exitosamente')

        res.redirect(`/bicicletas?success=${msg}`)
    } catch (error) {
        next(error)
    }
}