import React from 'react';
import PropTypes from 'prop-types';

import genres from '../../mocks/genres.js';
import VideoPlayer from '../video-player/video-player.jsx';

const FilmItem = ({item, onClick, isPlaying = false, onHover, onMouseOut, idx}) => {
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
      onPlayButtonClick={() => {}}
      poster={`img/${picture}`}
    /> :
    <div className="small-movie-card__image"
      onMouseOver={
        () => setTimeout(() => onHover(idx), 1000)
      }
      onMouseOut={() => onMouseOut()}
    >
      <img src={`img/${picture}`} alt={title} width="280" height="175" />
    </div>;

  return <article className="small-movie-card catalog__movies-card">
    <button className="small-movie-card__play-btn" type="button" onClick={() => onClick(item)}>Play</button>
    {preview}
    <h3 className="small-movie-card__title">
      <a className="small-movie-card__link" href="movie-page.html" onClick={(event) => {
        event.preventDefault(); onClick(item);
      }}>{title}</a>
    </h3>
  </article>;
};

FilmItem.propTypes = {
  item: PropTypes.shape({
    genre: PropTypes.arrayOf(PropTypes.oneOf(genres)),
    title: PropTypes.string.isRequired,
    desc: PropTypes.string,
    picture: PropTypes.string.isRequired,
    year: PropTypes.number,
    src: PropTypes.string.isRequired
  }).isRequired,
  onClick: PropTypes.func,
  isPlaying: PropTypes.boolean,
  onHover: PropTypes.func,
  onMouseOut: PropTypes.func,
  idx: PropTypes.number
};

export default FilmItem;
