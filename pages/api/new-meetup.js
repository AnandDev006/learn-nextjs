import { runDBQuery } from '../../utils/mongo';

const handler = async (req, resp) => {
  const { method } = req;

  if (method === 'POST') {
    const { body: data } = req;

    const insertNewMeetup = async meetupsCollection => {
      try {
        return await meetupsCollection.insertOne(data);
      } catch (error) {
        console.error('Error inserting data', error);
      }
    };

    const result = await runDBQuery(insertNewMeetup);
    
    // console.log({ result });

    resp.status(201).json({ message: 'Meetup inserted' });
  }
};

export default handler;
