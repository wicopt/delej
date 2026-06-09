import { useState } from "react";
import { CreateEvent } from "../api/EventApi";
export const useCreateEventModal = () => {
  const [isOpen, setIsOpen] = useState(false);

  const [step, setStep] = useState("form");
  const [iconId, setIconId] = useState(1);
  const [title, setTitle] = useState("");
  const [currency, setCurrency] = useState("RUB");
  const [selectedFriends, setSelectedFriends] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const resetForm = () => {
    setStep("form");
    setTitle("");
    setCurrency("RUB");
    setIconId(1);
    setSelectedFriends([]);
  };

  const handleCreate = async (onSuccess) => {
    try {
      setIsLoading(true);

      const event = await CreateEvent({
        eventName: title,
        iconId: String(iconId),
        /*participantIds: selectedFriends.map((f) => f.userId),*/
      });

      closeModal();

      return event;
    } finally {
      setIsLoading(false);
    }
    onSuccess?.();
  };

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return {
    isOpen,
    openModal,
    closeModal,

    step,
    setStep,

    title,
    setTitle,

    currency,
    setCurrency,

    selectedFriends,
    setSelectedFriends,

    handleCreate,
    isLoading,

    iconId,
    setIconId,
  };
};
