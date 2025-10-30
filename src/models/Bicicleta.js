const { DataTypes } = require('sequelize')
const sequelize = require('../config/db')

const Bicicleta = sequelize.define('bicicleta', {
    marca: {
        type: DataTypes.STRING,
        allowNull: false
    },
    modelo: {
        type: DataTypes.STRING,
        allowNull: false
    },
    tipo: {
        type: DataTypes.STRING,
        allowNull: false
    },
    precio: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    disponible: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    },
    year: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    tableName: 'bicicletas',
});

module.exports = Bicicleta