const { DataTypes } = require("sequelize");
const db = require("../connection/db.connection");

const Payment = db.define("payment", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        unique: true
     },
     tarif:{
        type:DataTypes.STRING,
        allowNull:false
     },
     date:{
        type: DataTypes.BIGINT,
        allowNull:false
     }
},{timestamps: false});

module.exports = Payment;