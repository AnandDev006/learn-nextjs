import Head from 'next/head';
import PropTypes from 'prop-types';
import MeetupList from '../components/meetups/MeetupList';

import { runDBQuery } from '../utils/mongo';

const Home = ({ meetups }) => {
  return (
    <>
      <Head>
        <title>React meetups</title>
        <meta
          name='description'
          content='Browse a large list of highly active React meetups'
        />
      </Head>
      <MeetupList meetups={meetups} />
    </>
  );
};

export const getStaticProps = async context => {
  const getMeetupsList = async meetupsCollection => {
    try {
      return await meetupsCollection.find().toArray();
    } catch (error) {
      console.error('Error fetching data', error);
    }
  };

  const result = await runDBQuery(getMeetupsList);

  const meetups = result.map(meetup => ({
    id: meetup._id.toString(),
    title: meetup.title,
    address: meetup.address,
    image: meetup.image,
  }));

  // console.log({ meetups });

  return {
    props: {
      meetups,
    },
    revalidate: 1,
  };
};

Home.propTypes = {};

export default Home;
