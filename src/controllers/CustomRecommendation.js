const data = require("../models/meals.json");
const statusCodes = require("../constants/statusCodes");
const helpers = require("../helpers/RecommendationHelpers")
const publishHelper = require("../helpers/PublishPubSubConfig")
const recieveHelper = require("../helpers/RecievePubSubConfig")

/**
 * Handle custom recommendation request
 * @param {*} req
 * @param {*} res
 * @returns
 */
const getRecommendation = (req, res, next) => {
  recieveHelper.listenForMessages('recommendation-backend-sub');
 /*


  // Define a function to handle the received message
  function handleMessage(message) {
      const query = JSON.parse(message);

      const queryLength = Object.keys(query).length;
      const firstParameter = Object.keys(query)[0];
      const secondParameter = Object.keys(query)[1];
      const firstParameterValue = Object.values(query)[0];
      const secondParameterValue = Object.values(query)[1];

      var response = {};

    if (queryLength === 2) {

      const isParameterContained = (data[firstParameter].some(item => item.name === firstParameterValue)) || (data[secondParameter].some(item => item.name === secondParameterValue));

      if (!isParameterContained) {
        return notFoundError(next);
      }

      else {

        const firstParameterIndex = data[firstParameter].findIndex(item => item.name === firstParameterValue);
        const secondParameterIndex = data[secondParameter].findIndex(item => item.name === secondParameterValue);

        if (firstParameterIndex === secondParameterIndex) {
        
          const missingParameter = helpers.getOneMissingParameter(firstParameter, secondParameter);
          const missingParameterValue = data[missingParameter][firstParameterIndex].name
          response = helpers.writeResponse(response, firstParameter, secondParameter, missingParameter, firstParameterValue, secondParameterValue, missingParameterValue)
        }
        else {
          return notFoundError(next);
        }
      }

    }
    else {

      const isParameterContained = data[firstParameter].some(item => item.name === firstParameterValue)

      if (!isParameterContained) {
        return notFoundError(next);
      }
      else {

        const firstParameterIndex = data[firstParameter].findIndex(item => item.name === firstParameterValue);
        const missingParameters = helpers.getTwoMissingParameter(firstParameter);
        const missingParameterValue1 = data[missingParameters[0]][firstParameterIndex].name
        const missingParameterValue2 = data[missingParameters[1]][firstParameterIndex].name
        response = helpers.writeResponse(response, firstParameter, missingParameters[0], missingParameters[1], firstParameterValue, missingParameterValue1, missingParameterValue2)
      
      }
    }
    
    // Publish message to Pub/Sub
    publishHelper.publishMessage('recommendation-service', JSON.stringify(response))
        .then(() => {
            console.log('Message published to Pub/Sub.');
            res.status(statusCodes.OK).json(response);
        })
        .catch(error => {
            console.error('Error publishing message to Pub/Sub:', error);
            res.status(statusCodes.INTERNAL_SERVER_ERROR).send("Error publishing message to Pub/Sub");
        });
  }*/
};

function notFoundError(next) {

  const err = new Error("Could not find a recommendation for that meal");
  err.status = statusCodes.NOT_FOUND;
  return next(err);
  
};


module.exports = {
  getRecommendation,
};