'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Event extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Event.belongsToMany(models.Person, {
        as: 'participants',
        foreignKey: 'eventId',
        through: {
          model: 'PersonInEvent',
          as: 'personInEvent',
        },
      });
    }
  }
  Event.init(
    {
      title: DataTypes.STRING,
      location: DataTypes.STRING,
      date: DataTypes.DATE,
      note: DataTypes.STRING,
      image: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'Event',
    }
  );
  return Event;
};
