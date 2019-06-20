import React, {Fragment, PureComponent} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import {
  getMoreFilmsByGenre
} from '../../utils.js';
import {
  itemShape,
  userInfo
} from '../../models.js';
import {
  getMovieById,
  getFilms
} from '../../reducers/films/selectors.js';
import {getUser} from '../../reducers/user/selectors.js';
import Header from '../header/header.jsx';
import Footer from '../footer/footer.jsx';
import FilmList from '../film-list/film-list.jsx';
import withActiveItem from '../../hocs/with-active-item/with-active-item.js';
import MovieTabs from '../movie-tabs/movie-tabs.jsx';
import {ActionCreator} from '../../actions/actions.js';
import {Operation} from '../../reducers/films/films.js';
import {Tabs} from '../../consts.js';

const FilmListWrapped = withActiveItem(FilmList);
const MovieTabsWrapped = withActiveItem(MovieTabs);

class MovieDetails extends PureComponent {
  constructor(props) {
    super(props);
  }

  componentWillUnmount() {
    const {onResetComments} = this.props;
    onResetComments();
  }

  render() {
    const {movie, user, films, onLoadComments, location} = this.props;
    if (!movie || !films) {
      return null;
    }
    const {
      id,
      backgroundImage,
      genre,
      title,
      posterImage,
      released
    } = movie;
    const moreFilms = getMoreFilmsByGenre(films, movie);

    return <Fragment>
      <section className="movie-card movie-card--full">
        <div className="movie-card__hero">
          <div className="movie-card__bg">
            <img src={backgroundImage} alt={title} />
          </div>

          <h1 className="visually-hidden">WTW</h1>
          <Header user={user} />

          <div className="movie-card__wrap">
            <div className="movie-card__desc">
              <h2 className="movie-card__title">{title}</h2>
              <p className="movie-card__meta">
                <span className="movie-card__genre">{genre}</span>
                <span className="movie-card__year">{released}</span>
              </p>

              <div className="movie-card__buttons">
                <button className="btn btn--play movie-card__button" type="button">
                  <svg viewBox="0 0 19 19" width="19" height="19">
                    <use xlinkHref="#play-s"></use>
                  </svg>
                  <span>Play</span>
                </button>
                <button className="btn btn--list movie-card__button" type="button">
                  <svg viewBox="0 0 19 20" width="19" height="20">
                    <use xlinkHref="#add"></use>
                  </svg>
                  <span>My list</span>
                </button>
                <a href="add-review.html" className="btn movie-card__button">Add review</a>
              </div>

            </div>
          </div>
        </div>

        <div className="movie-card__wrap movie-card__translate-top">
          <div className="movie-card__info">
            <div className="movie-card__poster movie-card__poster--big">
              <img src={posterImage} alt={`${title} poster`} width="218" height="327" />
            </div>

            <MovieTabsWrapped
              activeItem ={Tabs.OVERVIEW}
              href={`/film/${id}`}
              key={id}
              location={location}
              movie={movie}
              reviews={() => onLoadComments(id)}
            />

          </div>
        </div>
      </section>

      <div className="page-content">
        <section className="catalog catalog--like-this">
          <h2 className="catalog__title">More like this</h2>

          <div className="catalog__movies-list">
            <FilmListWrapped
              films={moreFilms}
            />
          </div>
        </section>
        <Footer />
      </div>
    </Fragment>;
  }
}

MovieDetails.propTypes = {
  movie: itemShape,
  films: PropTypes.arrayOf(itemShape),
  user: userInfo,
  location: PropTypes.object,
  onLoadComments: PropTypes.func,
  onResetComments: PropTypes.func
};

const mapStateToProps = (state, {match}) => ({
  movie: getMovieById(state, match.params.id),
  user: getUser(state),
  films: getFilms(state)
});

export {MovieDetails};

export default connect(
    mapStateToProps,
    {
      onLoadComments: Operation.loadComments,
      onResetComments: ActionCreator.resetComments
    }
)(MovieDetails);
