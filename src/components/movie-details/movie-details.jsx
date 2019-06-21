import React, {Fragment, PureComponent} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';

import {
  getMoreFilmsByGenre
} from '../../utils.js';
import {
  itemShape
} from '../../models.js';
import {
  getMovieById,
  getFilms,
  getComments
} from '../../reducers/films/selectors.js';
import {isAuthorizedUser} from '../../reducers/user/selectors.js';
import Header from '../header/header.jsx';
import Footer from '../footer/footer.jsx';
import FilmList from '../film-list/film-list.jsx';
import withActiveItem from '../../hocs/with-active-item/with-active-item.js';
import MovieTabs from '../movie-tabs/movie-tabs.jsx';
import {Operation} from '../../reducers/films/films.js';
import {Tabs} from '../../consts.js';

const FilmListWrapped = withActiveItem(FilmList);
const MovieTabsWrapped = withActiveItem(MovieTabs);

class MovieDetails extends PureComponent {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const {onLoadComments, match} = this.props;
    onLoadComments(match.params.id);
  }

  componentDidUpdate(prevProps) {
    const {onLoadComments, match} = this.props;
    if (prevProps.match.params.id !== match.params.id) {
      onLoadComments(match.params.id);
    }
  }

  render() {
    const {
      movie,
      films,
      comments,
      location,
      isAuthorized
    } = this.props;

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
          <Header />

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
                {isAuthorized &&
                  <Link to={`/film/${id}/review`} className="btn movie-card__button">Add review</Link>
                }
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
              reviews={comments}
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
  location: PropTypes.object,
  onLoadComments: PropTypes.func,
  comments: PropTypes.arrayOf(PropTypes.object),
  match: PropTypes.object,
  isAuthorized: PropTypes.bool
};

const mapStateToProps = (state, {match}) => ({
  movie: getMovieById(state, match.params.id),
  films: getFilms(state),
  comments: getComments(state),
  isAuthorized: isAuthorizedUser(state)
});

export {MovieDetails};

export default connect(
    mapStateToProps,
    {
      onLoadComments: Operation.loadComments
    }
)(MovieDetails);
