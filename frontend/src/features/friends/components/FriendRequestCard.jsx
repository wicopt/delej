import React from "react";
import Card from "../../../shared/ui/Card";
import Button from "../../../shared/ui/Button";
import default_profile_picture from "../../../shared/assets/icons/default_profile_picture.svg";

const FriendRequestCard = ({
  friend,
  onAccept,
  onDecline,
}) => {
  return (
    <Card className="friend-card">
      <div className="d-flex justify-content-between align-items-center">
        <div className="d-flex gap-2 align-items-center">
          <img
            src={friend.picture || default_profile_picture}
            alt="фото профиля"
            width="36"
            height="36"
          />

          <p className="mb-0">{friend.name}</p>
        </div>

        <div className="d-flex gap-2">
          <Button
            onClick={() => onAccept(friend.userId)}
          >
            ✓
          </Button>

          <Button
            onClick={() => onDecline(friend.userId)}
          >
            ✕
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default FriendRequestCard;