/* eslint-disable camelcase */
const axios = require('axios');

exports.handler = async (event) => {
  const { listID, email_address } = JSON.parse(event.body);

  if (!email_address || !listID) {
    // eslint-disable-next-line no-console
    console.log('no email or list ID provided');
    return {
      statusCode: 404,
      body: 'must contain an email address and list ID',
    };
  }

  const payload = {
    'api-key': 'pk_be73df524e0b5eb0e2237e432d83d78799',
    profiles: [
      {
        $consent: 'web',
        email: email_address,
      },
    ],
  };

  const newsletterData = await axios
    .post(`https://a.klaviyo.com/api/v2/list/${listID}/subscribe`, payload)
    .then((res) => res.data);

  return {
    statusCode: 200,
    body: JSON.stringify(newsletterData),
  };
};
