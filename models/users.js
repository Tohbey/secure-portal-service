'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }

    toJSON(){
      //to hide the id
      return {...this.get(), id: undefined}
    }
  };
  Users.init({
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
    status:{
      type: DataTypes.ENUM('active', 'inactive', 'suspended'),
      allowNull: false,
      defaultValue: 'inactive'
    }
  }, {
    sequelize,
    tableName: 'users',
    modelName: 'Users',
  });
  return Users;
};