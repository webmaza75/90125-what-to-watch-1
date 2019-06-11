import React, {PureComponent} from 'react';

const withSignInUser = (Component) => {
  class WithSignInUser extends PureComponent {
    constructor(props) {
      super(props);

      this.state = {
        email: ``,
        password: ``
      };

      this._onChangeEmail = this._onChangeEmail.bind(this);
      this._onChangePassword = this._onChangePassword.bind(this);
    }

    render() {
      const {
        email,
        password
      } = this.state;

      return <Component
        {...this.props}
        email={email}
        password={password}
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
  }

  return WithSignInUser;
};

export default withSignInUser;
