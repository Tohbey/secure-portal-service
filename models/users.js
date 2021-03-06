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
    static associate({ Otps, PasswordRetrive, Questions, Document }) {
      // define association here 
      this.hasOne(Otps, { foreignKey: 'userId', as: 'otp' });
      this.hasOne(PasswordRetrive, { foreignKey: 'userId', as: 'passwordRetrive' });
      this.belongsTo(Questions, { foreignKey: 'questionId', as: 'questions' });
      this.hasMany(Document, {foreignKey: 'owner', as:'documents'})
    }

    toJSON() {
      //to hide the id
      return { ...this.get(), id: undefined }
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
      defaultValue: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: 'User must have a email' },
        notEmpty: { msg: 'email must not be empty' }
      }
    },
    questionId: {
      type: DataTypes.INTEGER,
      defaultValue: null,
    },
    secretAnswer:{
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM('active', 'inactive', 'suspended'),
      defaultValue: 'inactive'
    },
    role:{
      type: DataTypes.ENUM('admin', 'user'),
      defaultValue: 'user'
    }
  }, {
    sequelize,
    tableName: 'users',
    modelName: 'Users',
  });
  return Users;
};