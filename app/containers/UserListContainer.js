import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { getUsersByCommunity } from '../actions/UserActions';

import UserList from '../components/UserList';

const mapStateToProps = state => {
  return {
    subscribers: state.usersReducer.get('subscribers').toArray(),
    error: state.usersReducer.get('error')
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getUsers: bindActionCreators(getUsersByCommunity, dispatch)
  };

};

export default connect(mapStateToProps, mapDispatchToProps)(UserList);
