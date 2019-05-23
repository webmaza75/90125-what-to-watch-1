import React from 'react';
import PropTypes from 'prop-types';

import FilmItem from '../film-item/film-item.jsx';

const FilmList = ({films, onClick, onHover}) => {
  const itemList = films.map((item) => {
    return <FilmItem
      item={item}
      key={item.picture}
      onClick={onClick}
      onHover={onHover}
    />;
  });

  return <div className="catalog__movies-list">
    {itemList}
  </div>;
};

FilmList.propTypes = {
  films: PropTypes.arrayOf(FilmItem.propTypes.item).isRequired,
  onClick: PropTypes.func,
  onHover: PropTypes.func
};

export default FilmList;
