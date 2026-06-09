import { useState } from "react";
import Button from "../../../../shared/ui/Button";
import ExpensesList from "../../../expenses/components/ExpensesList";
import ExpenseCard from "../../../expenses/components/ExpenseCard";
import BalanceCard from "../../../expenses/components/BalanceCard";
import { useBalance } from "../../../expenses/model/useBalance";
const EventSwitcher = ({ event, expenses=[], loading, handleRemoveFriend, onAddExpense,onRefetchBalance  }) => {
  const [tab, setTab] = useState("expenses");
  const { balances, loading: balanceLoading, refetch: refetchBalance } = useBalance(event?.eventId);
    const handleRemove = async (expenseId) => {
    await handleRemoveFriend(expenseId);
    refetchBalance();
  };

  return (
    <>
      <div className="d-flex gap-3 justify-content-between w-100">
        <Button
          onClick={() => setTab("expenses")}
          className={`custom-button-selection w-100 ${tab === "expenses" ? "active" : ""}`}
          variant="selection"
        >
          Расходы
        </Button>
        <Button
          className={`custom-button-selection w-100 ${tab === "balances" ? "active" : ""}`}
          onClick={() => setTab("balances")}
          variant="selection"
        >
          Балансы
        </Button>
        <Button
          onClick={() => setTab("requests")}
          className={`custom-button-selection w-100 ${tab === "requests" ? "active" : ""}`}
          variant="selection"
        >
          Фото
        </Button>
      </div>
      <div className="d-grid gap-2 mt-3 ">
        {tab === "expenses" && (
          <>
          <Button variant="icon" className="w-100"onClick={onAddExpense}>+ Добавить расход </Button>
            {loading ? (
              <p className="text-muted text-center small">Загрузка...</p>
            ) : expenses.length === 0 ? (
              <>
                <p className="text-muted text-center small">
                  Нет расходов. Рассчитайте ваши траты прямо сейчас!
                </p>
                
              </>
            ) : (
              <ExpensesList
                expenses={expenses}
                renderExpense={(expense) => (
                  <ExpenseCard
                    key={expense.expenseId}
                    expense={expense}
                    onRemove={handleRemove}
                    className={"expense-card"}
                  />
                )}
              />
            )}
          </>
        )}
        {tab === "balances" && (
          <>
            {balanceLoading ? (
              <p className="text-muted text-center small">Загрузка...</p>
            ) : balances.length === 0 ? (
              <p className="text-muted text-center small">Все долги погашены!</p>
            ) : (
              balances.map((balance, i) => (
                <BalanceCard
                  key={i}
                  balance={balance}
                  onSettle={(b) => console.log("settle", b)}
                />
              ))
            )}
          </>
        )}
      </div>
    </>
  );
};
export default EventSwitcher;
