import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {compose} from 'recompose';

import ExtendedHeader from '../extended-header/extended-header.jsx';
import {
  itemShape,
  userInfo
} from '../../models.js';
import {
  getMovieById
} from '../../reducers/films/selectors.js';
import {getUser} from '../../reducers/user/selectors.js';
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
      user,
      movie,
      selectedOption,
      validationError,
      submiting,
      // text,
      // errorMessage,
      onCheck,
      onChangeText
    } = this.props;

    if (!movie) {
      return null;
    }

    const {
      title,
      posterImage,
      backgroundImage
    } = movie;

    // const {
    //   selectedOption,
    //   validationError,
    //   submiting
    // } = this.state;

    return <section className="movie-card movie-card--full">
      <div className="movie-card__header">
        <div className="movie-card__bg">
          <img src={backgroundImage} alt={title} />
        </div>

        <h1 className="visually-hidden">WTW</h1>

        <ExtendedHeader
          user={user}
          movie={movie}
        />

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
              <input className="rating__input" id="star-1" type="radio" name="rating" value="1" disabled={submiting} checked={selectedOption === `1`} onChange={(event) => onCheck(event)} />
              <label className="rating__label" htmlFor="star-1">Rating 1</label>

              <input className="rating__input" id="star-2" type="radio" name="rating" value="2" disabled={submiting} checked={selectedOption === `2`} onChange={(event) => onCheck(event)} />
              <label className="rating__label" htmlFor="star-2">Rating 2</label>

              <input className="rating__input" id="star-3" type="radio" name="rating" value="3" disabled={submiting} checked={selectedOption === `3`} onChange={(event) => onCheck(event)} />
              <label className="rating__label" htmlFor="star-3">Rating 3</label>

              <input className="rating__input" id="star-4" type="radio" name="rating" value="4" disabled={submiting} checked={selectedOption === `4`} onChange={(event) => onCheck(event)} />
              <label className="rating__label" htmlFor="star-4">Rating 4</label>

              <input className="rating__input" id="star-5" type="radio" name="rating" value="5" disabled={submiting} checked={selectedOption === `5`} onChange={(event) => onCheck(event)} />
              <label className="rating__label" htmlFor="star-5">Rating 5</label>
            </div>
          </div>

          <div className="add-review__text">
            <textarea className="add-review__textarea" name="review-text" id="review-text" placeholder="Review text" readOnly={submiting} maxLength={MAX_TEXTAREA_LENGHT} onChange={
              (event) => onChangeText(event)
            }></textarea>
            <div className="add-review__submit">
              <button className="add-review__btn" type="submit" disabled={validationError || submiting}>Post</button>
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
      onSubmit
    } = this.props;

    onSubmit();

    event.preventDefault();
    onAddComment(movie.id, {rating: +selectedOption, comment: text})
      .then(() => {
        history.push(`/film/${movie.id}`);
      });
  }
}

AddReview.propTypes = {
  movie: itemShape,
  user: userInfo,
  history: PropTypes.object,
  onAddComment: PropTypes.func,
  text: PropTypes.string,
  selectedOption: PropTypes.string,
  validationError: PropTypes.string,
  submiting: PropTypes.bool,
  onCheck: PropTypes.func,
  onChangeText: PropTypes.func,
  onSubmit: PropTypes.func
};

const mapStateToProps = (state, {match}) => ({
  movie: getMovieById(state, match.params.id),
  user: getUser(state)
});

export {AddReview};

export default compose(
    connect(
        mapStateToProps,
        {
          onAddComment: Operation.addComment
        }
    ),
    withAddReview)(AddReview);
