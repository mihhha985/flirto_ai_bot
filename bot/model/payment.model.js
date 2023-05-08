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
     created: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
  }
},{timestamps: false});

module.exports = Payment;