import SignUpPage from './SignUpPage';
import {
  render,
  screen,
  waitFor,
  waitForElementToBeRemoved
} from '../test/setup';
import userEvent from '@testing-library/user-event';
import { setupServer } from 'msw/node';
import { rest } from 'msw';
import en from '../locale/en.json';
import tr from '../locale/tr.json';

let requestBody;
let counter = 0;
let acceptLanguageHeader;
const server = setupServer(
  rest.post('/api/1.0/users', (req, res, ctx) => {
    requestBody = req.body;
    counter += 1;
    acceptLanguageHeader = req.headers.get('Accept-Language');
    return res(ctx.status(200));
  })
);

beforeEach(() => {
  counter = 0;
  server.resetHandlers();
});

beforeAll(() => server.listen());

afterAll(() => server.close());

describe('Sign Up Page', () => {
  describe('Layout', () => {
    it('has header', () => {
      render(<SignUpPage />);
      const header = screen.queryByRole('heading', { name: 'Sign Up' });
      expect(header).toBeInTheDocument();
    });
    it('has username input', () => {
      render(<SignUpPage />);
      const input = screen.getByLabelText('Username');
      expect(input).toBeInTheDocument();
    });
    it('has email input', () => {
      render(<SignUpPage />);
      const input = screen.getByLabelText('E-mail');
      expect(input).toBeInTheDocument();
    });
    it('has password input', () => {
      render(<SignUpPage />);
      const input = screen.getByLabelText('Password');
      expect(input).toBeInTheDocument();
    });
    it('has password type for password input', () => {
      render(<SignUpPage />);
      const input = screen.getByLabelText('Password');
      expect(input.type).toBe('password');
    });
    it('has password repeat input', () => {
      render(<SignUpPage />);
      const input = screen.getByLabelText('Password Repeat');
      expect(input).toBeInTheDocument();
    });
    it('has password type for password repeat input', () => {
      render(<SignUpPage />);
      const input = screen.getByLabelText('Password Repeat');
      expect(input.type).toBe('password');
    });
    it('has Sign Up button', () => {
      render(<SignUpPage />);
      const button = screen.queryByRole('button', { name: 'Sign Up' });
      expect(button).toBeInTheDocument();
    });
    it('disables the button initially', () => {
      render(<SignUpPage />);
      const button = screen.queryByRole('button', { name: 'Sign Up' });
      expect(button).toBeDisabled();
    });
  });
  describe('Interactions', () => {
    let button, usernameInput, emailInput, passwordInput, passwordRepeatInput;

    const setup = () => {
      render(<SignUpPage />);
      usernameInput = screen.getByLabelText('Username');
      emailInput = screen.getByLabelText('E-mail');
      passwordInput = screen.getByLabelText('Password');
      passwordRepeatInput = screen.getByLabelText('Password Repeat');
      userEvent.type(usernameInput, 'user1');
      userEvent.type(emailInput, 'user1@mail.com');
      userEvent.type(passwordInput, 'P4ssword');
      userEvent.type(passwordRepeatInput, 'P4ssword');
      button = screen.queryByRole('button', { name: 'Sign Up' });
    };

    it('enables the button when password and password repeat fields have same value', () => {
      setup();
      expect(button).toBeEnabled();
    });
    it('sends username, email and password to backend after clicking the button', async () => {
      setup();
      userEvent.click(button);

      await screen.findByText(
        'Please check your e-mail to activate your account'
      );
      expect(requestBody).toEqual({
        username: 'user1',
        email: 'user1@mail.com',
        password: 'P4ssword'
      });
    });
    it('disables button when there is an ongoing api call', async () => {
      setup();
      userEvent.click(button);
      userEvent.click(button);

      await screen.findByText(
        'Please check your e-mail to activate your account'
      );
      expect(counter).toBe(1);
    });
    it('displays spinner after clicking the submit', async () => {
      setup();
      expect(screen.queryByRole('status')).not.toBeInTheDocument();
      userEvent.click(button);
      const spinner = screen.getByRole('status');
      expect(spinner).toBeInTheDocument();
      await screen.findByText(
        'Please check your e-mail to activate your account'
      );
    });
    it('displays account activation notification after successful sign up request', async () => {
      setup();
      const message = 'Please check your e-mail to activate your account';
      expect(screen.queryByText(message)).not.toBeInTheDocument();
      userEvent.click(button);
      const text = await screen.findByText(message);
      expect(text).toBeInTheDocument();
    });
    it('hides sign up form after successful sign up request', async () => {
      setup();
      const form = screen.getByTestId('form-sign-up');
      userEvent.click(button);
      await waitFor(() => {
        expect(form).not.toBeInTheDocument();
      });
    });

    const generateValidationError = (field, message) => {
      return rest.post('/api/1.0/users', (req, res, ctx) => {
        return res(
          ctx.status(400),
          ctx.json({
            validationErrors: { [field]: message }
          })
        );
      });
    };

    it.each`
      field         | message
      ${'username'} | ${'Username cannot be null'}
      ${'email'}    | ${'E-mail cannot be null'}
      ${'password'} | ${'Password cannot be null'}
    `('displays $message for $field', async ({ field, message }) => {
      server.use(generateValidationError(field, message));
      setup();
      userEvent.click(button);
      const validationError = await screen.findByText(message);
      expect(validationError).toBeInTheDocument();
    });

    it('hides spinner and enables button after response received', async () => {
      server.use(
        generateValidationError('username', 'Username cannot be null')
      );
      setup();
      userEvent.click(button);
      await screen.findByText('Username cannot be null');
      expect(screen.queryByRole('status')).not.toBeInTheDocument();
      expect(button).toBeEnabled();
    });
    it('displays mismatch message for password repeat input', () => {
      setup();
      userEvent.type(passwordInput, 'P4ssword');
      userEvent.type(passwordRepeatInput, 'AnotherP4ssword');
      const validationError = screen.queryByText('Password mismatch');
      expect(validationError).toBeInTheDocument();
    });
    it.each`
      field         | message                      | label
      ${'username'} | ${'Username cannot be null'} | ${'Username'}
      ${'email'}    | ${'E-mail cannot be null'}   | ${'E-mail'}
      ${'password'} | ${'Password cannot be null'} | ${'Password'}
    `(
      'clears validation error after $field is updated',
      async ({ field, message, label }) => {
        server.use(generateValidationError(field, message));
        setup();
        userEvent.click(button);
        const validationError = await screen.findByText(message);
        userEvent.type(screen.getByLabelText(label), 'updated');
        expect(validationError).not.toBeInTheDocument();
      }
    );
  });
  describe('Internationalization', () => {
    let turkishToggle, englishToggle, passwordInput, passwordRepeatInput;
    const setup = () => {
      render(<SignUpPage />);
      turkishToggle = screen.getByTitle('Türkçe');
      englishToggle = screen.getByTitle('English');
      passwordInput = screen.getByLabelText('Password');
      passwordRepeatInput = screen.getByLabelText('Password Repeat');
    };

    it('initially displays all text in English', () => {
      setup();
      expect(
        screen.getByRole('heading', { name: en.signUp })
      ).toBeInTheDocument();
      expect(
        screen.getByRole('button', { name: en.signUp })
      ).toBeInTheDocument();
      expect(screen.getByLabelText(en.username)).toBeInTheDocument();
      expect(screen.getByLabelText(en.email)).toBeInTheDocument();
      expect(screen.getByLabelText(en.password)).toBeInTheDocument();
      expect(screen.getByLabelText(en.passwordRepeat)).toBeInTheDocument();
    });
    it('displays all text in Turkish after changing the language', () => {
      setup();
      userEvent.click(turkishToggle);

      expect(
        screen.getByRole('heading', { name: tr.signUp })
      ).toBeInTheDocument();
      expect(
        screen.getByRole('button', { name: tr.signUp })
      ).toBeInTheDocument();
      expect(screen.getByLabelText(tr.username)).toBeInTheDocument();
      expect(screen.getByLabelText(tr.email)).toBeInTheDocument();
      expect(screen.getByLabelText(tr.password)).toBeInTheDocument();
      expect(screen.getByLabelText(tr.passwordRepeat)).toBeInTheDocument();
    });

    it('displays all text in English after changing back from Turkish', () => {
      setup();

      userEvent.click(turkishToggle);
      userEvent.click(englishToggle);

      expect(
        screen.getByRole('heading', { name: en.signUp })
      ).toBeInTheDocument();
      expect(
        screen.getByRole('button', { name: en.signUp })
      ).toBeInTheDocument();
      expect(screen.getByLabelText(en.username)).toBeInTheDocument();
      expect(screen.getByLabelText(en.email)).toBeInTheDocument();
      expect(screen.getByLabelText(en.password)).toBeInTheDocument();
      expect(screen.getByLabelText(en.passwordRepeat)).toBeInTheDocument();
    });
    it('displays password mismatch validation in Turkish', () => {
      setup();

      userEvent.click(turkishToggle);

      userEvent.type(passwordInput, 'P4ss');
      const validationMessageInTurkish = screen.queryByText(
        tr.passwordMismatchValidation
      );
      expect(validationMessageInTurkish).toBeInTheDocument();
    });
    it('sends accept language header as en for outgoing request', async () => {
      setup();
      userEvent.type(passwordInput, 'P4ssword');
      userEvent.type(passwordRepeatInput, 'P4ssword');
      const button = screen.getByRole('button', { name: en.signUp });
      const form = screen.queryByTestId('form-sign-up');
      userEvent.click(button);
      await waitForElementToBeRemoved(form);
      expect(acceptLanguageHeader).toBe('en');
    });
    it('sends accept language header as tr for outgoing request after selecting that language', async () => {
      setup();
      userEvent.type(passwordInput, 'P4ssword');
      userEvent.type(passwordRepeatInput, 'P4ssword');
      const button = screen.getByRole('button', { name: en.signUp });
      userEvent.click(turkishToggle);
      const form = screen.queryByTestId('form-sign-up');
      userEvent.click(button);
      await waitForElementToBeRemoved(form);
      expect(acceptLanguageHeader).toBe('tr');
    });
  });
});
