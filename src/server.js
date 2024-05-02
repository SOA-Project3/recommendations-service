const express = require("express");
const { PubSub } = require('@google-cloud/pubsub');
const pubsub = new PubSub();
const pubSubClient = new PubSub();  
const port = 5555; // Define port
const recommendationService = require("./controllers/CustomRecommendation");

const app = express();

// Define a function to handle received Pub/Sub messages
const handleMessage = async (message) => {
  try {
    // Process the received message
    const data = message.data.toString();
    console.log('Received message:', data);

    // Get recommendation response from recommendation service
    const recommendationResponse = await recommendationService.getRecommendation(data);

    // Publish the recommendation response
    await publishMessage("recommendation-service", recommendationResponse);

    // Acknowledge the message to remove it from the subscription
    message.ack();
  } catch (error) {
    console.error('Error processing message:', error);
  }
};

async function publishMessage(topicName, data) {
    const jsonString = JSON.stringify(data);
    const dataBuffer = Buffer.from(jsonString);
  
    try {
      const messageId = await pubSubClient
        .topic(topicName)
        .publishMessage({data: dataBuffer});
      console.log(`Message ${messageId} published.`);
    } catch (error) {
      console.error(`Received error while publishing: ${error.message}`);
      process.exitCode = 1;
    }
}


// Set up a subscription to listen for messages
const subscriptionName = 'recommendation-backend-sub';
const subscription = pubsub.subscription(subscriptionName);

// Start listening for messages
subscription.on('message', handleMessage);


module.exports = {
    app
};
