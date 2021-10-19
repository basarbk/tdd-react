import { AUTH } from './Constants';

const reducer = (state, action) => {
  if (action.type === AUTH.LOGIN_SUCCESS) {
    return {
      ...state,
      ...action.payload,
      isLoggedIn: true
    };
  } else if (action.type === AUTH.USER_UPDATE_SUCCESS) {
    return {
      ...state,
      username: action.payload.username
    };
  } else if (action.type === AUTH.LOGOUT_SUCCESS) {
    return {
      isLoggedIn: false
    };
  }
  return state;
};

export default reducer;
