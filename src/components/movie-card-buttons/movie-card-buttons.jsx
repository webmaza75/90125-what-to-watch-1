import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';

import MyListButton from '../my-list-button/my-list-button.jsx';
import withMyListButton from '../../hocs/with-my-list-button/with-my-list-button.js';
import {ActionCreator} from '../../actions/actions.js';

const MyListButtonWrapped = withMyListButton(MyListButton);

const MovieCardButtons = ({isAuthorized, isFavorite, id, showAddReviewLink, onTogglePlayButton}) => {
  const needShowAddReviewlink = showAddReviewLink && isAuthorized;

  return <div className="movie-card__buttons">
    <button className="btn btn--play movie-card__button" type="button" onClick={() => onTogglePlayButton(true)}>
      <svg viewBox="0 0 19 19" width="19" height="19">
        <use xlinkHref="#play-s"></use>
      </svg>
      <span>Play</span>
    </button>

    <MyListButtonWrapped
      id={id}
      isFavorite={isFavorite}
    />

    {needShowAddReviewlink &&
      <Link to={`/film/${id}/review`} className="btn movie-card__button">Add review</Link>
    }
  </div>;
};

MovieCardButtons.propTypes = {
  isAuthorized: PropTypes.bool,
  isFavorite: PropTypes.bool,
  id: PropTypes.number,
  onMyListClick: PropTypes.func,
  showAddReviewLink: PropTypes.bool,
  onTogglePlayButton: PropTypes.func
};

export {MovieCardButtons};

export default connect(
    null,
    {
      onTogglePlayButton: ActionCreator.togglePlayButton
    }
)(MovieCardButtons);

