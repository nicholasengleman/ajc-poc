import React from 'react';
import PropTypes from 'prop-types';

const AccordionCollapse = ({ className }) => (
  <svg
    className={className}
    width='18'
    height='7'
    viewBox='0 0 18 7'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
  >
    <path
      d='M15 6.363H3c-1.654 0-3-1.346-3-3s1.346-3 3-3h12c1.654 0 3 1.346 3 3s-1.346 3-3 3zm-12-4c-.551 0-1 .449-1 1 0 .55.449 1 1 1h12c.551 0 1-.45 1-1 0-.551-.449-1-1-1H3z'
      fill='#004FFF'
    />
  </svg>
);

AccordionCollapse.propTypes = {
  className: PropTypes.string,
};

export default AccordionCollapse;
