const FriendList = ({
  friends,
  renderFriend,
}) => {
  return (
    <div className="row g-2">
      {friends.map((friend) => (
        <div
          key={friend.id}
          className="col-12"
        >
          {renderFriend(friend)}
        </div>
      ))}
    </div>
  );
};

export default FriendList;