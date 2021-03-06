import React from 'react';
import PropTypes from 'prop-types';

import {MAX_GENRES} from '../../consts.js';

const GenreList = ({genres, activeItem, onChange}) => {

  const menu = genres.slice(0, MAX_GENRES).map((title) => {
    let className = `catalog__genres-item`;
    if (title === activeItem) {
      className += ` catalog__genres-item--active`;
    }
    return <li className={className} key={title}>
      <a href="#" className="catalog__genres-link" onClick={
        (event) => {
          event.preventDefault();
          onChange(title);
        }
      }>{title}</a>
    </li>;
  });

  return <ul className="catalog__genres-list">
    {menu}
  </ul>;
};

GenreList.propTypes = {
  genres: PropTypes.arrayOf(PropTypes.string),
  activeItem: PropTypes.string,
  onChange: PropTypes.func
};

export default GenreList;
