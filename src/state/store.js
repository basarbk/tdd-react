import { createStore } from 'redux';
import authReducer from './authReducer';

const createAppStore = () => {
  const initialState = {
    isLoggedIn: false,
    id: ''
  };

  const store = createStore(
    authReducer,
    initialState,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  );

  return store;
};

export default createAppStore;
