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
      this._handleCurrentTimeSet = this._handleCurrentTimeSet.bind(this);
      this._handleFullTimeSet = this._handleFullTimeSet.bind(this);
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
        onFullTimeSet={this._handleFullTimeSet}
        onCurrentTimeSet={this._handleCurrentTimeSet}
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

    _handleCurrentTimeSet(time) {
      this.setState({
        currentTime: Math.floor(time)
      });
    }

    _handleFullTimeSet(time) {
      this.setState({
        fullTime: time
      });
    }
  }
  return WithPlayer;
};

export default withPlayer;
