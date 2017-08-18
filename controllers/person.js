import HttpStatus from 'http-status';

const defaultResponse = (data, statusCode = HttpStatus.OK) => ({
  data,
  statusCode,
});

const errorResponse = (message, statusCode = HttpStatus.BAD_REQUEST) => defaultResponse({
  error: message,
}, statusCode);

class PersonController {
  constructor(Person) {
    this.Person = Person;
  }

  getAll() {
    return this.Person.findAll({})
                .then(result => defaultResponse(result, HttpStatus.OK))
                .catch(error => errorResponse(error.message));
  }

  getById(id) {
    return this.Person.findOne({ where: id })
                .then(result => {
                    if (result != null){
                      return defaultResponse(result)
                    }else{
                      return defaultResponse("Error 404: Not Found", HttpStatus.NOT_FOUND)
                    }
                  })
                .catch(error => errorResponse(error.message));
  }

  create(data) {
    return this.Person.create(data)
                .then(result => defaultResponse(result, HttpStatus.CREATED))
                .catch(error => errorResponse(error.message, HttpStatus.UNPROCESSABLE_ENTITY));
  }

  update(data, id) {
    return this.Person.update(data, { where: id })
                .then(result => defaultResponse(result))
                .catch(error => errorResponse(error.message, HttpStatus.UNPROCESSABLE_ENTITY));
  }

}

export default PersonController;
