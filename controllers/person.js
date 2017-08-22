import HttpStatus from 'http-status';
import Sequelize from 'sequelize';
import path from 'path';
import config from '../config/config';
import ItemController from '../controllers/item';
import PersonItemController from '../controllers/person_itens';

class PersonController {
  constructor(Person) {
    this.Person = Person;
    this.sequelize = new Sequelize(
      config.database,
      config.username,
      config.password,
      config.params,
    );
  }

  getAll(res) {
    return this.Person.findAll({})
      .then(persons => res.status(HttpStatus.OK).send(persons))
      .catch(error => res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(error.message));
  }

  getPersonWithItens(req, res) {
    const dir = path.join(__dirname, '../models/itens');
    this.Item = this.sequelize.import(dir);

    return this.Person.findAll({ where: { id: req.params.id }, include: [{ model: this.Item }] })
      .then(person => {
        if (person.length === 0) {
          return res.status(HttpStatus.NOT_FOUND).send('Error 404: Not Found');
        }
        return res.status(HttpStatus.OK).send(person);
      })
      .catch(error => res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(error.message));
  }

  getById(req, res) {
    return this.Person.findOne({ where: { id: req.params.id } })
      .then((person) => {
        if (person == null) {
          return res.status(HttpStatus.NOT_FOUND).send('Error 404: Not Found');
        }
        return res.status(HttpStatus.OK).send(person);
      })
      .catch(error => res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(error.message));
  }

  create(req, res, app) {
    const itemController = new ItemController(app.datasource.models.items);
    const personItemController = new PersonItemController(app.datasource.models.person_itens);

    return this.Person.findOne({ where: { name: req.body.name } })
      .then((result) => {
        const Errors = this.validation(result, req.body);

        if (Object.keys(Errors).length === 0) {
          Promise.all([this.Person.create(req.body), itemController.getName(req.body.items)])
            .then((registered) => {
              personItemController.create(registered[0].dataValues.id, registered[1], req.body);
              return res.status(HttpStatus.CREATED).send(registered);
            })
            .catch(error => error.message);
        } else {
          return res.status(HttpStatus.UNPROCESSABLE_ENTITY).send(Errors);
        }
      })
      .catch(error => res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(error.message));
  }


  update(req, res) {
    const Errors = this.validationUpdate(req.body);

    if (Object.keys(Errors).length === 0) {
      return this.Person.update(req.body, { where: { id: req.params.id } })
        .then((person) => {
          if (person === 0) {
            Errors.name = 'Not Found';
            res.status(HttpStatus.NOT_FOUND).send(Errors);
          } else {
            res.status(HttpStatus.OK).send('Updated person');
          }
        })
        .catch(error => res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(error.message));
    }
    return res.status(HttpStatus.UNPROCESSABLE_ENTITY).send(Errors);
  }

  reportInfection(req, res) {
    return Promise.all([this.Person.findById(req.params.id),
      this.Person.findById(req.body.infected)])
      .then((persons) => {
        if (persons[0] != null && persons[1] != null) {
          persons[0].dataValues.registrations += 1;
          if (persons[0].dataValues.registrations > 2) persons[0].dataValues.infected = true;

          this.Person.update(persons[0].dataValues, { where: { id: req.params.id } })
            .then(() => res.status(HttpStatus.OK).send('Report succeed!'))
            .catch(error => res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(error.message));
        } else {
          res.status(HttpStatus.NOT_FOUND).send('Error 404: Person not Found');
        }
      })
      .catch(error => res.status(HttpStatus.UNPROCESSABLE_ENTITY).send(error.message));
  }

  reportInfectedPeople(req, res) {
    return Promise.all([this.Person.count(),
      this.Person.count({ where: { infected: true } })])
      .then(statistics => res.status(HttpStatus.OK).send(this.average(statistics)))
      .catch(error => res.status(HttpStatus.UNPROCESSABLE_ENTITY).send(error.message));
  }

  reportHealthyPeople(req, res) {
    return Promise.all([this.Person.count(),
      this.Person.count({ where: { infected: false } })])
      .then(statistics => res.status(HttpStatus.OK).send(this.average(statistics)))
      .catch(error => res.status(HttpStatus.UNPROCESSABLE_ENTITY).send(error.message));
  }

  reportAveragePeopleInventory(req, res, app) {
    const personItemController = new PersonItemController(app.datasource.models.person_itens);

    return Promise.all([personItemController.sum('quantity'),
      this.Person.count({ where: { infected: false } }),
      this.Person.count({ where: { infected: true } })])
      .then(statistics => res.status(HttpStatus.OK).send(this.averageAll(statistics)))
      .catch(error => res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(error.message));
  }

  reportPointsLosted(req, res) {
    const dir = path.join(__dirname, '../models/itens');
    this.Item = this.sequelize.import(dir);

    return this.Person.findAll({ where: { infected: true }, include: [{ model: this.Item }] })
      .then(persons => res.status(HttpStatus.OK).send(this.calculatePointsLosted(persons)))
      .catch(error => res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(error.message));
  }

  calculatePointsLosted(persons) {
    let sum = 0;
    this.report = {};
    for (let j = 0; j < persons.length; j += 1) {
      for (let i = 0; i < persons[j].dataValues.items.length; i += 1) {
        sum = persons[j].dataValues.items[i].dataValues.points + sum;
      }
    }

    this.report.description = 'Total points lost in items that belong to infected people';
    this.report.totalPoints = sum;

    return this.report;
  }

  validation(nameOfUser, data) {
    this.Errors = {};
    
    if (isNaN(data.age)) {
      this.Errors.age = 'is not a number';
    }

    if (data.gender.length > 1 && (data.gender !== 'F' || data.gender !== 'M')) {
      this.Errors.gender = 'is not a gender';
    }

    if (nameOfUser !== null) {
      this.Errors.name = 'already exists';
    }

    return this.Errors;
  }

  validationUpdate(data) {
    this.Errors = {};

    if (isNaN(data.age)) {
      this.Errors.age = 'is not a number';
    }

    if (data.gender.length > 1 && (data.gender !== 'F' || data.gender !== 'M')) {
      this.Errors.gender = 'is not a gender';
    }

    return this.Errors;
  }

  average(statistics) {
    this.report = {};
    this.report.average = statistics[1] / statistics[0];

    return this.report;
  }

  averageAll(statistics) {
    this.report = {};
    this.report['average items quantity of person'] = statistics[0] / statistics[2];
    this.report['average items quantity of healthy person'] = statistics[0] / statistics[1];

    return this.report;
  }
}

export default PersonController;
