import Button from "../../../shared/ui/Button";
import FriendCard from "../../friends/components/FriendCard";
import "./CreateEventModal.css";
const EventForm = ({
  title,
  setTitle,

  currency,
  setCurrency,

  selectedFriends,

  onAddParticipants,
  onClose,
}) => {
  return (
    <div className="event-creation-container">
      <div className="d-flex justify-content-center">
        <h2>Создание события</h2>
      </div>
      <div className="d-grid gap-3">
        <label>Название</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="input-creation"
          placeholder="Название события"
        />

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
              <FriendCard friend={friend} className="participant-card" />
            </div>
          ))}
          <div className="button-add-participant-container">
            <Button variant="with-borders" onClick={onAddParticipants}>
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
        <Button onClick={onClose} className="custom-button--primary">
          Создать
        </Button>
      </div>
    </div>
  );
};

export default EventForm;
