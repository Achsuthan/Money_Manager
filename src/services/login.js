import instance from "@/services/instance.js";
const login = (payload) => {
  return instance.instance
    .post("/login", payload)
    .then(function(response) {
      return response;
    })
    .catch((error) => {
      if (error.response.data.message) {
        throw new Error(error.response.data.message);
      }
    });
};

const register = (payload) => {
  return instance.instance
    .post("/register", payload)
    .then(function(response) {
      return response;
    })
    .catch((error) => {
      if (error.response.data.message) {
        throw new Error(error.response.data.message);
      }
    });
};

export default {
  login: login,
  register: register,
};
