const { DataTypes } = require('sequelize')
const sequelize = require('../config/db')

const CompraBicicleta = sequelize.define('compra_bicicleta', {
    cantidad: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1
    },
    subtotal: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        defaultValue: 0.00
    }
}, {
    tableName: 'compra_bicicleta'
});

module.exports = CompraBicicleta;