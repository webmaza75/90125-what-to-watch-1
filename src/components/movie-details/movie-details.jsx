import React, {Fragment, PureComponent} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import {
  getMoreFilmsByGenre
} from '../../utils.js';
import {
  itemShape
} from '../../models.js';
import {
  getMovieById,
  getFilms,
  getComments,
  getPlayState
} from '../../reducers/films/selectors.js';
import Header from '../header/header.jsx';
import Footer from '../footer/footer.jsx';
import FilmList from '../film-list/film-list.jsx';
import withActiveItem from '../../hocs/with-active-item/with-active-item.js';
import MovieTabs from '../movie-tabs/movie-tabs.jsx';
import {Operation} from '../../reducers/films/films.js';
import {Tabs} from '../../consts.js';
import MovieCardButtons from '../movie-card-buttons/movie-card-buttons.jsx';
import Player from '../player/player.jsx';

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
      showPlayer
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
      released,
      isFavorite
    } = movie;
    const moreFilms = getMoreFilmsByGenre(films, movie);

    if (showPlayer) {
      return <Player movie={movie} />;
    }

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

              <MovieCardButtons
                id={id}
                isFavorite={isFavorite}
                showAddReviewLink={true}
              />

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
          <FilmListWrapped
            films={moreFilms}
          />
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
  history: PropTypes.object,
  showPlayer: PropTypes.bool
};

const mapStateToProps = (state, {match}) => ({
  movie: getMovieById(state, match.params.id),
  films: getFilms(state),
  comments: getComments(state),
  showPlayer: getPlayState(state)
});

const mapDispatchToProps = {
  onLoadComments: Operation.loadComments
};

export {MovieDetails};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MovieDetails);
