import React from 'react';
import ReactDom from 'react-dom';
import App from './components/app/app.jsx';

const filmList = [`Fantastic Beasts: The Crimes of Grindelwald`, `Bohemian Rhapsody`, `Macbeth`, `Aviator`];

const init = () => {
  ReactDom.render(
      <App filmList={filmList} />,
      document.getElementById(`root`)
  );
};

init();
