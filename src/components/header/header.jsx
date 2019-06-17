import React from 'react';
import {Link} from 'react-router-dom';

import Logo from '../logo/logo.jsx';
import {BASE_URL} from '../../consts.js';
import {userInfo} from '../../models.js';

const Header = (props) => {
  let userBlock;
  const {user} = props;
  const isGuest = !user || !user.id;

  if (isGuest === false) {
    userBlock = <div className="user-block">
      <div className="user-block__avatar">
        <Link to={`/mylist`}>
          <img src={`${BASE_URL}${user.avatarUrl}`} alt="User avatar" width="63" height="63" />
        </Link>
      </div>
    </div>;
  } else {
    userBlock = <div className="user-block">
      <Link to={`/login`} className="user-block__link">
        Sign in
      </Link>
    </div>;
  }

  return <header className="page-header movie-card__head">
    <Logo />
    {userBlock}
  </header>;
};

Header.propTypes = {
  user: userInfo
};

export default Header;
