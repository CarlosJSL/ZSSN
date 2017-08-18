export default(sequelize, DataType) => {
  const Person = sequelize.define('persons', {
    id: {
      type: DataType.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataType.STRING,
      allowNull: false
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
    lonlat:{
      type: DataType.STRING,
      allowNull: true
    },
  });

  return Person;
};
