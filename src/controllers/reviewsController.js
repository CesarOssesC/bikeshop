const { Review, Bicicleta } = require('../models/associations')

exports.new = async (req, res, next) => {
    try {
        const { bicicletaId } = req.query
        res.render('reviews/new', { bicicletaId })
    } catch (error) {
        next(error)
    }
}

exports.create = async (req, res, next) => {
    try {
        const { comentario, calificacion, bicicletaId } = req.body
        
        if (!comentario || !calificacion || !bicicletaId) {
            return res.status(400).send('Faltan campos obligatorios.')
        }

        const review = await Review.create({
            comentario,
            calificacion: parseInt(calificacion),
            bicicletaId: parseInt(bicicletaId)
        })

        console.log('Reseña creada exitosamente: ', review)
        const msg = encodeURIComponent('Reseña creada exitosamente')
        res.redirect(`/bicicletas/${bicicletaId}?success=${msg}`)
    } catch (error) {
        
    }
}

exports.edit = async (req, res, next) => {
    try {
        const reviewInstance = await Review.findByPk(req.params.id)
        if (!reviewInstance) return res.status(404).send('Reseña no encontrada');
        
        const review = reviewInstance.get({ plain: true })

        res.render('reviews/edit', { review })
    } catch (error) {
        next(error)
    }
}

exports.update = async (req, res, next) => {
    try {
        const { id } = req.params
        const { comentario, calificacion, bicicletaId } = req.body
        
        const review = await Review.update(
            { comentario, calificacion: parseInt(calificacion), bicicletaId: parseInt(bicicletaId) },
            { where: { id } }
        );

        console.log('Reseña actualizada exitosamente: ', review)
        const msg = encodeURIComponent('Reseña actualizada exitosamente')
        res.redirect(`/bicicletas/${bicicletaId}?success=${msg}`)
    } catch (error) {
        next(error)
    }
}

exports.delete = async (req, res, next) => {
    try {
        const review = await Review.findByPk(req.params.id)
        if(!review) return res.status(404).send('Reseña no encontrada');

        const bicicletaId = review.bicicletaId

        await review.destroy();

        console.log('Reseña eliminada exitosamente: ', review)
        const msg = encodeURIComponent('Reseña eliminada exitosamente')
        res.redirect(`/bicicletas/${bicicletaId}?success=${msg}`)
    } catch (error) {
        next(error)
    }
}