import CardEvent from "../../../shared/ui/Card";
import Button from "../../../shared/ui/Button";

const BalanceCard = ({ balance, onSettle, onRefetchBalance }) => {
  return (
    <CardEvent className="expense-card">
      <div className="d-flex justify-content-between align-items-center w-100">
        <div className="d-flex flex-column gap-1 justify-content-center">
          <p className="mb-0">
            <b>{balance.borrower.name}</b> должен(а) <b>{balance.creditor.name}</b>
          </p>
          <p className="text-accent mb-0">
            {balance.amount.toFixed(2)} {balance.currensy}
          </p>
        </div>
        <Button onClick={() => onSettle(balance)} variant="done">
          Оплачено
        </Button>
      </div>
    </CardEvent>
  );
};

export default BalanceCard;