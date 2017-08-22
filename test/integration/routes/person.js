import HttpStatus from 'http-status';

describe('Routes: Person', () => {
  const Person = app.datasource.models.persons;
  const Item = app.datasource.models.items;

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


  const Items = [{
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

  beforeEach((done) => {
    Person
      .destroy({ where: {} })
      .then(() => Person.create(defaultPerson,
      ))
      .then(() => {
        Item
          .destroy({ where: {} })
          .then(() => Item.bulkCreate(Items))
          .then(() => done());
      });
  });

  describe('Route GET /api/person', () => {
    it('should return a list of persons', (done) => {
      request
        .get('/api/person.json')
        .end((err, res) => {
          expect(res.body[0].name).to.eql(defaultPerson.name);
          expect(res.body[0].age).to.eql(defaultPerson.age);
          expect(res.body[0].gender).to.eql(defaultPerson.gender);
          expect(res.body[0].location).to.eql(defaultPerson.location);
          done(err);
        });
    });
  });

  describe('Route GET /api/person/{id}', () => {
    it('should return a person', (done) => {
      request
        .get('/api/person/1')
        .end((err, res) => {
          expect(res.body.name).to.eql(defaultPerson.name);
          expect(res.body.age).to.eql(defaultPerson.age);
          expect(res.body.gender).to.eql(defaultPerson.gender);
          expect(res.body.location).to.eql(defaultPerson.location);
          done(err);
        });
    });
  });

  describe('Route PATCH /api/person/:id', () => {
    it('should update a person', (done) => {
      const updatePerson = {
        id: 1,
        name: 'teste update',
        age: 45,
        gender: 'M',
        lonlat: '',
        infected: false,
        registrations: 0,
        created_at: '2017-08-20T02:14:48.909Z',
        updated_at: '2017-08-20T02:14:48.909Z',
      };

      request
        .patch('/api/person/1')
        .send(updatePerson)
        .end((err, res) => {
          expect(res.status).to.eql(HttpStatus.OK);
          done(err);
        });
    });
  });

  describe('Route POST /api/person/{id}/report.json', () => {
    it('should report a infected person', (done) => {
      const report = {
        infected: 1,
      };

      request
        .post('/api/person/1/report.json')
        .send(report)
        .end((err, res) => {
          expect(res.status).to.eql(HttpStatus.OK);
          done(err);
        });
    });
  });

  describe('Route GET /api/report/people/infected.json', () => {
    beforeEach((done) => {
      const personInfected = [{
        id: 2,
        name: 'teste infected',
        age: 45,
        gender: 'M',
        lonlat: '',
        infected: true,
        registrations: 3,
        created_at: '2017-08-20T02:14:48.909Z',
        updated_at: '2017-08-20T02:14:48.909Z',
      }];
      Person
        .bulkCreate(personInfected)
        .then(() => done());
    });


    it('should return a average of infected persons', (done) => {
      request
        .get('/api/report/people/infected.json')
        .end((err, res) => {
          expect(res.body.average).to.eql(0.5);
          done(err);
        });
    });
  });
});
