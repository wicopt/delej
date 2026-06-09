import EventForm from "./EventForm";
import ParticipantSelector from "./ParticipantSelector";
import "./CreateEventModal.css";

const CreateEventModal = ({
  isOpen,
  onClose,
  friends,
  step,
  setStep,

  title,
  setTitle,

  currency,
  setCurrency,

  selectedFriends,
  setSelectedFriends,

  onCreate,
  isLoading,

  iconId,
  setIconId,
}) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-window">
        {step === "form" && (
          <EventForm
            title={title}
            setTitle={setTitle}
            currency={currency}
            setCurrency={setCurrency}
            selectedFriends={selectedFriends}
            onClose={onClose}
            onAddParticipants={() => setStep("participants")}
            onCreate={onCreate}
            isLoading={isLoading}
            iconId={iconId}
            setIconId={setIconId}
          />
        )}

        {step === "participants" && (
          <ParticipantSelector
            friends={friends}
            selectedFriends={selectedFriends}
            setSelectedFriends={setSelectedFriends}
            onBack={() => setStep("form")}
          />
        )}
      </div>
    </div>
  );
};

export default CreateEventModal;
