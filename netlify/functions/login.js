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

// This is in your frontend login.js, not the Netlify function
fetch('/.netlify/functions/login', {
  method: 'POST',
  body: JSON.stringify({ password: passwordInput.value })
})
.then(res => res.json())
.then(data => {
  if (data.success) {
    sessionStorage.setItem('adminLoggedIn', 'true'); // ADD THIS LINE
    window.location.href = '/admin.html'; // go to admin page
  } else {
    alert('Wrong password');
  }
});
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
