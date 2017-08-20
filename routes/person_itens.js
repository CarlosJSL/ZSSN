import PersonItemController from '../controllers/person_itens';
import app from '../app'

export default (app) => {
  console.log()
  const personItemController = new PersonItemController(app.datasource.models.person_itens);
   app.route('/api/:id/person.json')
      .get((req, res) => personItemController.getPersonWithItens(req,res))
      
};
