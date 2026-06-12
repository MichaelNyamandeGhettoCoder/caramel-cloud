const { getStore } = require('@netlify/blobs');

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }


try {
  const { password } = JSON.parse(event.body);
  
  console.log('Got password:', password); // This WILL show up

  if (password === '1234') {
    return {
      statusCode: 200,
      body: JSON.stringify({ success: true })
    };

  } else {
    return {
      statusCode: 401,
      body: JSON.stringify({ error: 'Invalid password' })
    };
  }
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message })
    };
  }
};
