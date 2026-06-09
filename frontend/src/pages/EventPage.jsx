import React from "react";
import Container from "../shared/ui/Container";
import EventInformation from "../features/events/components/Event/EventInformation";
import EventSwitcher from "../features/events/components/Event/EventSwitcher";
import { useExpenses } from "../features/expenses/model/useExpenses";
import { useEvent } from "../features/events/model/useEvent";
import "./EventPage.css";
import { useEditEvent } from "../features/events/model/useEditEvent";
import EditEventModal from "../features/events/components/Event/EditEventModal";
import { useState } from "react";
import { useFriendsRequests } from "../features/friends/model/useFriendsRequest";
import { useCreateExpense } from "../features/expenses/model/useCreateExpense";
import CreateExpenseModal from "../features/expenses/components/CreateExpenseModal";
import { useBalance } from "../features/expenses/model/useBalance";
const EventPage = () => {
  const {
    event,
    loading: eventLoading,
    error: eventError,
    refetch,
  } = useEvent();
  const { friends } = useFriendsRequests();
  const {
    expenses,
    loading: expensesLoading,
    removeExpense,
    refetch: refetchExpenses,
  } = useExpenses(event?.eventId);
const { balances, loading: balanceLoading, refetch: refetchBalance } = useBalance(event?.eventId);

const createExpense = useCreateExpense(event?.eventId, () => {
  refetchExpenses();
  refetchBalance();
});
  const editEvent = useEditEvent(event, refetch);
  if (eventLoading) return <p>Загрузка события...</p>;
  if (eventError) return <p>Ошибка: {eventError}</p>;
  if (!event) return null;

  return (
    <div className="container-event-page">
      <div className="d-flex justify-content-center">
        <h1 className="mt-2">{event.eventName}</h1>
      </div>
      <div className="row g-3 g-lg-5 pt-4">
        <div className="col-12 col-md-6 col-lg-4">
          <EventInformation
            event={event}
            iconId={event.iconId}
            onEditClick={editEvent.openModal}
          />
        </div>
        <div className="col-12 col-md-6 col-lg-8">
          <EventSwitcher
            event={event}
            expenses={expenses}
            loading={expensesLoading}
            onAddExpense={createExpense.openModal}
            handleRemoveFriend={removeExpense}
          />
        </div>
      </div>
      <div></div>
      <EditEventModal
        isOpen={editEvent.isOpen}
        onClose={editEvent.closeModal}
        title={editEvent.title}
        setTitle={editEvent.setTitle}
        iconId={editEvent.iconId}
        setIconId={editEvent.setIconId}
        selectedFriends={editEvent.selectedFriends}
        onUpdate={editEvent.handleUpdate}
        isLoading={editEvent.isLoading}
        friends={friends}
        selectedFriends={editEvent.selectedFriends}
        setSelectedFriends={editEvent.setSelectedFriends}
      />
      <CreateExpenseModal
        isOpen={createExpense.isOpen}
        onClose={createExpense.closeModal}
        title={createExpense.title}
        setTitle={createExpense.setTitle}
        totalCost={createExpense.totalCost}
        setTotalCost={createExpense.setTotalCost}
        currency={createExpense.currency}
        setCurrency={createExpense.setCurrency}
        payerId={createExpense.payerId}
        setPayerId={createExpense.setPayerId}
        date={createExpense.date}
        setDate={createExpense.setDate}
        participants={createExpense.participants}
        onCreate={createExpense.handleCreate}
        isLoading={createExpense.isLoading}
        selectedParticipants={createExpense.selectedParticipants}
        setSelectedParticipants={createExpense.setSelectedParticipants}
      />
    </div>
  );
};
export default EventPage;
