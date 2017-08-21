import HttpStatus from 'http-status';

describe('Routes: Person', () => {
  const Person = app.datasource.models.persons;
  const Item = app.datasource.models.items

  const defaultPerson = {
    id: 1,
    name: 'teste',
    age: 23,
    gender: 'M',
    lonlat: '',
    infected: false,
    registrations: 0,
    created_at: '2017-08-20T02:14:48.909Z',
    updated_at: '2017-08-20T02:14:48.909Z',
  };
const teste = [ [{ }]]

  
   const  Items = [{
    id: 1,
    name: 'Water',
    points: 4,
    created_at: '2017-08-20T02:14:48.909Z',
    updated_at: '2017-08-20T02:14:48.909Z',
  },
  {
    id: 2,
    name: 'Food',
    points: 3,
    created_at: '2017-08-20T02:14:48.909Z',
    updated_at: '2017-08-20T02:14:48.909Z',
  },
  {
    id: 3,
    name: 'Medication',
    points: 2,
    created_at: '2017-08-20T02:14:48.909Z',
    updated_at: '2017-08-20T02:14:48.909Z',
  },
  {
    id: 4,
    name: 'Ammunition',
    points: 1,
    created_at: '2017-08-20T02:14:48.909Z',
    updated_at: '2017-08-20T02:14:48.909Z',
  }];

  beforeEach(done => {
    Person
    .destroy({ where: {} })
    .then(() => Person.create(defaultPerson
    ))
    .then(person => {

      Item
      .destroy({ where: {} })
      .then(() => Item.bulkCreate(Items))
      .then(() => done());
    });
  });

  describe('GET /api/person', () => {
    it('should return a list of persons', done => {
      request
      .get('/api/person.json')
      .end((err, res) => {
        console.log(res.body)
        expect(res.body[0].name).to.eql(defaultPerson.name);
        expect(res.body[0].age).to.eql(defaultPerson.age);
        expect(res.body[0].gender).to.eql(defaultPerson.gender);
        expect(res.body[0].location).to.eql(defaultPerson.location);
        done(err);
      });
    });
  });
})