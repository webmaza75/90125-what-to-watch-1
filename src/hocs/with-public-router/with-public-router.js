import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import {compose} from 'recompose';

import {getUser} from '../../reducers/user/selectors.js';
import {userInfo} from '../../models.js';

const withPublicRouter = (Component) => {
  class WithPublicRouter extends PureComponent {
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

  WithPublicRouter.propTypes = {
    user: userInfo
  };

  return WithPublicRouter;
};

const mapStateToProps = (state) => ({
  user: getUser(state)
});

export {withPublicRouter};

export default compose(
    connect(mapStateToProps),
    withPublicRouter
);
