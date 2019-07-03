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
import {MAX_TEXTAREA_LENGHT} from '../../consts.js';
import {Operation} from '../../reducers/films/films.js';
import withAddReview from '../../hocs/with-add-review/with-add-review.js';

class AddReview extends PureComponent {
  constructor(props) {
    super(props);

    this._handleSubmit = this._handleSubmit.bind(this);
  }

  render() {
    const {
      movie,
      selectedOption,
      validationError,
      onCheck,
      onChangeText,
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

      <div className="add-review" onSubmit={(event) => this._handleSubmit(event)}>
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
                    onChange={
                      (event) => onCheck(event)
                    }
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
            <textarea className="add-review__textarea" name="review-text" id="review-text" placeholder="Review text" readOnly={submiting} maxLength={MAX_TEXTAREA_LENGHT} onChange={
              (event) => onChangeText(event)
            }></textarea>
            <div className="add-review__submit">
              <button className="add-review__btn" type="submit" disabled={isDisabled}>Post</button>
            </div>

          </div>
        </form>
      </div>
    </section>;
  }

  _handleSubmit(event) {
    const {
      onAddComment,
      movie,
      history,
      selectedOption,
      text,
      onSubmit,
      onToggleDisabled
    } = this.props;

    onSubmit();

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
  history: PropTypes.object,
  onAddComment: PropTypes.func,
  text: PropTypes.string,
  selectedOption: PropTypes.string,
  validationError: PropTypes.string,
  isDisabled: PropTypes.bool,
  onCheck: PropTypes.func,
  onChangeText: PropTypes.func,
  onSubmit: PropTypes.func,
  onToggleDisabled: PropTypes.func,
  submiting: PropTypes.bool
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
