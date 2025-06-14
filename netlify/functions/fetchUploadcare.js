export async function handler(event) {
  const tag = event.queryStringParameters.tag;

  if (!tag) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'Missing tag parameter' })
    };
  }

  const UPLOADCARE_SECRET_KEY = process.env.UPLOADCARE_SECRET_KEY;

  const url = `https://api.uploadcare.com/files/?ordering=-datetime_uploaded&limit=100&tags=${encodeURIComponent(tag)}`;

  try {
    const response = await fetch(url, {
      headers: {
        'Authorization': `Uploadcare.Simple ${UPLOADCARE_SECRET_KEY}`,
        'Content-Type': 'application/json'
      }
    });

    const data = await response.json();

    return {
      statusCode: 200,
      body: JSON.stringify(data)
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Uploadcare fetch failed', details: err.message })
    };
  }
}
