import React, {Fragment} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {compose} from 'recompose';

import {ActionCreator} from '../../actions/actions.js';
import VideoPlayer from '../video-player/video-player.jsx';
import {formatVideoTime} from '../../utils.js';
import {itemShape} from '../../models.js';
import withPlayer from '../../hocs/with-player/with-player.js';

const Player = (props) => {
  const {
    movie,
    onTogglePlayButton,
    isPlaying,
    isFullScreen,
    currentTime,
    fullTime,
    onSetFullTime,
    onSetCurrentTime,
    onToggleFullScreen,
    onTogglePlay
  } = props;

  const {title, videoLink, backgroundImage} = movie;
  const elapsedTime = fullTime - currentTime;
  const progress = fullTime ? Math.floor(100 * currentTime / fullTime) : 0;

  return <div className="player">
    <VideoPlayer
      src={videoLink}
      isPlaying={isPlaying}
      poster={backgroundImage}
      isFullScreen={isFullScreen}
      onSetFullTime={onSetFullTime}
      onSetCurrentTime={onSetCurrentTime}
      onToggleFullScreen={onToggleFullScreen}
    />

    <button type="button" className="player__exit" onClick={() => onTogglePlayButton(false)}>Exit</button>

    <div className="player__controls">
      <div className="player__controls-row">
        <div className="player__time">
          <progress className="player__progress" value={progress} max="100"></progress>
          <div className="player__toggler" style={{left: `${progress}%`}}>Toggler</div>
        </div>
        <div className="player__time-value">{formatVideoTime(elapsedTime)}</div>
      </div>

      <div className="player__controls-row">
        <button type="button" className="player__play" onClick={onTogglePlay}>
          {isPlaying && <Fragment>
            <svg viewBox="0 0 14 21" width="14" height="21">
              <use href="#pause"></use>
            </svg>
            <span>Pause</span>
          </Fragment>}
          {!isPlaying && <Fragment>
            <svg viewBox="0 0 19 19" width="19" height="19">
              <use xlinkHref="#play-s"></use>
            </svg>
            <span>Play</span>
          </Fragment>}
        </button>
        <div className="player__name">{title}</div>

        <button type="button" className="player__full-screen" onClick={() => onToggleFullScreen(true)}>
          <svg viewBox="0 0 27 27" width="27" height="27">
            <use xlinkHref="#full-screen"></use>
          </svg>
          <span>Full screen</span>
        </button>
      </div>
    </div>
  </div>;
};

Player.propTypes = {
  movie: itemShape,
  onTogglePlayButton: PropTypes.func,
  isPlaying: PropTypes.bool,
  isFullScreen: PropTypes.bool,
  currentTime: PropTypes.number,
  fullTime: PropTypes.number,
  onSetFullTime: PropTypes.func,
  onSetCurrentTime: PropTypes.func,
  onToggleFullScreen: PropTypes.func,
  onTogglePlay: PropTypes.func
};

export {Player};

export default compose(
    connect(
        null,
        {
          onTogglePlayButton: ActionCreator.togglePlayButton
        }
    ),
    withPlayer)(Player);
