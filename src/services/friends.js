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

const sendRequest = (payload) => {
  return instance.instance
    .post("/friend-request", payload)
    .then(function(response) {
      return response;
    })
    .catch((error) => {
      if (error.response.data.message) {
        throw new Error(error.response.data.message);
      }
    });
};

const createInvite = (payload) => {
  return instance.instance
    .post("/friend-invite", payload)
    .then(function(response) {
      return response;
    })
    .catch((error) => {
      if (error.response.data.message) {
        throw new Error(error.response.data.message);
      }
    });
};

const deleteFriendReqeust = (payload) => {
  return instance.instance
    .delete("/friend-request?friendRequestId="+payload.friendRequestId+"&userId="+payload.userId)
    .then(function(response) {
      return response;
    })
    .catch((error) => {
      if (error.response.data.message) {
        throw new Error(error.response.data.message);
      }
    });
};

const acceptFriendRequest = (payload) => {
  return instance.instance
    .post("/accept-request", payload)
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
  sendRequest:sendRequest,
  createInvite: createInvite,
  deleteFriendReqeust: deleteFriendReqeust,
  acceptFriendRequest: acceptFriendRequest
};
