import * as types from '../constants/actionTypes';

export const setUserInfo = userInfo => ({
  type: types.SET_USER_INFO,
  payload: userInfo,
});

export const setPromiseAmount = amount => ({
  type: types.SET_USER_INFO,
  promise: amount,
});

export const setUserLocation = location => ({
  type: types.UPDATE_LOCATION,
  payload: location,
});

export const setFilteredMeetings = meetings => ({
  type: types.SET_FILTERED_MEETINGS,
  payload: meetings,
});

export const setSelectedMeeting = meeting => ({
  type: types.SET_SELECTED_MEETING,
  payload: meeting,
});

export const setCurrentMeeting = meeting => ({
  type: types.SET_CURRENT_MEETING,
  payload: meeting,
});

export const resetMeeting = () => ({
  type: types.RESET_MEETING,
});
