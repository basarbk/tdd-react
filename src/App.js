import SignUpPage from './pages/SignUpPage';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import UserPage from './pages/UserPage';
import AccountActivationPage from './pages/AccountActivationPage';
import LanguageSelector from './components/LanguageSelector';
import { useTranslation } from 'react-i18next';
import logo from './assets/hoaxify.png';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { useState } from 'react';

function App() {
  const [auth, setAuth] = useState({
    isLoggedIn: false,
    id: ''
  });
  const { t } = useTranslation();

  return (
    <Router>
      <nav className="navbar navbar-expand navbar-light bg-light shadow-sm">
        <div className="container">
          <Link className="navbar-brand" to="/" title="Home">
            <img src={logo} alt="Hoaxify" width="60" />
            Hoaxify
          </Link>
          <ul className="navbar-nav">
            {!auth.isLoggedIn && (
              <>
                <Link className="nav-link" to="/signup">
                  {t('signUp')}
                </Link>
                <Link className="nav-link" to="/login">
                  Login
                </Link>
              </>
            )}
            {auth.isLoggedIn && (
              <Link className="nav-link" to={`/user/${auth.id}`}>
                My Profile
              </Link>
            )}
          </ul>
        </div>
      </nav>
      <div className="container pt-3">
        <Route exact path="/" component={HomePage} />
        <Route path="/signup" component={SignUpPage} />
        <Route
          path="/login"
          render={(reactRouterProps) => {
            return <LoginPage {...reactRouterProps} onLoginSuccess={setAuth} />;
          }}
        />
        <Route path="/user/:id" component={UserPage} />
        <Route path="/activate/:token" component={AccountActivationPage} />
        <LanguageSelector />
      </div>
    </Router>
  );
}

export default App;
