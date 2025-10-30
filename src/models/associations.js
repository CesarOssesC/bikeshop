const Bicicleta = require('./Bicicleta')
const Review = require('./Review')
const Compra = require('./Compra')
const CompraBicicleta = require('./CompraBicicleta')
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
    CompraBicicleta
}