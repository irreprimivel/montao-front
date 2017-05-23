import * as actionTypes from '../constants/subscriptionConstants';
import { fromJS, Map } from 'immutable';

const initialState = fromJS({
  communities: [],
  error: '',
  communityPath: '',
  isSubscribed: false,
  currentCommunity: Map(),
  valid: false,
  notFound: false
});

const subscriptionReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.JOIN_REQUEST:
      return inProgress(state, action);
    case actionTypes.JOIN_SUCCESS:
      return changeSubscriptionStatus(state, action);
    case actionTypes.JOIN_FAILURE:
      return state.set('error', action.payload);
    case actionTypes.LEAVE_REQUEST:
      return inProgress(state, action);
    case actionTypes.LEAVE_SUCCESS:
      return changeSubscriptionStatus(state, action);
    case actionTypes.LEAVE_FAILURE:
      return state.set('error', action.payload);
    case actionTypes.CHECK_SUBSCRIPTION_REQUEST:
      return state;
    case actionTypes.CHECK_SUBSCRIPTION_SUCCESS:
      return state.set('isSubscribed', action.payload == 'true');
    case actionTypes.CHECK_SUBSCRIPTION_FAILURE:
      return state.set('isSubscribed', false);
    default:
      return state;
  }
};

const inProgress = (state, action) => {
  const index = state.get('communities').findIndex(community => community.get('title') === action.payload);
  return state.setIn(['communities', index, 'inProgress'], true);
};

const changeSubscriptionStatus = (state, action) => {
  const index = state.get('communities').findIndex(community => community.get('id') === action.payload.id);
  return state
    .setIn(['communities', index, 'subscribed'], action.payload.subscribed)
    .setIn(['communities', index, 'inProgress'], false);
};

export default subscriptionReducer;
