import SignUpPage from './pages/SignUpPage';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import UserPage from './pages/UserPage';
import LanguageSelector from './components/LanguageSelector';
import { useTranslation } from 'react-i18next';
import logo from './assets/hoaxify.png';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

function App() {
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
            <Link className="nav-link" to="/signup">
              {t('signUp')}
            </Link>
            <Link className="nav-link" to="/login">
              Login
            </Link>
          </ul>
        </div>
      </nav>
      <div className="container">
        <Route exact path="/" component={HomePage} />
        <Route path="/signup" component={SignUpPage} />
        <Route path="/login" component={LoginPage} />
        <Route path="/user/:id" component={UserPage} />
        <LanguageSelector />
      </div>
    </Router>
  );
}

export default App;
