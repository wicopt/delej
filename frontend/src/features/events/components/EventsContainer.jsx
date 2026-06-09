import React from "react";
import ContainerForEvents from "../../../shared/ui/Container";
import EventCard from "./EventCard";
import "./EventContainer.css";
import Button from "../../../shared/ui/Button/Button";
import { useCreateEventModal } from "../model/useCreateEventModal.jsx";
import CreateEventModal from "./Creation/CreateEventModal.jsx";
import { useEvents } from "../model/useEvents.jsx";
import { useNavigate } from "react-router-dom";
import { useFriendsRequests } from "../../friends/model/useFriendsRequest.jsx";

const EventsContainer = ({ title, showExpenses, className }) => {
  const modal = useCreateEventModal();
  const { events, loading, refetch } = useEvents();
  const navigate = useNavigate();
  const { friends } = useFriendsRequests();
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
        {loading ? (
          <p className="text-muted text-center small">Загрузка...</p>
        ) : events.length === 0 ? (
          <p className="text-muted text-center small">
            Нет событий. Создайте же впечатления!
          </p>
        ) : !showExpenses ? (
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
            <div className="event-list h-auto">
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
                      onClick={() => navigate(`/events/${event.eventId}`)}
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
        onCreate={() => modal.handleCreate(refetch)}
        isLoading={modal.isLoading}
        iconId={modal.iconId}
        setIconId={modal.setIconId}
        friends={friends} 
      />{" "}
    </>
  );
};
export default EventsContainer;
