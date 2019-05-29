import React from 'react';
import PropTypes from 'prop-types';

import FilmItem from '../film-item/film-item.jsx';

const FilmList = ({films, onChange, activeItem}) => {

  const itemList = films.map((item) => {
    return <FilmItem
      item={item}
      key={item.picture}
      onClick={onChange}
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
  activeItem: PropTypes.shape({
    genre: PropTypes.arrayOf(PropTypes.string),
    title: PropTypes.string.isRequired,
    desc: PropTypes.string,
    picture: PropTypes.string.isRequired,
    year: PropTypes.number,
    src: PropTypes.string.isRequired
  })
};

export default FilmList;
