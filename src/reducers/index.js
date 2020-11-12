import { combineReducers } from 'redux';
import * as types from '../constants/actionTypes';

const initialloaded = {
  status: false,
};

export const loaded = (state = initialloaded, action) => {
  switch (action.type) {
    case types.LOADED:
      return action.payload;
    default:
      return state;
  };
};

export default combineReducers({
  loaded,
});
