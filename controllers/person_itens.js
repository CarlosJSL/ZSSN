import Sequelize from 'sequelize';
import config from '../config/config';

class PersonItemController {
  constructor(PersonItem) {
    this.PersonItem = PersonItem;
    this.PersonItemWillBeRegistered = () => {};
    this.sequelize = new Sequelize(
      config.database,
      config.username,
      config.password,
      config.params,
    );
  }

  create(idOfPerson, Items, person) {
    return this.PersonItem.bulkCreate(this.ConstructTheData(idOfPerson, Items, person))
      .then(result => result)
      .catch(error => error.message);
  }
  sum(field) {
    return this.PersonItem.sum(field)
      .then(result => result)
      .catch(error => error.message);
  }

  ConstructTheData(idOfPerson, Items, person) {
    const registerPersonItem = [];

    for (let j = 0; j < person.items.length; j += 1) {
      for (let i = 0; i < Items.length; i += 1) {
        if (person.items[i].name === Items[j].dataValues.name) {
          const personItemWillBeRegistered = new this.PersonItemWillBeRegistered();

          personItemWillBeRegistered.person_id = idOfPerson;
          personItemWillBeRegistered.item_id = Items[j].dataValues.id;
          personItemWillBeRegistered.quantity = person.items[i].quantity;
          registerPersonItem.push(personItemWillBeRegistered);
        }
      }
    }
    return registerPersonItem;
  }
}

export default PersonItemController;
