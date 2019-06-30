import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import Logo from '../logo/logo.jsx';
import {BASE_URL} from '../../consts.js';
import {userInfo} from '../../models.js';
import {
  getUser,
  checkIsAuthorizedUser
} from '../../reducers/user/selectors.js';

const Header = (props) => {

  let userBlock;
  const {user, isAuthorized} = props;

  if (isAuthorized) {
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
  user: userInfo,
  isAuthorized: PropTypes.bool
};

const mapStateToProps = (state) => ({
  user: getUser(state),
  isAuthorized: checkIsAuthorizedUser(state)
});

export {Header};

export default connect(mapStateToProps)(Header);
