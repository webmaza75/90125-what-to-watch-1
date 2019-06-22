import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';

import VideoPlayer from '../video-player/video-player.jsx';
import {itemShape} from '../../models.js';

const FilmItem = (props) => {
  const {
    item,
    isPlaying,
    onMouseOver,
    onMouseOut
  } = props;

  const {
    title,
    picture,
    src,
    id
  } = item;
  const path = `/film/${id}`;

  // Формирование превью отображения карточки фильма
  const preview = isPlaying ?
    <VideoPlayer
      src={src}
      isPlaying={isPlaying}
    /> :
    <img src={picture} alt={title} width="280" height="175" />;

  return <article className="small-movie-card catalog__movies-card">
    <Link to={path}>
      <div className="small-movie-card__image" onMouseOver={() => onMouseOver(item)} onMouseOut={onMouseOut}>
        {preview}
      </div>
    </Link>
    <h3 className="small-movie-card__title">
      <Link className="small-movie-card__link" to={path} >{title}</Link>
    </h3>
  </article>;
};

FilmItem.propTypes = {
  item: itemShape.isRequired,
  isPlaying: PropTypes.bool,
  onMouseOver: PropTypes.func,
  onMouseOut: PropTypes.func
};

export default FilmItem;
