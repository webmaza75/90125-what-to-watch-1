import React from 'react';
import PropTypes from 'prop-types';

import FilmItem, {itemShape} from '../film-item/film-item.jsx';

const FilmList = ({films, onChange, activeItem}) => {

  const itemList = films.map((item) => {
    return <FilmItem
      item={item}
      key={item.id}
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
  activeItem: itemShape
};

export default FilmList;
