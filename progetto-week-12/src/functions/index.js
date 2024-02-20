export const getUsername = () => {
  const username = localStorage.getItem("username");
  console.log(username);
  if (username) {
    return username;
  } else {
    return "Guest";
  }
};

export const isLogged = () => {
  const token = localStorage.getItem("token");
  if (token) {
    return true;
  } else {
    return false;
  }
};
