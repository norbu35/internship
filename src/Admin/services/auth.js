import axios from "axios";

const login = (userData) => {
  return new Promise((resolve, reject) => {
    axios
      .post(process.env.REACT_APP_API_URL + "/api/auth", userData, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((resp) => {
        if (resp.data.token) {
          resolve(localStorage.setItem("user", JSON.stringify(resp.data)));
          localStorage.setItem("loginExpiration", expirationDate());
        }
      })
      .catch((err) => reject(err));
  });
};

const expirationDate = () => {
  const dt = new Date();
  return dt.setHours(dt.getHours() + 9);
};

const logout = () => {
  localStorage.removeItem("user");
  return new Promise((resolve, reject) => {
    const user = localStorage.getItem("user");
    axios
      .post(process.env.REACT_APP_API_URL + "/api/auth/logout", null, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + user.token,
        },
      })
      .then((resp) => resolve(resp))
      .catch((err) => reject(err));
  });
};

const authService = {
  login,
  logout,
};

export default authService;
