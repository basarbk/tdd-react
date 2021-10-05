import SignUpPage from './SignUpPage';
import { render, screen } from '@testing-library/react';

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
});
