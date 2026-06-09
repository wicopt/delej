// useEditEvent.jsx
import { useState } from "react";
import { UpdateEvent } from "../api/EventApi";
import { GetParticipants } from "../api/EventApi";
import { AddParticipant } from "../api/EventApi";
export const useEditEvent = (event, onSuccess) => {
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [iconId, setIconId] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedFriends, setSelectedFriends] = useState([]);

  // Открыть модалку — заполняем текущими значениями события
  const openModal = async () => {
    setTitle(event.eventName);
    setIconId(Number(event.iconId));
    
    try {
      const participants = await GetParticipants(event.eventId);
      setSelectedFriends(participants);
    } catch (err) {
      console.error("Ошибка загрузки участников:", err);
      setSelectedFriends([]);
    }

    setIsOpen(true);
  };

  const closeModal = () => setIsOpen(false);

  const handleUpdate = async () => {
    setIsLoading(true);
    try {
      await UpdateEvent(event.eventId, {
        eventName: title,
        iconId: String(iconId),
        isFinished: event.finished,
      });
      const currentParticipants = await GetParticipants(event.eventId);
      const currentIds = currentParticipants.map((p) => p.userId);
      const selectedIds = selectedFriends.map((f) => f.userId);

      // Добавляем новых
      for (const friend of selectedFriends) {
        if (!currentIds.includes(friend.userId)) {
          await AddParticipant(event.eventId, friend.userId);
        }
      }

      // Удаляем убранных
      {/*8for (const participant of currentParticipants) {
        if (!selectedIds.includes(participant.userId)) {
          await RemoveParticipant(event.eventId);
        }
      }*/}
      onSuccess(); // вызовет refetch в EventPage
      closeModal();
    } catch (err) {
      console.error("Ошибка обновления события:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isOpen,
    openModal,
    closeModal,
    title,
    setTitle,
    iconId,
    setIconId,
    isLoading,
    handleUpdate,
        selectedFriends,
    setSelectedFriends,
  };
};