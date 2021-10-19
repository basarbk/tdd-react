import ProfileCard from './ProfileCard';
import { render, screen, waitForElementToBeRemoved } from '../test/setup';
import storage from '../state/storage';
import userEvent from '@testing-library/user-event';
import { setupServer } from 'msw/node';
import { rest } from 'msw';

let count, id, requestBody, header;
const server = setupServer(
  rest.put('/api/1.0/users/:id', (req, res, ctx) => {
    count += 1;
    id = req.params.id;
    requestBody = req.body;
    header = req.headers.get('Authorization');
    return res(ctx.status(200));
  }),
  rest.delete('/api/1.0/users/:id', (req, res, ctx) => {
    id = req.params.id;
    header = req.headers.get('Authorization');
    return res(ctx.status(200));
  })
);

beforeEach(() => {
  count = 0;
  id = 0;
  server.resetHandlers();
});

beforeAll(() => server.listen());

afterAll(() => server.close());

describe('Profile Card', () => {
  const setup = (user = { id: 5, username: 'user5' }) => {
    storage.setItem('auth', {
      id: 5,
      username: 'user5',
      header: 'auth header value'
    });
    render(<ProfileCard user={user} />);
  };

  let saveButton;
  const setupInEditMode = () => {
    setup();
    userEvent.click(screen.getByRole('button', { name: 'Edit' }));
    saveButton = screen.getByRole('button', { name: 'Save' });
  };

  it('displays edit button when logged in user is shown on card', () => {
    setup();
    expect(screen.getByRole('button', { name: 'Edit' })).toBeInTheDocument();
  });
  it('does not display edit button for another user', () => {
    setup({ id: 2, username: 'user2' });
    expect(
      screen.queryByRole('button', { name: 'Edit' })
    ).not.toBeInTheDocument();
  });
  it('displays input for username after clicking edit', () => {
    setup();
    expect(
      screen.queryByLabelText('Change your username')
    ).not.toBeInTheDocument();
    userEvent.click(screen.getByRole('button', { name: 'Edit' }));
    expect(screen.queryByLabelText('Change your username')).toBeInTheDocument();
  });
  it('displays save and cancel buttons in edit mode', () => {
    setup();
    userEvent.click(screen.getByRole('button', { name: 'Edit' }));
    expect(screen.getByRole('button', { name: 'Save' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Cancel' })).toBeInTheDocument();
  });
  it('hides Edit button and username header in edit mode', () => {
    setup();
    userEvent.click(screen.getByRole('button', { name: 'Edit' }));
    expect(
      screen.queryByRole('button', { name: 'Edit' })
    ).not.toBeInTheDocument();
    expect(
      screen.queryByRole('heading', { name: 'user5' })
    ).not.toBeInTheDocument();
  });
  it('has the current username in input', () => {
    setup();
    userEvent.click(screen.getByRole('button', { name: 'Edit' }));
    const input = screen.queryByLabelText('Change your username');
    expect(input).toHaveValue('user5');
  });
  it('displays spinner during api call', async () => {
    setupInEditMode();
    userEvent.click(saveButton);
    const spinner = screen.getByRole('status');
    await waitForElementToBeRemoved(spinner);
  });
  it('disables the save button during api call', async () => {
    setupInEditMode();
    userEvent.click(saveButton);
    userEvent.click(saveButton);
    const spinner = screen.getByRole('status');
    await waitForElementToBeRemoved(spinner);
    expect(count).toBe(1);
  });
  it('sends request to the endpoint having logged in user id', async () => {
    setupInEditMode();
    userEvent.click(saveButton);
    const spinner = screen.getByRole('status');
    await waitForElementToBeRemoved(spinner);
    expect(id).toBe('5');
  });
  it('sends request with body having updated username', async () => {
    setupInEditMode();
    const editInput = screen.getByLabelText('Change your username');
    userEvent.clear(editInput);
    userEvent.type(editInput, 'user5-updated');
    userEvent.click(saveButton);
    const spinner = screen.getByRole('status');
    await waitForElementToBeRemoved(spinner);
    expect(requestBody).toEqual({ username: 'user5-updated' });
  });
  it('sends request with authorization header', async () => {
    setupInEditMode();
    userEvent.click(saveButton);
    const spinner = screen.getByRole('status');
    await waitForElementToBeRemoved(spinner);
    expect(header).toBe('auth header value');
  });
  it('sends request with body having username even user does not update it', async () => {
    setupInEditMode();
    userEvent.click(saveButton);
    const spinner = screen.getByRole('status');
    await waitForElementToBeRemoved(spinner);
    expect(requestBody).toEqual({ username: 'user5' });
  });
  it('hides edit layout after successful update', async () => {
    setupInEditMode();
    userEvent.click(saveButton);
    const editButton = await screen.findByRole('button', { name: 'Edit' });
    expect(editButton).toBeInTheDocument();
  });
  it('updates username in profile card after successful update', async () => {
    setupInEditMode();
    const editInput = screen.getByLabelText('Change your username');
    userEvent.clear(editInput);
    userEvent.type(editInput, 'new-username');
    userEvent.click(saveButton);
    const newUsername = await screen.findByRole('heading', {
      name: 'new-username'
    });
    expect(newUsername).toBeInTheDocument();
  });
  it('displays last updated name in input in edit mode after successful username update', async () => {
    setupInEditMode();
    let editInput = screen.getByLabelText('Change your username');
    userEvent.clear(editInput);
    userEvent.type(editInput, 'new-username');
    userEvent.click(saveButton);
    const editButton = await screen.findByRole('button', { name: 'Edit' });
    userEvent.click(editButton);
    editInput = screen.getByLabelText('Change your username');
    expect(editInput).toHaveValue('new-username');
  });
  it('hides edit layout after clicking cancel', async () => {
    setupInEditMode();
    userEvent.click(screen.getByRole('button', { name: 'Cancel' }));
    const editButton = await screen.findByRole('button', { name: 'Edit' });
    expect(editButton).toBeInTheDocument();
  });
  it('displays the original username after username is changed in edit mode but cancelled', async () => {
    setupInEditMode();
    let editInput = screen.getByLabelText('Change your username');
    userEvent.clear(editInput);
    userEvent.type(editInput, 'new-username');
    userEvent.click(screen.getByRole('button', { name: 'Cancel' }));
    const header = screen.getByRole('heading', { name: 'user5' });
    expect(header).toBeInTheDocument();
  });
  it('displays last updated name after clicking cancel in second edit', async () => {
    setupInEditMode();
    let editInput = screen.getByLabelText('Change your username');
    userEvent.clear(editInput);
    userEvent.type(editInput, 'new-username');
    userEvent.click(saveButton);
    const editButton = await screen.findByRole('button', { name: 'Edit' });
    userEvent.click(editButton);
    userEvent.click(screen.getByRole('button', { name: 'Cancel' }));
    const header = screen.getByRole('heading', { name: 'new-username' });
    expect(header).toBeInTheDocument();
  });
  it('displays delete button when logged in user is shown on card', () => {
    setup();
    expect(
      screen.getByRole('button', { name: 'Delete My Account' })
    ).toBeInTheDocument();
  });
  it('does not display delete button for another user', () => {
    setup({ id: 2, username: 'user2' });
    expect(
      screen.queryByRole('button', { name: 'Delete My Account' })
    ).not.toBeInTheDocument();
  });
  it('displays modal after clicking delete', () => {
    setup();
    expect(screen.queryByTestId('modal')).not.toBeInTheDocument();
    const deleteButton = screen.queryByRole('button', {
      name: 'Delete My Account'
    });
    userEvent.click(deleteButton);
    const modal = screen.queryByTestId('modal');
    expect(modal).toBeInTheDocument();
  });
  it('displays confirmation question with cancel and confirm buttons', () => {
    setup();
    const deleteButton = screen.queryByRole('button', {
      name: 'Delete My Account'
    });
    userEvent.click(deleteButton);
    expect(
      screen.queryByText('Are you sure to delete your account?')
    ).toBeInTheDocument();
    expect(
      screen.queryByRole('button', { name: 'Cancel' })
    ).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: 'Yes' })).toBeInTheDocument();
  });
  it('removes modal after clicking cancel', () => {
    setup();
    const deleteButton = screen.queryByRole('button', {
      name: 'Delete My Account'
    });
    userEvent.click(deleteButton);
    userEvent.click(screen.queryByRole('button', { name: 'Cancel' }));
    const modal = screen.queryByTestId('modal');
    expect(modal).not.toBeInTheDocument();
  });
  it('displays spinner while delete api call in progress', async () => {
    setup();
    const deleteButton = screen.queryByRole('button', {
      name: 'Delete My Account'
    });
    userEvent.click(deleteButton);
    expect(screen.queryByRole('status')).not.toBeInTheDocument();
    userEvent.click(screen.queryByRole('button', { name: 'Yes' }));
    const spinner = screen.getByRole('status');
    await waitForElementToBeRemoved(spinner);
  });
  it('sends logged in user id and authorization header in delete api call', async () => {
    setup();
    const deleteButton = screen.queryByRole('button', {
      name: 'Delete My Account'
    });
    userEvent.click(deleteButton);
    userEvent.click(screen.queryByRole('button', { name: 'Yes' }));
    const spinner = screen.getByRole('status');
    await waitForElementToBeRemoved(spinner);
    expect(header).toBe('auth header value');
    expect(id).toBe('5');
  });
});
