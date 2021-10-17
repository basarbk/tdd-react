const reducer = (state, action) => {
  if (action.type === 'login-success') {
    return {
      ...state,
      ...action.payload,
      isLoggedIn: true
    };
  }
  return state;
};

export default reducer;
