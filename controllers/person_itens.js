import HttpStatus from 'http-status';
import path from 'path';
import config from '../config/config';
import Sequelize from 'sequelize';

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

  create(idOfPerson,Items,person) {
   
       return this.PersonItem.bulkCreate(this.ConstructTheDataObjectForTable(idOfPerson,Items,person))
                  .then(result => result )
                  .catch(error => res.status(500).send(error.message));
  }
  sum(field){
      return this.PersonItem.sum(field)
                  .then(result => result )
                  .catch(error => res.status(500).send(error.message))  
  }

  ConstructTheDataObjectForTable(idOfPerson,Items,person){
     let registerPersonItem = [];

    for(let j = 0; j < person.items.length; j++){
        for (let i = 0; i < Items.length; i++) {
          if ( person.items[i].name === Items[j].dataValues.name){
            
            let personItemWillBeRegistered = new this.PersonItemWillBeRegistered();
           
            personItemWillBeRegistered['person_id'] = idOfPerson;
            personItemWillBeRegistered['item_id'] = Items[j].dataValues.id;
            personItemWillBeRegistered['quantity'] = person.items[i].quantity ;
            registerPersonItem.push(personItemWillBeRegistered);
          }
        }
        
    }
    return registerPersonItem;
  }

}

export default PersonItemController;
