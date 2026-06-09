import { useState, useEffect } from "react";
import { GetBalance } from "../api/ExpensesApi";

export const useBalance = (eventId) => {
  const [balances, setBalances] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchBalance = async () => {
    if (!eventId) return;
    setLoading(true);
    setError(null);
    try {
      const data = await GetBalance(eventId);
      setBalances(data);
    } catch (err) {
      setError(err.message || "Не удалось загрузить балансы");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBalance();
  }, [eventId]);

  return { balances, loading, error, refetch: fetchBalance };
};