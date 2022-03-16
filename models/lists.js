const {



  Model,



} = require('sequelize');



module.exports = (sequelize, DataTypes) => {

  class Lists extends Model {

    /**



     * Helper method for defining associations.



     * This method is not a part of Sequelize lifecycle.



     * The `models/index` file will call this method automatically.



     */



    static associate(models) {

      Lists.hasMany(models.Tasks, {



        foreignKey: 'list_id', // listId



      });



      Lists.belongsToMany(models.Users, { through: models.UserLists, foreignKey: 'list_id' });

    }

  }



  Lists.init({



    list_name: DataTypes.STRING,



  }, {



    sequelize,



    modelName: 'Lists',



  });



  return Lists;

};

