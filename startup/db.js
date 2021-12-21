// const Sequelize = require('sequelize');
// const config = require('../config/config.json');

// console.log(config.development)

// const sequelize = new Sequelize(
//     config.development.database, 
//     config.development.host, 
//     config.development.password,
//     {
//         host: config.development.host, 
//         dialect: config.development.dialect,
//         operatorsAliases: false
//     }
// )

const { sequelize } = require('../models');

const connectDb =  async() => {
    await sequelize.authenticate().then(() => {
        console.log('connected')
    }).catch(err => console.loh(err))
}

module.exports = connectDb;