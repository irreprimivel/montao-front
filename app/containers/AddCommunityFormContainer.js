import { reduxForm } from 'redux-form';

// import { getCookie } from '../utils/cookie';

import AddCommunityForm from '../components/AddCommunityForm';

const validate = (values) => {
  const errors = {};
  if (!values.title) {
    errors.title = 'Require';
  } else if (values.title.length < 4) {
    errors.title = 'Please enter at least 4 characters';
  }
  if (!values.founder) {
    errors.founder = 'Require';
  }
  return errors;
};

const asyncValidate = (values) => {
  const query = [
    `t=${values.title}`
  ].join('&');

  const headers = new Headers();
  headers.append('Content-Type', 'application/x-www-form-urlencoded; charset=utf-8');
  // headers.append('X-XSRF-TOKEN', getCookie('XSRF-TOKEN'));

  const request = new Request(`/api/communities?${query}`, {
    method: 'HEAD',
    headers: headers,
    credentials: 'same-origin'
  });

  return fetch(request)
    .then(response => {
      if (response.status !== 404) {
        const error = new Error(response.statusText);
        error.response = response;
        throw error;
      } else {
        return response.text();
      }
    })
    .then(data => {
      if (data === 'false') {
        throw { title: 'This title already exists' };
      }
    })
    .catch(error => {

    });
};

export default reduxForm({
  form: 'addCommunityForm',
  validate,
  asyncValidate,
  asyncBlurFields: ['title']
})(AddCommunityForm);
