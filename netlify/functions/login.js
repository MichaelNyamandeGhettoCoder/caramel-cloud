const { getStore } = require('@netlify/blobs');

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  try {
    const { password } = JSON.parse(event.body);
    const store = getStore('caramel-auth');
    
    // Get stored password, default to "1234" if not set
    let storedPass = await store.get('admin_password');
    if (!storedPass) {
      storedPass = '1234';
      await store.set('admin_password', storedPass);
    }
console.log('Raw from Blobs:', JSON.stringify(storedPass));
console.log('Comparing:', JSON.stringify(password), 'vs', JSON.stringify(storedPass));


    if (password === storedPass) {
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
