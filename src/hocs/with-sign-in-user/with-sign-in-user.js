import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';

const withSignInUser = (Component) => {
  class WithSignInUser extends PureComponent {
    constructor(props) {
      super(props);

      this.state = {
        email: ``,
        password: ``
      };

      this._onSubmit = this._onSubmit.bind(this);
      this._onChangeEmail = this._onChangeEmail.bind(this);
      this._onChangePassword = this._onChangePassword.bind(this);
    }

    render() {
      const {email, password} = this.state;
      return <Component
        {...this.props}
        email={email}
        password={password}
        onSubmit={this._onSubmit}
        onChangeEmail={this._onChangeEmail}
        onChangePassword={this._onChangePassword}
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
      if (email && password) {
        this.props.onSubmit({email, password});
      }
    }
  }

  WithSignInUser.propTypes = {
    onSubmit: PropTypes.func,
  };
  return WithSignInUser;
};

export default withSignInUser;
