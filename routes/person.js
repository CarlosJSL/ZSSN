import PersonController from '../controllers/person';


export default (app) => {
  const personController = new PersonController(app.datasource.models.persons);
  app.route('/api/person')
    .get((req, res) => personController.getAll(res))
    .post((req, res) => personController.create(req, res, app));

  app.route('/api/:id/person')
    .get((req, res) => personController.getPersonWithItens(req, res));

  app.route('/api/person/:id')
    .get((req, res) => personController.getById(req, res))
    .patch((req, res) => personController.update(req, res));

  app.route('/api/person/:id/report')
    .post((req, res) => personController.reportInfection(req, res));

  app.route('/api/report/people/infected')
    .get((req, res) => personController.reportInfectedPeople(req, res));

  app.route('/api/report/people/healthy_people')
    .get((req, res) => personController.reportHealthyPeople(req, res));

  app.route('/api/report/average_people_inventory')
    .get((req, res) => personController.reportAveragePeopleInventory(req, res, app));

  app.route('/api/report/infected_points')
    .get((req, res) => personController.reportPointsLosted(req, res));
};
