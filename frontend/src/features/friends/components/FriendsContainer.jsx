import { useState } from "react";
import { useFriendsSearch } from "../model/useFriendsSearch";
import { useFriendsRequests } from "../model/useFriendsRequest";

import ContainerForFriends from "../../../shared/ui/Container";
import FriendSearch from "./FriendSearch";
import FriendList from "./FriendList";
import FriendCard from "./FriendCard";
import FriendRequestCard from "./FriendRequestCard";
import Button from "../../../shared/ui/Button";

const FriendsContainer = ({ title }) => {
  const [tab, setTab] = useState("friends");


  const {
    friends,
    requests,
    loading,
    handleAccept,
    handleDecline,
    handleRemoveFriend,
  } = useFriendsRequests();


  const { search, searchResult, searching, findFriends, handleSendRequest } =
    useFriendsSearch();

  const requestsCount = requests.length;

  return (
    <ContainerForFriends
      title={title}
      titleUnderAction={true}
      action={
        <div className="d-flex gap-3 justify-content-between w-100">
          <Button
            onClick={() => setTab("friends")}
            className={`custom-button-selection ${tab === "friends" ? "active" : ""}`}
            variant="selection"
          >
            Друзья
          </Button>
          <Button
            onClick={() => setTab("search")}
            className={`custom-button-selection ${tab === "search" ? "active" : ""}`}
            variant="selection"
          >
            Найти
          </Button>
          <Button
            onClick={() => setTab("requests")}
            className={`custom-button-selection ${tab === "requests" ? "active" : ""}`}
            variant="selection"
          >
            Заявки{requestsCount > 0 && ` (${requestsCount})`}
          </Button>
        </div>
      }
    >
      <div className="d-grid gap-2 mt-3 ">
        {/* Вкладка: Мои друзья */}
        {tab === "friends" && (
          <>
            {loading ? (
              <p className="text-muted text-center small">Загрузка...</p>
            ) : friends.length === 0 ? (
              <p className="text-muted text-center small">
                Нет друзей. Найдите их на вкладке «Найти»!
              </p>
            ) : (
              <FriendList
                friends={friends}
                renderFriend={(friend) => (
                  <FriendCard
                    key={friend.userId}
                    friend={friend}
                    onRemove={handleRemoveFriend}
                  />
                )}
              />
            )}
          </>
        )}

        {/* Вкладка: Поиск — с кнопкой «Добавить» */}
        {tab === "search" && (
          <>
            <FriendSearch
              value={search}
              placeholder="Введите никнейм"
              onChange={findFriends}
              
            />
            {searching && (
              <p className="text-muted text-center small">Поиск...</p>
            )}
            {!searching && search.length > 0 && searchResult.length === 0 && (
              <p className="text-muted text-center small">
                Пользователи не найдены
              </p>
            )}
            {searchResult.length > 0 && (
              <FriendList
                friends={searchResult}
                renderFriend={(user) => (
                  <FriendCard
                    key={user.userId}
                    friend={user}
                    onAdd={user.requestSent ? null : handleSendRequest}
                    requestSent={user.requestSent}
                  />
                )}
              />
            )}
          </>
        )}

        {/* Вкладка: Входящие заявки */}
        {tab === "requests" && (
          <>
            {loading ? (
              <p className="text-muted text-center small">Загрузка...</p>
            ) : requests.length === 0 ? (
              <p className="text-muted text-center small">
                Нет входящих заявок
              </p>
            ) : (
              <FriendList
                friends={requests}
                renderFriend={(friend) => (
                  <FriendRequestCard
                    key={friend.userId}
                    friend={friend}
                    onAccept={handleAccept}
                    onDecline={handleDecline}
                  />
                )}
              />
            )}
          </>
        )}
      </div>
    </ContainerForFriends>
  );
};

export default FriendsContainer;
