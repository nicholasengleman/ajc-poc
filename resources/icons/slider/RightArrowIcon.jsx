/* eslint max-len: "off" */
/* eslint-disable eol-last */

import React from 'react';
import PropTypes from 'prop-types';

const RightArrowIcon = ({ color }) => (
    <svg width="12px" height="20px" viewBox="0 0 12 20" version="1.1">
        <title>Combined Shape</title>
        <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
            <g transform="translate(-21.000000, -15.000000)" fill={color ?? '#212126'}>
                <path d="M28.25,18 C29.2164983,18 30,18.7835017 30,19.75 C30,20.7164983 29.2164983,21.5 28.25,21.5 L19.5,21.5 L19.5,30.25 C19.5,31.2164983 18.7164983,32 17.75,32 C16.7835017,32 16,31.2164983 16,30.25 L16,19.75 C16,18.7835017 16.7835017,18 17.75,18 L28.25,18 Z" id="Combined-Shape" transform="translate(23.000000, 25.000000) scale(-1, 1) rotate(-45.000000) translate(-23.000000, -25.000000) "></path>
            </g>
        </g>
    </svg>
);

RightArrowIcon.propTypes = {
  color: PropTypes.string,
};

export default RightArrowIcon;
