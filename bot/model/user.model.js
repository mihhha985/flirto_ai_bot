const { DataTypes } = require("sequelize");
const db = require("../connection/db.connection");
const Prompt = require("./prompt.model");
const Payment = require("./payment.model");

const User = db.define("user", {
      id: {
         type: DataTypes.INTEGER,
         autoIncrement: true,
         primaryKey: true,
         unique: true
      },
      chatID: {
         type: DataTypes.BIGINT,
         allowNull: false
      },
      firstName: {
         type: DataTypes.STRING
      },
      lastName: {
         type: DataTypes.STRING
      },
      username: {
         type: DataTypes.STRING
      },
      phone:{
         type: DataTypes.STRING
      },
      isPremium: {
         type: DataTypes.BOOLEAN,
         defaultValue: false
      },
      premiumTime: {
         type: DataTypes.BIGINT,
         defaultValue: 0
      },
      premiumCount: {
         type: DataTypes.INTEGER,
         defaultValue: 0
      },
      created: {
         type: DataTypes.BIGINT,
         defaultValue: Date.now()
     }
   },{timestamps: false});



User.hasMany(Prompt);
Prompt.belongsTo(User);
User.hasMany(Payment);
Payment.belongsTo(User);

module.exports = User;
