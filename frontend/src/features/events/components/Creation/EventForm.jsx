import Button from "../../../../shared/ui/Button";
import FriendCard from "../../../friends/components/FriendCard";
import Card from "../../../../shared/ui/Card";
import ParticipantCard from "../../../friends/components/ParticipantCard";
import "./CreateEventModal.css";
import { EVENT_ICONS } from "../../../../shared/assets/constants/EventIcons";

const EventForm = ({
  title,
  setTitle,

  currency,
  setCurrency,

  selectedFriends,

  onAddParticipants,
  onClose,

  onCreate,
  isLoading,

  iconId,
  setIconId,
  submitLabel
}) => {
  const selectedIcon = EVENT_ICONS.find((e) => e.id === iconId);

  const handleNextIcon = () => {
    const nextId = (iconId + 1) % EVENT_ICONS.length;
    setIconId(nextId);
  };
  return (
    <div className="event-creation-container">
      <div className="d-flex justify-content-center">
        <h2>Создание события</h2>
      </div>
      <div className="d-grid gap-3">
        <label>Название</label>
        <div className="d-flex gap-3 align-items-center">
          <Button onClick={handleNextIcon} variant="icon">
            {" "}
            <img
              src={selectedIcon.icon}
              alt={selectedIcon.label}
              width="36"
              height="36"
            />
          </Button>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="input-creation"
            placeholder="Название события"
          />
        </div>

        <select
          className="input-creation"
          value={currency}
          onChange={(e) => setCurrency(e.target.value)}
        >
          <option value="RUB">RUB</option>
          <option value="USD">USD</option>
        </select>

        <label>Участники</label>
        <div className="participants-row d-flex gap-2 justify-content-center">
          {selectedFriends.map((friend) => (
            <div key={friend.id}>
              <ParticipantCard friend={friend} className="participant-card" />
            </div>
          ))}
          <div className="button-add-participant-container">
            <Button
              variant="with-borders"
              className="pb-5"
              onClick={onAddParticipants}
            >
              + <br />
              Добавить <br />
              участников
            </Button>
          </div>
        </div>
      </div>

      <div className="d-flex gap-5">
        <Button onClick={onClose} className="custom-button--secondary">
          Закрыть
        </Button>
        <Button
          onClick={onCreate}
          className="custom-button--primary"
          disabled={isLoading || !title.trim()}
        >
          {isLoading ? "Сохранение..." : (submitLabel || "Создать")}
        </Button>
      </div>
    </div>
  );
};

export default EventForm;
