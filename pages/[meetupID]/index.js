import Head from 'next/head';
import PropTypes from 'prop-types';
import MeetupDetail from '../../components/meetups/MeetupDetail';
import { ObjectId } from 'mongodb';

import { runDBQuery } from '../../utils/mongo';

const Meetup = ({ meetupData }) => {
  return (
    <>
      <Head>
        <title> {meetupData.title}</title>
        <meta name='description' content={meetupData.description} />
      </Head>
      <MeetupDetail meetupData={meetupData} />
    </>
  );
};

export const getStaticPaths = async context => {
  const getMeetupsList = async meetupsCollection => {
    try {
      return await meetupsCollection.find({}, { _id: 1 }).toArray();
    } catch (error) {
      console.error('Error fetching data', error);
    }
  };

  const result = await runDBQuery(getMeetupsList);

  const paths = result.map(meetup => ({
    params: { meetupID: meetup._id.toString() },
  }));

  console.log({ paths });

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async context => {
  const {
    params: { meetupID },
  } = context;

  const getMeetupDetails = async meetupsCollection => {
    try {
      return await meetupsCollection.findOne({
        _id: ObjectId(meetupID),
      });
    } catch (error) {
      console.error('Error fetching data', error);
    }
  };

  const result = await runDBQuery(getMeetupDetails);

  const meetupData = {
    ...result,
    _id: null,
    id: result._id.toString(),
  };
  console.log({ meetupData });

  return {
    props: {
      meetupData,
    },
  };
};

Meetup.propTypes = {};

export default Meetup;
