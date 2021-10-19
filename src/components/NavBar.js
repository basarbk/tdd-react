import { Link } from 'react-router-dom';
import logo from '../assets/hoaxify.png';
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../api/apiCalls';
import { logoutSuccess } from '../state/authActions';
const NavBar = (props) => {
  const { t } = useTranslation();
  const auth = useSelector((store) => store);
  const dispatch = useDispatch();

  const onClickLogout = async (event) => {
    event.preventDefault();
    try {
      await logout();
    } catch (error) {}
    dispatch(logoutSuccess());
  };

  return (
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
                {t('login')}
              </Link>
            </>
          )}
          {auth.isLoggedIn && (
            <>
              <Link className="nav-link" to={`/user/${auth.id}`}>
                My Profile
              </Link>
              <a href="/" className="nav-link" onClick={onClickLogout}>
                Logout
              </a>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
