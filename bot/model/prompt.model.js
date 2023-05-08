const { DataTypes } = require("sequelize");
const db = require("../connection/db.connection");

const Prompt = db.define("prompt", {
    id: {
       type: DataTypes.INTEGER,
       autoIncrement: true,
       primaryKey: true,
       unique: true
    },
    gender:{
        type:DataTypes.STRING,
        allowNull: false
    },
    typeMeet: {
        type:DataTypes.STRING,
        allowNull: false,
    },
    price:{
        type:DataTypes.STRING,
        allowNull: false,
    },
    location:{
        type:DataTypes.STRING,
        allowNull: false,
    },
    prompt:{
        type:DataTypes.STRING,
    },
    count:{
        type:DataTypes.INTEGER,
        allowNull: false,
    },
    status:{
        type:DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
    },
    created: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    }
},{timestamps: false});

module.exports = Prompt;