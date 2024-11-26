const Validator = require('express-json-validator-middleware');

const { validate } = new Validator.Validator();

const errorHandler = (error, req, res,next) => {
    if(error instanceof Validator.ValidationError) {
        // res.status(400).send(error);
        res.status(400).send({message: "Something went wrong.", error});
        next();
    }
    else {
        next(error);
    }
}

module.exports = {
    validate : validate,
    errorHandler : errorHandler
}