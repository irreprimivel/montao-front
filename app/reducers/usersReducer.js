import { fromJS } from 'immutable';

import * as constants from '../constants/userConstants';

const initialState = fromJS({
  subscribers: [],
  error: '',
  userPath: ''
});

const usersReducer = (state = initialState, action) => {
  switch (action.type) {
    case constants.GET_USERS_REQUEST:
      return state;
    case constants.GET_USERS_SUCCESS:
      return state.set('subscribers', fromJS(action.payload));
    case constants.GET_USERS_FAILURE:
      return state.set('error', action.payload);
    case constants.ADD_USER_REQUEST:
      return state;
    case constants.ADD_USER_SUCCESS:
      return state.set('userPath', action.payload);
    case constants.ADD_USER_FAILUER:
      return state.set('error', action.payload);
    default:
      return state;
  }
};

export default usersReducer;
