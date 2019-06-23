import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';

const Buttons = ({isAuthorized, isFavorite, id, onMyListClick}) => {
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

  return <div className="movie-card__buttons">
    <button className="btn btn--play movie-card__button" type="button">
      <svg viewBox="0 0 19 19" width="19" height="19">
        <use xlinkHref="#play-s"></use>
      </svg>
      <span>Play</span>
    </button>
    <button className="btn btn--list movie-card__button" type="button" onClick={
      (event) => {
        event.preventDefault();
        onMyListClick();
      }
    }>
      <svg viewBox={btnMyListParams.viewBox} width={btnMyListParams.width} height={btnMyListParams.height}>
        <use xlinkHref={btnMyListParams.xlinkHref}></use>
      </svg>
      <span>My list</span>
    </button>
    {isAuthorized &&
      <Link to={`/film/${id}/review`} className="btn movie-card__button">Add review</Link>
    }
  </div>;
};

Buttons.propTypes = {
  isAuthorized: PropTypes.bool,
  isFavorite: PropTypes.bool,
  id: PropTypes.number,
  onMyListClick: PropTypes.func
};

export default Buttons;
