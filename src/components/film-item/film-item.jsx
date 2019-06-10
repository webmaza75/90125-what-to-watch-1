import React from 'react';
import PropTypes from 'prop-types';

import VideoPlayer from '../video-player/video-player.jsx';

const FilmItem = (props) => {
  const {
    item,
    onClick,
    isPlaying,
    onMouseOver,
    onMouseOut
  } = props;

  const {
    title,
    picture,
    src
  } = item;

  // Формирование превью отображения карточки фильма
  const preview = isPlaying ?
    <VideoPlayer
      src={src}
      isPlaying={isPlaying}
    /> :
    <img src={picture} alt={title} width="280" height="175" />;

  return <article className="small-movie-card catalog__movies-card">
    <div className="small-movie-card__image" onMouseOver={() => onMouseOver(item)} onMouseOut={onMouseOut}>
      {preview}
    </div>
    <h3 className="small-movie-card__title">
      <a className="small-movie-card__link" href="movie-page.html" onClick={(event) => {
        event.preventDefault(); onClick(item);
      }}>{title}</a>
    </h3>
  </article>;
};

export const itemShape = PropTypes.shape({
  backgroundColor: PropTypes.string,
  backgroundImage: PropTypes.string,
  description: PropTypes.string,
  director: PropTypes.string,
  genre: PropTypes.string,
  id: PropTypes.number,
  isFavorite: PropTypes.bool,
  title: PropTypes.string,
  posterImage: PropTypes.string,
  picture: PropTypes.string.isRequired,
  src: PropTypes.string.isRequired,
  rating: PropTypes.number,
  released: PropTypes.number,
  runTime: PropTypes.number,
  scoresCount: PropTypes.number,
  starring: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.string), PropTypes.string]),
  videoLink: PropTypes.string
});

FilmItem.propTypes = {
  item: itemShape.isRequired,
  onClick: PropTypes.func,
  isPlaying: PropTypes.bool,
  onMouseOver: PropTypes.func,
  onMouseOut: PropTypes.func
};

export default FilmItem;
