import { useEffect, useState } from "react";
import { getAllFriends } from "../../friends/api/friendsApi";

export const useParticipantSelector = () => {
  const [friends, setFriends] = useState([]);

  useEffect(() => {
    getAllFriends().then((response) =>
      setFriends(response.data)
    );
  }, []);

  return {
    friends,
  };
};