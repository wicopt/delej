// ExpenseForm.jsx
import { useState } from "react";
import Button from "../../../shared/ui/Button";
import "./CreateExpenseModal.css";

const ExpenseForm = ({
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
  onClose,
  onCreate,
  isLoading,
  selectedParticipants,
  setSelectedParticipants,
}) => {
  const handleCostChange = (e) => {
    let input = e.target.value.replace(/,/g, ".").replace(/[^0-9.]/g, "");
    const parts = input.split(".");
    if (parts.length > 2) {
      input = parts[0] + "." + parts.slice(1).join("");
    }
    let formatted = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    if (parts[1] !== undefined) {
      formatted += "." + parts[1].slice(0, 2);
    }
    setTotalCost(formatted);
  };

  const isValid = title.trim() && totalCost && payerId && date;

  return (
    <div className="event-creation-container">
      <div className="d-flex justify-content-center">
        <h2>Новый расход</h2>
      </div>

      <div className="d-grid gap-3">
        <label>Название</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="input-creation"
          placeholder="Название расхода"
        />

        <label>Сумма</label>
        <div className="d-flex gap-2">
          <input
            type="text"
            value={totalCost}
            onChange={handleCostChange}
            className="input-creation"
            placeholder="0.00"
          />
          <select
            className="input-creation"
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
          >
            <option value="RUB">RUB</option>
            <option value="USD">USD</option>
          </select>
        </div>

        <label>Кто оплатил</label>
        <select
          className="input-creation"
          value={payerId}
          onChange={(e) => setPayerId(e.target.value)}
        >
          <option value="">Выберите участника</option>
          {participants.map((p) => (
            <option key={p.userId} value={p.userId}>
              {p.name} {p.username && `(@${p.username})`}
            </option>
          ))}
        </select>

        <label>Дата</label>
        <input
          type="date"
          className="input-creation"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
      </div>
      <label>Разделить между</label>

      <div className="d-flex gap-2">
        {participants.map((p) => {
          const isSelected = selectedParticipants.includes(p.userId);
          return (
            <Button
              key={p.userId}
              onClick={(e) => {
                e.currentTarget.blur(); // снимаем фокус сразу после клика
                if (isSelected) {
                  setSelectedParticipants(
                    selectedParticipants.filter((id) => id !== p.userId),
                  );
                } else {
                  setSelectedParticipants([...selectedParticipants, p.userId]);
                }
              }}
              variant={isSelected ? "selection-secondary" : "not-selected"}
            >
              {p.name}
            </Button>
          );
        })}
      </div>

      <div className="d-flex gap-5 mt-3">
        <Button onClick={onClose} className="custom-button--secondary">
          Закрыть
        </Button>
        <Button
          onClick={onCreate}
          className="custom-button--primary"
          disabled={isLoading || !isValid}
        >
          {isLoading ? "Сохранение..." : "Создать"}
        </Button>
      </div>
    </div>
  );
};

export default ExpenseForm;
