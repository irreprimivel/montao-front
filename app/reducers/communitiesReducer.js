import { fromJS, Map } from 'immutable';

import * as actionTypes from '../constants/communityConstants';

const initialState = fromJS({
  communities: [],
  error: '',
  communityPath: '',
  isSubscribed: false,
  currentCommunity: Map(),
  valid: false,
  notFound: false
});

const communitiesReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_COMMUNITIES_REQUEST:
      return state;
    case actionTypes.GET_COMMUNITIES_SUCCESS:
      return state.set('communities', fromJS(action.payload));
    case actionTypes.GET_COMMUNITIES_FAILURE:
      return state.set('error', action.payload);
    case actionTypes.ADD_COMMUNITY_REQUEST:
      return state;
    case actionTypes.ADD_COMMUNITY_SUCCESS:
      return state.set('communityPath', action.payload);
    case actionTypes.ADD_COMMUNITY_FAILURE:
      return state.set('error', action.payload);
    case actionTypes.CHECK_COMMUNITY_REQUEST:
      return state.set('valid', false).set('notFound', false);
    case actionTypes.CHECK_COMMUNITY_SUCCESS:
      return state.set('currentCommunity', Map(action.payload)).set('valid', true).set('notFound', false);
    case actionTypes.CHECK_COMMUNITY_FAILURE:
      return state.set('error', action.payload).set('notFound', true);
    default:
      return state;
  }
};



export default communitiesReducer;
