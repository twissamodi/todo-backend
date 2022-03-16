'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Tasks extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Tasks.belongsTo(models.Lists,{
        foreignKey:'list_id',
        onDelete:'cascade'
      })
    }
  }
  Tasks.init({
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    list_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Tasks',
  });
  return Tasks;
};