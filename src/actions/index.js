import * as types from '../constants/actionTypes';

export const setUserInfo = userInfo => ({
  type: types.SET_USER_INFO,
  payload: userInfo,
});

export const updateLocation = location => ({
  type: types.UPDATE_LOCATION,
  payload: location,
});

export const setMeetings = meetings => ({
  type: types.SET_MEETINGS,
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
