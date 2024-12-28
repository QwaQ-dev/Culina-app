const sequelize = require("../db/db");
const { DataTypes } = require("sequelize");

const User = sequelize.define('users', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    e_mail: {type: DataTypes.STRING, unique: true},
    username: {type: DataTypes.STRING, unique: true},
    password: {type: DataTypes.STRING},
    role: {type: DataTypes.STRING, defaultValue:"Basic"},
    sex: {type: DataTypes.STRING, defaultValue:"male"}
}, {
    schema: "dev"
});

const Receipts = sequelize.define('receipts', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true},
    descr: {type: DataTypes.STRING},
    diff: {type: DataTypes.STRING},
    filters: {type: DataTypes.JSONB},
    imgs: {type: DataTypes.JSONB},
    author: {type: DataTypes.STRING}
}, {
    schema: "dev"
});

const Rating = sequelize.define('rating', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    rate: {type: DataTypes.INTEGER, allowNull: false}
}, {
    schema: "dev"
});

module.exports = {
    User,
    Receipts,
    Rating
}