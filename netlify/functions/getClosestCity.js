require("dotenv").config();
const axios = require("axios");

exports.handler = async function (event, context) {
  try {
    const { lat, long } = event.queryStringParameters;
    const closestCityUrl = `https://api.api-ninjas.com/v1/reversegeocoding?lat=${lat}&lon=${long}`;
    let response = await axios.get(closestCityUrl, {
      headers: {
        "X-Api-Key": process.env.API_KEY,
      },
    });

    return {
      statusCode: 200,
      body: JSON.stringify(response.data),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error }),
    };
  }
};
