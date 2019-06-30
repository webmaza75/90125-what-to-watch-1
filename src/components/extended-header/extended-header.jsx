import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';

import Logo from '../logo/logo.jsx';
import {BASE_URL} from '../../consts.js';
import {
  itemShape,
  userInfo
} from '../../models.js';
import {getUser} from '../../reducers/user/selectors.js';

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
        <Link to={`/mylist`}>
          <img src={`${BASE_URL}${avatarUrl}`} alt="User avatar" width="63" height="63" />
        </Link>
      </div>
    </div>
  </header>;
};

ExtendedHeader.propTypes = {
  user: userInfo,
  movie: itemShape
};

const mapStateToProps = (state) => ({
  user: getUser(state)
});

export {ExtendedHeader};

export default connect(mapStateToProps)(ExtendedHeader);
