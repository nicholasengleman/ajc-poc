import React from 'react';
import PropTypes from 'prop-types';
import './default.scss';

const Dot = ({ status, center }) => {
  const convertStatusToClassName = (stat) => {
    const mapping = {
      true: 'true',
      0: 'zero',
      1: 'one',
      2: 'two',
      3: 'three',
      4: 'four',
      5: 'five',
      6: 'six',
      7: 'seven',
    };
    return mapping[stat?.toString()?.toLowerCase()] || '';
  };

  return (
    <div
      className={`c-table-dot ${center ? 'center' : ''} ${convertStatusToClassName(status)}`}
    ></div>
  );
};

Dot.propTypes = {
  status: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.bool,
  ]),
  center: PropTypes.bool,
};

export default Dot;
