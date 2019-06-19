import React, {PureComponent} from 'react';

const withAddReview = (Component) => {
  class WithAddReview extends PureComponent {
    constructor(props) {
      super(props);
      this.state = {
        selectedOption: undefined,
        text: null,
        errorMessage: null,
        submiting: false
      };
      this._handleCheck = this._handleCheck.bind(this);
      this._handleChangeText = this._handleChangeText.bind(this);
      this._handleSubmit = this._handleSubmit.bind(this);
    }

    render() {
      const {
        selectedOption,
        validationError,
        submiting,
        text
      } = this.state;

      return <Component
        {...this.props}
        selectedOption={selectedOption}
        text={text}
        validationError={validationError}
        submiting={submiting}
        onCheck={this._handleCheck}
        onChangeText={this._handleChangeText}
        onSubmit={this._handleSubmit}
      />;
    }

    _handleCheck(event) {
      const {text} = this.state;
      const selectedOption = event.target.value;
      const validationError = this._getError(selectedOption, text);

      this.setState({
        selectedOption,
        validationError
      });
    }

    _handleChangeText(event) {
      const {selectedOption} = this.state;
      const text = event.target.value;
      const validationError = this._getError(selectedOption, text);

      this.setState({
        text,
        validationError
      });
    }

    _handleSubmit() {
      this.setState({
        submiting: true
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

    // _handleSubmit(event) {
    //   const {
    //     selectedOption,
    //     text
    //   } = this.state;

    //   const {
    //     onAddComment,
    //     movie,
    //     history
    //   } = this.props;

    //   this.setState({
    //     submiting: true
    //   });

    //   event.preventDefault();
    //   onAddComment(movie.id, {rating: +selectedOption, comment: text})
    //     .then(() => {
    //       history.push(`/film/${movie.id}`);
    //     });
    // }
  }
  return WithAddReview;
};

export default withAddReview;
