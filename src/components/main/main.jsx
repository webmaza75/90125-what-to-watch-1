import React, {Fragment, PureComponent} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import FilmList from '../film-list/film-list.jsx';
import FilmItem from '../film-item/film-item.jsx';
import {ActionCreator} from '../../actions/actions.js';
import GenreList from '../genre-list/genre-list.jsx';
import withActiveItem from '../../hocs/with-active-item/with-active-item.js';
import {
  getActiveFilter,
  getFilmsByGenre,
  getGenres
} from '../../reducers/films/selectors.js';
import {getUser} from '../../reducers/user/selectors.js';
import Header from '../header/header.jsx';
import GlobalIcons from '../global-icons/global-icons.jsx';
import Footer from '../footer/footer.jsx';

const GenreListWrapped = withActiveItem(GenreList);
const FilmListWrapped = withActiveItem(FilmList);

class Main extends PureComponent {
  constructor(props) {
    super(props);

    this._handleMenuClick = this._handleMenuClick.bind(this);
  }

  render() {
    const {filmsGroup,
      filter,
      genres,
      user
    } = this.props;

    return <Fragment>
      <GlobalIcons />

      <section className="movie-card">
        <div className="movie-card__bg">
          <img src="img/bg-the-grand-budapest-hotel.jpg" alt="The Grand Budapest Hotel" />
        </div>

        <h1 className="visually-hidden">WTW</h1>

        <Header
          user={user}
        />

        <div className="movie-card__wrap">
          <div className="movie-card__info">
            <div className="movie-card__poster">
              <img src="img/the-grand-budapest-hotel-poster.jpg" alt="The Grand Budapest Hotel poster" width="218" height="327" />
            </div>

            <div className="movie-card__desc">
              <h2 className="movie-card__title">The Grand Budapest Hotel</h2>
              <p className="movie-card__meta">
                <span className="movie-card__genre">Drama</span>
                <span className="movie-card__year">2014</span>
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
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="page-content">
        <section className="catalog">
          <h2 className="catalog__title visually-hidden">Catalog</h2>

          <GenreListWrapped
            genres={genres}
            onMenuClick={this._handleMenuClick}
            activeItem={filter}
            key={filter}
          />

          <FilmListWrapped
            films={filmsGroup}
          />

          <div className="catalog__more">
            <button className="catalog__button" type="button">Show more</button>
          </div>
        </section>

        <Footer />
      </div>
    </Fragment>;
  }

  _handleMenuClick(genre) {
    const {onChangeFilter} = this.props;
    onChangeFilter(genre);
  }
}

Main.propTypes = {
  filter: PropTypes.string,
  filmsGroup: PropTypes.arrayOf(FilmItem.propTypes.item),
  onChangeFilter: PropTypes.func,
  genres: PropTypes.arrayOf(PropTypes.string),
  user: Header.propTypes.user,
};

const mapStateToProps = (state) => ({
  filter: getActiveFilter(state),
  filmsGroup: getFilmsByGenre(state),
  genres: getGenres(state),
  user: getUser(state)
});

export {Main};

export default connect(
    mapStateToProps,
    {
      // onRequireAuthorization: ActionCreator.requireAuthorization,
      onChangeFilter: ActionCreator.changeFilter
    }
)(Main);
