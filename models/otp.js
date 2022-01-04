'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Otp extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Users}) {
      // define association here
      this.belongsTo(Users, { foreignKey: 'userId', as: 'user'})
    }

    toJSON(){
      //to hide the id and user Id
      return {...this.get(), id: undefined, userId: undefined}
    }
  };
  Otp.init({
    token:{
      type:  DataTypes.STRING,
      allowNull: false,
    },
    uuid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    expiresAt:{
      type: DataTypes.DATE,
      defaultValue: null,
      allowNull: false,
    }
  }, {
    sequelize,
    modelName: 'Otp',
    tableName:'otp'
  });
  return Otp;
};