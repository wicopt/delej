import React from "react";
import ContainerForEvents from "../../../shared/ui/Container";
import EventCard from "./EventCard";
import "./EventContainer.css";
import Button from "../../../shared/ui/Button/Button";
import { useCreateEventModal } from "../model/useCreateEventModal";
import CreateEventModal from "./CreateEventModal";

const EventsContainer = ({ title, events, showExpenses, className }) => {
  const modal = useCreateEventModal();

  return (
    <>
      <ContainerForEvents
        title={title}
        action={
          showExpenses ? (
            <Button
              className="custom-button--secondary2"
              onClick={modal.openModal}
            >
              + добавить
            </Button>
          ) : null
        }
      >
        {!showExpenses ? (
          <div className="event-list-compact">
            <div className="row g-2">
              {events.map((event) => (
                <div key={event.id} className="col-12">
                  <EventCard event={event} showExpenses={showExpenses} />
                </div>
              ))}
            </div>
          </div>
        ) : (
          <>
            <div className="event-list">
              <div className="row g-2">
                {events.map((event) => (
                  <div
                    key={event.id}
                    className="col-12 col-md-6 col-xl-4 h-auto"
                  >
                    <EventCard
                      event={event}
                      showExpenses={showExpenses}
                      className={className}
                    />
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </ContainerForEvents>
      <CreateEventModal
        isOpen={modal.isOpen}
        onClose={modal.closeModal}
        step={modal.step}
        setStep={modal.setStep}
        title={modal.title}
        setTitle={modal.setTitle}
        currency={modal.currency}
        setCurrency={modal.setCurrency}
        selectedFriends={modal.selectedFriends}
        setSelectedFriends={modal.setSelectedFriends}
      />{" "}
    </>
  );
};
export default EventsContainer;
