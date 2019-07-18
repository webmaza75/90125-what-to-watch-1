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
  ratingLevel: PropTypes.string,
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

export const locationShape = PropTypes.shape({
  hash: PropTypes.string,
  key: PropTypes.string,
  pathname: PropTypes.string,
  search: PropTypes.string,
  state: PropTypes.any
});

export const historyShape = PropTypes.shape({
  action: PropTypes.string,
  block: PropTypes.func,
  createHref: PropTypes.func,
  go: PropTypes.func,
  goBack: PropTypes.func,
  goForward: PropTypes.func,
  length: PropTypes.number,
  listen: PropTypes.func,
  location: locationShape,
  push: PropTypes.func,
  replace: PropTypes.func
});

export const matchShape = PropTypes.shape({
  isExact: PropTypes.bool,
  params: PropTypes.shape({
    id: PropTypes.string
  }),
  path: PropTypes.string,
  url: PropTypes.string,
});
