import { combineReducers } from 'redux';
import { user } from '../reducers/user';
import { location } from '../reducers/location';

export default combineReducers({
  user, location
});
