<p align="center">
  <img src="https://s3.amazonaws.com/media-p.slid.es/uploads/304939/images/1527074/cb_16750ae96783c8b6ba983ead7118a873.png" width="1300" height="400"/>
</p>

# ZSSN (Zombie Survival Social Network) - Back-end
A REST API to store informations about the survivors. 

## Features
- [X] Add survivor
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
Go to the folder /doc and access the index.html file

## Heroku
You can see the API on Heroku. [Heroku Demo] (https://zssn-back-end.herokuapp.com/api/person)

<p align="center">
  <img src="https://blog.phusion.nl/content/images/2016/07/Heroku.png" width="650"/>
</p>

## Database
The project needs a relational database because of the relationship rules it needs. The image below shows these relationships
<p align="center">
  <img src="doc/database.png?raw=true" width="950"/>
</p>
## Running locally
First of all you'll postgresql installed 

```sh
> sudo apt-get update
> sudo apt-get install postgresql
```

Downlad NodeJs
```sh
> sudo apt-get update
> sudo apt-get install nodejs
```

Install the project dependencies
```sh
> npm i
```

Then create a database named survivor in the postgres and change the options in the file config.js for your password and user

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
- [ ] Implement trade's api

