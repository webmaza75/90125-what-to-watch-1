import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';

import MyListButton from './my-list-button.jsx';

describe(`MyListButton correctly renders`, () => {
  it(`MyListButton correctly renders for a guest`, () => {
    const renderer = new ShallowRenderer();
    const result = renderer
      .render(<MyListButton
        isAuthorized={false}
        isFavorite={false}
        onMyListClick={jest.fn()}
        needRedirect={true}
      />);

    expect(result).toMatchSnapshot();
  });

  it(`MyListButton correctly renders for an authorized user`, () => {
    const renderer = new ShallowRenderer();
    const result = renderer
      .render(<MyListButton
        isAuthorized={true}
        isFavorite={false}
        onMyListClick={jest.fn()}
        needRedirect={false}
      />);

    expect(result).toMatchSnapshot();
  });
});
