import React from 'react';
import PropTypes from 'prop-types';
import './default.scss';

/**
 * Converts milliseconds to a string representing minutes and seconds.
 *
 * @param {number} ms - The duration in milliseconds.
 * @returns {string} A string in the format 'M:SS' representing the duration in minutes and seconds.
 */
const convertMStoMinutes = (ms) => {
  if (typeof ms !== 'number' || Number.isNaN(ms)) {
    return '0:00';
  }

  const minutes = Math.floor(ms / 1000 / 60);
  const seconds = Math.floor((ms / 1000) % 60);

  const paddedSeconds = seconds.toString().padStart(2, '0');

  return `${minutes}:${paddedSeconds}`;
};

/**
 * Component to display video length in minutes and seconds.
 *
 * @component
 * @example
 * // Displays '2:05' for a duration of 125000 milliseconds.
 * <VideoLength duration={125000} />
 *
 * @param {number} props.duration - Duration of the video in milliseconds.
 *
 * @returns {JSX.Element|null}
 */
const VideoLength = ({ duration }) => {
  if (duration > 0) {
    return <div className='c-video-length'>{convertMStoMinutes(duration)}</div>;
  }

  return null;
};

VideoLength.propTypes = {
  duration: PropTypes.number,
};

export default VideoLength;
