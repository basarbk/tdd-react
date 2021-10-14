import { render, screen, waitFor } from '@testing-library/react';
import UserPage from './UserPage';
import { setupServer } from 'msw/node';
import { rest } from 'msw';
const server = setupServer();

beforeEach(() => {
  server.resetHandlers();
});

beforeAll(() => server.listen());

afterAll(() => server.close());

describe('User Page', () => {
  beforeEach(() => {
    server.use(
      rest.get('/api/1.0/users/:id', (req, res, ctx) => {
        return res(
          ctx.json({
            id: 1,
            username: 'user1',
            email: 'user1@mail.com',
            image: null
          })
        );
      })
    );
  });

  it('displays user name on page when user is found', async () => {
    const match = { params: { id: 1 } };
    render(<UserPage match={match} />);
    await waitFor(() => {
      expect(screen.queryByText('user1')).toBeInTheDocument();
    });
  });
});
