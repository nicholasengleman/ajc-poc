import React from 'react';
import PropTypes from 'prop-types';

const SmallArrow = ({ color = '#FED240' }) => (
  <svg
    width="12"
    height="14"
    viewBox="0 0 12 14"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M11.609 7.003.359 13.498V.508l11.25 6.495z" fill={color} />
  </svg>
);

SmallArrow.propTypes = {
  color: PropTypes.string,
};

export default SmallArrow;
