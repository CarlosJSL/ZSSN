export default(sequelize, DataType) => {
  const Person = sequelize.define('persons', {
    id: {
      type: DataType.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataType.STRING,
      allowNull: false,
    },
    age: {
      type: DataType.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    gender: {
      type: DataType.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    lon:{
      type: DataType.INTEGER,
      allowNull: true,
    },

    lat: {
      type: DataType.INTEGER,
      allowNull: true,
    },
    infected: {
      type: DataType.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    registrations: {
      type: DataType.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
  });

  return Person;
};
