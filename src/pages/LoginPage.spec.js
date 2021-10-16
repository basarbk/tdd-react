import { render, screen } from '@testing-library/react';
import LoginPage from './LoginPage';
import userEvent from '@testing-library/user-event';

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
    it('enables the button when email and password inputs are filled', () => {
      render(<LoginPage />);
      const emailInput = screen.getByLabelText('E-mail');
      const passwordInput = screen.getByLabelText('Password');
      userEvent.type(emailInput, 'user100@mail.com');
      userEvent.type(passwordInput, 'P4ssword');
      const button = screen.queryByRole('button', { name: 'Login' });
      expect(button).toBeEnabled();
    });
  });
});
