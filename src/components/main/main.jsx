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
  getGenres,
  getPromo
} from '../../reducers/films/selectors.js';
import Footer from '../footer/footer.jsx';
import {Operation} from '../../reducers/films/films.js';
import {isAuthorizedUser} from '../../reducers/user/selectors.js';
import FilmPromo from '../film-promo/film-promo.jsx';
import {itemShape} from '../../models.js';

const FilmListWrapped = withActiveItem(FilmList);

class Main extends PureComponent {
  constructor(props) {
    super(props);

    this._handleMenuClick = this._handleMenuClick.bind(this);
  }

  componentDidMount() {
    const {onLoadPromo} = this.props;
    onLoadPromo();
  }

  render() {
    const {
      filmsGroup,
      filter,
      genres,
      promo,
      isAuthorized
    } = this.props;

    if (!promo || !promo.id) {
      return null;
    }

    const {
      title,
      genre,
      released,
      backgroundImage,
      id,
      isFavorite,
      posterImage
    } = promo;

    return <Fragment>
      <section className="movie-card">
        <FilmPromo
          title={title}
          genre={genre}
          released={released}
          backgroundImage={backgroundImage}
          id={id}
          isFavorite={isFavorite}
          isAuthorized={isAuthorized}
          posterImage={posterImage}
        />
      </section>

      <div className="page-content">
        <section className="catalog">
          <h2 className="catalog__title visually-hidden">Catalog</h2>

          <GenreList
            genres={genres}
            onChange={this._handleMenuClick}
            activeItem={filter}
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
  promo: itemShape,
  onLoadPromo: PropTypes.func,
  isAuthorized: PropTypes.bool,
  history: PropTypes.object
};

const mapStateToProps = (state) => ({
  filter: getActiveFilter(state),
  filmsGroup: getFilmsByGenre(state),
  genres: getGenres(state),
  promo: getPromo(state),
  isAuthorized: isAuthorizedUser(state)
});

export {Main};

export default connect(
    mapStateToProps,
    {
      onChangeFilter: ActionCreator.changeFilter,
      onLoadPromo: Operation.loadPromo,
      onToggleFavorite: Operation.toggleFavorite
    }
)(Main);
