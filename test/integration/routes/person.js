import HttpStatus from 'http-status';

describe('Routes: Person', () => {
  const Person = app.datasource.models.persons;
  const Item = app.datasource.models.items;
  const PersonItem = app.datasource.models.person_itens;

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
      .then(() => Person.create(defaultPerson))
      .then(() => Item.destroy({ where: {} }))
      .then(() => Item.bulkCreate(Items))
      .then(() => PersonItem.destroy({ where: {} }))
      .then(() => done());
  });

  describe('Route GET /api/person', () => {
    it('should return a list of persons', (done) => {
      request
        .get('/api/person')
        .end((err, res) => {
          expect(res.body[0].name).to.eql(defaultPerson.name);
          expect(res.body[0].age).to.eql(defaultPerson.age);
          expect(res.body[0].gender).to.eql(defaultPerson.gender);
          expect(res.body[0].location).to.eql(defaultPerson.location);
          expect(res.status).to.eql(HttpStatus.OK)
          done(err);
        });
    });
  });

  describe('Route POST /api/person', () => {
    const personCreate = {
      id: 3,
      name: 'teste create',
      age: 15,
      gender: 'M',
      lonlat: '',
      items: [{
        name: 'Water',
        quantity: 4,
      }, {
        name: 'Food',
        quantity: 3,
      }],
      created_at: '2017-08-20T02:14:48.909Z',
      updated_at: '2017-08-20T02:14:48.909Z',
    };


    it('should create a person', (done) => {
      request
        .post('/api/person')
        .send(personCreate)
        .end((err, res) => {
          expect(res.body[0].name).to.eql(personCreate.name);
          expect(res.body[0].age).to.eql(personCreate.age);
          expect(res.body[0].gender).to.eql(personCreate.gender);
          expect(res.body[0].location).to.eql(personCreate.location);
          expect(res.body[1][0].name).to.eql(personCreate.items[0].name);
          expect(res.body[1][0].quantity).to.eql(personCreate.items[0].points);
          expect(res.body[1][1].name).to.eql(personCreate.items[1].name);
          expect(res.body[1][1].quantity).to.eql(personCreate.items[1].points);
          expect(res.status).to.eql(HttpStatus.CREATED)
          done(err);
        });
    });
  });

  describe('Route GET /api/:id/person', () => {
    const person = {
      id: 11,
      name: 'teste',
      age: 23,
      gender: 'M',
      lonlat: '',
      infected: false,
      registrations: 0,
      created_at: '2017-08-20T02:14:48.909Z',
      updated_at: '2017-08-20T02:14:48.909Z',
    };

    const associativeTable = {
      person_id: 11,
      item_id: 1,
      quantity: 5,
      created_at: '2017-08-20T02:14:48.909Z',
      updated_at: '2017-08-20T02:14:48.909Z',
    };
    const items = { id: 1,
      name: 'Water',
      points: 4,
      created_at: '2017-08-20T02:14:48.909Z',
      updated_at: '2017-08-20T02:14:48.909Z',
    };
    beforeEach((done) => {
      Person
        .create(person)
        .then(() => {
          PersonItem.create(associativeTable)
            .then(() => done());
        });
    });

    it('should return a person with our items', (done) => {
      request
        .get('/api/11/person')
        .end((err, res) => {
          person.items = [items];

          expect(res.body[0].id).to.eql(person.id);
          expect(res.body[0].name).to.eql(person.name);
          expect(res.body[0].age).to.eql(person.age);
          expect(res.body[0].gender).to.eql(person.gender);
          expect(res.body[0].location).to.eql(person.location);
          expect(res.body[0].items[0].name).to.eql(person.items[0].name);
          expect(res.body[0].items[0].points).to.eql(person.items[0].points);

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

  describe('Route POST /api/person/{id}/report', () => {
    it('should report a infected person', (done) => {
      const report = {
        infected: 1,
      };

      request
        .post('/api/person/1/report')
        .send(report)
        .end((err, res) => {
          expect(res.status).to.eql(HttpStatus.OK);
          done(err);
        });
    });
  });

  describe('Route GET /api/report/people/infected', () => {
    beforeEach((done) => {
      const infectedPerson = [{
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
        .bulkCreate(infectedPerson)
        .then(() => done());
    });

    it('should return a average of infected persons', (done) => {
      request
        .get('/api/report/people/infected')
        .end((err, res) => {
          expect(res.body.average).to.eql(0.5);
          expect(res.status).to.eql(HttpStatus.OK)
          done(err);
        });
    });
  });

  describe('Route GET /api/report/people/healthy_people', () => {
    beforeEach((done) => {
      const infectedPerson = [{
        id: 2,
        name: 'teste healthy',
        age: 45,
        gender: 'M',
        lonlat: '',
        infected: true,
        registrations: 3,
        created_at: '2017-08-20T02:14:48.909Z',
        updated_at: '2017-08-20T02:14:48.909Z',
      }];
      Person
        .bulkCreate(infectedPerson)
        .then(() => done());
    });

    it('should return a average of healthy persons', (done) => {
      request
        .get('/api/report/people/healthy_people')
        .end((err, res) => {
          expect(res.body.average).to.eql(0.5);
          expect(res.status).to.eql(HttpStatus.OK)
          done(err);
        });
    });
  });

  describe('Route GET /api/report/infected_points', () => {
    const person = {
      id: 12,
      name: 'teste',
      age: 23,
      gender: 'M',
      lonlat: '',
      infected: true,
      registrations: 3,
      created_at: '2017-08-20T02:14:48.909Z',
      updated_at: '2017-08-20T02:14:48.909Z',
    };

    const associativeTable = {
      person_id: 12,
      item_id: 1,
      quantity: 5,
      created_at: '2017-08-20T02:14:48.909Z',
      updated_at: '2017-08-20T02:14:48.909Z',
    };

    beforeEach((done) => {
      Person
        .create(person)
        .then(() => PersonItem.create(associativeTable))
        .then(() => done());
    });

    it('should return a average of points losted', (done) => {
      request
        .get('/api/report/infected_points')
        .end((err, res) => {
          expect(res.body.description).to.eql('Total points lost in items that belong to infected people');
          expect(res.body.totalPoints).to.eql(4);
          expect(res.status).to.eql(HttpStatus.OK)
          done(err);
        });
    });
  });

  describe('Route GET /api/report/average_people_inventory', () => {
    const person = {
      id: 12,
      name: 'teste',
      age: 23,
      gender: 'M',
      lonlat: '',
      infected: true,
      registrations: 3,
      created_at: '2017-08-20T02:14:48.909Z',
      updated_at: '2017-08-20T02:14:48.909Z',
    };

    const associativeTable = {
      person_id: 12,
      item_id: 1,
      quantity: 5,
      created_at: '2017-08-20T02:14:48.909Z',
      updated_at: '2017-08-20T02:14:48.909Z',
    };

    beforeEach((done) => {
      Person
        .create(person)
        .then(() => PersonItem.create(associativeTable))
        .then(() => done());
    });

    it('should return a average of items per person', (done) => {
      request
        .get('/api/report/average_people_inventory')
        .end((err, res) => {
          expect(res.body['average items quantity of person']).to.eql(5)
          expect(res.body['average items quantity of healthy person']).to.eql(5)
          expect(res.status).to.eql(HttpStatus.OK)
          done(err);
        });
    });
  });
});
