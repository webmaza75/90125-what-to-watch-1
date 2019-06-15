import PropTypes from 'prop-types';

export const userInfo = PropTypes.shape({
  id: PropTypes.number,
  name: PropTypes.string,
  email: PropTypes.string,
  avatarUrl: PropTypes.string
});

export const itemShape = PropTypes.shape({
  backgroundColor: PropTypes.string,
  backgroundImage: PropTypes.string,
  description: PropTypes.string,
  director: PropTypes.string,
  genre: PropTypes.string,
  id: PropTypes.number,
  isFavorite: PropTypes.bool,
  title: PropTypes.string,
  posterImage: PropTypes.string,
  picture: PropTypes.string.isRequired,
  src: PropTypes.string.isRequired,
  rating: PropTypes.number,
  released: PropTypes.number,
  runTime: PropTypes.number,
  scoresCount: PropTypes.number,
  starring: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.string), PropTypes.string]),
  videoLink: PropTypes.string
});

export const reviewShape = PropTypes.shape({
  id: PropTypes.number,
  user: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string
  }),
  rating: PropTypes.number,
  comment: PropTypes.string,
  date: PropTypes.string
});
