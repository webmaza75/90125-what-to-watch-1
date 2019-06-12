import React, {Fragment, PureComponent} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {Redirect} from 'react-router-dom';

import SignInHeader from '../sign-in-header/sign-in-header.jsx';
import GlobalIcons from '../global-icons/global-icons.jsx';
import Footer from '../footer/footer.jsx';
import {Operation} from '../../reducers/user/user.js';
import {ValidationErrors} from '../../consts.js';
import Header from '../header/header.jsx';
import {
  getUser,
  getError,
  getValidationError
} from '../../reducers/user/selectors.js';
import {ActionCreator} from '../../actions/actions.js';

class SignIn extends PureComponent {
  constructor(props) {
    super(props);
    this._handleSubmit = this._handleSubmit.bind(this);
  }

  render() {
    const {
      user,
      email,
      password,
      onChangePassword,
      onChangeEmail,
      error,
      validationError
    } = this.props;
    const errorMessage = validationError || error;

    if (user && user.id) {
      return <Redirect to={`/`} />;
    }

    return <Fragment>
      <GlobalIcons />
      <div className="user-page">
        <SignInHeader />

        <div className="sign-in user-page__content">
          <form className="sign-in__form" onSubmit={(event) => this._handleSubmit(event)}>
            {errorMessage && <div className="sign-in__message">
              <p>{errorMessage}</p>
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
  }

  _getError() {
    const {email, password} = this.props;
    const isEmptyEmail = !email.trim();
    const isEmptyPassword = !password.trim();

    if (isEmptyEmail && isEmptyPassword) {
      return ValidationErrors.INVALID_EMAIL_AND_PASSWORD;
    }

    if (isEmptyEmail) {
      return ValidationErrors.INVALID_EMAIL;
    }

    if (isEmptyPassword) {
      return ValidationErrors.INVALID_PASSWORD;
    }
    return null;
  }

  _handleSubmit(event) {
    const {email, password, onLogin, onSetError, onResetErrors, history} = this.props;
    const validationError = this._getError();

    event.preventDefault();

    if (!validationError) {
      onResetErrors();
      onLogin({email, password})
        .then(() => {
          if (history.length > 1) {
            history.goBack();
          } else {
            history.push(`/`);
          }
        });
    } else {
      onSetError(validationError);
    }
  }
}

SignIn.propTypes = {
  email: PropTypes.string,
  password: PropTypes.string,
  onChangeEmail: PropTypes.func,
  onChangePassword: PropTypes.func,
  onLogin: PropTypes.func,
  onSetError: PropTypes.func,
  onResetErrors: PropTypes.func,
  user: Header.propTypes.user,
  history: PropTypes.object,
  error: PropTypes.object,
  validationError: PropTypes.string
};

const mapStateToProps = (state) => ({
  user: getUser(state),
  error: getError(state),
  validationError: getValidationError(state)
});

export {SignIn};

export default connect(
    mapStateToProps,
    {
      onLogin: Operation.signInUser,
      onSetError: ActionCreator.setSignInError,
      onResetErrors: ActionCreator.resetErrors
    }
)(SignIn);
