import React from 'react';
import PropTypes from 'prop-types';

const Logo = (props) => {
  const extraClass = props.invert ? `logo__link--light` : ``;

  return <div className="logo">
    <a href="main.html" className={`logo__link ${extraClass}`}>
      <span className="logo__letter logo__letter--1">W</span>
      <span className="logo__letter logo__letter--2">T</span>
      <span className="logo__letter logo__letter--3">W</span>
    </a>
  </div>;
};

Logo.propTypes = {
  invert: PropTypes.bool
};

export default Logo;
