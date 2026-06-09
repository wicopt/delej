import { userApi } from "../../../shared/api/userServer";

export const searchUsers = async (username) => {
  const response = await userApi.get(
    `/users/search?username=${encodeURIComponent(username)}`
  );

  return response.data;
};

export const getAllUsers = async () => {
  const response = await userApi.get("/users/all");

  return response.data;
};
export const getFriends = async () => {
  const response = await userApi.get("/friends/all");
  return response.data;
};
 
export const getIncomingRequests = async () => {
  const response = await userApi.get("/friend-requests/incoming");
  return response.data;
};
 
export const sendFriendRequest = async (toUserId) => {
  const response = await userApi.post("/friend-requests", { toUserId });
  console.log("toUserId", toUserId);
  return response.data;
};
 
export const acceptFriendRequest = async (id) => {
  const response = await userApi.patch(`/friend-requests/${id}`);
  return response.data;
};
 
export const removeFriend = async (id) => {
  const response = await userApi.delete(`/friends/${id}`);
  return response.data;
};