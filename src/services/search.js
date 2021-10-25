import instance from "@/services/instance.js";
const searchPeople = (payload) => {
  return instance.instance
    .post("/search", payload)
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
  searchPeople: searchPeople,
};
