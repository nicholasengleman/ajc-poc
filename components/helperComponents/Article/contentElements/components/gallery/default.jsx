import React, { lazy, Suspense } from 'react';
import PropTypes from 'prop-types';
import LoadingSpinner from '../../../../global/loadingSpinner/default';

const LazyGallery = lazy(
  () => import('../../../../../features/gallery/default'),
);

const GalleryEmbed = ({ src }) => (
  <Suspense
    fallback={
      <>
        <div className='c-gallery'>
          <LoadingSpinner />
        </div>
      </>
    }
  >
    <LazyGallery
      isEmbed={true}
      contentElements={src}
      pageType={'story'}
      taxonomy={src?.taxonomy}
    />
  </Suspense>
);

GalleryEmbed.propTypes = {
  src: PropTypes.object,
};

export default GalleryEmbed;
