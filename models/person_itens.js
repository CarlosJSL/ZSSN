export default(sequelize, DataType) => {
  const PersonItens = sequelize.define('person_itens', {
    id: {
      type: DataType.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    person_id: {
      type: DataType.INTEGER,
      allowNull: false
    },
    item_id: {
      type: DataType.INTEGER,
      allowNull: false
    },
  });

  return PersonItens;
};
