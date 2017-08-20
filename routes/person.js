import PersonController from '../controllers/person';
import app from '../app'

export default (app) => {
  
  const personController = new PersonController(app.datasource.models.persons);
  app.route('/api/person.json')
      .get((req, res) => personController.getAll(req,res))
      .post((req, res) => personController.create(req,res,app));

  app.route('/api/:id/person.json')
      .get((req, res) => personController.getPersonWithItens(req,res))

  app.route('/api/person/:id')
      .get((req, res) => personController.getById(req,res))
      .patch((req, res) => personController.update(req,res))
  
  app.route('/api/person/:id/report')
      .post((req, res) => personController.reportInfection(req,res)); 
};
