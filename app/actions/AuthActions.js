import { reset, SubmissionError } from 'redux-form';

import { getCookie } from '../utils/cookie';
import * as actionTypes from '../constants/authConstants';
import * as viewActions from './ViewActions';

export const logIn = (userCredentials) => {
  return dispatch => {
    dispatch({
      type: actionTypes.LOG_IN_REQUEST
    });
    let data = `username=${userCredentials.username}&password=${userCredentials.password}`;
    // build headers
    let headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded; charset=utf-8');
    headers.append('X-XSRF-TOKEN', getCookie('XSRF-TOKEN'));
    // build request
    let request = new Request('/api/login', {
      method: 'POST',
      body: data,
      headers: headers,
      credentials: 'same-origin'
    });
    return fetch(request)
      .then(response => {
        if (response.status !== 200) {
          let error = new Error(response.statusText);
          error.response = response;
          throw error;
        } else {
          return response;
        }
      })
      .then(() => {
        dispatch({
          type: actionTypes.LOG_IN_SUCCESS
        });
        // get username
        dispatch(checkAuthorization());
        // close log in dialog
        dispatch(viewActions.hideLogInDialog());
        // clean up input fields
        dispatch(reset('logInForm'));
      })
      .catch((error) => {
        dispatch({
          type: actionTypes.LOG_IN_FAILURE,
          payload: error
        });
        throw new SubmissionError({
          _error: 'Login failed!'
        });
      });
  };
};

export const logOut = () => {
  return (dispatch) => {
    dispatch({
      type: actionTypes.LOG_OUT_REQUEST
    });

    const headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded; charset=utf-8');
    headers.append('X-XSRF-TOKEN', getCookie('XSRF-TOKEN'));
    const request = new Request('/api/logout', {
      method: 'POST',
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
      .then(() => {
        dispatch({
          type: actionTypes.LOG_OUT_SUCCESS
        });
      })
      .catch(error => {
        dispatch({
          type: actionTypes.LOG_OUT_FAILURE,
          payload: error
        });
      });
  };
};

export const checkAuthorization = () => {
  return (dispatch) => {
    dispatch({
      type: actionTypes.CHECK_AUTHORIZATION_REQUEST
    });

    const request = new Request('/api/users/check_authorization', {
      method: 'GET',
      credentials: 'same-origin'
    });

    return fetch(request)
      .then(response => {
        if (response.status !== 200) {
          const error = new Error(response.statusText);
          error.response = response;
          throw error;
        }
        return response.text();
      })
      .then(response => {
        dispatch({
          type: actionTypes.CHECK_AUTHORIZATION_SUCCESS,
          payload: response
        });
      })
      .catch(error => {
        dispatch({
          type: actionTypes.CHECK_AUTHORIZATION_FAILURE,
          payload: error
        });
      });
  };
};
