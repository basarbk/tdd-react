import { Component } from 'react';
import { loadUsers } from '../api/apiCalls';

class UserList extends Component {
  state = {
    page: {
      content: [],
      page: 0,
      size: 0,
      totalPages: 0
    }
  };

  componentDidMount() {
    loadUsers().then((response) => {
      this.setState({ page: response.data });
    });
  }

  render() {
    return (
      <div className="card">
        <div className="card-header text-center">
          <h3>Users</h3>
        </div>
        <ul className="list-group list-group-flush">
          {this.state.page.content.map((user) => {
            return (
              <li className="list-group-item list-group-item-action">
                {user.username}
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}

export default UserList;
