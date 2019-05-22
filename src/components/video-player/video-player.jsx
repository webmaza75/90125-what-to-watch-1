import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';

class VideoPlayer extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true
    };

    this._videoRef = React.createRef();
  }

  componentDidMount() {
    const video = this._videoRef.current;

    if (!video) {
      return;
    }

    video.oncanplaythrough = () => this.setState({
      isLoading: false,
    });
    video.play();
  }

  componentWillUnmount() {
    const video = this._videoRef.current;

    video.oncanplaythrough = null;
    video.currentTime = null;
    video.play = null;
    video.src = ``;
  }

  render() {
    const {src} = this.props;

    return (<video
      src={src}
      className="player__video"
      ref={this._videoRef}
      muted
    />);
  }
}

VideoPlayer.propTypes = {
  src: PropTypes.string.isRequired,
  isPlaying: PropTypes.bool
};

export default VideoPlayer;
