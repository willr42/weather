require("dotenv").config();
import fetch from "node-fetch";

exports.handler = async function (event, context) {
  try {
    const { lat, long } = event.queryStringParameters;
    const closestCityUrl = `https://api.api-ninjas.com/v1/reversegeocoding?lat=${lat}&lon=${long}`;
    let response = await fetch(closestCityUrl, {
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
    return {
      statusCode: 500,
      body: JSON.stringify({ error }),
    };
  }
};
