import React from 'react';
import {Link} from 'react-router-dom';

import Logo from '../logo/logo.jsx';
import {BASE_URL} from '../../consts.js';
import {
  itemShape,
  userInfo
} from '../../models.js';

const ExtendedHeader = ({user, movie}) => {
  const {avatarUrl} = user;
  const {title, id} = movie;

  return <header className="page-header">
    <Logo />

    <nav className="breadcrumbs">
      <ul className="breadcrumbs__list">
        <li className="breadcrumbs__item">
          <Link to={`/film/${id}`} className="breadcrumbs__link">{title}</Link>
        </li>
        <li className="breadcrumbs__item">
          <Link to={`/film/${id}/review`} className="breadcrumbs__link">Add review</Link>
        </li>
      </ul>
    </nav>

    <div className="user-block">
      <div className="user-block__avatar">
        <img src={`${BASE_URL}${avatarUrl}`} alt="User avatar" width="63" height="63" />
      </div>
    </div>
  </header>;
};

ExtendedHeader.propTypes = {
  user: userInfo,
  movie: itemShape
};

export default ExtendedHeader;
