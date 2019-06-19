import {
  reducer,
  Operation,
  transform
} from './films.js';
import ActionTypes from '../../actions/action-types.js';
import filmList from '../../mocks/films.js';
import {ALL_GENRES} from '../../consts.js';
import MockAdapter from 'axios-mock-adapter';
import {createAPI} from '../../api.js';
import reviews from '../../mocks/reviews.js';

const initialState = {
  films: [],
  filter: ALL_GENRES,
  comments: []
};

const afterLoadFilmsState = {
  filter: ALL_GENRES,
  films: filmList,
  comments: []
};

const stateWithComedy = {
  films: filmList,
  filter: `Comedy`,
  comments: []
};

const afterLoadCommentsState = {
  filter: ALL_GENRES,
  films: filmList,
  comments: reviews
};

describe(`Reducer works correctly`, () => {
  it(`Reducer returns initial state by default`, () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it(`Reducer loads films after relaunch`, () => {
    expect(reducer(initialState, {
      type: ActionTypes.LOAD_FILMS,
      payload: filmList
    })).toEqual(afterLoadFilmsState);
  });

  it(`Reducer changes filter on Comedy when user choose the same menu item`, () => {
    expect(reducer(afterLoadFilmsState, {
      type: ActionTypes.CHANGE_GENRE,
      payload: `Comedy`
    })).toEqual(stateWithComedy);
  });

  it(`Reducer changes group of films by filter All genres`, () => {
    expect(reducer(stateWithComedy, {
      type: ActionTypes.CHANGE_GENRE,
      payload: ALL_GENRES
    })).toEqual(afterLoadFilmsState);
  });

  it(`Should make a correct API call to /films`, () => {
    const dispatch = jest.fn();
    const api = createAPI(dispatch);
    const apiMock = new MockAdapter(api);
    const filmsLoader = Operation.loadFilms();

    apiMock
      .onGet(`/films`)
      .reply(200, [{fake: true}]);

    return filmsLoader(dispatch, jest.fn(), api)
      .then(() => {
        const result = [transform({fake: true})];
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionTypes.LOAD_FILMS,
          payload: result,
        });
      });
  });

  it(`Should make a correct API call to /comments`, () => {
    const dispatch = jest.fn();
    const api = createAPI(dispatch);
    const apiMock = new MockAdapter(api);
    const commentsLoader = Operation.loadComments(1);

    apiMock
      .onGet(`/comments/1`)
      .reply(200, [{fake: true}]);

    return commentsLoader(dispatch, jest.fn(), api)
      .then(() => {
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionTypes.LOAD_COMMENTS,
          payload: [{fake: true}],
        });
      });
  });

  it(`Reducer loads comments`, () => {
    expect(reducer(afterLoadFilmsState, {
      type: ActionTypes.LOAD_COMMENTS,
      payload: reviews
    })).toEqual(afterLoadCommentsState);
  });
});
