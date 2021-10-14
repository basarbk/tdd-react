import { Component } from 'react';
import { getUserById } from '../api/apiCalls';
import ProfileCard from '../components/ProfileCard';
import Spinner from '../components/Spinner';
import Alert from '../components/Alert';

class UserPage extends Component {
  state = {
    user: {},
    pendingApiCall: false
  };

  async componentDidMount() {
    this.setState({ pendingApiCall: true });
    try {
      const response = await getUserById(this.props.match.params.id);
      this.setState({ user: response.data });
    } catch (error) {}
    this.setState({ pendingApiCall: false });
  }

  render() {
    const { user, pendingApiCall } = this.state;
    return (
      <div data-testid="user-page">
        {!pendingApiCall && <ProfileCard user={user} />}
        {pendingApiCall && (
          <Alert type="secondary" center>
            <Spinner size="big" />
          </Alert>
        )}
      </div>
    );
  }
}

export default UserPage;
