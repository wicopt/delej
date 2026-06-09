import { useState } from "react";
import { searchUsers, sendFriendRequest } from "../api/friendsApi";

export const useFriendsSearch = () => {
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [searching, setSearching] = useState(false);

  const findFriends = async (query) => {
    setSearch(query);
    if (!query.trim()) {
      setSearchResult([]);
      return;
    }
    setSearching(true);
    try {
      const users = await searchUsers(query);
      setSearchResult(users);
    } catch (err) {
      console.error("Ошибка поиска:", err);
      setSearchResult([]);
    } finally {
      setSearching(false);
    }
  };

  // ДОБАВЛЕНО: функция отправки заявки прямо из поиска
  const handleSendRequest = async (toUserId) => {
     console.log("Отправляю заявку, toUserId =", toUserId);
    await sendFriendRequest(toUserId);
    // Помечаем пользователя как "запрос отправлен"
    setSearchResult((prev) =>
      prev.map((u) =>
        u.userId === toUserId ? { ...u, requestSent: true } : u
      )
    );
  };

  return {
    search,
    searchResult,
    searching,
    findFriends,
    handleSendRequest,
  };
};