const fetch = require('node-fetch');

exports.handler = async (event) => {
  const tag = event.queryStringParameters.tag;
  const UPLOADCARE_SECRET_KEY = process.env.UPLOADCARE_SECRET_KEY;

  const response = await fetch(`https://api.uploadcare.com/files/?ordering=-datetime_uploaded&limit=100&tags=${tag}`, {
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/vnd.uploadcare-v0.7+json",
      "Authorization": `Uploadcare.Simple ${UPLOADCARE_SECRET_KEY}`
    }
  });

  const data = await response.json();

  return {
    statusCode: 200,
    body: JSON.stringify(data)
  };
};
