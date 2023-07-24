const boom = require('@hapi/boom');

function validatorHandler(schema, property) {
  // Se crea el middleware de forma dinamica
  return (req, res, next) => {
    // se optiene la data del req en la llave property(params, query, body)
    const data = req[property];
    const { error } = schema.validate(data, { abortEarly: false });
    if (error) {
      // Si existe el error se manda al handler de error
      next(boom.badRequest(error));
    }
    next();
  };
}

module.exports = validatorHandler;
