import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';

import Header from '../../components/header/header.jsx';
import {getUser} from '../../reducers/user/selectors.js';

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
    user: Header.propTypes.user
  };

  const mapStateToProps = (state) => ({
    user: getUser(state)
  });

  const wrapper = connect(mapStateToProps)(WithPrivateRouter);

  return wrapper;
};

export {withPrivateRouter};
