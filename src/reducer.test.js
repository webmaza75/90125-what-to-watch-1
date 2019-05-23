import reducer from './reducer.js';
import ActionType from './models.js';
import filmList from './mocks/films.js';

const initialState = {
  films: filmList,
  filter: `All genres`,
  filmsGroup: filmList
};

const stateWithChangedDefaultFilterOnComedy = {
  films: filmList,
  filter: `Comedy`,
  filmsGroup: filmList
};

const filmGroupWithComedy = [{
  genre: [`Drama`, `Comedy`],
  title: `The Grand Budapest Hotel`,
  desc: `The Grand Budapest Hotel is a 2014 comedy film written and directed by Wes Anderson, from a story by Anderson and Hugo Guinness, inspired by the writings of Stefan Zweig, to whom Anderson wrote the film as a tribute.`,
  picture: `the-grand-budapest-hotel-poster.jpg`,
  year: 2014,
  src: `https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4`
}];

const stateWithGenreComedy = {
  films: filmList,
  filter: `Comedy`,
  filmsGroup: filmGroupWithComedy
};

const stateWithChangedComedyFilterOnDefault = {
  films: filmList,
  filter: `All genres`,
  filmsGroup: filmGroupWithComedy
};

describe(`Reducer works correctly`, () => {
  it(`Reducer returns initial state by default`, () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it(`Reducer changes filter on Comedy when user choose the same menu item`, () => {
    expect(reducer(initialState, {
      type: ActionType.CHANGE_GENRE,
      payload: `Comedy`
    })).toEqual(stateWithChangedDefaultFilterOnComedy);
  });

  it(`Reducer changes group of films by filter Comedy`, () => {
    expect(reducer(stateWithChangedDefaultFilterOnComedy, {
      type: ActionType.GET_FILMS_BY_GENRE,
      payload: {films: filmList, filter: `Comedy`}
    })).toEqual(stateWithGenreComedy);
  });

  it(`Reducer changes group of films by filter All genres`, () => {
    expect(reducer(stateWithChangedComedyFilterOnDefault, {
      type: ActionType.GET_FILMS_BY_GENRE,
      payload: {films: filmList, filter: `All genres`}
    })).toEqual(initialState);
  });
});
