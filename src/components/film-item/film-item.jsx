import React from 'react';
import PropTypes from 'prop-types';

import VideoPlayer from '../video-player/video-player.jsx';
import {itemShape} from '../../models.js';

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

FilmItem.propTypes = {
  item: itemShape.isRequired,
  onClick: PropTypes.func,
  isPlaying: PropTypes.bool,
  onMouseOver: PropTypes.func,
  onMouseOut: PropTypes.func
};

export default FilmItem;
