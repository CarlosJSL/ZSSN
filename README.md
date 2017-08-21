# ZSSN (Zombie Survival Social Network) - Back-end
A REST API to store information about the survivors. 

## Features
- Add survivor
- Update survivor location (UX improvement needed)
- Report infected survivor
- Reports

## Features missing
- Trade

## Folder structure
```sh
.
├── config
│	└── config.js
│	└── datasource.js
├── controllers
│   └── item.js
│	└── person.js
│	└── person_itens.js
├── models
│   ├── itens.js
│   ├── person.js 
│   ├── person_itens.js 
├── routes
│	└── person.js
├── test
│   ├── unit
│ 	│	└── controllers
│	│		└── person.js
│   ├── integration
├── .babel.rc
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
In the folder documentation

## Database
The project needs a relational database because of the relationship rules it needs. The image below shows these relationships


## Running locally
First of all you'll postgresql installed 

```sh
> sudo apt-get update
> sudo apt-get install postgresql
```
Create a database named survivor in the postgres and change the options in the file config.js for our password and user

Then install the project dependencies

```sh
> npm i
```

And finally run it locally

```
> npm start
```

Then access `http://localhost:7000/{api_name}`;

## Tests
```
> npm test-unit
> npm test-integration
```

## TODO
- [ ] Improve handlers errors
- [ ] Implement trade's api

