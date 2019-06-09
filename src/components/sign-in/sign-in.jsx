import React, {Fragment} from 'react';
import PropTypes from 'prop-types';

import SignInHeader from '../sign-in-header/sign-in-header.jsx';
import GlobalIcons from '../global-icons/global-icons.jsx';
import Footer from '../footer/footer.jsx';

const SignIn = (props) => {
  const {
    email,
    password,
    onSubmit,
    onChangeEmail,
    onChangePassword,
    validationError
  } = props;

  return <Fragment>
    <GlobalIcons />
    <div className="user-page">
      <SignInHeader />

      <div className="sign-in user-page__content">
        <form className="sign-in__form" onSubmit={(event) => onSubmit(event)}>
          {validationError && <div className="sign-in__message">
            <p>{validationError}</p>
          </div>}
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
      <Footer />
    </div>
  </Fragment>;
};

SignIn.propTypes = {
  email: PropTypes.string,
  password: PropTypes.string,
  onSubmit: PropTypes.func,
  onChangeEmail: PropTypes.func,
  onChangePassword: PropTypes.func,
  validationError: PropTypes.string
};

export default SignIn;
