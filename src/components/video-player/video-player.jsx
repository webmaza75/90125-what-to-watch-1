import React, {Component} from 'react';
import PropTypes from 'prop-types';

class VideoPlayer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true
    };

    this._videoRef = React.createRef();
    this._handleButtonClick = this._handleButtonClick.bind(this);
  }

  componentDidMount() {
    const {src} = this.props;
    const video = this._videoRef.current;

    video.src = src;

    video.oncanplaythrough = () => this.setState({
      isLoading: false,
    });
  }

  componentDidUpdate() {
    const video = this._videoRef.current;

    if (this.props.isPlaying) {
      video.play();
    } else {
      video.pause();
    }
  }

  componentWillUnmount() {
    const video = this._videoRef.current;

    video.oncanplaythrough = null;
    video.currentTime = null;
    video.ontimeupdate = null;
    video.pause = null;
    video.play = null;
    video.src = ``;
  }

  _handleButtonClick() {
    this.props.onPlayButtonClick();
  }

  render() {
    const {src, poster} = this.props;

    return (<video
      src={src}
      className="player__video"
      poster={poster}
      ref={this._videoRef}
      muted
    />);
  }
}

VideoPlayer.propTypes = {
  src: PropTypes.string.isRequired,
  isPlaying: PropTypes.boolean,
  onPlayButtonClick: PropTypes.func.isRequired,
  poster: PropTypes.string.isRequired
};

export default VideoPlayer;
