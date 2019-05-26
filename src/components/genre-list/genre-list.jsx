import React from 'react';
import PropTypes from 'prop-types';

const GenreList = ({genres, activeFilter, onGenreChange}) => {

  const menu = genres.map((title) => {
    let clsName = ``;
    if (title === activeFilter) {
      clsName = ` catalog__genres-item--active`;
    }
    return <li className={`catalog__genres-item${clsName}`} key={title}>
      <a href="#" className="catalog__genres-link" onClick={
        (event) => {
          event.preventDefault(); onGenreChange(title);
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
  activeFilter: PropTypes.string,
  onGenreChange: PropTypes.func
};

export default GenreList;
