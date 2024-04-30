const statusCodes = require("../constants/statusCodes");


/**
 * Handle custom errors
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @returns
*/
const queryValidatorMiddleware = (req, res, next) => {
    const query = req.query;
    const queryParams = Object.keys(query);
    const queryParamsValues = Object.values(query)
    const validParams = ["meal", "drink", "dessert"];
  
    if (queryParams.length > 2 || queryParams.length === 0) {
      const err = new Error("Invalid number of query parameters. Must be between 1 and 2.");
      err.status = statusCodes.BAD_REQUEST;
      return next(err);
    }

    if (queryParamsValues.some(value => typeof value !== 'string' || !/^[a-zA-Z\s]+$/.test(value))) {
      const err = new Error("Invalid query parameters. Values must contain only letters.");
      err.status = statusCodes.BAD_REQUEST;
      return next(err);
    }
    
    for (const param of queryParams) {
      if (!validParams.includes(param)) {
        const err = new Error(`Invalid query parameter value '${param}'. Must be one of: meal, drink, dessert.`);
        err.status = statusCodes.BAD_REQUEST;
        return next(err);
      }
    }
    
    next();
  };

  module.exports = {
    queryValidatorMiddleware,
  };