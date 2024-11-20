/* eslint-disable no-plusplus */
import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { useContent } from 'fusion:content';
import { useFusionContext } from 'fusion:context';
import Dot from '../dot/default';
import convertCsvToJson from '../../../../../global/utils/convertCsvToJson';
import Modal from '../../../../../global/Modal/default';
import useBreakpoints from '../../../../../../layouts/_helper_functions/useBreakpoints';
import './default.scss';

const DefendantsTable = ({ chargeDataId, aspectDataId }) => {
  const fusionContext = useFusionContext();
  const { arcSite } = fusionContext;
  const { isDesktop } = useBreakpoints();

  const chargeData = chargeDataId
    ? useContent({
        source: 'content-preview-api',
        query: {
          id: chargeDataId,
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

  const aspectData = aspectDataId
    ? useContent({
        source: 'content-preview-api',
        query: {
          id: aspectDataId,
          arcSite,
          published: false,
        },
        transform(csvData) {
          return csvData
            ? convertCsvToJson(csvData?.content_elements[0]?.content?.trim())[0]
            : null;
        },
      })
    : null;

  const numberToWords = (num) => {
    const mapping = [
      'zero',
      'one',
      'two',
      'three',
      'four',
      'five',
      'six',
      'seven',
    ];
    return mapping[num];
  };

  const statusArray = aspectData?.statusArray?.split(',') || ['Charged'];
  const title = aspectData?.title;

  const transformedArray = useMemo(() => {
    if (!aspectData || !chargeData) {
      return [];
    }
    const result = [];

    for (let i = 1; i <= 6; i++) {
      const word = numberToWords(i);
      const aspectKey = `aspect_${word}`;
      const descriptionKey = `${aspectKey}_description`;

      if (`${aspectKey}_status` in chargeData[0] && aspectKey in aspectData) {
        result.push({
          title: aspectData[aspectKey],
          description: aspectData[descriptionKey] || '',
          aspectName: `aspect_${word}`,
        });
      }
    }

    return result;
  }, [aspectData, chargeData]);

  const statuses = useMemo(
    () =>
      statusArray?.map((status, index) => (
        <div className='status' key={index}>
          <Dot status={statusArray.length > 1 ? index : true} />
          <span className='status-title'>{status}</span>
        </div>
      )),
    [statusArray],
  );

  const insertSpace = (t) => {
    if (isDesktop) {
      const index = t.indexOf('/');
      return index === -1 ? t : `${t.slice(0, index)}/ ${t.slice(index + 1)}`;
    }
    return t;
  };

  if (chargeData && aspectData && transformedArray.length > 1) {
    return (
      <div className='c-defendants-table'>
        {title && <div className='table-title'>{title}</div>}
        <div className='c-aspect-legend'>
          {transformedArray?.map((aspect, index) => (
            <div className='aspect' key={index}>
              <div className='row'>
                <span className='number'>{index + 1}</span>
                <span className='title'>{insertSpace(aspect.title)}</span>
              </div>
              {aspect?.description && (
                <div className='row'>
                  <div className='description'>{aspect?.description}</div>
                </div>
              )}
            </div>
          ))}
        </div>

        {statuses.length > 1 && (
          <div className='c-table-legend'>{statuses}</div>
        )}
        <table>
          <thead>
            <tr>
              <th>
                <Modal
                  title='Legend'
                  icon={<div className='c-modal-icon'>i</div>}
                >
                  <div className='modal-legend-body'>
                    <div className='col'>
                      <div className='title'>Charges</div>
                      <div className='list'>
                        {transformedArray?.map((aspect, index) => (
                          <div key={index} className='charge'>
                            <span className='bold'>{index + 1}</span> -{' '}
                            {aspect.title}
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className='col'>
                      <div className='title'>Status</div>
                      <div className='list'>{statuses}</div>
                    </div>
                  </div>
                </Modal>
              </th>
              {transformedArray?.map((aspect, index) => (
                <th key={index}>
                  <div className='charge-header'>{index + 1}</div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {chargeData?.map((person, index) => (
              <tr key={index}>
                <td>{person?.Name}</td>
                {transformedArray?.map((aspect, idx) => (
                  <td key={idx}>
                    {person[`${aspect?.aspectName}_status`] <
                    statusArray.length ? (
                      <Dot
                        status={person[`${aspect?.aspectName}_status`]}
                        center
                      />
                    ) : null}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  return null;
};

DefendantsTable.propTypes = {
  chargeDataId: PropTypes.string.isRequired,
  aspectDataId: PropTypes.string.isRequired,
};

export default DefendantsTable;
