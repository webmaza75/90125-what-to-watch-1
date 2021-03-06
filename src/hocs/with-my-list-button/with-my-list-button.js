import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import {checkIsAuthorizedUser} from '../../reducers/user/selectors.js';
import {Operation} from '../../reducers/films/films.js';

const FavoriteStatus = {
  ADD_TO_FAVORITE_LIST: 1,
  REMOVE_FROM_FAVORITE_LIST: 0
};

const withMyListButton = (Component) => {
  class WithMyListButton extends PureComponent {
    constructor(props) {
      super(props);

      this.state = {
        needRedirect: false
      };
      this._handleMyListClick = this._handleMyListClick.bind(this);
    }

    render() {
      const {needRedirect} = this.state;

      return <Component
        {...this.props}
        needRedirect={needRedirect}
        onMyListClick={this._handleMyListClick}
      />;
    }

    _handleMyListClick(event) {
      event.preventDefault();

      const {
        id,
        isAuthorized,
        onToggleFavorite,
        isFavorite
      } = this.props;

      if (!isAuthorized) {
        this.setState({
          needRedirect: true
        });
      } else {
        if (isFavorite) {
          onToggleFavorite(id, FavoriteStatus.REMOVE_FROM_FAVORITE_LIST);
        } else {
          onToggleFavorite(id, FavoriteStatus.ADD_TO_FAVORITE_LIST);
        }
      }
    }
  }

  WithMyListButton.propTypes = {
    id: PropTypes.number,
    isAuthorized: PropTypes.bool,
    onToggleFavorite: PropTypes.func,
    isFavorite: PropTypes.bool
  };

  const mapStateToProps = (state) => ({
    isAuthorized: checkIsAuthorizedUser(state)
  });

  const mapDispatchToProps = {
    onToggleFavorite: Operation.toggleFavorite
  };

  const wrapper = connect(
      mapStateToProps,
      mapDispatchToProps
  )(WithMyListButton);

  return wrapper;
};

export default withMyListButton;
