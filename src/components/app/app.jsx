import React, {Fragment} from 'react';
import {Switch, Route} from 'react-router-dom';

import Main from '../main/main.jsx';
import SignIn from '../sign-in/sign-in.jsx';
import withPrivateRouter from '../../hocs/with-private-router/with-private-router.js';
import withPublicRouter from '../../hocs/with-public-router/with-public-router.js';
import MyList from '../my-list/my-list.jsx';
import MovieDetails from '../movie-details/movie-details.jsx';
import GlobalIcons from '../global-icons/global-icons.jsx';
import AddReview from '../add-review/add-review.jsx';
import ErrorPage from '../error-page/error-page.jsx';

const PrivateRouterWrapper = withPrivateRouter(MyList);
const PublicRouterWrapper = withPublicRouter(SignIn);
const AddReviewRouterWrapper = withPrivateRouter(AddReview);


const App = () => (
  <Switch>
    <Fragment>
      <GlobalIcons />
      <Route path={`/`} exact component={Main} />
      <Route path={`/login`} component={PublicRouterWrapper} />
      <Route path={`/mylist`} component={PrivateRouterWrapper} />
      <Route path={`/film/:id/review`} component={AddReviewRouterWrapper} />
      <Route path={`/film/:id`} exact component={MovieDetails} />
      <Route path={`/500`} component={ErrorPage} />
    </Fragment>
  </Switch>
);

export default App;
