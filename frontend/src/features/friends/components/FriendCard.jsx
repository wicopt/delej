import React from "react";
import Card from "../../../shared/ui/Card";
import Button from "../../../shared/ui/Button";
import default_profile_picture from "../../../shared/assets/icons/default_profile_picture.svg";

/**
 * Используется в двух режимах:
 * 1. Список друзей — onRemove передан, onAdd нет
 * 2. Поиск — onAdd передан (или requestSent=true), onRemove нет
 */
const FriendCard = ({ friend, onRemove, onAdd, requestSent }) => {
  return (
    <Card className="friend-card">
      <div className="d-flex justify-content-between align-items-center">
        <div className="d-flex gap-2 align-items-center justify-content-between w-100">
          <img
            src={friend.picture || default_profile_picture}
            alt="фото профиля"
            width="36"
            height="36"
            style={{ borderRadius: "50%" }}
          />
          <div>
            <p className="mb-0">{friend.name}</p>
            {friend.username && (
              <small className="text-muted">@{friend.username}</small>
            )}
          </div>
        </div>

        {/* Режим: список друзей */}
        {onRemove && (
          <Button onClick={() => onRemove(friend.userId)}>✕</Button>
        )}

        {/* Режим: поиск */}
        {onAdd && !requestSent && (
          <Button onClick={() => onAdd(friend.userId)}>+</Button>
        )}
        {requestSent && (
          <span className="text-muted small">Запрос отправлен</span>
        )}
      </div>
    </Card>
  );
};

export default FriendCard;
