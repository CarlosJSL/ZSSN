import PersonController from '../../../controllers/person';

describe('Controllers: Person', () => {
  describe('Get all persons: getAll()', () => {
    it('should return a list of persons', () => {
     	const Person = {
        findAll: td.function(),
      	};	

      	const expectedResponse = [{
        id: 1,
        name: 'Test Person',
        created_at: '2017-05-05T23:55:36.69zz',
        updated_at: '2017-05-05T23:55:36.69zz',
      	}];	

      const req ={}

      const res = {
      	data:null,
      	statusCode:null,
      	status : function(status)  { 
      		this.statusCode = status
      		return this
      	},
      	send:function(data){
      		this.data = data
      		return this
      	}
      }  
      
      td.when(Person.findAll({})).thenResolve(expectedResponse);
      
      
      const personController = new PersonController(Person);

      return personController.getAll(req,res)
                .then(response => {
                	
                  expect(response.statusCode).to.be.eql(200);
                  expect(response.data).to.be.eql(expectedResponse);
                });
    });
  });
})