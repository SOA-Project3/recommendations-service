const data = require("../models/meals.json");
const statusCodes = require("../constants/statusCodes");
const helpers = require("../helpers/RecommendationHelpers");

const getRecommendation = async (query) => {
  try {
      const queryLength = Object.keys(query).length;
      const firstParameter = Object.keys(query)[0];
      const secondParameter = Object.keys(query)[1];
      const firstParameterValue = Object.values(query)[0];
      const secondParameterValue = Object.values(query)[1];

      let response = {};

      if (queryLength === 2) {
          const isParameterContained = (data[firstParameter].some(item => item.name === firstParameterValue)) || (data[secondParameter].some(item => item.name === secondParameterValue));

          if (!isParameterContained) {
              throw notFoundError();
          } else {
              const firstParameterIndex = data[firstParameter].findIndex(item => item.name === firstParameterValue);
              const secondParameterIndex = data[secondParameter].findIndex(item => item.name === secondParameterValue);

              if (firstParameterIndex === secondParameterIndex) {
                  const missingParameter = helpers.getOneMissingParameter(firstParameter, secondParameter);
                  const missingParameterValue = data[missingParameter][firstParameterIndex].name;
                  response = helpers.writeResponse(response, firstParameter, secondParameter, missingParameter, firstParameterValue, secondParameterValue, missingParameterValue);
              } else {
                  throw notFoundError();
              }
          }
      } else {
          const isParameterContained = data[firstParameter].some(item => item.name === firstParameterValue);

          if (!isParameterContained) {
              throw notFoundError();
          } else {
              const firstParameterIndex = data[firstParameter].findIndex(item => item.name === firstParameterValue);
              const missingParameters = helpers.getTwoMissingParameter(firstParameter);
              const missingParameterValue1 = data[missingParameters[0]][firstParameterIndex].name;
              const missingParameterValue2 = data[missingParameters[1]][firstParameterIndex].name;
              response = helpers.writeResponse(response, firstParameter, missingParameters[0], missingParameters[1], firstParameterValue, missingParameterValue1, missingParameterValue2);
          }
      }
      console.log(response);
      return response;
  } catch (error) {
      console.error('Error processing message:', error);
      throw error;
  }
};

function notFoundError() {
  const err = new Error("Could not find a recommendation for that meal");
  err.status = statusCodes.NOT_FOUND;
  throw err;
};

module.exports = {
  getRecommendation,
};
