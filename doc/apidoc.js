/**
 * @apiDefine PersonError
 *
 * @apiError PersonError Someone field in the body is not correct.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 422 Unprocessable Entity
 *     [{
 *       "error": "Errors"
 *     }]
 */

/**
 * @apiDefine PersonErrorNotFound
 *
 * @apiError PersonErrorNotFound The Person not exists.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     [{
 *       "error": "Person not exists"
 *     }]
 */

/**
 * @api {get} /api/person An array of all persons in the game
 * @apiName GetPerson
 * @apiGroup Person
 *
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     Array of items
 *
 *
 */
/**
 * @api {get} /api/person/{id} Fetch a single person
 * @apiName GetPersonById
 * @apiGroup Person
 *
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "name": "John",
 *       "age": "Doe",
 *       "gender": "M",
 *       "lo" : 0,
 *       "lat" : 0,
 *       "registrations": 2, 
 *       "infected": false	 
 *     }
 *
 *
 */
/**
 * @api {get} /api/{id}/person Fetch a single person with our items
 * @apiName GetPersonWithOurItems
 * @apiGroup Person
 *
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "name": "John",
 *       "age": "Doe",
 *       "gender": "M",
 *       "lo" : 0,
 *       "lat" : 0,
 *       "registrations": 5, 
 *       "infected": false,
 *       "items": [{name:"Water",quantity: 5}]   
 *     }
 *
 * @apiUse PersonErrorNotFound
 *
 */
/**
 * @api {get} /api/report/person/infected Average of infected people 
 * @apiName GetPersonsInfected
 * @apiGroup Report
 *
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *			"description" : "Average of infected people",
 *			"average":0.5
 *     }
 *
 *
 */
/**
 * @api {get} /api/report/person/healthy_people Average of healthy people 
 * @apiName GetPersonsHealthy
 * @apiGroup Report
 *
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *			"description" : "Average of healthy people",
 *			"average":0.5
 *     }
 *
 *
 */
/**
 * @api {get} /api/report/average_person_inventory Average of items by persons 
 * @apiName GetPersonsInventory
 * @apiGroup Report
 *
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *			"description" : "Average of items by persons",
 *			"average":0.5
 *     }
 *
 *
 */
/**
 * @api {get} /api/report/infected_points Total points lost in items that belong to infected people
 * @apiName GetPoinstLost
 * @apiGroup Report
 *
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *			"description" : "Total points lost",
 *			"points": 10
 *     }
 *
 *
 */
/**
 * @api {post} /api/person Create a new person in the game
 * @apiName postPerson
 * @apiGroup Person
 *
 * @apiParam {String} [name] 	  Name of the person.
 * @apiParam {String} [age]       Age of the person.
 * @apiParam {String} [gender]    Gender of the person.
 * @apiParam {Number} [lon]       The longitude of the person.
 * @apiParam {Number} [lat]  	  The latitude of the person.
 * @apiParam {Object[]} [items]   Array containing items.
 *
 *
 * @apiSuccessExample Body expected
 *     HTTP/1.1 200 OK
 *     {
 *       "name": "John",
 *       "age": "Doe",
 *       "gender": "M",
 *       "lon" : 124412,
 *       "lat" : 124412,
 *       "items": [{"name":"Water","quantity": 5}]   
 *     }
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 201	  Created
 *     {
 *       "name": "John",
 *       "age": "Doe",
 *       "gender": "M",
 *       "lon" : 124412,
 *       "lat" : 124412,
 *       "items": [{
 *			name:"Water",
 *          quantity: 5
 *		 }]   
 *     }
 *
 * @apiUse PersonError
 *
 */
/**
 * @api {post} /api/person/{id}/report Register if someone suspects someone else is infected
 * @apiName reportInfection
 * @apiGroup Person
 *
 * @apiParam {Number} infected          Person id making the registration.	  
 * @apiParam {Number} id          		Person id with the infection suspect
 * 
 * @apiSuccessExample Body Expected:
 *     {
 *       "infected": 123   
 *     }
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 Ok
 *
 * @apiUse PersonError
 * @apiUse PersonErrorNotFound
 *
 *
 */
 /**
 * @api {patch} /api/person/{id} Update a person in the game
 * @apiName updatePerson
 * @apiGroup Person
 *
 * @apiParam {String} [name] 	  Name of the person.
 * @apiParam {String} [age]       Age of the person.
 * @apiParam {String} [gender]    Gender of the person.
 * @apiParam {Number} [lon]       The longitude of the person.
 * @apiParam {Number} [lat]  	  The latitude of the person.
 *
 *
 * @apiSuccessExample Body expected
 *     HTTP/1.1 200 OK
 *     {
 *       "name": "John",
 *       "age": "Doe",
 *       "gender": "M",
 *       "lo" : 123312,
 *       "lat" : 123312,
 *     }
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 201 Created
 *
 * @apiUse PersonErrorNotFound
 * @apiUse PersonError
 *
 */
