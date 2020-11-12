import * as types from '../constants/actionTypes';

export const setIsloaded = isLoaded => ({
    type: types.LOADED,
    payload: isLoaded,
});
