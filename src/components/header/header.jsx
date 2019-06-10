import React from 'react';
import PropTypes from 'prop-types';

import Logo from '../logo/logo.jsx';
import {BASE_URL} from '../../consts.js';

const Header = (props) => {
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
    userBlock = <div className="user-block">
      <a href="sign-in.html" className="user-block__link" onClick={
        (event) => {
          event.preventDefault();
          props.onClick();
        }
      }>Sign in</a>
    </div>;
  }

  return <header className="page-header movie-card__head">
    <Logo />
    {userBlock}
  </header>;
};

Header.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    email: PropTypes.string,
    avatarUrl: PropTypes.string
  }),
  onClick: PropTypes.func
};

export default Header;
