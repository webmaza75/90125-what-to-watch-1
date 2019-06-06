import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';

const withActiveItem = (Component) => {
  class WithActiveItem extends PureComponent {
    constructor(props) {
      super(props);
      this.state = {
        activeItem: props.activeItem || null,
        prevPropItemId: props.itemId
      };
      this._handleChange = this._handleChange.bind(this);
    }

    static getDerivedStateFromProps(nextProps, prevState) {
      if (prevState.prevPropItemId !== nextProps.itemId) {
        return {
          activeItem: nextProps.activeItem || null,
          prevPropItemId: nextProps.itemId
        };
      }
      return null;
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
        activeItem
      });
    }
  }

  WithActiveItem.propTypes = {
    activeItem: PropTypes.any,
    itemId: PropTypes.string
  };
  return WithActiveItem;
};

export default withActiveItem;
