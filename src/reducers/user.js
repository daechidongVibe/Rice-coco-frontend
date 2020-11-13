import * as types from '../constants/actionTypes';

export const user = (state = {}, action) => {
  switch (action.type) {
    case types.SET_USER_INFO:
      const a = { ...state, ...action.payload };
      return a;
    default:
      return state;
  }
};
