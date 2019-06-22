import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';

import {getUser} from '../../reducers/user/selectors.js';
import {userInfo} from '../../models.js';

const withSignInRouter = (Component) => {
  class WithSignInRouter extends PureComponent {
    constructor(props) {
      super(props);
    }

    render() {
      const {
        user
      } = this.props;

      if (user && user.id) {
        return <Redirect to="/" />;
      }

      return <Component
        {...this.props}
      />;
    }
  }

  WithSignInRouter.propTypes = {
    user: userInfo
  };

  const mapStateToProps = (state) => ({
    user: getUser(state)
  });

  const wrapper = connect(mapStateToProps)(WithSignInRouter);

  return wrapper;
};

export default withSignInRouter;
