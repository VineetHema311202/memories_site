const fetch = require("node-fetch");

exports.handler = async function(event, context) {
  const tag = event.queryStringParameters.tag;
  const apiKey = process.env.UPLOADCARE_SECRET_KEY;

  try {
    const response = await fetch(`https://api.uploadcare.com/files/?ordering=-datetime_uploaded&limit=100&tags=${encodeURIComponent(tag)}`, {
      headers: {
        "Authorization": `Uploadcare.Simple ${apiKey}`,
        "Accept": "application/json"
      }
    });

    const data = await response.json();
    return {
      statusCode: 200,
      body: JSON.stringify(data)
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Failed to fetch from Uploadcare", detail: error.message })
    };
  }
};
