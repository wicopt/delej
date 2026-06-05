import React from "react";
import pencil from "../../../shared/assets/icons/pencil.svg";
import Button from "../../../shared/ui/Button";
import Card from "../../../shared/ui/Card";

import default_profile_picture from "../../../shared/assets/icons/default_profile_picture.svg";
const UserCard = ({ user, editing, onEdit, onChange, onSave }) => {
  return (
    <Card className="justify-content-center">
      <div className="d-flex flex-column justify-content-center gap-2">
        <div>
          <img
            src={user?.picture || default_profile_picture}
            alt="фото профиля"
            width="200"
            height="200"
          />
        </div>
        <div>
          <div className="d-flex gap-2 justify-content-center align-items-center">
            {editing.username ? (
              <input
                value={user?.username}
                onChange={(e) => onChange("username", e.target.value)}
              />
            ) : (
              <p>{user?.username}</p>
            )}

            <Button onClick={() => onEdit("username")} variant="secondary2">
              <img src={pencil} alt="edit" width="20" height="20" />
            </Button>
          </div>
          <div className="d-flex gap-2 justify-content-center align-items-center">
            {editing.username ? (
              <input
                value={user.name}
                onChange={(e) => onChange("name", e.target.value)}
              />
            ) : (
              <p>{user?.name}</p>
            )}

            <Button onClick={() => onEdit("name")} variant="secondary2">
              <img src={pencil} alt="edit" width="20" height="20" />
            </Button>
          </div>
          <div className="d-flex gap-2 justify-content-center align-items-center">
            {editing.email ? (
              <input
                value={user.email}
                onChange={(e) => onChange("email", e.target.value)}
              />
            ) : (
              <p>{user?.email}</p>
            )}

            <Button onClick={() => onEdit("username")} variant="secondary2">
              <img src={pencil} alt="edit" width="20" height="20" />
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
};
export default UserCard;
