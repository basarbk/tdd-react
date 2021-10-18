const reducer = (state, action) => {
  if (action.type === 'login-success') {
    return {
      ...state,
      ...action.payload,
      isLoggedIn: true
    };
  } else if (action.type === 'user-update-success') {
    return {
      ...state,
      username: action.payload.username
    };
  } else if (action.type === 'logout-success') {
    return {
      isLoggedIn: false
    };
  }
  return state;
};

export default reducer;
