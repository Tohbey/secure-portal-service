'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class SharedDocument extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Users, Permissions, Document}) {
      // define association here
      this.belongsTo(Users, {foreignKey: 'user', as: 'users'});
      this.belongsTo(Permissions, {foreignKey: 'permission', as: 'permissions'});
      this.belongsTo(Document, {foreignKey: 'document', as: 'documents'});
    }
  }
  SharedDocument.init({
    uuid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    document: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    permission: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    user: {
      type: DataTypes.INTEGER,
      allowNull: false,
    }
  }, {
    sequelize,
    modelName: 'SharedDocument',
    tableName: 'SharedDocument',
  });
  return SharedDocument;
};