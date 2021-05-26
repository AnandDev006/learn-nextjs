import PropTypes from 'prop-types';

import classes from './MeetupDetail.module.css';

const MeetupDetail = ({ meetupData }) => {
  const { image, title, address, description } = meetupData;

  return (
    <section className={classes.detail}>
      <img src={image} alt={title} />
      <h1>{title}</h1>
      <address>{address}</address>
      <p>{description}</p>
    </section>
  );
};

MeetupDetail.propTypes = {};

export default MeetupDetail;
