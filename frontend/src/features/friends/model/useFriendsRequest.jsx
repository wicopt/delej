import { useState, useEffect } from "react";
import {
  getFriends,
  getIncomingRequests,
  acceptFriendRequest,
  removeFriend,
} from "../api/friendsApi";

export const useFriendsRequests = () => {
  const [friends, setFriends] = useState([]);
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  // БЫЛО: useEffect отсутствовал — данные никогда не загружались
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [friendsData, requestsData] = await Promise.all([
          getFriends(),
          getIncomingRequests(),
        ]);
        setFriends(friendsData);
        setRequests(requestsData);
      } catch (err) {
        console.error("Ошибка загрузки друзей:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleAccept = async (userId) => {
    const acceptedUser = await acceptFriendRequest(userId);
    // Убираем из заявок, добавляем в друзья
    const accepted = requests.find((r) => r.userId === acceptedUser.userId);
    setRequests((prev) => prev.filter((r) => r.userId !== userId));
   setFriends((prev) => [...prev, acceptedUser]);
   console.log("Заявка принята:", acceptedUser);
  };

  const handleDecline = async (userId) => {
    await removeFriend(userId);
    setRequests((prev) => prev.filter((r) => r.userId !== userId));
  };

  const handleRemoveFriend = async (userId) => {
    await removeFriend(userId);
    setFriends((prev) => prev.filter((f) => f.userId !== userId));
  };

  return {
    friends,
    requests,
    loading,
    handleAccept,
    handleDecline,
    handleRemoveFriend,
  };
};