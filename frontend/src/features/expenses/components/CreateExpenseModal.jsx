// CreateExpenseModal.jsx
import ExpenseForm from "./ExpenseForm";
import "./CreateExpenseModal.css";

const CreateExpenseModal = ({
  isOpen,
  onClose,
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
  onCreate,
  isLoading,
  selectedParticipants,
  setSelectedParticipants,
}) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-window">
        <ExpenseForm
          title={title}
          setTitle={setTitle}
          totalCost={totalCost}
          setTotalCost={setTotalCost}
          currency={currency}
          setCurrency={setCurrency}
          payerId={payerId}
          setPayerId={setPayerId}
          date={date}
          setDate={setDate}
          participants={participants}
          onClose={onClose}
          onCreate={onCreate}
          isLoading={isLoading}
          selectedParticipants={selectedParticipants}
          setSelectedParticipants={setSelectedParticipants}
        />
      </div>
    </div>
  );
};

export default CreateExpenseModal;
