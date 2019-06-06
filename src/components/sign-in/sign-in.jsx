import React, {Fragment} from 'react';
import PropTypes from 'prop-types';

import Header from '../header/header.jsx';
import PreHeader from '../pre-header/pre-header.jsx';
import Logo from '../logo/logo.jsx';

const SignIn = (props) => {
  const {
    email,
    password,
    onSubmit,
    onChangeEmail,
    onChangePassword
  } = props;

  return <Fragment>
    <PreHeader />
    <div className="user-page">
      <Header
        isRequiredAuthentication={true}
        pageType={`signIn`}
      />

      <div className="sign-in user-page__content">
        <form className="sign-in__form" onSubmit={(event) => onSubmit(event)}>
          <div className="sign-in__fields">
            <div className="sign-in__field">
              <input
                className="sign-in__input"
                type="email"
                placeholder="Email address"
                name="user-email"
                id="user-email"
                value={email}
                onChange={(event) => onChangeEmail(event)}
              />
              <label className="sign-in__label visually-hidden" htmlFor="user-email">Email address</label>
            </div>
            <div className="sign-in__field">
              <input
                className="sign-in__input"
                type="password"
                placeholder="Password"
                name="user-password"
                id="user-password"
                value={password}
                onChange={(event) => onChangePassword(event)}
              />
              <label className="sign-in__label visually-hidden" htmlFor="user-password">Password</label>
            </div>
          </div>
          <div className="sign-in__submit">
            <button className="sign-in__btn" type="submit">Sign in</button>
          </div>
        </form>
      </div>

      <footer className="page-footer">
        <Logo invert={true} />

        <div className="copyright">
          <p>© 2019 What to watch Ltd.</p>
        </div>
      </footer>
    </div>
  </Fragment>;
};

SignIn.propTypes = {
  email: PropTypes.string,
  password: PropTypes.string,
  onSubmit: PropTypes.func,
  onChangeEmail: PropTypes.func,
  onChangePassword: PropTypes.func
};

export default SignIn;
