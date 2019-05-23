import React from 'react';
import PropTypes from 'prop-types';

const GenreList = ({genres, filter, onClick}) => {

  const menu = genres.map((title) => {
    if (title === filter) {
      return <li className="catalog__genres-item catalog__genres-item--active" key={title}>
        <a href="#" className="catalog__genres-link" onClick={
          (event) => {
            event.preventDefault(); onClick(title);
          }
        }>{title}</a>
      </li>;
    }
    return <li className="catalog__genres-item" key={title}>
      <a href="#" className="catalog__genres-link" onClick={
        (event) => {
          event.preventDefault(); onClick(title);
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
  filter: PropTypes.string,
  onClick: PropTypes.func
};

export default GenreList;
