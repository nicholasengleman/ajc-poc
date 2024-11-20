import React from 'react';

const getTitle = ({ title, titleUrl, collectionTitle }) => {
  const getLink = () => {
    if (titleUrl.indexOf('http') === 0 || titleUrl.indexOf('/') === 0) {
      return titleUrl;
    }
    return `//${titleUrl}`;
  };

  const buildTitle = () => {
    if (titleUrl) {
      return <a href={getLink()}>{title}</a>;
    }

    return title;
  };

  if (title) {
    return (
      <h1 className='c-page-title'>
        <div className='c-title-content'>{buildTitle()}</div>
      </h1>
    );
  }

  if (collectionTitle) {
    return (
      <div className='b-flexCenter b-flexRow tease-listHeading b-margin-bottom-d30-m20'>
        {collectionTitle}
      </div>
    );
  }

  return null;
};

export default getTitle;
