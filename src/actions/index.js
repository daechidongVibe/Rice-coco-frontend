import * as types from '../constants/actionTypes';

export const setUserInfo = userInfo => ({
  type: types.SET_USER_INFO,
  payload: userInfo,
});
