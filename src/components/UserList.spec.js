import { render, screen } from '@testing-library/react';
import UserList from './UserList';
import { setupServer } from 'msw/node';
import { rest } from 'msw';

const page1 = {
  content: [
    {
      id: 1,
      username: 'user1',
      email: 'user1@mail.com',
      image: null
    },
    {
      id: 2,
      username: 'user2',
      email: 'user2@mail.com',
      image: null
    },
    {
      id: 3,
      username: 'user3',
      email: 'user3@mail.com',
      image: null
    }
  ],
  page: 0,
  size: 3,
  totalPages: 9
};

const server = setupServer(
  rest.get('/api/1.0/users', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(page1));
  })
);

beforeEach(() => {
  server.resetHandlers();
});

beforeAll(() => server.listen());

afterAll(() => server.close());

describe('User List', () => {
  it('displays three users in list', async () => {
    render(<UserList />);
    const users = await screen.findAllByText(/user/);
    expect(users.length).toBe(3);
  });
});
