import React from 'react';
import renderer from 'react-test-renderer';
import {MemoryRouter} from 'react-router-dom';

import Logo from './logo.jsx';

it(`Logo correctly renders`, () => {
  const logo = renderer
    .create(<MemoryRouter initialEntries={[`/`]}>
      <Logo />
    </MemoryRouter>)
    .toJSON();
  expect(logo).toMatchSnapshot();
});

it(`Light Logo correctly renders (footer)`, () => {
  const logo = renderer
    .create(<MemoryRouter initialEntries={[`/`]}>
      <Logo
        invert={true}
      />
    </MemoryRouter>)
    .toJSON();
  expect(logo).toMatchSnapshot();
});
