import * as types from '../constants/actionTypes';

export const user = (state = {}, action) => {
  switch (action.type) {
    case types.SET_USER_INFO:
      return {
        ...state,
        ...action.payload
      };
    default:
      return state;
  }
};
