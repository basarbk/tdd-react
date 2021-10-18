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
  }
  return state;
};

export default reducer;
