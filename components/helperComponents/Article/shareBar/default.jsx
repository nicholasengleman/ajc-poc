import React from 'react';
import PropTypes from 'prop-types';
import getProperties from 'fusion:properties';
import { useFusionContext } from 'fusion:context';
import fetchEnv from '../../global/utils/environment';
import handleSiteName from '../../../layouts/_helper_functions/handleSiteName.js';
import FbIcon from './_helper_functions/FbIcon';
import TwitterIcon from './_helper_functions/TwitterIcon';
import LinkIcon from './_helper_functions/LinkIcon';
import copyToClipboard from '../../embed/LiveUpdates/_helper_functions/copyToClipboard';
import './default.scss';

const ShareBar = ({ articleURL, headlines }) => {
  const fusionContext = useFusionContext();
  const { arcSite } = fusionContext;
  const { facebookURL, twitterURL, siteName, cdnOrg } = getProperties(arcSite);
  const { basic: articleHeadline } = headlines || {};
  let articleShareUrl = articleURL;
  let site = siteName.toLowerCase();
  if (articleShareUrl && articleShareUrl.indexOf('.com') === -1) {
    const env = fetchEnv();
    // we must fully-qualify the url for sharing
    if (env === 'prod') {
      site = handleSiteName(site);
      articleShareUrl = `https://${site}.com${articleShareUrl}`;
    } else if (env !== 'prod') {
      articleShareUrl = `https://${cdnOrg}-${site}-${env}.cdn.arcpublishing.com${articleShareUrl}`;
    }
  }

  const shareLinkFacebook = `${facebookURL}${articleShareUrl}`;
  const shareLinkTwitter = `${twitterURL}${articleShareUrl}&text=${encodeURIComponent(articleHeadline)}`;

  return (
    <>
      <div className='share-bar'>
        <a className='fb-icon' href={shareLinkFacebook} target='__blank'>
          <FbIcon />
        </a>
        <a className='twitter-icon' href={shareLinkTwitter} target='__blank'>
          <TwitterIcon />
        </a>
        <a
          className='copy-icon'
          href='#'
          data-target=''
          tabIndex='0'
          title='Click here to copy the link for this update to your clipboard.'
          onClick={(e) => copyToClipboard(e)}
        >
          <LinkIcon />
        </a>
      </div>
    </>
  );
};

ShareBar.propTypes = {
  headlines: PropTypes.object,
  articleURL: PropTypes.string,
};

export default ShareBar;
