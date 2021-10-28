import instance from "@/services/instance.js";
const getTransactions = (payload) => {
  return instance.instance
    .post("/getTransactions", payload)
    .then(function (response) {
      return response;
    })
    .catch((error) => {
      if (error.response.data.message) {
        throw new Error(error.response.data.message);
      }
    });
};

const getFriendsTransactionbyUserId = (payload) => {
  return instance.instance
    .get(`/GetUserByTransacitonFriend?userId=${payload.userId}&transactionId=${payload.transactionId}`)
    .then(function (response) {
      return response;
    })
    .catch((error) => {
      if (error.response.data.message) {
        throw new Error(error.response.data.message);
      }
    });
};

const GetUserByTransactionIdGroup = (payload) => {
  return instance.instance
    .get(`/GetUserByTransactionIdGroup?userId=${payload.userId}&transactionId=${payload.transactionId}&groupId=${payload.groupId}`)
    .then(function (response) {
      return response;
    })
    .catch((error) => {
      if (error.response.data.message) {
        throw new Error(error.response.data.message);
      }
    });
};

const getFriendsTransaction = (type, payload) => {
  if (type == "friend") {
    return getFriendsTransactionbyUserId(payload)
  } else {
    return GetUserByTransactionIdGroup(payload)
  }

}

const getAllCategories = () => {
  return instance.instance
    .get("/GetCategories")
    .then(function (response) {
      return response;
    })
    .catch((error) => {
      if (error.response.data.message) {
        throw new Error(error.response.data.message);
      }
    });
};

const getAllFriendsByUserId = (payload) => {
  return instance.instance
    .get(`/friend-request?userId=${payload.userId}`)
    .then(function (response) {
      return response;
    })
    .catch((error) => {
      if (error.response.data.message) {
        throw new Error(error.response.data.message);
      }
    });
};

const getAllGroupFriendsByUserId = (payload) => {
  return instance.instance
    .get(`/GetUsersFromGroup?userId=${payload.userId}&groupId=${payload.groupId}`)
    .then(function (response) {
      return response;
    })
    .catch((error) => {
      if (error.response.data.message) {
        throw new Error(error.response.data.message);
      }
    });
};

const addTransactions = (payload) => {
  return instance.instance
    .post(`/transaction`, payload)
    .then(function (response) {
      return response;
    })
    .catch((error) => {
      if (error.response.data.message) {
        throw new Error(error.response.data.message);
      }
    });
};

export default {
  getTransactions: getTransactions,
  getFriendsTransaction: getFriendsTransaction,
  getAllCategories: getAllCategories,
  getAllFriendsByUserId: getAllFriendsByUserId,
  getAllGroupFriendsByUserId: getAllGroupFriendsByUserId,
  addTransactions: addTransactions
};
