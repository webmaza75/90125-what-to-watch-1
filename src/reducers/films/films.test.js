import {
  reducer,
  Operation,
  transformFilmData
} from './films.js';
import ActionType from '../../actions/action-type.js';
import filmList from '../../mocks/films.js';
import filmsWithFavoritePromo from '../../mocks/films-with-favorite-promo.js';
import favorites from '../../mocks/favorites.js';
import {ALL_GENRES} from '../../consts.js';
import MockAdapter from 'axios-mock-adapter';
import {createAPI} from '../../api.js';
import reviews from '../../mocks/reviews.js';
import favoritePromo from '../../mocks/favorite-promo.js';
import film from '../../mocks/film.js';

const initialState = {
  films: [],
  filter: ALL_GENRES,
  comments: [],
  favorites: [],
  promo: null,
  maxShowFilms: 20,
  playState: false
};

const afterLoadFilmsState = {
  filter: ALL_GENRES,
  films: filmList,
  comments: [],
  favorites: [],
  promo: null,
  maxShowFilms: 20,
  playState: false
};

const stateWithComedy = {
  films: filmList,
  filter: `Comedy`,
  comments: [],
  favorites: [],
  promo: null,
  maxShowFilms: 20,
  playState: false
};

const afterLoadCommentsState = {
  filter: ALL_GENRES,
  films: filmList,
  comments: reviews,
  favorites: [],
  promo: null,
  maxShowFilms: 20,
  playState: false
};

const afterLoadFavoritesState = {
  filter: ALL_GENRES,
  films: filmList,
  comments: [],
  favorites,
  promo: null,
  maxShowFilms: 20,
  playState: false
};

const afterToggleFavoritesState = {
  filter: ALL_GENRES,
  films: filmList,
  comments: [],
  favorites: [],
  promo: favoritePromo,
  maxShowFilms: 20,
  playState: false
};

