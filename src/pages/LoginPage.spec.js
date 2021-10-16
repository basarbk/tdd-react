import {
  render,
  screen,
  waitForElementToBeRemoved
} from '@testing-library/react';
import LoginPage from './LoginPage';
import userEvent from '@testing-library/user-event';
import { setupServer } from 'msw/node';
import { rest } from 'msw';

let requestBody,
  count = 0;
const server = setupServer(
  rest.post('/api/1.0/auth', (req, res, ctx) => {
    requestBody = req.body;
    count += 1;
    return res(ctx.status(401));
  })
);

beforeEach(() => {
  count = 0;
  server.resetHandlers();
});

beforeAll(() => server.listen());

afterAll(() => server.close());

describe('Login Page', () => {
  describe('Layout', () => {
    it('has header', () => {
      render(<LoginPage />);
      const header = screen.queryByRole('heading', { name: 'Login' });
      expect(header).toBeInTheDocument();
    });
    it('has email input', () => {
      render(<LoginPage />);
      const input = screen.getByLabelText('E-mail');
      expect(input).toBeInTheDocument();
    });
    it('has password input', () => {
      render(<LoginPage />);
      const input = screen.getByLabelText('Password');
      expect(input).toBeInTheDocument();
    });
    it('has password type for password input', () => {
      render(<LoginPage />);
      const input = screen.getByLabelText('Password');
      expect(input.type).toBe('password');
    });
    it('has Login button', () => {
      render(<LoginPage />);
      const button = screen.queryByRole('button', { name: 'Login' });
      expect(button).toBeInTheDocument();
    });
    it('disables the button initially', () => {
      render(<LoginPage />);
      const button = screen.queryByRole('button', { name: 'Login' });
      expect(button).toBeDisabled();
    });
  });
  describe('Interactions', () => {
    let button;
    const setup = () => {
      render(<LoginPage />);
      const emailInput = screen.getByLabelText('E-mail');
      const passwordInput = screen.getByLabelText('Password');
      userEvent.type(emailInput, 'user100@mail.com');
      userEvent.type(passwordInput, 'P4ssword');
      button = screen.queryByRole('button', { name: 'Login' });
    };

    it('enables the button when email and password inputs are filled', () => {
      setup();
      expect(button).toBeEnabled();
    });

    it('displays spinner during api call', async () => {
      setup();
      expect(screen.queryByRole('status')).not.toBeInTheDocument();
      userEvent.click(button);
      const spinner = screen.getByRole('status');
      await waitForElementToBeRemoved(spinner);
    });
    it('sends email and password to backend after clicking the button', async () => {
      setup();
      userEvent.click(button);
      const spinner = screen.getByRole('status');
      await waitForElementToBeRemoved(spinner);
      expect(requestBody).toEqual({
        email: 'user100@mail.com',
        password: 'P4ssword'
      });
    });
    it('disables the button when there is an api call', async () => {
      setup();
      userEvent.click(button);
      userEvent.click(button);
      const spinner = screen.getByRole('status');
      await waitForElementToBeRemoved(spinner);
      expect(count).toEqual(1);
    });
  });
});
