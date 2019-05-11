import React from 'react';
import PropTypes from 'prop-types';

import FilmItem from '../film-item/film-item.jsx';

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
  films: PropTypes.arrayOf(FilmItem.propTypes.item).isRequired,
  onClick: PropTypes.func
};

export default FilmList;
