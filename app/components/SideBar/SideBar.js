import React from 'react';

import ChannelListContainer from '../../containers/ChannelListContainer';
import UserListContainer from '../../containers/UserListContainer';

export default class SideBar extends React.Component {
  render() {
    return (
      <div>
        <div>
          <span>Channels </span>
          {this.props.isSubscribed && <a className="glyphicon glyphicon-plus pull-right"
                                         onClick={() => this.props.showAddChannelDialog()}/>}
          <ChannelListContainer communityTitle={this.props.communityTitle}/>
        </div>
        <div>
          <span>Users</span>
          <UserListContainer communityTitle={this.props.communityTitle}/>
        </div>
      </div>
    );
  }
}

SideBar.propTypes = {
  showAddChannelDialog: React.PropTypes.func.isRequired,
  communityTitle: React.PropTypes.string.isRequired,
  isSubscribed: React.PropTypes.bool.isRequired
};
