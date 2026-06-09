const ExpensesList = ({
  expenses,
  renderExpense,
}) => {
  return (
    <div className="row g-2">
      {expenses.map((expense) => (
        <div
          key={expense.id}
          className="col-12"
        >
          {renderExpense(expense)}
        </div>
      ))}
    </div>
  );
};

export default ExpensesList;