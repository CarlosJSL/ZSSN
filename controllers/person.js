import HttpStatus from 'http-status';
import ItemController from '../controllers/item';
import PersonItemController from '../controllers/person_itens'
import config from '../config/config';
import Sequelize from 'sequelize';
import path from 'path';

class PersonController {
  constructor(Person) {
    this.Person = Person;
    this.sequelize = new Sequelize(
            config.database,
            config.username,
            config.pasword,
            config.params,
            );
  }

  getAll(req,res) {
    return this.Person.findAll()
                .then(result => res.status(HttpStatus.OK).send(result))
                .catch(error => res.send(error.message));
  }

  getPersonWithItens(req,res){
    const dir = path.join(__dirname, '../models/person_itens');
    this.PersonItem = this.sequelize.import(dir)

    return this.Person.findAll({where:{id:req.params.id},include:[ { model: this.PersonItem}] })
                .then(result => res.status(HttpStatus.OK).send(result))
                .catch(error => res.send(error.message)); 
  }

  getById(req,res) {

    return this.Person.findOne({ where: req.body.id })
                .then(result => {
                  
                    if (result == null){
                      res.status(HttpStatus.NOT_FOUND).send("Error 404: Not Found")
                    }
                      res.status(HttpStatus.OK).send(result)
                  })
                .catch(error => res.send(error.message));
  }

  create(req,res,app){
    const itemController = new ItemController(app.datasource.models.items);
    const personItemController = new PersonItemController(app.datasource.models.person_itens)

      return this.Person.findOne({where: {name: req.body.name} })
                .then(result =>  {
                    let Errors = this.validation(result, req.body)

                    if(Object.keys(Errors).length === 0){

                      Promise.all([this.Person.create(req.body),itemController.getName(req.body.items)])
                              .then(registered => {

                                res.status(HttpStatus.CREATED).send(registered)
                                personItemController.create(registered[0].dataValues.id, registered[1],req.body)
                              })
                             
                    }else{
                      res.status(HttpStatus.UNPROCESSABLE_ENTITY).send(Errors)
                    }
                })
                .error(error => error.message)
  }
  

  update(data, id) {
    return this.Person.update(data, { where: id })
                .then(result => defaultResponse(result))
                .catch(error => errorResponse(error.message, HttpStatus.UNPROCESSABLE_ENTITY));
  }

  registerItem(itemController, data){

      itemController.validation(data.items)
      // return itemController.create(req.body)
      //                             .then(result => {
      //                                itemController.create()
      //                             })
      //                             .catch(error => res.status(500).send("Internal Server Error"));
  }

  

  validation(nameOfUser,data){
      let Errors = {};

      if (isNaN(data.age)){
        Errors["age"] = "is not a number"
      }

      if(data.gender.length > 1 && (data.gender != "F" || data.gender != "M" ) ){
        Errors["gender"] = "is not a gender"
      }
      
      if(nameOfUser != null) {
         Errors["name"] = "already exists"
       }
      

      return Errors;
  }
}

export default PersonController;
