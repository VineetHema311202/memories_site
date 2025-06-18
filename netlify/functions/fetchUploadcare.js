const fetch = require('node-fetch');

exports.handler = async function(event, context) {
  const { tag } = event.queryStringParameters;
  const UPLOADCARE_SECRET_KEY = process.env.UPLOADCARE_SECRET_KEY;

  const url = `https://api.uploadcare.com/files/?ordering=-datetime_uploaded&limit=100&tags=${tag}`;
  
  try {
    const response = await fetch(url, {
      headers: {
        'Authorization': `Uploadcare.Simple ${UPLOADCARE_SECRET_KEY}`,
        'Accept': 'application/json'
      }
    });

    if (!response.ok) {
      return {
        statusCode: response.status,
        body: JSON.stringify({ error: 'Failed to fetch from Uploadcare' }),
      };
    }

    const data = await response.json();
    const imageUrls = data.results
      .filter(file => file.is_image)
      .map(file => file.original_file_url);

    return {
      statusCode: 200,
      body: JSON.stringify({ images: imageUrls }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Server Error', details: error.message }),
    };
  }
};
