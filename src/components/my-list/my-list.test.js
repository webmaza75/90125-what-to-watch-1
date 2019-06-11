import React from 'react';
import renderer from 'react-test-renderer';

import {MyList} from './my-list.jsx';
import films from '../../mocks/films.js';
import user from '../../mocks/user.js';

it(`MyList correctly renders without any errors`, () => {
  const tree = renderer
    .create(<MyList
      myList={films}
      user={user}
    />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
