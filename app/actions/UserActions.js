import { SubmissionError } from 'redux-form';

import * as actionTypes from '../constants/userConstants';
import * as viewActions from './ViewActions';

export const getUsersByCommunity = (communityTitle) => {
  return (dispatch) => {
    dispatch({
      type: actionTypes.GET_USERS_REQUEST
    });

    const headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded; charset=utf-8');
    // headers.append('X-XSRF-TOKEN', getCookie('XSRF-TOKEN'));

    const request = new Request(`/api/communities/${communityTitle}/users`, {
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
          type: actionTypes.GET_USERS_SUCCESS,
          payload: response
        });
      })
      .catch(error => {
        dispatch({
          type: actionTypes.GET_USERS_FAILURE,
          payload: error
        });
      });
  };
};



export const add = (user) => {
  return (dispatch) => {
    dispatch({
      type: actionTypes.ADD_USER_REQUEST
    });

    const headers = new Headers();
    headers.append('Content-Type', 'application/json; charset=utf-8');
    // headers.append('X-XSRF-TOKEN', getCookie('XSRF-TOKEN'));

    let request = new Request('/api/users', {
      method: 'POST',
      body: JSON.stringify(user),
      headers: headers,
      credentials: 'same-origin'
    });

    return fetch(request)
      .then(response => {
        if (response.status !== 201) {
          const error = new Error(response.statusText);
          error.response = response;
          throw error;
        } else {
          return response;
        }
      })
      .then(response => {
        const location = response.headers.get('location');
        dispatch({
          type: actionTypes.ADD_USER_SUCCESS,
          payload: location
        });
        dispatch(viewActions.hideSignUpDialog());
      })
      .catch(error => {
        dispatch({
          type: actionTypes.ADD_USER_FAILUER,
          payload: error
        });
        throw new SubmissionError({
          _error: 'Server failure!'
        });
      });
  };
};
