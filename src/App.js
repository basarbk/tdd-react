import SignUpPage from './pages/SignUpPage';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import UserPage from './pages/UserPage';
import LanguageSelector from './components/LanguageSelector';
function App() {
  return (
    <div className="container">
      {window.location.pathname === '/' && <HomePage />}
      {window.location.pathname === '/signup' && <SignUpPage />}
      {window.location.pathname === '/login' && <LoginPage />}
      {window.location.pathname.startsWith('/user/') && <UserPage />}
      <LanguageSelector />
    </div>
  );
}

export default App;
