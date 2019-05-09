import React from 'react';
import PropTypes from 'prop-types';

import FilmItem from '../film-item/film-item.jsx';
import genres from '../../mocks/genres.js';

const FilmList = ({films, onClick}) => {
  const itemList = films.map((item) => {
    return <FilmItem
      item={item}
      key={item.picture}
      onClick={onClick}
    />;
  });

  return <div className="catalog__movies-list">
    {itemList}
  </div>;
};

FilmList.propTypes = {
  films: PropTypes.arrayOf(PropTypes.shape({
    genre: PropTypes.arrayOf(PropTypes.oneOf(genres)),
    title: PropTypes.string.isRequired,
    desc: PropTypes.string,
    picture: PropTypes.string.isRequired,
    year: PropTypes.number
  })).isRequired,
  onClick: PropTypes.func
};

export default FilmList;
