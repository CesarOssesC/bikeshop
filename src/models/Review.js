const { DataTypes } = require('sequelize')
const sequelize = require('../config/db')

const Review = sequelize.define('review', {
    comentario: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    calificacion: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            min: 1,
            max: 5
        }
    }
} , {
    tableName: 'reviews'
});

module.exports = Review