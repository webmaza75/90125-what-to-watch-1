import React from 'react';
import PropTypes from 'prop-types';

import Logo from '../logo/logo.jsx';
import {BASE_URL} from '../../consts.js';

const Header = (props) => {
  let title = null;
  let extraClass = `movie-card__head`;

  switch (props.pageType) {
    case `signIn`:
      extraClass = `user-page__head`;
      title = <h1 className="page-title user-page__title">Sign in</h1>;
      break;
  }

  let userBlock;
  const {user} = props;
  const isGuest = !user || !user.id;

  if (isGuest === false) {
    userBlock = <div className="user-block">
      <div className="user-block__avatar">
        <img src={`${BASE_URL}${user.avatarUrl}`} alt="User avatar" width="63" height="63" />
      </div>
    </div>;
  } else {
    if (title === null) {
      userBlock = <div className="user-block">
        <a href="sign-in.html" className="user-block__link" onClick={
          (event) => {
            event.preventDefault();
            props.onClick();
          }
        }>Sign in</a>
      </div>;
    }
  }

  return <header className={`page-header ${extraClass}`}>
    <Logo />
    {userBlock}
    {title}
  </header>;
};

Header.propTypes = {
  pageType: PropTypes.string,
  user: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    email: PropTypes.string,
    avatarUrl: PropTypes.string
  }),
  onClick: PropTypes.func
};

export default Header;
