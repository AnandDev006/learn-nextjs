import Head from 'next/head';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import NewMeetupForm from '../../components/meetups/NewMeetupForm';

const NewMeetup = props => {
  const router = useRouter();

  const onAddMeetupHandler = async newMeetupData => {
    // console.log(newMeetupData);
    try {
      const response = await fetch('/api/new-meetup', {
        method: 'POST',
        body: JSON.stringify(newMeetupData),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();

      // console.log('onAddMeetupHandler', data);
    } catch (error) {
      console.error('onAddMeetupHandler', error);
    } finally {
      router.replace('/');
    }
  };

  return (
    <>
      <Head>
        <title>Add a new meetup</title>
        <meta name='description' content='Add your own new meetup entry' />
      </Head>
      <NewMeetupForm onAddMeetup={onAddMeetupHandler} />
    </>
  );
};

NewMeetup.propTypes = {};

export default NewMeetup;
