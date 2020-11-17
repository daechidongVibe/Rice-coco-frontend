import * as types from '../constants/actionTypes';

const init = {
  latitude: 37.5055548,
  longitude: 127.0900086,
};

export const location = (state = init, action) => {
  switch (action.type) {
    case types.UPDATE_LOCATION:
      return action.payload;
    default:
      return state;
  }
};
