import React from "react";
import CardEvent from "../shared/ui/Card";
import EventsContainer from "../features/events/components/EventsContainer";
import FriendsContainer from "../features/friends/components/FriendsContainer";
import './EventsPage.css'
import { useAuth } from "../features/authorisation/context/AuthContext";
import { useFriendsRequests } from "../features/friends/model/useFriendsRequest";
import { useEvents } from "../features/events/model/useEvents";
const EventsPage = () => {
  const {user} =useAuth();
  const { friends, loading } = useFriendsRequests();
  const {events}= useEvents();
  
  return (
    <div className="container-events-page">
      <div className="d-flex justify-content-start align-items-start pt-4 ">
        <h1>Добро пожаловать, {user?.name}</h1>
      </div>
      <div className="row g-3 g-lg-5 pt-4">
        <div className="col-12 col-md-12 col-lg-4">
          <FriendsContainer title="Мои друзья" friends={friends} />
        </div>

        <div className="col-12 col-md-12 col-lg-8">
          <EventsContainer title="Все события" events={events} showExpenses={true} className={"event-card"}/>
        </div>
      </div>
    </div>
  );
};
export default EventsPage;
