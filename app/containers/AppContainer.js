import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as authActions from '../actions/AuthActions';

import App from '../components/App';

const mapStateToProps = (state) => {
  return {
    isAuthorized: state.usersReducer.get('isAuthorized')
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    checkAuthorization: bindActionCreators(authActions.checkAuthorization, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
