import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import {compose} from 'recompose';

import {getUser} from '../../reducers/user/selectors.js';
import {userInfo} from '../../models.js';

const withPrivateRouter = (Component) => {
  class WithPrivateRouter extends PureComponent {
    constructor(props) {
      super(props);
    }

    render() {
      const {
        user
      } = this.props;

      if (!user || !user.id) {
        return <Redirect to={`/login`} />;
      }

      return <Component
        {...this.props}
      />;
    }
  }

  WithPrivateRouter.propTypes = {
    user: userInfo
  };

  return WithPrivateRouter;
};

const mapStateToProps = (state) => ({
  user: getUser(state)
});

export {withPrivateRouter};

export default compose(
    connect(mapStateToProps),
    withPrivateRouter
);
