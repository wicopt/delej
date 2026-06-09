import React from "react";
import CardEvent from "../../../shared/ui/Card";
import Button from "../../../shared/ui/Button";
import CreateEventModal from "../../events/components/Creation/CreateEventModal";

const ExpenseCard = ({ expense, onRemove, className, renderExpense }) => {
  return (
    <CardEvent className={className}>
      <div className="d-flex justify-content-between align-items-center w-100">
        {/* Левая часть - информация */}
        <div className="d-flex gap-3 align-items-center flex-grow-1">
          <div className="d-grid gap-1">
            <p className="mb-0">{expense.name}</p>
            <p className="text-accent mb-0">Оплачено {expense.payer.username}</p>
          </div>
        </div>

        {/* Правая часть - цена и кнопка */}
        <div className="d-flex gap-3 align-items-center">
          <p className="mb-0">{expense.totalCost} {expense.currency}</p>
          <Button onClick={() => onRemove(expense.expenseId)} variant="danger" className="p-0">
            <i className="bi bi-x-circle"></i>
          </Button>
        </div>
      </div>
    </CardEvent>
  );
};

export default ExpenseCard;