import { combineReducers } from 'redux';
import * as types from '../constants/actionTypes';
import { user } from '../reducers/user';

export default combineReducers({
  user,
});
