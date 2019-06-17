import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';

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
        return <Redirect to={`/`} />;
      }

      return <Component
        {...this.props}
      />;
    }
  }

  WithPublicRouter.propTypes = {
    user: userInfo
  };

  const mapStateToProps = (state) => ({
    user: getUser(state)
  });

  const wrapper = connect(mapStateToProps)(WithPublicRouter);

  return wrapper;
};

export default withPublicRouter;
