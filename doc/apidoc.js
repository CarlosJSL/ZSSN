/**
 * @apiDefine PersonError
 *
 * @apiError PersonError Some field in the body is incorrect.
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
 * @apiError PersonErrorNotFound The person was not found.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     [{
 *       "error": "Person not found"
 *     }]
 */

/**
 * @api {get} /api/person An array of all registered persons 
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
 *       "lon" : 0,
 *       "lat" : 0,
 *       "registrations": 2, 
 *       "infected": false	 
 *     }
 *
 *
 */
/**
 * @api {get} /api/{id}/person Fetch a single person with it's items
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
 *       "lon" : 0,
 *       "lat" : 0,
 *       "registrations": 5, 
 *       "infected": true,
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
 * @api {post} /api/person Create a new person 
 * @apiName postPerson
 * @apiGroup Person
 *
 * @apiParam {String} [name] 	  Person's name.
 * @apiParam {String} [age]       Person's age.
 * @apiParam {String} [gender]    Person's gender.
 * @apiParam {Number} [lon]       Person localization's longitude.
 * @apiParam {Number} [lat]  	  Person localization's latitude.
 * @apiParam {Object[]} [items]   Array containing person's items.
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
 * @apiParam {Number} infected          Person's id making the registration.	  
 * @apiParam {Number} id          		Person's id with the infection suspect
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
 * @api {patch} /api/person/{id} Update a person 
 * @apiName updatePerson
 * @apiGroup Person
 *
 * @apiParam {String} [name] 	  Person's name.
 * @apiParam {String} [age]       Person's age .
 * @apiParam {String} [gender]    Person's gender .
 * @apiParam {Number} [lon]       Person localization's longitude.
 * @apiParam {Number} [lat]  	  Person localization's latitude
 *
 *
 * @apiSuccessExample Body expected
 *     HTTP/1.1 200 OK
 *     {
 *       "name": "John",
 *       "age": "Doe",
 *       "gender": "M",
 *       "lon" : 123312,
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
