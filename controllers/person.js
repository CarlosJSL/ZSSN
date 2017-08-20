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

    return this.Person.findAll({where:{id:req.params.id},
                               include:[ { model: this.PersonItem}] })
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
  

  update(req, res) {
    let Errors = this.validationUpdate(req.body)

    if(Object.keys(Errors).length === 0){
         return this.Person.update(req.body, { where: { id: req.params.id  } })
                .then(result => {
                    if(result == 0){
                      Errors["name"] = "Not Found"
                      return res.status(HttpStatus.NOT_FOUND).send(Errors)
                    }

                    return res.status(200).send("Updated person")  
                })
                .catch(error => error.message);                    
      }else{
        res.status(HttpStatus.UNPROCESSABLE_ENTITY).send(Errors)
      }
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

  validationUpdate(data){
      let Errors = {};

      if (isNaN(data.age)){
        Errors["age"] = "is not a number"
      }

      if(data.gender.length > 1 && (data.gender != "F" || data.gender != "M" ) ){
        Errors["gender"] = "is not a gender"
      }

      return Errors;
  }

  reportInfection(req,res){
    let reg = {registrations:1}
      return Promise.all([this.Person.findById(req.params.id),
                          this.Person.findById(req.body.infected)])
                    .then(persons => {
                          if(this.existPerson(persons)){
                            persons[0].dataValues.registrations++

                            if(persons[0].dataValues.registrations > 2 ) persons[0].dataValues.infected = true

                            this.Person.update(persons[0].dataValues,{ where: { id: req.params.id  } })
                                        .then(result => res.status(200).send("Report succeed!"))
                                        .error(error => erro.message)
                          }else{
                            res.status(HttpStatus.NOT_FOUND).send("Error 404: Person not Found")
                          }
                    })
  }

  existPerson(persons){
    if(persons[0] != null && persons[1] != null)  {
      return true
    }
    return false
  }
}

export default PersonController;
