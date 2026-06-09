import { useState, useEffect } from "react";
import { GetEvent } from "../api/EventApi";
import { useParams } from "react-router-dom";

export const useEvent = () => {
  const { eventId } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchEvent = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await GetEvent(eventId);
      setEvent(data);
    } catch (err) {
      setError(err.message || "Не удалось загрузить событие");
      console.error("Ошибка загрузки события:", err);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (eventId) {
      fetchEvent();
    }
  }, [eventId]);

  return { event, loading, error, refetch: fetchEvent };
};
