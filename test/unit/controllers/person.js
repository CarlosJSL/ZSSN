import PersonController from '../../../controllers/person';

describe('Controllers: Person', () => {
  describe('Get all persons: getAll()', () => {
    it('should return a list of persons', () => {
      const Person = {
        findAll: td.function(),
      };

      const expectedResponse = [{
        id: 3,
        name: 'teste',
        age: 23,
        gender: 'M',
        lonlat: '',
        infected: false,
        registrations: 0,
        created_at: '2017-08-20T02:14:48.909Z',
        updated_at: '2017-08-20T02:14:48.909Z',
      }];

      const res = {
        data: null,
        statusCode: null,
        status(status) {
          this.statusCode = status;
          return this;
        },
        statusCodend(data) {
          this.data = data;
          return this;
        },
      };

      td.when(Person.findAll({})).thenResolve(expectedResponse);

      const personController = new PersonController(Person);

      return personController.getAll(res)
        .then((response) => {
          expect(response.statusCode).to.be.eql(200);
          expect(response.data).to.be.eql(expectedResponse);
        });
    });
  });

  describe('Get one person by id: getById()', () => {
    it('should return a person ', () => {
      const Person = {
        findOne: td.function(),
      };

      const expectedResponse = [{
        id: 5,
        name: 'teste',
        age: 23,
        gender: 'M',
        lonlat: '',
        infected: false,
        registrations: 0,
        created_at: '2017-08-20T02:14:48.909Z',
        updated_at: '2017-08-20T02:14:48.909Z',
      }];

      const req = {
        params: { id: 5 },
      };

      const res = {
        data: null,
        statusCode: null,
        status(status) {
          this.statusCode = status;
          return this;
        },
        send(data) {
          this.data = data;
          return this;
        },
      };

      td.when(Person.findOne({ where: { id: 5 } })).thenResolve(expectedResponse);

      const personController = new PersonController(Person);

      return personController.getById(req, res)
        .then((response) => {
          expect(response.statusCode).to.be.eql(200);
          expect(response.data).to.be.eql(expectedResponse);
        });
    });
  });
});
