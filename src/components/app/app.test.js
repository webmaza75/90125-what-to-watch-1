import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';

import {App} from './app.jsx';

it(`App correctly renders`, () => {
  const renderer = new ShallowRenderer();
  const result = renderer
    .render(<App
      onCheckUser={jest.fn()}
      isLoadedUserInfo={true}
    />);

  expect(result).toMatchSnapshot();
});
