import {combineReducers} from 'redux';
import {reducer as films} from './films/films.js';
import {reducer as user} from './user/user.js';
import NameSpace from './name-spaces.js';

export default combineReducers({
  [NameSpace.FILMS]: films,
  [NameSpace.USER]: user
});
