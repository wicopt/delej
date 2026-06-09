import React from "react";
import Card from "../../../shared/ui/Card";
import Button from "../../../shared/ui/Button";
import default_profile_picture from "../../../shared/assets/icons/default_profile_picture.svg";
/**
 * Используется в двух режимах:
 * 1. Список друзей — onRemove передан, onAdd нет
 * 2. Поиск — onAdd передан (или requestSent=true), onRemove нет
 */

const FriendCard = ({ friend, onRemove, onAdd, requestSent, className }) => {
  return (
    <Card className={className}>
      <div className="d-flex justify-content-between align-items-center w-100">
        <div
          className={` d-flex gap-2 align-items-center justify-content-senter w-100`}
        >
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
        <div className="w-fit-content">
          {/* Режим: список друзей */}
          {onRemove && (
            <Button onClick={() => onRemove(friend.userId)} variant="danger">
              <i className="bi bi-x-circle custom-danger-danger"></i>
            </Button>
          )}

          {/* Режим: поиск */}
          {onAdd && !requestSent && (
            <Button onClick={() => onAdd(friend.userId)} variant="okay">
              <i className="bi bi-plus-circle custom-button-okay"></i>
            </Button>
          )}
          {requestSent && (
            <span className="text-muted small">
              <i className="bi bi-check-circle custom-button-okay"></i>
            </span>
          )}
        </div>
      </div>
    </Card>
  );
};

export default FriendCard;
