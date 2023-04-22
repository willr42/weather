require("dotenv").config();
import fetch from "node-fetch";

exports.handler = async function (event, context) {
  try {
    const { city } = event.queryStringParameters;
    const cityName = `https://api.api-ninjas.com/v1/weather?city=${city}`;
    let response = await fetch(cityName, {
      headers: {
        "X-Api-Key": process.env.API_KEY,
      },
    });
    if (response.status !== 200) {
      return { statusCode: 400, body: "Not found" };
    }

    let data = await response.json();
    return {
      statusCode: 200,
      body: JSON.stringify(data),
    };
  } catch (error) {
    console.log(error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error }),
    };
  }
};
