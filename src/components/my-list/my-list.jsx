import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import {itemShape} from '../../models.js';
import FilmList from '../film-list/film-list.jsx';
import {getFavoriteList} from '../../reducers/films/selectors.js';
import {getUser} from '../../reducers/user/selectors.js';
import GlobalIcons from '../global-icons/global-icons.jsx';
import Footer from '../footer/footer.jsx';
import withActiveItem from '../../hocs/with-active-item/with-active-item.js';
import MyListHeader from '../my-list-header/my-list-header.jsx';
import {userInfo} from '../../models.js';

const FilmListWrapped = withActiveItem(FilmList);

class MyList extends PureComponent {
  render() {
    const {myList, user} = this.props;
    return <div className="user-page">
      <GlobalIcons />

      <MyListHeader user={user} />

      <section className="catalog">
        <h2 className="catalog__title visually-hidden">Catalog</h2>
        <FilmListWrapped films={myList} />
        <Footer />
      </section>
    </div>;
  }
}

const mapDispatchToProps = (state) => ({
  user: getUser(state),
  myList: getFavoriteList(state)
});


MyList.propTypes = {
  user: userInfo,
  myList: PropTypes.arrayOf(itemShape)
};

export {MyList};

export default connect(
    mapDispatchToProps,
    // {
    //   onGetFavoriteList: getFavoriteList(state)
    // }
)(MyList);
