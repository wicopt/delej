// useExpenses.jsx
import { useState, useEffect } from "react";
import { GetExpenses, DeleteExpense, AddExpenseParticipant} from "../api/ExpensesApi";

export const useExpenses = (eventId) => {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchExpenses = async () => {
    if (!eventId) return;
    setLoading(true);
    setError(null);
    try {
      const data = await GetExpenses(eventId);
      setExpenses(data);
    } catch (err) {
      setError(err.message || "Не удалось загрузить расходы");
    } finally {
      setLoading(false);
    }
  };

  // Удалить расход и обновить список
  const removeExpense = async (expenseId) => {
    try {
      await DeleteExpense(expenseId);
      // убираем из локального стейта без нового запроса
      setExpenses((prev) => prev.filter((e) => e.expenseId !== expenseId));
    } catch (err) {
      console.error("Ошибка удаления:", err);
    }
  };

  useEffect(() => {
    fetchExpenses();
  }, [eventId]);

  return { expenses, loading, error, removeExpense, refetch: fetchExpenses };
};
