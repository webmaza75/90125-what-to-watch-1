import React from 'react';
import Enzyme, {mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import GenreList from '../components/genre-list/genre-list.jsx';
import FilmList from '../components/film-list/film-list.jsx';
import {ALL_GENRES} from '../consts.js';
import withActiveItem from './with-active-item.js';
import films from '../mocks/films.js';

window.HTMLMediaElement.prototype.play = () => {};

Enzyme.configure({adapter: new Adapter()});

describe(`WithActiveItem correctly renders`, () => {
  it(`GenreListWrapped has correctly state when user click title of a genre`, () => {
    const filter = `Drama`;
    const genres = [ALL_GENRES, `Comedy`, `Drama`, `Triller`];
    const GenreListWrapped = withActiveItem(GenreList);
    const genreListWrapped = mount(<GenreListWrapped
      genres={genres}
      actions={jest.fn()}
      activeItem={filter}
    />);

    const genreItem = genreListWrapped.find(`.catalog__genres-item--active`);
    genreItem.simulate(`click`);
    expect(genreListWrapped.state(`activeItem`)).toEqual(filter);
  });

  it(`FilmListWrapped has correctly state when user hover card`, () => {
    const FilmListWrapped = withActiveItem(FilmList);
    const filmListWrapped = mount(<FilmListWrapped
      films={films}
    />);

    const card = filmListWrapped.find(`.small-movie-card__image`).first();
    card.simulate(`mouseOver`);
    const film = films[0];
    expect(filmListWrapped.state(`activeItem`)).toEqual(film);
  });
});
