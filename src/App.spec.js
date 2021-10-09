import { render, screen } from '@testing-library/react';
import App from './App';
import userEvent from '@testing-library/user-event';

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

  it.each`
    targetPage
    ${'Home'}
    ${'Sign Up'}
    ${'Login'}
  `('has link to $targetPage on NavBar', ({ targetPage }) => {
    setup('/');
    const link = screen.getByRole('link', { name: targetPage });
    expect(link).toBeInTheDocument();
  });

  it.each`
    initialPath  | clickingTo   | visiblePage
    ${'/'}       | ${'Sign Up'} | ${'signup-page'}
    ${'/signup'} | ${'Home'}    | ${'home-page'}
    ${'/signup'} | ${'Login'}   | ${'login-page'}
  `(
    'displays $visiblePage after clicking $clickingTo',
    ({ initialPath, clickingTo, visiblePage }) => {
      setup(initialPath);
      const link = screen.getByRole('link', { name: clickingTo });
      userEvent.click(link);
      expect(screen.getByTestId(visiblePage)).toBeInTheDocument();
    }
  );

  it('displays home page when clicking brand logo', () => {
    setup('/login');
    const logo = screen.queryByAltText('Hoaxify');
    userEvent.click(logo);
    expect(screen.getByTestId('home-page')).toBeInTheDocument();
  });
});