describe(`Reducer works correctly`, () => {
  it(`Reducer returns initial state by default`, () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it(`Reducer loads films after relaunch`, () => {
    expect(reducer(initialState, {
      type: ActionType.LOAD_FILMS,
      payload: filmList
    })).toEqual(afterLoadFilmsState);
  });

  it(`Reducer changes filter on Comedy when user choose the same menu item`, () => {
    expect(reducer(afterLoadFilmsState, {
      type: ActionType.CHANGE_GENRE,
      payload: `Comedy`
    })).toEqual(stateWithComedy);
  });

  it(`Reducer changes group of films by filter All genres`, () => {
    expect(reducer(stateWithComedy, {
      type: ActionType.CHANGE_GENRE,
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
        const result = [transformFilmData({fake: true})];
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.LOAD_FILMS,
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
          type: ActionType.LOAD_COMMENTS,
          payload: [{fake: true}],
        });
      });
  });

  it(`Reducer loads comments`, () => {
    expect(reducer(afterLoadFilmsState, {
      type: ActionType.LOAD_COMMENTS,
      payload: reviews
    })).toEqual(afterLoadCommentsState);
  });

  it(`Should make a correct API call to /favorite`, () => {
    const dispatch = jest.fn();
    const api = createAPI(dispatch);
    const apiMock = new MockAdapter(api);
    const favoritesLoader = Operation.loadFavorites();

    apiMock
      .onGet(`/favorite`)
      .reply(200, [{fake: true}]);

    return favoritesLoader(dispatch, jest.fn(), api)
      .then(() => {
        const result = [transformFilmData({fake: true})];
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.LOAD_FAVORITES,
          payload: result,
        });
      });
  });

  it(`Reducer loads favorites`, () => {
    expect(reducer(afterLoadFilmsState, {
      type: ActionType.LOAD_FAVORITES,
      payload: favorites
    })).toEqual(afterLoadFavoritesState);
  });

  it(`Should make a correct API call to /addComment`, () => {
    const dispatch = jest.fn();
    const api = createAPI(dispatch);
    const apiMock = new MockAdapter(api);
    const params = {
      text: `It was well acted, directed, and the music was good. But the story is yawn. Not trying to rip anybody but I checked my watch a dozen times during this movie.`,
      rating: 4
    };
    const commentSender = Operation.addComment(1, params);

    apiMock
      .onPost(`/comments/1`, params)
      .reply(200, [{fake: true}]);

    return commentSender(dispatch, jest.fn(), api)
      .then(() => {
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.ADD_COMMENT,
          payload: [{fake: true}],
        });
      });
  });

  it(`Reducer adds comment`, () => {
    expect(reducer(afterLoadFilmsState, {
      type: ActionType.ADD_COMMENT,
      payload: reviews
    })).toEqual(afterLoadCommentsState);
  });

  it(`Should make a correct API call to /favorite/filmId/status for Promo`, () => {
    const dispatch = jest.fn();
    const api = createAPI(dispatch);
    const apiMock = new MockAdapter(api);
    const filmId = 1;
    const status = 1;
    const toggleFavorites = Operation.toggleFavorite(filmId, status);

    apiMock
      .onPost(`/favorite/${filmId}/${status}`)
      .reply(200, [{fake: true}]);

    return toggleFavorites(dispatch, jest.fn(), api)
      .then(() => {
        const result = transformFilmData({fake: true});
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.UPDATE_FILMS,
          payload: result,
        });
      });
  });

  it(`Should make a correct API call to /favorite/filmId/status for movie-details`, () => {
    const dispatch = jest.fn();
    const api = createAPI(dispatch);
    const apiMock = new MockAdapter(api);
    const filmId = 1;
    const status = 1;
    const toggleFavorites = Operation.toggleFavorite(filmId, status);

    apiMock
      .onPost(`/favorite/${filmId}/${status}`)
      .reply(200, [{fake: true}]);

    return toggleFavorites(dispatch, jest.fn(), api)
      .then(() => {
        const result = transformFilmData({fake: true});
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.UPDATE_FILMS,
          payload: result,
        });
      });
  });

  it(`Reducer updates FilmList and Promo`, () => {
    const withPromoState = {
      filter: ALL_GENRES,
      films: filmList,
      comments: [],
      favorites: [],
      promo: film,
      maxShowFilms: 20,
      playState: false
    };

    const filmsWithFavoritePromoState = {
      filter: ALL_GENRES,
      films: filmsWithFavoritePromo,
      comments: [],
      favorites: [],
      promo: favoritePromo,
      maxShowFilms: 20,
      playState: false
    };

    expect(reducer(withPromoState, {
      type: ActionType.UPDATE_FILMS,
      payload: favoritePromo
    })).toEqual(filmsWithFavoritePromoState);
  });

  it(`Reducer toggle favorites for Promo`, () => {
    expect(reducer(afterLoadFilmsState, {
      type: ActionType.LOAD_PROMO,
      payload: favoritePromo
    })).toEqual(afterToggleFavoritesState);
  });

  it(`Should make a correct API call to /films/promo`, () => {
    const dispatch = jest.fn();
    const api = createAPI(dispatch);
    const apiMock = new MockAdapter(api);
    const promoLoader = Operation.loadPromo();

    apiMock
      .onGet(`/films/promo`)
      .reply(200, [{fake: true}]);

    return promoLoader(dispatch, jest.fn(), api)
      .then(() => {
        const result = transformFilmData({fake: true});
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.LOAD_PROMO,
          payload: result,
        });
      });
  });

  it(`Reducer increases count of max films to show`, () => {
    const beforeShowMoreClickState = {
      filter: ALL_GENRES,
      films: filmList,
      comments: [],
      favorites: [],
      promo: favoritePromo,
      maxShowFilms: 1,
      playState: false
    };

    const afterShowMoreClickState = {
      filter: ALL_GENRES,
      films: filmList,
      comments: [],
      favorites: [],
      promo: favoritePromo,
      maxShowFilms: 21,
      playState: false
    };

    expect(reducer(beforeShowMoreClickState, {
      type: ActionType.INCREASE_MAX_SHOW_FILMS,
      payload: 20
    })).toEqual(afterShowMoreClickState);
  });

  it(`Reducer changes state to play video`, () => {
    const disabledPlayVideoState = {
      filter: ALL_GENRES,
      films: filmList,
      comments: [],
      favorites: [],
      promo: favoritePromo,
      maxShowFilms: 20,
      playState: false
    };

    const enabledPlayVideoState = {
      filter: ALL_GENRES,
      films: filmList,
      comments: [],
      favorites: [],
      promo: favoritePromo,
      maxShowFilms: 20,
      playState: true
    };

    expect(reducer(disabledPlayVideoState, {
      type: ActionType.TOGGLE_PLAY_BUTTON,
      payload: true
    })).toEqual(enabledPlayVideoState);
  });

  it(`Reducer resets count of max films to show`, () => {
    const beforeResetShowMoreClickState = {
      filter: ALL_GENRES,
      films: filmList,
      comments: [],
      favorites: [],
      promo: favoritePromo,
      maxShowFilms: 40,
      playState: false
    };

    const afterResetShowMoreClickState = {
      filter: ALL_GENRES,
      films: filmList,
      comments: [],
      favorites: [],
      promo: favoritePromo,
      maxShowFilms: 20,
      playState: false
    };

    expect(reducer(beforeResetShowMoreClickState, {
      type: ActionType.RESET_MAX_SHOW_FILMS,
      payload: 20
    })).toEqual(afterResetShowMoreClickState);
  });
});
