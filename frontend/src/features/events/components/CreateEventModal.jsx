import EventForm from "./EventForm";
import ParticipantSelector from "./ParticipantSelector";
import { useCreateEventModal } from "../model/useCreateEventModal";
import './CreateEventModal.css';
const CreateEventModal = ({
  isOpen,
  onClose,
  friends,step,
  setStep,

  title,
  setTitle,

  currency,
  setCurrency,

  selectedFriends,
  setSelectedFriends,
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
            onAddParticipants={() =>
              setStep("participants")
            }
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