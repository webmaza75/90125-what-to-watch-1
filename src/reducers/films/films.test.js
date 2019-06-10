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

const initialState = {
  films: [],
  filter: ALL_GENRES
};

const afterLoadFilmsState = {
  filter: ALL_GENRES,
  films: filmList
};

const stateWithComedy = {
  films: filmList,
  filter: `Comedy`
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
});
