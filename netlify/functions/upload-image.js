const IMGBB_KEY = process.env.IMGBB_KEY;

exports.handler = async (event) => {
  if (event.httpMethod!== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  try {
    const { image } = JSON.parse(event.body);
    if (!image) throw new Error('No image provided');

    const formData = new URLSearchParams();
    formData.append('key', IMGBB_KEY);
    formData.append('image', image);

    const res = await fetch('https://api.imgbb.com/1/upload', {
      method: 'POST',
      body: formData
    });
    
    const data = await res.json();
    if (!data.success) throw new Error('ImgBB upload failed');

    return {
      statusCode: 200,
      body: JSON.stringify({ url: data.data.url })
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message })
    };
  }
};
