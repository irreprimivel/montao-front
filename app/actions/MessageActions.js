import * as constants from '../constants/messageConstants';

export const getMessages = (channelId, page, limit) => {
  return (dispatch) => {
    dispatch({
      type: constants.GET_MESSAGES_REQUEST
    });

    const headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded; charset=utf-8');
    // headers.append('X-XSRF-TOKEN', getCookie('XSRF-TOKEN'));

    const query = [
      `cid=${channelId}`,
      `p=${page}`,
      `l=${limit}`
    ].join('&');

    const request = new Request(`/api/messages?${query}`, {
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
          type: constants.GET_MESSAGES_SUCCESS,
          payload: {
            paging: {
              totalCount: count,
              page: page,
              limit: limit,
              totalPagesCount: Math.ceil(count / limit)
            },
            messages: response.json()
          }
        });
      })
      .catch(error => {
        dispatch({
          type: constants.GET_MESSAGES_FAILURE,
          payload: error
        });
      });
  };
};

export const getMessage = (message) => {
  return (dispatch) => {
    dispatch({
      type: constants.GET_MESSAGE_SUCCESS,
      payload: message
    });
  };
};

export const sendMessage = (message) => {
  return (dispatch) => {
    dispatch({
      type: constants.SEND_MESSAGE_REQUEST
    });

    const headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded; charset=utf-8');
    // headers.append('X-XSRF-TOKEN', getCookie('XSRF-TOKEN'));

    const request = new Request('/api/messages', {
      method: 'POST',
      body: JSON.stringify(message),
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
          type: constants.SEND_MESSAGE_SUCCESS,
          payload: location
        });
      })
      .catch(error => {
        dispatch({
          type: constants.SEND_MESSAGE_FAILURE,
          payload: error
        });
      });
  };
};
