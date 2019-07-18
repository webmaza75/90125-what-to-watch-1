import React, {Fragment, PureComponent} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {compose} from 'recompose';
import {NotificationManager} from 'react-notifications';

import ExtendedHeader from '../extended-header/extended-header.jsx';
import {
  itemShape
} from '../../models.js';
import {
  getMovieById
} from '../../reducers/films/selectors.js';
import {TextareaLengths} from '../../consts.js';
import {Operation} from '../../reducers/films/films.js';
import withAddReview from '../../hocs/with-add-review/with-add-review.js';
import {
  historyShape,
  matchShape
} from '../../models.js';

class AddReview extends PureComponent {
  constructor(props) {
    super(props);

    this._handleFormSubmit = this._handleFormSubmit.bind(this);
  }

  render() {
    const {
      movie,
      selectedOption,
      validationError,
      onInputCheck,
      onTextChange,
      isDisabled,
      submiting
    } = this.props;

    if (!movie) {
      return null;
    }

    const {
      title,
      posterImage,
      backgroundImage
    } = movie;

    return <section className="movie-card movie-card--full">
      <div className="movie-card__header">
        <div className="movie-card__bg">
          <img src={backgroundImage} alt={title} />
        </div>

        <h1 className="visually-hidden">WTW</h1>

        <ExtendedHeader movie={movie} />

        <div className="movie-card__poster movie-card__poster--small">
          <img src={posterImage} alt={`${title} poster`} width="218" height="327" />
        </div>
      </div>

      <div className="add-review" onSubmit={this._handleFormSubmit}>
        <form action="#" className="add-review__form">
          {validationError && <div className="sign-in__message">
            <p>{validationError}</p>
          </div>}
          <div className="rating">
            <div className="rating__stars">
              {[1, 2, 3, 4, 5].map((i) => {
                return <Fragment key={`star-${i}`}>
                  <input
                    className="rating__input"
                    id={`star-${i}`}
                    type="radio"
                    name="rating"
                    value={`${i}`}
                    disabled={submiting}
                    checked={selectedOption === `${i}`}
                    onChange={onInputCheck}
                  />
                  <label
                    className="rating__label"
                    htmlFor={`star-${i}`}
                  >
                    {`Rating ${i}`}
                  </label>
                </Fragment>;
              })}
            </div>
          </div>

          <div className="add-review__text">
            <textarea className="add-review__textarea" name="review-text" id="review-text" placeholder="Review text" readOnly={submiting} maxLength={TextareaLengths.MAX_TEXTAREA_LENGHT} onChange={onTextChange
            }></textarea>
            <div className="add-review__submit">
              <button className="add-review__btn" type="submit" disabled={isDisabled}>Post</button>
            </div>

          </div>
        </form>
      </div>
    </section>;
  }

  _handleFormSubmit(event) {
    const {
      onAddComment,
      movie,
      history,
      selectedOption,
      text,
      onFormSubmit,
      onToggleDisabled
    } = this.props;
    onFormSubmit();

    event.preventDefault();
    onAddComment(movie.id, {rating: +selectedOption, comment: text})
      .then(() => {
        onToggleDisabled(true, false);
        history.push(`/film/${movie.id}`);
      })
      .catch((error) => {
        onToggleDisabled(false, false);
        return NotificationManager.error(error.message);
      });
  }
}

AddReview.propTypes = {
  movie: itemShape,
  history: historyShape,
  onAddComment: PropTypes.func,
  text: PropTypes.string,
  selectedOption: PropTypes.string,
  validationError: PropTypes.string,
  isDisabled: PropTypes.bool,
  onInputCheck: PropTypes.func,
  onTextChange: PropTypes.func,
  onFormSubmit: PropTypes.func,
  onToggleDisabled: PropTypes.func,
  submiting: PropTypes.bool,
  match: matchShape
};

const mapStateToProps = (state, {match}) => ({
  movie: getMovieById(state, match.params.id)
});

const mapDispatchToProps = {
  onAddComment: Operation.addComment
};

export {AddReview};

export default compose(
    connect(
        mapStateToProps,
        mapDispatchToProps
    ),
    withAddReview)(AddReview);
