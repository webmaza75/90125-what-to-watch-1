import React from 'react';
import PropTypes from 'prop-types';

import {
  getCommentDate,
  formatRating
} from '../../utils.js';
import {reviewShape} from '../../models.js';

const ReviewBlock = ({list}) => {
  return list.map((pair) => {
    return <div className="movie-card__reviews movie-card__row" key={pair[0].id}>
      {pair.map(({user, rating, comment, date, id}) => {
        const newDate = getCommentDate(date);
        return <div className="movie-card__reviews-col" key={id}>
          <div className="review" key={id}>
            <blockquote className="review__quote">
              <p className="review__text">
                {comment}
              </p>

              <footer className="review__details">
                <cite className="review__author">{user.name}</cite>
                <time className="review__date" dateTime={newDate.dateTime}>{newDate.date}</time>
              </footer>
            </blockquote>

            <div className="review__rating">{formatRating(rating)}</div>
          </div>
        </div>;
      })}
    </div>;
  });
};

ReviewBlock.propTypes = {
  list: PropTypes.arrayOf(PropTypes.arrayOf(reviewShape)),
  idx: PropTypes.string
};


export default ReviewBlock;
