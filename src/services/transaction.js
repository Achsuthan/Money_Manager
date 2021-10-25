import instance from "@/services/instance.js";
const getTransactions = (payload) => {
  return instance.instance
    .post("/getTransactions", payload)
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
  getTransactions: getTransactions,
};
