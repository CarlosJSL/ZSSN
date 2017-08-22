import PersonController from '../controllers/person';


export default (app) => {
  const personController = new PersonController(app.datasource.models.persons);
  app.route('/api/person.json')
    .get((req, res) => personController.getAll(res))// do
    .post((req, res) => personController.create(req, res, app));

  app.route('/api/:id/person.json')
    .get((req, res) => personController.getPersonWithItens(req, res));// later

  app.route('/api/person/:id')
    .get((req, res) => personController.getById(req, res))// do
    .patch((req, res) => personController.update(req, res));// do

  app.route('/api/person/:id/report.json')
    .post((req, res) => personController.reportInfection(req, res));// do

  app.route('/api/report/people/infected.json')
    .get((req, res) => personController.reportInfectedPeople(req, res));// do

  app.route('/api/report/people/healthy_people.json')
    .get((req, res) => personController.reportHealthyPeople(req, res));// do

  app.route('/api/report/average_people_inventory.json')
    .get((req, res) => personController.reportAveragePeopleInventory(req, res, app));// later

  app.route('/api/report/infected_points.json')
    .get((req, res) => personController.reportPointsLosted(req, res));// later
};
