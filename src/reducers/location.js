import * as types from '../constants/actionTypes';

const init = {
  latitude: 37.532600,
  longitude: 127.024612,
};

export const location = (state = init, action) => {
  switch (action.type) {
    case types.UPDATE_LOCATION:
      return action.payload;
    default:
      return state;
  }
};
