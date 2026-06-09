// EditEventModal.jsx
import EventForm from "../Creation/EventForm";
import "../Creation/CreateEventModal.css";
import { useState } from "react";
import ParticipantSelector from "../Creation/ParticipantSelector";
const EditEventModal = ({
  isOpen,
  onClose,
  title,
  setTitle,
  iconId,
  setIconId,
  onUpdate,
  isLoading,
  friends,
  selectedFriends,
  setSelectedFriends,
}) => {
    const [step, setStep] = useState("form");
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-window">
        {step === "form" && (
          <EventForm
            title={title}
            setTitle={setTitle}
            iconId={iconId}
            setIconId={setIconId}
            onClose={onClose}
            onCreate={onUpdate}
            isLoading={isLoading}
            selectedFriends={selectedFriends}
            onAddParticipants={() => setStep("participants")} 
            submitLabel="Сохранить"
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

export default EditEventModal;
