import React from 'react';
import PropTypes from 'prop-types';
import { useContent } from 'fusion:content';
import { useFusionContext } from 'fusion:context';
import Dot from '../dot/default';
import convertCsvToJson from '../../../../../global/utils/convertCsvToJson';
import Image from '../../../../../global/image/default';
import './default.scss';

const DefendantsCard = ({ contentId, listTitle }) => {
  const fusionContext = useFusionContext();
  const { arcSite } = fusionContext;

  const data = contentId
    ? useContent({
        source: 'content-preview-api',
        query: {
          id: contentId,
          arcSite,
          published: false,
        },
        transform(csvData) {
          return csvData
            ? convertCsvToJson(csvData?.content_elements[0]?.content?.trim())
            : null;
        },
      })
    : null;

  if (Array.isArray(data)) {
    return (
      <div className='c-defendant-cards'>
        {data?.map((person, index) => (
          <div key={index} className='c-defendant-card'>
            <div className='card-header'></div>
            <div className='card-content'>
              <div className='defendant-info'>
                <div className='byline-container'>
                  <div className='profile-image'>
                    <Image
                      primarySize={[[80, 80]]}
                      imageType='isLeadImage'
                      src={{ url: person?.Image }}
                    />
                  </div>
                  <div className='name-container'>
                    <p className='name'>{person?.Name}</p>
                    <p className='role'>{person?.Role}</p>
                  </div>
                </div>
                <div className='bio'>{person?.Description}</div>
              </div>
              <div className='defendant-charges'>
                <p className='title'>{listTitle || 'Charges'}</p>
                {person?.charges?.split(',')?.map((charge, i) => (
                  <div key={i} className='charge'>
                    <Dot status={true} />
                    <span>{charge}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return null;
};

DefendantsCard.propTypes = {
  contentId: PropTypes.string,
  listTitle: PropTypes.string,
};

export default DefendantsCard;
