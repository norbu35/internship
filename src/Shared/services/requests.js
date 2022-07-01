import axios from "axios";

axios.defaults.baseURL = process.env.REACT_APP_API_URL + "/student/";
const user = JSON.parse(localStorage.getItem("user"));

export function getItems(type) {
  return new Promise((resolve, reject) => {
    axios
      .get(`/${type}/getlist`)
      .then((resp) => resolve(resp))
      .catch((err) => reject(err));
  });
}

export function addItem(type, data) {
  return new Promise((resolve, reject) => {
    axios
      .post(`/${type}/edit`, data, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + user.token,
        },
      })
      .then((resp) => resolve(resp))
      .catch((err) => reject(err));
  });
}

export function editItem(type, data) {
  return new Promise((resolve, reject) => {
    axios
      .post(`/${type}/edit`, data, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + user.token,
        },
      })
      .then((resp) => resolve(resp))
      .catch((err) => reject(err));
  });
}

export function deleteItem(type, id) {
  return new Promise((resolve, reject) => {
    const data = {
      id: id,
    };
    axios
      .post(`/${type}/delete`, data, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + user.token,
        },
      })
      .then((resp) => resolve(resp))
      .catch((err) => reject(err));
  });
}

export function logout() {
  return new Promise((resolve, reject) => {
    axios
      .post(process.env.REACT_APP_API_URL + "/api/auth/logout", null, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + user.token,
        },
      })
      .then((resp) => resolve(resp))
      .catch((err) => reject(err));
    console.log("logout");
  });
}
