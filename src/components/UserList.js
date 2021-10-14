import { Component } from 'react';
import { loadUsers } from '../api/apiCalls';
import UserListItem from './UserListItem';
import { withTranslation } from 'react-i18next';

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
    this.loadData();
  }

  loadData = async (pageIndex) => {
    try {
      const response = await loadUsers(pageIndex);
      const page = response.data;
      this.setState({ page: page });
    } catch (error) {}
  };

  render() {
    const { totalPages, page, content } = this.state.page;
    const { t } = this.props;
    return (
      <div className="card">
        <div className="card-header text-center">
          <h3>{t('users')}</h3>
        </div>
        <ul className="list-group list-group-flush">
          {content.map((user) => {
            return <UserListItem key={user.id} user={user} />;
          })}
        </ul>
        <div className="card-footer">
          {page !== 0 && (
            <button
              className="btn btn-outline-secondary btn-sm"
              onClick={() => this.loadData(page - 1)}
            >
              {t('previousPage')}
            </button>
          )}
          {totalPages > page + 1 && (
            <button
              className="btn btn-outline-secondary btn-sm"
              onClick={() => this.loadData(page + 1)}
            >
              {t('nextPage')}
            </button>
          )}
        </div>
      </div>
    );
  }
}

export default withTranslation()(UserList);
