import { SubmissionError, reset } from 'redux-form';

import * as constants from '../constants/channelConstants';
import * as viewActions from './ViewActions';

export const getChannels = (communityTitle, page, limit) => {
  return (dispatch) => {
    dispatch({
      type: constants.GET_CHANNELS_REQUEST
    });

    const headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded; charset=utf-8');
    // headers.append('X-XSRF-TOKEN', getCookie('XSRF-TOKEN'));

    const query = [
      `c=${communityTitle}`,
      `p=${page}`,
      `l=${limit}`
    ].join('&');

    const request = new Request(`/api/channels?${query}`, {
      method: 'GET',
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
        return response;
      })
      .then(response => {
        const count = response.headers.get('X-Pagination-Count');
        const page = response.headers.get('X-Pagination-Page');
        const limit = response.headers.get('X-Pagination-Limit');
        dispatch({
          type: constants.GET_CHANNELS_SUCCESS,
          payload: {
            paging: {
              totalCount: count,
              page: page,
              limit: limit,
              totalPagesCount: Math.ceil(count / limit)
            },
            channels: response.json()
          }
        });
      })
      .catch(error => {
        dispatch({
          type: constants.GET_CHANNELS_FAILURE,
          payload: error
        });
      });
  };
};

export const add = (channel) => {
  return dispatch => {
    dispatch({
      type: constants.ADD_CHANNEL_REQUEST
    });

    const headers = new Headers();
    headers.append('Content-Type', 'application/json; charset=utf-8');
    // headers.append('X-XSRF-TOKEN', getCookie('XSRF-TOKEN'));

    const request = new Request('/api/channels', {
      method: 'POST',
      body: JSON.stringify(channel),
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
          type: constants.ADD_CHANNEL_SUCCESS,
          payload: location
        });
        dispatch(viewActions.hideAddChannelDialog());
        dispatch(reset('addChannelForm'));
      })
      .catch(error => {
        dispatch({
          type: constants.ADD_CHANNEL_FAILURE,
          payload: error
        });
        throw new SubmissionError({
          _error: 'Creation failed!'
        });
      });
  };
};
