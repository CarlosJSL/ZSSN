import PersonController from '../controllers/person';

export default (app) => {
  
  const personController = new PersonController(app.datasource.models.persons);
  app.route('/api/person.json')

      .get((req, res) => {
        personController.getAll()
          .then(response => {
            res.status(response.statusCode);
            res.json(response.data);
          });
      })
      .post((req, res) => {
        personController.create(req.body)
          .then(response => {
            res.status(response.statusCode);
            res.json(response.data);
          });
      });

  app.route('/api/person/:id')

      .get((req, res) => {
        personController.getById(req.params)
          .then(response => {
            res.status(response.statusCode);
            res.json(response.data);
          });
      })
      .put((req, res) => {
        personController.update(req.body, req.params)
          .then(response => {
            res.status(response.statusCode);
            res.json(response.data);
          });
      })
  
};