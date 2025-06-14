const fetch = require("node-fetch");

exports.handler = async (event) => {
  const { tag } = event.queryStringParameters;
  const apiKey = process.env.UPLOADCARE_SECRET_KEY;

  const response = await fetch(`https://api.uploadcare.com/files/?ordering=-datetime_uploaded&limit=100&tags=${tag}`, {
    headers: {
      "Authorization": `Uploadcare.Simple ${apiKey}`,
      "Accept": "application/json"
    }
  });

  if (!response.ok) {
    return {
      statusCode: response.status,
      body: JSON.stringify({ error: "Uploadcare fetch failed" }),
    };
  }

  const data = await response.json();
  return {
    statusCode: 200,
    body: JSON.stringify(data),
  };
};
