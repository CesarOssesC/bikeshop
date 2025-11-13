const Bicicleta = require('./Bicicleta')
const Review = require('./Review')
const Compra = require('./Compra')
const CompraBicicleta = require('./CompraBicicleta')
const Usuario = require('./Usuario')
const sequelize = require('../config/db')


//Relacion entre Bicicleta y Reviews de 1 a N
Bicicleta.hasMany(Review, {
    foreignKey: 'bicicletaId',
    onDelete: 'CASCADE'
});

Review.belongsTo(Bicicleta, {
    foreignKey: 'bicicletaId',
    onDelete: 'CASCADE'
});

//Relacion entre usuarios y reviews
Usuario.hasMany(Review, {
    foreignKey: 'usuarioId',
    onDelete: 'SET NULL'
});

Review.belongsTo(Usuario, {
    foreignKey: 'usuarioId',
    onDelete: 'SET NULL'
})

//relacion entre usuarios y compras
Usuario.hasMany(Compra, {
    foreignKey: 'usuarioId',
    onDelete: 'SET NULL'
});

Compra.belongsTo(Usuario, {
    foreignKey: 'usuarioId',
    onDelete: 'SET NULL'
})

//Relacion muchos a muchos entre bicicletas y compras
Compra.belongsToMany(Bicicleta, {
    through: CompraBicicleta,
    foreignKey: 'compraId',
    onDelete: 'CASCADE'
});

Bicicleta.belongsToMany(Compra, {
    through: CompraBicicleta,
    foreignKey: 'bicicletaId',
    onDelete: 'CASCADE'
})

module.exports = {
    sequelize,
    Bicicleta,
    Review,
    Compra,
    CompraBicicleta,
    Usuario
}