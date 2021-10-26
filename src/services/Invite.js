import instance from "@/services/instance.js";
const getAllInvites = (payload) => {
  return instance.instance
    .get("/friend-invite?userId=" + payload.userId)
    .then(function(response) {
      return response;
    })
    .catch((error) => {
      if (error.response.data.message) {
        throw new Error(error.response.data.message);
      }
    });
};

const getAllGroupInvites = (payload) => {
  return instance.instance
    .get("/group-invite?userId=" + payload.userId)
    .then(function(response) {
      return response;
    })
    .catch((error) => {
      if (error.response.data.message) {
        throw new Error(error.response.data.message);
      }
    });
};

const deleteFriendInviteId = (payload) => {
  return instance.instance
    .delete("friend-invite?userId="+payload.userId+"&inviteId="+payload.inviteId)
    .then(function(response) {
      return response;
    })
    .catch((error) => {
      if (error.response.data.message) {
        throw new Error(error.response.data.message);
      }
    });
};

const deleteGroupInviteId = (payload) => {
  return instance.instance
    .delete("group-invite?userId="+payload.userId+"&groupInviteId="+payload.groupInviteId)
    .then(function(response) {
      return response;
    })
    .catch((error) => {
      if (error.response.data.message) {
        throw new Error(error.response.data.message);
      }
    });
};

const acceptGroupInvite = (payload) => {
  return instance.instance
    .post("accept_group_invite", payload)
    .then(function(response) {
      return response;
    })
    .catch((error) => {
      if (error.response.data.message) {
        throw new Error(error.response.data.message);
      }
    });
};

const sendGroupInvite = (payload) => {
  return instance.instance
    .post("group-invite", payload)
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
  getAllInvites: getAllInvites,
  getAllGroupInvites: getAllGroupInvites,
  deleteFriendInviteId: deleteFriendInviteId,
  deleteGroupInviteId: deleteGroupInviteId,
  acceptGroupInvite: acceptGroupInvite,
  sendGroupInvite: sendGroupInvite,
};
