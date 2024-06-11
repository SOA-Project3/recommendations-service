const express = require("express"); //Import express framework module
const morgan = require("morgan"); //Import morgan for middleware to log HTTP requests and errors
const cors = require("cors");
const port = 3003; //Define port: first checks if available in environment variables
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");

const app = express(); //Main express app
const router = express.Router();

app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(morgan("tiny")); //Log request

const errorHandler = require("./errors/RecommendationError");
router.use(errorHandler.queryValidatorMiddleware);

const recommendationRoutes = require("./controllers/CustomRecommendation");

// Use the cors middleware
app.use(cors());

router.get("/recommendations", recommendationRoutes.getRecommendation); //Define path for recommendation requests

app.use(router); // Applying the router middleware to the app

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

module.exports = {
  app,
};
