import React from 'react';
import PropTypes from 'prop-types';

import FilmItem from '../film-item/film-item.jsx';
import withFilmItem from '../../hocs/with-film-item/with-film-item.js';
import {itemShape} from '../../models.js';

const FilmItemWrapped = withFilmItem(FilmItem);

const FilmList = ({films, onChange, activeItem}) => {

  const itemList = films.map((item) => {
    return <FilmItemWrapped
      item={item}
      key={item.id}
      onHover={onChange}
      activeItem={activeItem}
    />;
  });

  return <div className="catalog__movies-list">
    {itemList}
  </div>;
};

FilmList.propTypes = {
  films: PropTypes.arrayOf(FilmItem.propTypes.item).isRequired,
  onChange: PropTypes.func,
  activeItem: itemShape
};

export default FilmList;
