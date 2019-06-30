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
import ErrorPage from '../error-page/error-page.jsx';
import {Operation} from '../../reducers/user/user.js';

const PrivateRouterWrapper = withPrivateRouter(MyList);
const PublicRouterWrapper = withPublicRouter(SignIn);
const AddReviewRouterWrapper = withPrivateRouter(AddReview);


class App extends PureComponent {
  componentDidMount() {
    const {onCheckUser} = this.props;
    onCheckUser();
  }

  render() {
    return <Switch>
      <Fragment>
        <GlobalIcons />
        <Route path={`/`} exact component={Main} />
        <Route path={`/login`} component={PublicRouterWrapper} />
        <Route path={`/mylist`} component={PrivateRouterWrapper} />
        <Route path={`/film/:id/review`} component={AddReviewRouterWrapper} />
        <Route path={`/film/:id`} exact component={MovieDetails} />
        <Route path={`/500`} component={ErrorPage} />
      </Fragment>
    </Switch>;
  }
}

App.propTypes = {
  onCheckUser: PropTypes.func,
};

const mapDispatchToProps = {
  onCheckUser: Operation.checkUser,
};

export {App};

export default connect(
    null,
    mapDispatchToProps
)(App);
