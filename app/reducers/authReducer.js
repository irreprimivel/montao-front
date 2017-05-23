import { fromJS } from 'immutable';
import * as actionTypes from '../constants/authConstants';

const initialState = fromJS({
  error: '',
  isAuthorized: false,
});

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.LOG_IN_REQUEST:
      return state;
    case actionTypes.LOG_IN_SUCCESS:
      return state;
    case actionTypes.LOG_IN_FAILURE:
      return state.set('error', action.payload);
    case actionTypes.LOG_OUT_REQUEST:
      return state;
    case actionTypes.LOG_OUT_SUCCESS:
      return state.set('isAuthorized', false);
    case actionTypes.LOG_OUT_FAILURE:
      return state.set('error', action.payload);
    case actionTypes.CHECK_AUTHORIZATION_REQUEST:
      return state;
    case actionTypes.CHECK_AUTHORIZATION_SUCCESS:
      return state.set('isAuthorized', true).set('username', action.payload);
    case actionTypes.CHECK_AUTHORIZATION_FAILURE:
      return state.set('isAuthorized', false).set('username', '');
    default:
      return state;
  }
};

export default authReducer;
