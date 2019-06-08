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

      return <Component
        {...this.props}
        email={email}
        password={password}
        onSubmit={this._onSubmit}
        onChangeEmail={this._onChangeEmail}
        onChangePassword={this._onChangePassword}
        validationError={validationError}
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

    _onSubmit(event) {
      const {email, password} = this.state;

      event.preventDefault();
      const isEmptyEmail = !email.trim();
      const isEmptyPassword = !password.trim();

      if (isEmptyEmail && isEmptyPassword) {
        this.setState({
          validationError: ValidationErrors.INVALID_EMAIL_AND_PASSWORD
        });
      } else if (isEmptyEmail) {
        this.setState({
          validationError: ValidationErrors.INVALID_EMAIL
        });
      } else if (isEmptyPassword) {
        this.setState({
          validationError: ValidationErrors.INVALID_PASSWORD
        });
      } else {
        this.setState({
          validationError: null
        }, () => this.props.onSubmit({email, password}));
      }
    }
  }

  WithSignInUser.propTypes = {
    onSubmit: PropTypes.func
  };
  return WithSignInUser;
};

export default withSignInUser;
