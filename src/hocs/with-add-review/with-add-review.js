import React, {PureComponent} from 'react';

const withAddReview = (Component) => {
  class WithAddReview extends PureComponent {
    constructor(props) {
      super(props);
      this.state = {
        selectedOption: null,
        text: null,
        validationError: null,
        isDisabled: true,
        submiting: false
      };
      this._handleCheck = this._handleCheck.bind(this);
      this._handleChangeText = this._handleChangeText.bind(this);
      this._handleSubmit = this._handleSubmit.bind(this);
      this._handleToggleDisabled = this._handleToggleDisabled.bind(this);
    }

    render() {
      const {
        selectedOption,
        text,
        validationError,
        isDisabled,
        submiting
      } = this.state;

      return <Component
        {...this.props}
        selectedOption={selectedOption}
        text={text}
        validationError={validationError}
        onCheck={this._handleCheck}
        onChangeText={this._handleChangeText}
        onSubmit={this._handleSubmit}
        onToggleDisabled = {this._handleToggleDisabled}
        isDisabled={isDisabled}
        submiting={submiting}
      />;
    }

    _handleCheck(event) {
      const {text} = this.state;
      const selectedOption = event.target.value;
      const validationError = this._getError(selectedOption, text);

      this.setState({
        selectedOption,
        validationError,
        isDisabled: validationError ? true : false
      });
    }

    _handleChangeText(event) {
      const {selectedOption} = this.state;
      const text = event.target.value;
      const validationError = this._getError(selectedOption, text);

      this.setState({
        text,
        validationError,
        isDisabled: validationError ? true : false
      });
    }

    _handleSubmit() {
      this.setState({
        submiting: true,
        isDisabled: true
      });
    }

    _handleToggleDisabled(isSubmitButtonDisable, isInputDisable) {
      this.setState({
        isDisabled: isSubmitButtonDisable,
        submiting: isInputDisable
      });
    }

    _getError(selectedOption, text) {
      if (!selectedOption && !text) {
        return `Rating and message are not allowed to be empty.`;
      }
      if (!selectedOption) {
        return `Rating is not allowed to be empty.`;
      }
      if (!text) {
        return `Message is not allowed to be empty.`;
      }
      if (text.length < 50) {
        return `Message is too short (${text.length}). Its length has to be from 50 to 400 characters.`;
      }
      if (text.length > 400) {
        return `Message is too long (${text.length}). Its length has to be from 50 to 400 characters.`;
      }
      return null;
    }
  }
  return WithAddReview;
};

export default withAddReview;
