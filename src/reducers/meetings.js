import * as types from '../constants/actionTypes';

export const meetings = (state = [], action) => {
  switch (action.type) {
    case types.SET_MEETINGS:
      return [...action.payload];
    default:
      return state;
  }
};
