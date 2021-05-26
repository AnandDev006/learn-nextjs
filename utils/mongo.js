import { MongoClient } from 'mongodb';

const MONGO_USERNAME = process.env.REACT_APP_MONGO_USERNAME;
const MONGO_PASSWORD = process.env.REACT_APP_MONGO_PASSWORD;

export const runDBQuery = async func => {
  try {
    const client = await MongoClient.connect(
      `mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@learn-nextjs.iaas4.mongodb.net/meetups?retryWrites=true&w=majority`
    );

    const db = client.db();
    const meetupsCollection = db.collection('meetups');

    try {
      return await func(meetupsCollection);
    } catch (error) {
      console.error('Error running user code', error);
    } finally {
      client.close();
    }
  } catch (error) {
    console.error('Error connecting to DB', error);
  }
};
