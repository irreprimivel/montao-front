import * as actionTypes from '../constants/subscriptionConstants';

export const checkSubscription = (communityTitle) => {
  return (dispatch) => {
    dispatch({
      type: actionTypes.CHECK_SUBSCRIPTION_REQUEST
    });

    const headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded; charset=utf-8');
    // headers.append('X-XSRF-TOKEN', getCookie('XSRF-TOKEN'));

    const request = new Request('/api/communities/check_subscription', {
      method: 'POST',
      body: `communityTitle=${communityTitle}`,
      headers: headers,
      credentials: 'same-origin'
    });

    return fetch(request)
      .then(response => {
        if (response.status !== 200) {
          const error = new Error(response.statusText);
          error.response = response;
          throw error;
        } else {
          return response.text();
        }
      })
      .then(response => {
        dispatch({
          type: actionTypes.CHECK_SUBSCRIPTION_SUCCESS,
          payload: response
        });
      })
      .catch(error => {
        dispatch({
          type: actionTypes.CHECK_SUBSCRIPTION_FAILURE,
          payload: error
        });
      });
  };
};

export const join = (communityId) => {
  return dispatch => {
    dispatch({
      type: actionTypes.JOIN_REQUEST,
      payload: communityId
    });

    const query = [
      `cid=${communityId}`
    ].join('&');

    const headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded; charset=utf-8');
    // headers.append('X-XSRF-TOKEN', getCookie('XSRF-TOKEN'));

    const request = new Request(`/api/subscriptions?${query}`, {
      method: 'POST',
      headers: headers,
      credentials: 'same-origin'
    });

    return fetch(request)
      .then(response => {
        if (response.status !== 200) {
          const error = new Error(response.statusText);
          error.response = response.json();
          throw error;
        }
        return response.json();
      })
      .then(response => {
        dispatch({
          type: actionTypes.JOIN_SUCCESS,
          payload: response
        });
      })
      .catch(error => {
        dispatch({
          type: actionTypes.JOIN_FAILURE,
          payload: error
        });
      });
  };
};

export const leave = (communityId) => {
  return dispatch => {
    dispatch({
      type: actionTypes.LEAVE_REQUEST,
      payload: communityId
    });

    const query = [
      `cid=${communityId}`
    ].join('&');

    const headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded; charset=utf-8');
    // headers.append('X-XSRF-TOKEN', getCookie('XSRF-TOKEN'));

    const request = new Request(`/api/subscriptions?${query}`, {
      method: 'DELETE',
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
          type: actionTypes.LEAVE_SUCCESS,
          payload: response
        });
      })
      .catch(error => {
        dispatch({
          type: actionTypes.LEAVE_FAILURE,
          payload: error
        });
      });
  };
};
