// useCreateExpense.jsx
import { useState } from "react";
import { CreateExpense, AddExpenseParticipant } from "../api/ExpensesApi";
import { GetParticipants } from "../../events/api/EventApi";
export const useCreateExpense = (eventId, onSuccess) => {
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [totalCost, setTotalCost] = useState("");
  const [currency, setCurrency] = useState("RUB");
  const [payerId, setPayerId] = useState("");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [participants, setParticipants] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedParticipants, setSelectedParticipants] = useState([]);

  const openModal = async () => {
    // загружаем участников события чтобы выбрать плательщика
    try {
      const data = await GetParticipants(eventId);
      setParticipants(data);
    } catch (err) {
      console.error("Ошибка загрузки участников:", err);
    }
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setTitle("");
    setTotalCost("");
    setPayerId("");
    setDate(new Date().toISOString().split("T")[0]);
  };

  const handleCreate = async () => {
    setIsLoading(true);
    try {
      // убираем пробелы из суммы перед отправкой
      const cost = parseFloat(totalCost.replace(/\s/g, ""));
      const expense = await CreateExpense({
        eventId,
        name: title,
        totalCost: cost,
        currency,
        payerId,
        dateOfPayment: date,
      });

      await Promise.all(
        selectedParticipants
          .filter((userId) => userId !== payerId) // исключаем плательщика
          .map((userId) => AddExpenseParticipant(expense.expenseId, userId)),
      );

      onSuccess();
      closeModal();
    } catch (err) {
      console.error("Ошибка создания расхода:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isOpen,
    openModal,
    closeModal,
    title,
    setTitle,
    totalCost,
    setTotalCost,
    currency,
    setCurrency,
    payerId,
    setPayerId,
    date,
    setDate,
    participants,
    isLoading,
    handleCreate,
    selectedParticipants,
    setSelectedParticipants,
  };
};
