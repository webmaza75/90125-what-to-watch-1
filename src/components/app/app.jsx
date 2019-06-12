import React from 'react';
import {Switch, Route} from 'react-router-dom';

import Main from '../main/main.jsx';
import SignIn from '../sign-in/sign-in.jsx';
import withSignInUser from '../../hocs/with-sign-in-user/with-sign-in-user.js';
import {withPrivateRouter} from '../../hocs/with-private-router/with-private-router.js';
import MyList from '../my-list/my-list.jsx';
const SignInWrapped = withSignInUser(SignIn);
const PrivateRouterWrapper = withPrivateRouter(MyList);

const App = () => (
  <Switch>
    <Route path={`/`} exact component={Main} />
    <Route path={`/login`} component={SignInWrapped} />
    <Route path={`/mylist`} component={PrivateRouterWrapper} />
  </Switch>
);

export default App;
