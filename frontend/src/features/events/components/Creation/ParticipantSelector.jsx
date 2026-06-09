import { useState } from "react";
import Button from "../../../../shared/ui/Button";
import FriendSearch from "../../../friends/components/FriendSearch";
import FriendList from "../../../friends/components/FriendList";
import FriendCard from "../../../friends/components/FriendCard";
import "./CreateEventModal.css";
const ParticipantSelector = ({
  friends,
  selectedFriends,
  setSelectedFriends,
  onBack,
}) => {

  const [search, setSearch] = useState("");

  const filteredFriends = friends.filter((friend) =>
    friend.name.toLowerCase().includes(search.toLowerCase()),
  );

  const toggleFriend = (friend) => {
    const exists = selectedFriends.some((f) => f.userId === friend.userId);

    if (exists) {
      setSelectedFriends(selectedFriends.filter((f) => f.userId !== friend.userId));
    } else {
      setSelectedFriends([...selectedFriends, friend]);
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
        className="participants-selector-container"
      />
      <div className="participants-selector-container">
        <FriendList
          friends={filteredFriends}
          renderFriend={(friend) => {
            const isSelected = selectedFriends.some((f) => f.userId === friend.userId);

            return (
              <div onClick={() => toggleFriend(friend)}>
                <FriendCard
                  friend={friend}
                  onAdd={isSelected ? null : toggleFriend}
                  requestSent={isSelected}
                  className={"friend-card"}
                />
              </div>
            );
          }}
        />
      </div>
    </>
  );
};

export default ParticipantSelector;
