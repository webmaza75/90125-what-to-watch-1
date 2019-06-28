import React, {Fragment} from 'react';
import PropTypes from 'prop-types';

import Header from '../header/header.jsx';
import MovieCardButtons from '../movie-card-buttons/movie-card-buttons.jsx';

const FilmPromo = (props) => {
  const {
    posterImage,
    title,
    genre,
    released,
    backgroundImage,
    id,
    isFavorite
  } = props;

  return <Fragment>
    <div className="movie-card__bg">
      <img src={backgroundImage} alt={title} />
    </div>

    <h1 className="visually-hidden">WTW</h1>

    <Header />

    <div className="movie-card__wrap">
      <div className="movie-card__info">
        <div className="movie-card__poster">
          <img src={posterImage} alt={`${title} poster`} width="218" height="327" />
        </div>

        <div className="movie-card__desc">
          <h2 className="movie-card__title">{title}</h2>
          <p className="movie-card__meta">
            <span className="movie-card__genre">{genre}</span>
            <span className="movie-card__year">{released}</span>
          </p>

          <MovieCardButtons
            id={id}
            isFavorite={isFavorite}
            showAddReviewLink={false}
          />

        </div>
      </div>
    </div>
  </Fragment>;
};

FilmPromo.propTypes = {
  title: PropTypes.string,
  genre: PropTypes.string,
  released: PropTypes.number,
  id: PropTypes.number,
  posterImage: PropTypes.string,
  backgroundImage: PropTypes.string,
  isFavorite: PropTypes.bool,
};

export default FilmPromo;
