require("dotenv").config();
const axios = require("axios");

exports.handler = async function (event, context) {
  try {
    const { city } = event.queryStringParameters;
    const cityName = `https://api.api-ninjas.com/v1/weather?city=${city}`;
    let response = await axios.get(cityName, {
      headers: {
        "X-Api-Key": process.env.API_KEY,
      },
    });

    return {
      statusCode: 200,
      body: JSON.stringify(response.data),
    };
  } catch (error) {
    console.log(error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error }),
    };
  }
};
