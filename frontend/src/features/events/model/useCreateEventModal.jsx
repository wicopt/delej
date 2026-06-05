import { useState } from "react";

export const useCreateEventModal = () => {
  const [isOpen, setIsOpen] = useState(false);

  const [step, setStep] = useState("form");
  const [title, setTitle] = useState("");
  const [currency, setCurrency] = useState("RUB");
  const [selectedFriends, setSelectedFriends] = useState([]);

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
  };
};