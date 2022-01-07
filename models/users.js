'use strict';
const {
  Model
} = require('sequelize');
const jwt = require('jsonwebtoken');

require('dotenv').config();
const jwtSecret = process.env.JWT_SECRET
const expiry = process.env.expireIn
module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Otps, PasswordRetrive, Questions }) {
      // define association here 
      this.hasOne(Otps, { foreignKey: 'userId', as: 'otp' });
      this.hasOne(PasswordRetrive, { foreignKey: 'userId', as: 'passwordRetrive' });
      this.belongsTo(Questions, { foreignKey: 'questionId', as: 'questions' });
    }

    static generateAuthToken() {
      const token = jwt.sign({
        uuid: this.uuid,
        email: this.email, 
        status: this.status
      },
        jwtSecret,
        { expiresIn: expiry })

      return token;
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
    status: {
      type: DataTypes.ENUM('active', 'inactive', 'suspended'),
      defaultValue: 'inactive'
    }
  }, {
    sequelize,
    tableName: 'users',
    modelName: 'Users',
  });
  return Users;
};