import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';

import {ValidationErrors} from '../../consts.js';

const withSignInUser = (Component) => {
  class WithSignInUser extends PureComponent {
    constructor(props) {
      super(props);

      this.state = {
        email: ``,
        password: ``,
        validationError: null
      };

      this._onSubmit = this._onSubmit.bind(this);
      this._onChangeEmail = this._onChangeEmail.bind(this);
      this._onChangePassword = this._onChangePassword.bind(this);
    }

    render() {
      const {
        email,
        password,
        validationError
      } = this.state;
      const {error} = this.props;

      return <Component
        {...this.props}
        email={email}
        password={password}
        onSubmit={this._onSubmit}
        onChangeEmail={this._onChangeEmail}
        onChangePassword={this._onChangePassword}
        validationError={validationError || error}
      />;
    }

    _onChangeEmail(event) {
      this.setState({
        email: event.target.value
      });
    }

    _onChangePassword(event) {
      this.setState({
        password: event.target.value
      });
    }

    _validateForm() {
      const {email, password} = this.state;
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

    _onSubmit(event) {
      const {email, password} = this.state;
      const {onSubmit} = this.props;

      event.preventDefault();

      const validationError = this._validateForm();

      if (validationError) {
        this.setState({
          validationError
        });
      } else {
        onSubmit({email, password});
      }
    }
  }

  WithSignInUser.propTypes = {
    onSubmit: PropTypes.func,
    error: PropTypes.string
  };
  return WithSignInUser;
};

export default withSignInUser;
