import Sequelize from 'sequelize';
import fs from 'fs';
import path from 'path';

let database = null;

const loadModels = (sequelize) => {
  const dir = path.join(__dirname, '../models');
  const models = [];
  fs.readdirSync(dir).forEach((file) => {
    const modelDir = path.join(dir, file);

    const model = sequelize.import(modelDir);
    models[model.name] = model;
  });

  return models;
};

export default (app) => {
  if (!database) {
    const config = app.config;
    const sequelize = new Sequelize(
      config.database,
      config.username,
      config.password,
      config.params,
    );
    database = {
      sequelize,
      Sequelize,
      models: {},
    };

    database.models = loadModels(sequelize);

    database.models.persons.belongsToMany(database.models.items,
      { through: database.models.person_itens });
    database.models.items.belongsToMany(database.models.persons,
      { through: database.models.person_itens });


    sequelize.sync().done(() => {
      database.models.items.destroy({ where: {} });
      database.models.items.create({ id: 1, name: 'Water', points: 4 });
      database.models.items.create({ id: 2, name: 'Food', points: 3 });
      database.models.items.create({ id: 3, name: 'Medication', points: 2 });
      database.models.items.create({ id: 4, name: 'Ammunition', points: 1 });

      // database.models.persons.destroy({ where: {} });
      // database.models.person_itens.destroy({ where: {} });
      return database;
    },
    );
  }
  return database;
};
