// /* eslint-disable react/no-unknown-property */
// import React, { useEffect } from 'react';
// import './styles.scss';
// import PropTypes from 'prop-types';
// import { useFusionContext } from 'fusion:context';
// import getProperties from 'fusion:properties';
// import fetchEnv from '../../global/utils/environment';

// const Nativo = ({ controllerClass, isMeteredStory = false }) => {
//   const fusionContext = useFusionContext();
//   const { arcSite } = fusionContext;

//   const isBoap = controllerClass === 'story-nativo_placeholder--boap';

//   const currentEnv = fetchEnv();
//   const siteProps = getProperties(arcSite);
//   const { nativo } = siteProps || {};

//   if (!nativo) {
//     return null;
//   }

//   const { moapPTD, boapPTD } = nativo[currentEnv] || {};

//   useEffect(() => {
//     const interval = setInterval(() => {
//       if (typeof window.PostRelease !== 'undefined' && !isMeteredStory) {
//         clearInterval(interval);
//         // not deferred and library loaded, go ahead and trigger moap or boap
//         window.PostRelease.Start({
//           ptd: isBoap ? boapPTD : moapPTD,
//         });
//       }
//     }, 50);

//     return () => clearInterval(interval);
//   }, []);

//   return (
//     <div
//       className={`${controllerClass} b-clear-both ${isMeteredStory ? 'is-deferred' : ''}`}
//     ></div>
//   );
// };

// Nativo.propTypes = {
//   controllerClass: PropTypes.oneOf([
//     'story-nativo_placeholder--moap',
//     'story-nativo_placeholder--boap',
//   ]).isRequired,
//   isMeteredStory: PropTypes.bool,
// };

// export default Nativo;
