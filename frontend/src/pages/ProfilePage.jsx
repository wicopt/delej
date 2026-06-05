import React from "react";
import { useEditProfile } from "../features/editprofile/model/useEditProfile";
import UserCard from "../features/editprofile/components/userCard";
import Container from "../shared/ui/Container/Container";
import "./ProfilePage.css";
import { useAuth } from "../features/authorisation/context/AuthContext";
import EventsContainer from "../features/events/components/EventsContainer";

const ProfilePage = () => {
  const { user, loading } = useAuth();
  const editProfile = useEditProfile(user);
  if (loading) {
    return <div>Загрузка...</div>;
  }
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

  const testUser = {
    id: 1,
    username: "barack_obama",
    name: "Барак Обама",
    email: "obama@gmail.com",
    picture: null,
  };
  return (
    <>
      <div className="container-profile-page">
        <div className="d-flex justify-content-center align-items-start pt-4 pb-4">
          <h1>Мой профиль</h1>
        </div>
        <Container>
  <div className="row g-3 ">
    <div className="col-12 col-lg-6">
      <UserCard
        user={editProfile.formData}
        editing={editProfile.editing}
        onEdit={editProfile.enableEdit}
        onChange={editProfile.changeField}
        onSave={editProfile.saveProfile}
      />
    </div>

    <div className="col-12 col-lg-6 d-flex align-items-center">

      <EventsContainer
        title="Мои события"
        events={eventsList}
        showExpenses={false}
      />
    </div>
  </div>
</Container>

      </div>
    </>
  );
};
export default ProfilePage;
