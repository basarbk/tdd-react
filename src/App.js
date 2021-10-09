import SignUpPage from './pages/SignUpPage';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import UserPage from './pages/UserPage';
import LanguageSelector from './components/LanguageSelector';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import logo from './assets/hoaxify.png';

function App() {
  const { t } = useTranslation();

  const [path, setPath] = useState(window.location.pathname);

  const onClickLink = (event) => {
    event.preventDefault();
    const path = event.currentTarget.attributes.href.value;
    window.history.pushState({}, '', path);
    setPath(path);
  };

  return (
    <>
      <nav className="navbar navbar-expand navbar-light bg-light shadow-sm">
        <div className="container">
          <a
            className="navbar-brand"
            href="/"
            title="Home"
            onClick={onClickLink}
          >
            <img src={logo} alt="Hoaxify" width="60" />
            Hoaxify
          </a>
          <ul className="navbar-nav">
            <a className="nav-link" href="/signup" onClick={onClickLink}>
              {t('signUp')}
            </a>
            <a className="nav-link" href="/login" onClick={onClickLink}>
              Login
            </a>
          </ul>
        </div>
      </nav>
      <div className="container">
        {path === '/' && <HomePage />}
        {path === '/signup' && <SignUpPage />}
        {path === '/login' && <LoginPage />}
        {path.startsWith('/user/') && <UserPage />}
        <LanguageSelector />
      </div>
    </>
  );
}

export default App;
