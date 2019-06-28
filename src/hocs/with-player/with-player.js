import React, {PureComponent} from 'react';

const withPlayer = (Component) => {
  class WithPlayer extends PureComponent {
    constructor(props) {
      super(props);
      this.state = {
        isPlaying: false,
        isFullScreen: false,
        currentTime: 0,
        fullTime: 0
      };
      this._handleTogglePlay = this._handleTogglePlay.bind(this);
      this._setCurrentTime = this._setCurrentTime.bind(this);
      this._setFullTime = this._setFullTime.bind(this);
      this._handleToggleFullScreen = this._handleToggleFullScreen.bind(this);
    }

    render() {
      const {
        isPlaying,
        isFullScreen,
        currentTime,
        fullTime
      } = this.state;

      return <Component
        {...this.props}
        isPlaying={isPlaying}
        isFullScreen={isFullScreen}
        currentTime={currentTime}
        fullTime={fullTime}
        onSetFullTime={this._setFullTime}
        onSetCurrentTime={this._setCurrentTime}
        onToggleFullScreen={this._handleToggleFullScreen}
        onTogglePlay={this._handleTogglePlay}
      />;
    }

    _handleTogglePlay() {
      const {isPlaying} = this.state;
      this.setState({
        isPlaying: !isPlaying
      });
    }

    _handleToggleFullScreen(state) {
      this.setState({
        isFullScreen: state
      });
    }

    _setCurrentTime(time) {
      this.setState({
        currentTime: Math.floor(time)
      });
    }

    _setFullTime(time) {
      this.setState({
        fullTime: time
      });
    }
  }
  return WithPlayer;
};

export default withPlayer;
