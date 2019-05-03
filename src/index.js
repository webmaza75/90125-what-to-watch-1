import React from 'react';
import ReactDom from 'react-dom';
import App from './components/app/app.jsx';
import filmList from './mock/filmList.js';

const init = () => {
  ReactDom.render(
      <App filmList={filmList} />,
      document.getElementById(`root`)
  );
};

init();
