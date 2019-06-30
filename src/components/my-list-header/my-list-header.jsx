import React from 'react';

import Logo from '../logo/logo.jsx';
import {BASE_URL} from '../../consts.js';
import {userInfo} from '../../models.js';
import {Link} from 'react-router-dom';


const MyListHeader = ({user}) => {
  const {avatarUrl} = user;

  return <header className="page-header user-page__head">
    <Logo />
    <h1 className="page-title user-page__title">My list</h1>
    <div className="user-block">
      <div className="user-block__avatar">
        <Link to={`/mylist`}>
          <img src={`${BASE_URL}${avatarUrl}`} alt="User avatar" width="63" height="63" />
        </Link>
      </div>
    </div>
  </header>;
};

MyListHeader.propTypes = {
  user: userInfo
};

export default MyListHeader;
