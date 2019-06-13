import React from 'react';
import {Switch, Route} from 'react-router-dom';

import Main from '../main/main.jsx';
import SignIn from '../sign-in/sign-in.jsx';
import withPrivateRouter from '../../hocs/with-private-router/with-private-router.js';
import MyList from '../my-list/my-list.jsx';
import MovieDetails from '../movie-details/movie-details.jsx';

const PrivateRouterWrapper = withPrivateRouter(MyList);

const App = () => (
  <Switch>
    <Route path={`/`} exact component={Main} />
    <Route path={`/login`} component={SignIn} />
    <Route path={`/mylist`} component={PrivateRouterWrapper} />
    <Route path={`/film/:id`} exact component={MovieDetails} />
  </Switch>
);

export default App;
