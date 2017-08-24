<p align="center">
  <img src="https://s3.amazonaws.com/media-p.slid.es/uploads/304939/images/1527074/cb_16750ae96783c8b6ba983ead7118a873.png" width="800" height="300"/>
</p>

# ZSSN (Zombie Survival Social Network) - Back-end
A REST API to store informations about the survivors. 

## Features
- [X] Register survivor 
- [X] Update survivor location
- [X] All Reports
- [X] Flag survivor as infected


## Folder structure
```sh
.
├── config
│		└── config.js
│		└── datasource.js
├── controllers
│   ├── itens.js
│   ├── person.js 
│   ├── person_itens.js 
├── models
│   ├── itens.js
│   ├── person.js 
│   ├── person_itens.js 
├── routes
│		└── person.js
├── tests
├── app.js
└── index.js
└── package.json
```


## Tech
- ES6
- NodeJS
- Express
- Sequelize
- PostgreSQL

## Api Reference
Go to  folder /doc and access the index.html file for more informations

### Survivor
|      METODO      |     ENDPOINT              |        FUNCTION                                    
|------------------|---------------------------|----------------------
| GET              | /api/person               | List all persons
| GET              | /api/person/:id           | List one person by id
| GET              | /api/:id /person/         | List one person with it's items
| POST             | /api/person               | Create a new survivor
| POST             | /api/person/:id/report    | Informs that survivor is infected
| PATCH            | /api/person/:id           | Update a survivor

### Reports
|      METODO      |     ENDPOINT                               |        FUNCTION                                    
|------------------|--------------------------------------------|--------
| GET              | /api/report/person/infected                | Informs the average of infected people
| GET              | /api/report/person/healthy_people          | Informs the average of non-infected people
| GET              | /api/report/person/average_person_inventory| Informs the average of the quantity of items per person
| GET              | /api/report/infected_points                | Informs the total points lost in items that belong to infected people


## Heroku
You can see the API on Heroku. [Heroku Demo] (https://zssn-back-end.herokuapp.com/api/person)

<p align="center">
  <img src="https://blog.phusion.nl/content/images/2016/07/Heroku.png" width="650"/>
</p>

## Database
The project needs a relational database because of the relationship rules it needs. The image below shows these relationships
<p align="center">
  <img src="doc/database.png?raw=true" width="780"/>
</p>
## Running locally


First of all you'll postgresql installed 

```sh
> sudo apt-get update
> sudo apt-get install postgresql
```

Download NodeJs
```sh
> sudo apt-get update
> sudo apt-get install nodejs
```

Clone the project
```sh
> git clone https://gitlab.com/carlosjsl95/survivorProject.git
```

Install the project dependencies
```sh
> npm i
```

Then create a database named survivor on postgres and change the options in the file config.js for your password and user

```sh
export default{
  database: 'survivor',
  username: 'postgres', <<<< here
  password: 'postgres', <<<< here
  params: {
    dialect: 'postgres',
    define: {
      underscored: true,
    },
  },
};
```

And finally run it locally

```
> npm start
```

Then access `http://localhost:7000/{endpoint_name}`;

## Tests
You can run tests with the following commands
```
> npm test-integration
> npm test-unit
```

## TODO
- [ ] Implement trade's endpoint

