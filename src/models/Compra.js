const { DataTypes } = require('sequelize')
const sequelize = require('../config/db')

const Compra = sequelize.define('compra', {
    total: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        defaultValue: 0.00
    }
}, {
    tableName: 'compras',
    timestamps: true
});


module.exports = Compra;

