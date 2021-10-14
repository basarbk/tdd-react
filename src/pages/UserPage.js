import { Component } from 'react';
import { getUserById } from '../api/apiCalls';
import ProfileCard from '../components/ProfileCard';

class UserPage extends Component {
  state = {
    user: {}
  };

  async componentDidMount() {
    try {
      const response = await getUserById(this.props.match.params.id);
      this.setState({ user: response.data });
    } catch (error) {}
  }

  render() {
    const { user } = this.state;
    return (
      <div data-testid="user-page">
        <ProfileCard user={user} />
      </div>
    );
  }
}

export default UserPage;
