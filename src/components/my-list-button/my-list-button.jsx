import React from 'react';
import PropTypes from 'prop-types';
import {Redirect} from 'react-router-dom';

const MyListButton = (props) => {
  const {
    isAuthorized,
    isFavorite,
    onMyListClick,
    needRedirect
  } = props;

  if (needRedirect) {
    return <Redirect to="/login" />;
  }

  let btnMyListParams = {
    viewBox: `0 0 19 20`,
    xlinkHref: `#add`,
    width: `19`,
    height: `20`
  };

  if (isAuthorized && isFavorite) {
    btnMyListParams = {
      viewBox: `0 0 18 14`,
      xlinkHref: `#in-list`,
      width: `18`,
      height: `14`
    };
  }

  return <button className="btn btn--list movie-card__button" type="button" onClick={onMyListClick}>
    <svg viewBox={btnMyListParams.viewBox} width={btnMyListParams.width} height={btnMyListParams.height}>
      <use xlinkHref={btnMyListParams.xlinkHref}></use>
    </svg>
    <span>My list</span>
  </button>;
};

MyListButton.propTypes = {
  isAuthorized: PropTypes.bool,
  isFavorite: PropTypes.bool,
  needRedirect: PropTypes.bool,
  onMyListClick: PropTypes.func
};

export default MyListButton;
