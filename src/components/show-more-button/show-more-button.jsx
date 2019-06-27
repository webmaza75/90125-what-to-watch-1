import React from 'react';
import {connect} from 'react-redux';
import {ActionCreator} from '../../actions/actions.js';
import {
  getFilmsByGenre,
  getMaxShowFilms
} from '../../reducers/films/selectors.js';
import {
  itemShape
} from '../../models.js';
import PropTypes from 'prop-types';

const ShowMoreButton = (props) => {
  const {
    onShowMoreClick,
    maxShowFilms,
    filmsGroup
  } = props;

  if (filmsGroup.length < maxShowFilms) {
    return null;
  }

  return <div className="catalog__more">
    <button className="catalog__button" type="button" onClick={
      (event) => {
        event.preventDefault();
        onShowMoreClick();
      }
    }>Show more</button>
  </div>;
};

ShowMoreButton.propTypes = {
  onShowMoreClick: PropTypes.func,
  maxShowFilms: PropTypes.number,
  filmsGroup: PropTypes.arrayOf(itemShape)
};

const mapStateToProps = (state) => ({
  maxShowFilms: getMaxShowFilms(state),
  filmsGroup: getFilmsByGenre(state)
});

export {ShowMoreButton};

export default connect(
    mapStateToProps,
    {
      onShowMoreClick: ActionCreator.increaseMaxShowFilms
    }
)(ShowMoreButton);
