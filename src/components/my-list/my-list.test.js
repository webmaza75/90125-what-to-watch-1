import React from 'react';
import renderer from 'react-test-renderer';
import {MemoryRouter} from 'react-router-dom';

import {MyList} from './my-list.jsx';
import films from '../../mocks/films.js';
import user from '../../mocks/user.js';

it(`MyList correctly renders without any errors`, () => {
  const tree = renderer
    .create(<MemoryRouter initialEntries={[`/`]}>
      <MyList
        myList={films}
        user={user}
      />
    </MemoryRouter>)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
