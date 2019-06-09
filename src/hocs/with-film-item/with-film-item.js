import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';

const withFilmItem = (Component) => {
  class WithFilmItem extends PureComponent {
    constructor(props) {
      super(props);

      this.state = {
        isPlaying: false
      };

      this._handleMouseOver = this._handleMouseOver.bind(this);
      this._handleMouseOut = this._handleMouseOut.bind(this);
      this._timeOut = null;
    }

    componentWillUnmount() {
      clearTimeout(this._timeOut);
    }

    render() {
      const {isPlaying} = this.state;

      return <Component
        {...this.props}
        isPlaying={isPlaying}
        onMouseOver={this._handleMouseOver}
        onMouseOut={this._handleMouseOut}
      />;
    }


    _handleMouseOver(item) {
      const {onHover} = this.props;
      onHover(item);
      this._timeOut = setTimeout(() => {
        if (this._timeOut) {
          this.setState({
            isPlaying: true
          });
        }
      }, 1000);
    }

    _handleMouseOut() {
      clearTimeout(this._timeOut);
      this.setState({
        isPlaying: false
      });
    }
  }

  WithFilmItem.propTypes = {
    onHover: PropTypes.func
  };

  return WithFilmItem;

};

export default withFilmItem;
