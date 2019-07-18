import React, {PureComponent} from 'react';

import {TextareaLengths} from '../../consts.js';

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
      this._handleInputCheck = this._handleInputCheck.bind(this);
      this._handleTextChange = this._handleTextChange.bind(this);
      this._handleFormSubmit = this._handleFormSubmit.bind(this);
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
        onInputCheck={this._handleInputCheck}
        onTextChange={this._handleTextChange}
        onFormSubmit={this._handleFormSubmit}
        onToggleDisabled = {this._handleToggleDisabled}
        isDisabled={isDisabled}
        submiting={submiting}
      />;
    }

    _handleInputCheck(event) {
      const {text} = this.state;
      const selectedOption = event.target.value;
      const validationError = this._getError(selectedOption, text);

      this.setState({
        selectedOption,
        validationError,
        isDisabled: validationError ? true : false
      });
    }

    _handleTextChange(event) {
      const {selectedOption} = this.state;
      const text = event.target.value;
      const validationError = this._getError(selectedOption, text);

      this.setState({
        text,
        validationError,
        isDisabled: validationError ? true : false
      });
    }

    _handleFormSubmit() {
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
      if (text.length < TextareaLengths.MIN_TEXTAREA_LENGHT) {
        return `Message is too short (${text.length}). Its length has to be from 50 to 400 characters.`;
      }
      if (text.length > TextareaLengths.MAX_TEXTAREA_LENGHT) {
        return `Message is too long (${text.length}). Its length has to be from 50 to 400 characters.`;
      }
      return null;
    }
  }
  return WithAddReview;
};

export default withAddReview;
