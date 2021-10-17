import { createStore } from 'redux';
import authReducer from './authReducer';

const createAppStore = () => {
  let initialState = {
    isLoggedIn: false,
    id: ''
  };

  const storedState = localStorage.getItem('auth');
  if (storedState !== null) {
    try {
      initialState = JSON.parse(storedState);
    } catch (error) {}
  }

  const store = createStore(
    authReducer,
    initialState,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  );

  store.subscribe(() => {
    localStorage.setItem('auth', JSON.stringify(store.getState()));
  });

  return store;
};

export default createAppStore;
