import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';

const withActiveItem = (Component) => {
  class WithActiveItem extends PureComponent {
    constructor(props) {
      super(props);
      this.state = {
        activeItem: props.activeItem ? props.activeItem : null
      };
      this._handleChange = this._handleChange.bind(this);
    }

    render() {
      const {activeItem} = this.state;
      return <Component
        {...this.props}
        activeItem={activeItem}
        onChange={this._handleChange}
      />;
    }

    _handleChange(activeItem) {
      this.setState({
        activeItem: activeItem
      });
    }
  }

  WithActiveItem.propTypes = {
    activeItem: PropTypes.any
  };
  return WithActiveItem;
};

export default withActiveItem;
