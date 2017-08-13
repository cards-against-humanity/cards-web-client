import React from 'react';
import FriendRequest from './FriendRequest.jsx';

class FriendRequestsReceived extends React.Component {
  constructor (props) {
    super(props);
  }

  render () {
    return (
      <div className="panel">
        <div>Friend Requests Received</div>
        {this.props.requestsReceived.map((user, index) => {
          return <FriendRequest user={user} type="received" key={index} />
        })}
      </div>
    );
  }
}

export default FriendRequestsReceived;