const reducer = (state, action) => {
  if (action.type === 'login-success') {
    const newState = { ...state };
    newState.id = action.payload.id;
    newState.isLoggedIn = true;
    return newState;
  }
  return state;
};

export default reducer;
