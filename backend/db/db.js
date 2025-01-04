const { Sequelize } = require("sequelize");
const dotenv = require('dotenv');
dotenv.config();

const sequelize = new Sequelize('Culina-app', 'postgres', 'postgres', {
    host: 'ciluna-db',
    dialect: 'postgres',
    port: 5432,
    logging: false, 
});
  
module.exports = sequelize;