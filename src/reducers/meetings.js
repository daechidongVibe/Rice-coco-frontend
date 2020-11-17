import * as types from '../constants/actionTypes';

const initialState = {
  filteredMeetings: [],
  selectedMeeting: {
    restaurantId: 'thisisrestaurantId',
    restaurantName: '볼때기아구찜',
    restaurantLocation: { latitude: 37.5088548, longitude: 127.0899086 },
    partnerNickname: '동규다림쥐',
    meetingId: '5faf8cc6afc3f8188a196828',
    expiredTime: new Date(),
  },
};

export const meetings = (state = initialState, action) => {
  switch (action.type) {
    case types.SET_MEETINGS:
      return {
        ...state,
        filteredMeetings: [...action.payload],
      };
    case types.SET_SELECTED_MEETING:
      return {
        ...state,
        selectedMeeting: {
          ...state.selectedMeeting,
          ...action.payload,
        },
      };
    default:
      return state;
  }
};
