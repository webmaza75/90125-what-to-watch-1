import React, {Fragment, PureComponent} from 'react';
import {Switch, Route} from 'react-router-dom';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import Main from '../main/main.jsx';
import SignIn from '../sign-in/sign-in.jsx';
import withPrivateRouter from '../../hocs/with-private-router/with-private-router.js';
import withPublicRouter from '../../hocs/with-public-router/with-public-router.js';
import MyList from '../my-list/my-list.jsx';
import MovieDetails from '../movie-details/movie-details.jsx';
import GlobalIcons from '../global-icons/global-icons.jsx';
import AddReview from '../add-review/add-review.jsx';
import {Operation} from '../../reducers/user/user.js';
import {checkIsLoadedUserInfo} from '../../reducers/user/selectors.js';

const PrivateRouterWrapper = withPrivateRouter(MyList);
const PublicRouterWrapper = withPublicRouter(SignIn);
const AddReviewRouterWrapper = withPrivateRouter(AddReview);


class App extends PureComponent {
  componentDidMount() {
    const {onUserCheck} = this.props;
    onUserCheck();
  }

  render() {
    const {isLoadedUserInfo} = this.props;
    if (!isLoadedUserInfo) {
      return null;
    }

    return <Switch>
      <Fragment>
        <GlobalIcons />
        <Route path={`/`} exact component={Main} />
        <Route path={`/login`} component={PublicRouterWrapper} />
        <Route path={`/mylist`} component={PrivateRouterWrapper} />
        <Route path={`/film/:id/review`} component={AddReviewRouterWrapper} />
        <Route path={`/film/:id`} exact component={MovieDetails} />
      </Fragment>
    </Switch>;
  }
}

App.propTypes = {
  onUserCheck: PropTypes.func,
  isLoadedUserInfo: PropTypes.bool
};

const mapStateToProps = (state) => ({
  isLoadedUserInfo: checkIsLoadedUserInfo(state)
});

const mapDispatchToProps = {
  onUserCheck: Operation.checkUser,
};

export {App};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App);
