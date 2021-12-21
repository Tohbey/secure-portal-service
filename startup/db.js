const { sequelize } = require('../models');

const connectDb =  async() => {
    await sequelize.authenticate().then(() => {
        console.log('connected')
    }).catch(err => console.loh(err))
}

module.exports = connectDb;