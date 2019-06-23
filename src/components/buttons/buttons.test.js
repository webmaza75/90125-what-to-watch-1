import React from 'react';
import renderer from 'react-test-renderer';
import {StaticRouter} from 'react-router';

import Buttons from './buttons.jsx';
import film from '../../mocks/film.js';

const context = {};

describe(`Buttons correctly renders`, () => {
  it(`Buttons correctly renders for authorized user`, () => {
    const buttons = renderer
      .create(<StaticRouter location="someLocation" context={context}>
        <Buttons
          isAuthorized={true}
          isFavorite={false}
          id={film.id}
          onMyListClick={jest.fn()}
        />
      </StaticRouter>)
      .toJSON();

    expect(buttons).toMatchSnapshot();
  });
});
