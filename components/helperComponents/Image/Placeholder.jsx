import React from 'react';
import PropTypes from 'prop-types';

import { useAppContext } from 'fusion:context';
import getProperties from 'fusion:properties';

const Placeholder = ({
  showPlaceholder = true,
  aspectRatio = '16/9',
  maxWidth,
  maxHeight,
}) => {
  const appContext = useAppContext();
  const { arcSite, deployment, contextPath } = appContext;
  const { logoPlaceholder } = getProperties(arcSite);
  const placeholder = `${deployment(`${contextPath}${logoPlaceholder}`)}`;

  if (!showPlaceholder) {
    return null;
  }

  const maxWidthRem = (maxW) => (maxW ? `${maxW / 16}rem` : 'none');
  const maxHeightRem = (maxH) => (maxH ? `${maxH / 16}rem` : 'none');

  return (
    <div
      className='c-placeholder'
      style={{
        display: showPlaceholder ? 'flex' : 'none',
        aspectRatio,
        maxWidth: maxWidthRem(maxWidth),
        maxHeight: maxHeightRem(maxHeight),
        objectFit: 'cover',
        background: '#f8f8f8',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <img
        alt='Placeholder Image'
        src={placeholder}
        style={{ width: '20%', boxShadow: 'none' }}
      />
    </div>
  );
};

Placeholder.propTypes = {
  showPlaceholder: PropTypes.bool,
  maxWidth: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  maxHeight: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  aspectRatio: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

export default Placeholder;
