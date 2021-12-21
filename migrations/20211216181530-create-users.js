'use strict';
module.exports = {
  up: async (queryInterface, DataTypes) => {
    return await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4
      },
      surname: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      othernames: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      isVerified: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      email:{
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
          notNull: {msg: 'User must have a email'},
          notEmpty: {msg: 'email must not be empty'}
        }
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    return await queryInterface.dropTable('Users');
  }
};