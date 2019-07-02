import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import {compose} from 'recompose';
import PropTypes from 'prop-types';

import {userInfo} from '../../models.js';
import {
  getUser,
  checkIsRequiredAuthorization
} from '../../reducers/user/selectors.js';

const withPrivateRouter = (Component) => {
  class WithPrivateRouter extends PureComponent {
    constructor(props) {
      super(props);
    }

    render() {
      const {
        user,
        isRequiredAuthorization
      } = this.props;

      if (!user || !user.id || isRequiredAuthorization === true) {
        return <Redirect to={`/login`} />;
      }

      return <Component
        {...this.props}
      />;
    }
  }

  WithPrivateRouter.propTypes = {
    user: userInfo,
    isRequiredAuthorization: PropTypes.bool
  };

  return WithPrivateRouter;
};

const mapStateToProps = (state) => ({
  user: getUser(state),
  isRequiredAuthorization: checkIsRequiredAuthorization(state)
});

export {withPrivateRouter};

export default compose(
    connect(mapStateToProps),
    withPrivateRouter
);
