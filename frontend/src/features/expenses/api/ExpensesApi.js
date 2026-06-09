import { eventApi } from "../../../shared/api/eventServer";
export const GetExpenses = async (eventId) => {
  const response = await eventApi.get(`/expenses/${eventId}`);
  return response.data;
};

export const DeleteExpense = async (expenseId) => {
  const response = await eventApi.delete(`/expenses/${expenseId}`);
  return response.data;
};
export const CreateExpense = async ({ eventId, name, totalCost, currency, payerId, dateOfPayment }) => {
  const response = await eventApi.post("/expenses", {
    eventId,
    name,
    totalCost,
    currency,
    payerId,
    dateOfPayment,
  });
  return response.data;
};
export const AddExpenseParticipant = async (expenseId, userId) => {
  const response = await eventApi.post("/expense-participants", {
    expenseId,
    userId,
  });

  return response.data;
};
export const GetBalance = async (eventId) => {
  const response = await eventApi.get(`/balance/${eventId}`);
  return response.data;
};