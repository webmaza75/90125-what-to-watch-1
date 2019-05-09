import React from 'react';
import ReactDom from 'react-dom';
import App from './components/app/app.jsx';
import films from './mocks/films.js';

const init = (itemList) => {
  ReactDom.render(
      <App films={itemList} />,
      document.getElementById(`root`)
  );
};

init(films);
