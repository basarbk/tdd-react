import { render, screen } from '@testing-library/react';
import App from './App';

describe('Routing', () => {
  const setup = (path) => {
    window.history.pushState({}, '', path);
    render(<App />);
  };

  it.each`
    path         | pageTestId
    ${'/'}       | ${'home-page'}
    ${'/signup'} | ${'signup-page'}
    ${'/login'}  | ${'login-page'}
    ${'/user/1'} | ${'user-page'}
    ${'/user/2'} | ${'user-page'}
  `('displays $pageTestId when path is $path', ({ path, pageTestId }) => {
    setup(path);
    const page = screen.queryByTestId(pageTestId);
    expect(page).toBeInTheDocument();
  });

  it.each`
    path         | pageTestId
    ${'/'}       | ${'signup-page'}
    ${'/'}       | ${'login-page'}
    ${'/'}       | ${'user-page'}
    ${'/signup'} | ${'home-page'}
    ${'/signup'} | ${'login-page'}
    ${'/signup'} | ${'user-page'}
    ${'/login'}  | ${'home-page'}
    ${'/login'}  | ${'signup-page'}
    ${'/login'}  | ${'user-page'}
    ${'/user/1'} | ${'home-page'}
    ${'/user/1'} | ${'signup-page'}
    ${'/user/1'} | ${'login-page'}
  `(
    'does not display $pageTestId when path is $path',
    ({ path, pageTestId }) => {
      setup(path);
      const page = screen.queryByTestId(pageTestId);
      expect(page).not.toBeInTheDocument();
    }
  );
});
