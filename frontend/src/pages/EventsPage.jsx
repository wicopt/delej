import React from "react";
import CardEvent from "../shared/ui/Card";
import EventsContainer from "../features/events/components/EventsContainer";
import FriendsContainer from "../features/friends/components/FriendsContainer";
import './EventsPage.css'
import { useAuth } from "../features/authorisation/context/AuthContext";
const EventsPage = () => {
  const {user} =useAuth();
  const eventsList = [
    {
      id: 1,
      name: "React Meetup",
      description: "Встреча разработчиков",
    },
    {
      id: 2,
      name: "Hackathon",
      description: "Командная разработка",
    },
    {
      id: 3,
      name: "React Meetup",
      description: "Встреча разработчиков",
    },
    {
      id: 4,
      name: "Hackathon",
      description: "Командная разработка",
    },
    {
      id: 5,
      name: "React Meetup",
      description: "Встреча разработчиков",
    },
    {
      id: 6,
      name: "Hackathon",
      description: "Командная разработка",
    },
        {
      id: 7,
      name: "React Meetup",
      description: "Встреча разработчиков",
    },
    {
      id: 8,
      name: "Hackathon",
      description: "Командная разработка",
    },
    {
      id: 9,
      name: "React Meetup",
      description: "Встреча разработчиков",
    },
    {
      id: 10,
      name: "Hackathon",
      description: "Командная разработка",
    },
  ];
    const eventsList2 = [
    {
      id: 1,
      name: "Барак обама",
    
    },

  ];
  return (
    <div className="container-events-page">
      <div className="d-flex justify-content-start align-items-start pt-4 ">
        <h1>Добро пожаловать,{user?.name}</h1>
      </div>
      <div className="row g-3 g-lg-5 pt-4">
        <div className="col-12 col-md-12 col-lg-4">
          <FriendsContainer title="Мои друзья" friends={eventsList2} />
        </div>

        <div className="col-12 col-md-12 col-lg-8">
          <EventsContainer title="Все события" events={eventsList} showExpenses={true} className={"event-card"}/>
        </div>
      </div>
    </div>
  );
};
export default EventsPage;
