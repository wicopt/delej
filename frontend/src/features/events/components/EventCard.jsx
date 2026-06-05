import React from "react";
import Card from "../../../shared/ui/Card";
import coins from "../../../shared/assets/icons/coins.svg";
import arrow from "../../../shared/assets/icons/arrow.svg";
const EventCard = ({
  onClick,
  event,
  my_expenses,
  all_expenses,
  showExpenses = true,
  className,
}) => {
  return (
    <Card
      className={`${className} ${!showExpenses ? "event-card-compact" : ""}`}
    >
      {!showExpenses ? (
        <>
        <div className="d-flex justify-content-between h-auto w-100">
          <h3>{event.name}</h3>
          <img src={arrow} alt="стрелка" height="30" width="30" /></div>
        </>
      ) : (
        <>
          <div className="d-flex justify-content-center">
            <h3>{event.name}</h3>
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
