import ActionTypes from '../action-types.js';

const ActionCreator = {
  changeFilter: (filter) => ({
    type: ActionTypes.CHANGE_GENRE,
    payload: filter
  }),
  getFilmsByFilter: (films, filter) => ({
    type: ActionTypes.GET_FILMS_BY_GENRE,
    payload: {films, filter}
  })
};

export {ActionCreator};
