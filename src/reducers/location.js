import * as types from '../constants/actionTypes';

const init = {
  latitude: 0,
  longitude: 0,
};

export const location = (state = init, action) => {
  switch (action.type) {
    case types.UPDATE_LOCATION:
      return action.payload;
    default:
      return state;
  }
};
