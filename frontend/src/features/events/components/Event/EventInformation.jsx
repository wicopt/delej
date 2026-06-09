import React from "react";
import Card from "../../../../shared/ui/Card";
import { EVENT_ICONS } from "../../../../shared/assets/constants/EventIcons";
import pencil from "../../../../shared/assets/icons/pencil.svg";
import share from "../../../../shared/assets/icons/share.svg";
import Button from "../../../../shared/ui/Button";
import "./EventInformation.css";
const EventInformation = ({ event, iconId, onEditClick, setIconId, loading, error }) => {
  const selectedIcon = EVENT_ICONS.find((e) => String(e.id) === String(iconId));

  return (
    <div className="container-information">
      <Card className="event-information-card icon-card ">
        <img
          src={selectedIcon.icon}
          alt={selectedIcon.label}
          width="100"
          height="100"
        />
        <h2 className="event-name">{event.eventName}</h2>
        <div className="d-flex w-100 justify-content-between mt-2">
          <Button variant="icon" onClick={onEditClick}>
            <img src={pencil} alt="edit" width="20" height="20" />
            <p className="text-base">изменить</p>
          </Button>
          <Button variant="icon">
            <img src={share} alt="edit" width="20" height="20" />
            <p className="text-base">поделиться</p>
          </Button>
        </div>
      </Card>
      <div className="d-grid gap-4 grid-cols-2">
        <Card className="shadow d-flex justify-content-center">
          <p className="text-accent">Мои расходы</p>
          <p>{event.my_expenses}</p>
        </Card>
        <Card className=" d-flex justify-content-center shadow">
          <p className="text-accent">Общие расходы</p>
          <p>{event.total_expenses}</p>
        </Card>
      </div>
    </div>
  );
};
export default EventInformation;
