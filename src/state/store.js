import { createStore } from 'redux';
import authReducer from './authReducer';
import storage from './storage';

export let store;

const createAppStore = () => {
  const initialState = storage.getItem('auth') || {
    isLoggedIn: false,
    id: ''
  };

  store = createStore(
    authReducer,
    initialState,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  );

  store.subscribe(() => {
    storage.setItem('auth', store.getState());
  });

  return store;
};

export default createAppStore;
