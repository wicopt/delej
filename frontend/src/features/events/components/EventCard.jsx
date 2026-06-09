import React from "react";
import Card from "../../../shared/ui/Card";
import coins from "../../../shared/assets/icons/coins.svg";
import arrow from "../../../shared/assets/icons/arrow.svg";
import { getEventIcon } from "../../../shared/assets/constants/EventIcons";
import Button from "../../../shared/ui/Button";
import { useNavigate } from "react-router-dom";
const EventCard = ({
  onClick,
  event,
  my_expenses,
  all_expenses,
  showExpenses = true,
  className,
}) => {
  const { icon, color, label } = getEventIcon(event.iconId)
    const navigate = useNavigate();

  const handleEventClick = (eventId) => {
    navigate(`/events/${eventId}`);
  };
  return (
    <Card
    onClick={() => handleEventClick(event.eventId)}
      className={`${className} ${!showExpenses ? "event-card-compact" : ""}`}
    >
      {!showExpenses ? (
        <>
        <div className="d-flex justify-content-between h-auto w-100">
          <img src={icon} height="30" width="30"/>
          <h3>{event.eventName}</h3>
          <img src={arrow} alt="стрелка" height="30" width="30" /></div>
        </>
      ) : (
        <>
          <div className="d-flex justify-content-center">
            <img src={icon} height="30" width="30"/>
            <h3>{event.eventName}</h3>
          </div>
          <div className="d-grid gap-1 p-2 ">
            <div className="d-flex gap-2 align-items-center ">
              <img src={coins} alt="монетки" height="24" width="24" />
              <span>Мои расходы:</span>
              <span>{my_expenses}</span>
            </div>
            <div className="d-flex gap-2 align-items-center">
              <img src={coins} alt="монетки" height="24" width="24" />
              Общие расходы:
              {all_expenses}
            </div>
            <div className="d-flex justify-content-center mt-auto">
              <img src={arrow} alt="стрелка" height="30" width="30" />
              
            </div>
          </div>
        </>
      )}
    </Card>
  );
};
export default EventCard;
