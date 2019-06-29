import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';

class VideoPlayer extends PureComponent {
  constructor(props) {
    super(props);

    this._videoRef = React.createRef();
  }

  componentDidMount() {
    const {
      isPlaying,
      onSetCurrentTime,
      onSetFullTime
    } = this.props;
    const video = this._videoRef.current;

    if (!video) {
      return;
    }
    if (onSetFullTime) {
      video.oncanplaythrough = () => onSetFullTime(Math.floor(video.duration));
    }

    if (isPlaying) {
      video.play();
    }

    if (onSetCurrentTime) {
      video.ontimeupdate = () => onSetCurrentTime(video.currentTime);
    }
  }

  componentDidUpdate(prevProps) {
    const {
      isPlaying,
      isFullScreen,
      onToggleFullScreen,
      isNeedReload
    } = this.props;

    const video = this._videoRef.current;
    if (!video) {
      return;
    }

    if (prevProps.isPlaying !== isPlaying) {

      if (isPlaying) {
        video.play();
      } else {
        if (isNeedReload) {
          video.load();
        } else {
          video.pause();
        }
      }
    }

    if (prevProps.isFullScreen !== isFullScreen) {
      let fullScreen = null;

      if (isFullScreen) {
        if (video.requestFullscreen) {
          fullScreen = video.requestFullscreen();
        } else if (video.mozRequestFullScreen) {
          fullScreen = video.mozRequestFullScreen();
        } else if (video.webkitRequestFullscreen) {
          fullScreen = video.webkitRequestFullscreen();
        } else if (video.msRequestFullscreen) {
          fullScreen = video.msRequestFullscreen();
        }
      }
      if (fullScreen) {
        video.onfullscreenchange = () => onToggleFullScreen(false);
      }
    }
  }

  componentWillUnmount() {
    const video = this._videoRef.current;
    const {onToggleFullScreen} = this.props;

    if (video && onToggleFullScreen) {
      video.oncanplaythrough = null;
      video.ontimeupdate = null;
      video.onfullscreenchange = null;
    }
  }

  render() {
    const {src, poster} = this.props;

    return (<video
      src={src}
      className="player__video"
      ref={this._videoRef}
      poster={poster}
      muted
    />);
  }
}

VideoPlayer.propTypes = {
  src: PropTypes.string.isRequired,
  isPlaying: PropTypes.bool,
  onSetCurrentTime: PropTypes.func,
  onSetFullTime: PropTypes.func,
  isFullScreen: PropTypes.bool,
  poster: PropTypes.string,
  onToggleFullScreen: PropTypes.func,
  isNeedReload: PropTypes.bool
};

export default VideoPlayer;
