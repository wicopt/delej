import { eventApi } from "../../../shared/api/eventServer";
export const CreateEvent = async ({ eventName, iconId }) => {
  const response = await eventApi.post("/events", { eventName, iconId });
  return response.data;
};
export const GetEvents = async () => {
  const response = await eventApi.get("/events");
  return response.data;
};
export const GetEvent = async (id) => {
  const response = await eventApi.get(`/events/${id}`);
  return response.data;
};

export const UpdateEvent = async (eventId, { eventName, iconId, isFinished }) => {
  const response = await eventApi.patch(`/events/${eventId}`, {
    eventName,
    iconId,
    isFinished,
  });
  return response.data;
};
export const GetParticipants = async (eventId) => {
  const response = await eventApi.get(`/participants/${eventId}`);
  return response.data;
};

export const AddParticipant = async (eventId, userId) => {
  const response = await eventApi.post("/participants", { eventId, userId });
  return response.data;
};

export const RemoveParticipant = async (eventId) => {
  const response = await eventApi.delete(`/participants/${eventId}`);
  return response.data;
};