import { Handler } from '@netlify/functions';
import axios from 'axios';

type EventBody = { listID: string; newsletter_email_address: string };

const handler: Handler = async (event) => {
  const { listID, newsletter_email_address }: EventBody = JSON.parse(
    event.body
  );

  if (!newsletter_email_address || !listID) {
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
        email: newsletter_email_address,
      },
    ],
  };

  const newsletterData = await axios
    .post(`https://a.klaviyo.com/api/v2/list/${listID}/subscribe`, payload)
    .then((res) => res.data as []);

  return {
    statusCode: 200,
    body: JSON.stringify(newsletterData),
  };
};

export { handler };
