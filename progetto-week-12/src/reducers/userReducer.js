const userReducer = (
  state = {
    user: {
      token: "",
      username: "",
      email: "",
      logged: false,
    },
  },
  action
) => {
  switch (action.type) {
    case "SET_TOKEN":
      return { ...state, token: action.payload };
    case "SET_USERNAME":
      return { ...state, username: action.payload };
    case "SET_EMAIL":
      return { ...state, email: action.payload };
    case "SET_LOGGED":
      return { ...state, logged: action.payload };
    default:
      return state;
  }
};

export default userReducer;
