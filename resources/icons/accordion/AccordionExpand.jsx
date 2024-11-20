import React from 'react';
import PropTypes from 'prop-types';

const AccordionExpand = ({ className }) => (
  <svg
    className={className}
    width='16'
    height='16'
    viewBox='0 0 16 16'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
  >
    <path
      d='M7.963 15.03a2.42 2.42 0 0 1-2.416-2.416l.043-2.459-2.445.043a2.422 2.422 0 0 1-2.43-2.416A2.42 2.42 0 0 1 3.13 5.366l2.459-.044-.043-2.358A2.422 2.422 0 0 1 7.963.534a2.42 2.42 0 0 1 2.416 2.415l.045 2.373 2.386.044a2.416 2.416 0 0 1-.014 4.832l-2.372-.043-.045 2.474a2.416 2.416 0 0 1-2.416 2.402zm-.805-6.443v4.042c0 .43.361.79.805.79a.807.807 0 0 0 .806-.805V8.587h4.041c.43 0 .791-.361.791-.805a.807.807 0 0 0-.805-.806H8.769V2.95a.798.798 0 0 0-.806-.805.807.807 0 
0 0-.805.805v4.027H3.13a.798.798 0 0 0-.806.806c0 .444.362.805.806.805h4.027z'
      fill='#004FFF'
    />
  </svg>
);

AccordionExpand.propTypes = {
  className: PropTypes.string,
};
export default AccordionExpand;
