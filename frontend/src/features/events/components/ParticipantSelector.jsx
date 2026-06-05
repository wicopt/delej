import { useState } from "react";
import Button from "../../../shared/ui/Button";
import FriendSearch from "../../friends/components/FriendSearch";
import FriendList from "../../friends/components/FriendList";
import FriendCard from "../../friends/components/FriendCard";
import './CreateEventModal.css'
const ParticipantSelector = ({
  selectedFriends,
  setSelectedFriends,
  onBack,
}) => {
  const friends = [
    { id: 1, name: "Барак Обама" },
    { id: 2, name: "Илон Маск" },
    { id: 3, name: "Билл Гейтс" },
    { id: 4, name: "Стив Джобс" },
        { id: 1, name: "Барак Обама" },
    { id: 2, name: "Илон Маск" },
    { id: 3, name: "Билл Гейтс" },
    { id: 4, name: "Стив Джобс" },
  ];

  const [search, setSearch] = useState("");

  const filteredFriends = friends.filter(friend =>
    friend.name
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  const toggleFriend = (friend) => {
    const exists = selectedFriends.some(
      f => f.id === friend.id
    );

    if (exists) {
      setSelectedFriends(
        selectedFriends.filter(
          f => f.id !== friend.id
        )
      );
    } else {
      setSelectedFriends([
        ...selectedFriends,
        friend,
      ]);
    }
  };

  return (
    <>
      <Button onClick={onBack} variant="secondary2 mb-1">
        ← Назад
      </Button>

      <FriendSearch
        value={search}
        placeholder="Введите никнейм"
        onChange={setSearch}
      />
      <div className="participants-selector-container">
      <FriendList
        friends={filteredFriends}
        renderFriend={(friend) => {
          const isSelected =
            selectedFriends.some(
              f => f.id === friend.id
            );

          return (
            <div
              onClick={() => toggleFriend(friend)}
            >
              <FriendCard friend={friend} className="friend-card"/>
              {isSelected && (
                <span>✓</span>
              )}
            </div>
          );
        }}
      />
    </div>
</>

  );
};

export default ParticipantSelector;