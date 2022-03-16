const {

  Model,

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

      Users.belongsToMany(models.Lists, { through: models.UserLists, foreignKey: 'user_id' });

    }

  }

  Users.init({

    user_name: DataTypes.STRING,

  }, {

    sequelize,

    modelName: 'Users',

  });

  return Users;

};
