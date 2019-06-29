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
    onMouseOut,
    isNeedReload
  } = props;

  const {
    title,
    picture,
    src,
    id
  } = item;
  const path = `/film/${id}`;

  return <article className="small-movie-card catalog__movies-card">
    <Link to={path}>
      <div className="small-movie-card__image" onMouseOver={() => onMouseOver(item)} onMouseOut={onMouseOut}>
        <VideoPlayer
          src={src}
          isPlaying={isPlaying}
          poster={picture}
          isNeedReload={isNeedReload}
        />
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
  isNeedReload: PropTypes.bool,
  onMouseOver: PropTypes.func,
  onMouseOut: PropTypes.func
};

export default FilmItem;
