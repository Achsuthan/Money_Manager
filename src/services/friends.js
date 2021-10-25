import instance from "@/services/instance.js";
const getAllFriends = (payload) => {
  return instance.instance
    .get("/friend-request?userId=" + payload.userId)
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
  getAllFriends: getAllFriends,
};
