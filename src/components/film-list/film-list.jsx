import React from 'react';
import PropTypes from 'prop-types';

import FilmItem from '../film-item/film-item.jsx';

const FilmList = ({films, onClick, onHover, onMouseOut, activePlayer}) => {
  const itemList = films.map((item, i) => {
    return <FilmItem
      item={item}
      key={item.picture}
      onClick={onClick}
      onHover={onHover}
      onMouseOut={onMouseOut}
      isPlaying={i === activePlayer ? true : false}
      idx={i}
    />;
  });

  return <div className="catalog__movies-list">
    {itemList}
  </div>;
};

FilmList.propTypes = {
  films: PropTypes.arrayOf(FilmItem.propTypes.item).isRequired,
  onClick: PropTypes.func,
  onHover: PropTypes.func,
  onMouseOut: PropTypes.func,
  activePlayer: PropTypes.number
};

export default FilmList;
