import { reset, SubmissionError } from 'redux-form';

import * as actionTypes from '../constants/communityConstants';
import * as viewActions from './ViewActions';

export const getCommunities = (page, limit) => {
  return dispatch => {
    dispatch({
      type: actionTypes.GET_COMMUNITIES_REQUEST
    });

    const headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded; charset=utf-8');
    // headers.append('X-XSRF-TOKEN', getCookie('XSRF-TOKEN'));

    const query = [
      `p=${page}`,
      `l=${limit}`
    ].join('&');

    const request = new Request(`/api/communities?${query}`, {
      method: 'GET',
      headers: headers,
      credentials: 'same-origin'
    });

    return fetch(request)
      .then(response => {
        if (response.status !== 200) {
          const error = new Error(response.statusText);
          error.response = response;
          throw error;
        }
        return response;
      })
      .then(response => {
        const count = response.headers.get('X-Pagination-Count');
        const page = response.headers.get('X-Pagination-Page');
        const limit = response.headers.get('X-Pagination-Limit');
        dispatch({
          type: actionTypes.GET_COMMUNITIES_SUCCESS,
          payload: {
            paging: {
              totalCount: count,
              page: page,
              limit: limit,
              totalPagesCount: Math.ceil(count / limit)
            },
            communities: response.json()
          }
        });
      })
      .catch(error => {
        dispatch({
          type: actionTypes.GET_COMMUNITIES_FAILURE,
          payload: error
        });
      });
  };
};

export const add = (community) => {
  return (dispatch) => {
    dispatch({
      type: actionTypes.ADD_COMMUNITY_REQUEST
    });

    const headers = new Headers();
    headers.append('Content-Type', 'application/json; charset=utf-8');
    // headers.append('X-XSRF-TOKEN', getCookie('XSRF-TOKEN'));

    const request = new Request('/api/communities', {
      method: 'POST',
      body: JSON.stringify(community),
      headers: headers,
      credentials: 'same-origin'
    });
    return fetch(request)
      .then(response => {
        if (response.status !== 201) {
          const error = new Error(response.statusText);
          error.response = response;
          throw error;
        }
        return response;
      })
      .then(response => {
        const location = response.headers.get('location');
        dispatch({
          type: actionTypes.ADD_COMMUNITY_SUCCESS,
          payload: location
        });
        dispatch(viewActions.hideAddCommunityDialog());
        dispatch(reset('addCommunityForm'));
      })
      .catch(error => {
        dispatch({
          type: actionTypes.ADD_COMMUNITY_FAILURE,
          payload: error
        });
        throw new SubmissionError({
          _error: 'Creation failed!'
        });
      });
  };
};

export const getCommunity = (title) => {
  return (dispatch) => {
    dispatch({
      type: actionTypes.CHECK_COMMUNITY_REQUEST
    });

    const headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded; charset=utf-8');
    // headers.append('X-XSRF-TOKEN', getCookie('XSRF-TOKEN'));

    const request = new Request(`/api/communities/${title}`, {
      method: 'GET',
      headers: headers,
      credentials: 'same-origin'
    });

    return fetch(request)
      .then(response => {
        if (response.status !== 200) {
          const error = new Error(response.statusText);
          error.response = response;
          throw error;
        }
        return response.json();
      })
      .then(response => {
        dispatch({
          type: actionTypes.CHECK_COMMUNITY_SUCCESS,
          payload: response
        });
      })
      .catch(error => {
        dispatch({
          type: actionTypes.CHECK_COMMUNITY_FAILURE,
          payload: error
        });
      });
  };
};
