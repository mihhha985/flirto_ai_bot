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
         type: DataTypes.STRING,
         unique: true,
         allowNull: false,
      },
      firstName: {
         type: DataTypes.STRING,
         allowNull: false
      },
      lastName: {
         type: DataTypes.STRING
      },
      username: {
         type: DataTypes.STRING,
         unique: true
      },
      phone:{
         type: DataTypes.STRING,
         unique: true
      },
      isPremium: {
         type: DataTypes.BOOLEAN,
         defaultValue: false
      },
      premiumTime: {
         type: DataTypes.DATE,
      },
      premiumCount: {
         type: DataTypes.INTEGER,
      },
   },
   {
      indexes: [
          {
              unique: true,
              fields: ['id', 'chatID', 'username']
          }
      ]
});



User.hasMany(Prompt);
Prompt.belongsTo(User);
User.hasMany(Payment);
Payment.belongsTo(User);

module.exports = User;
