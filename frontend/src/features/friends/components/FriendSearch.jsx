import './FriendsContainer.css'
const FriendSearch = ({
  value,
  onChange,
  placeholder,
}) => {

  return (
    <div className="search-wrapper">
      <i className="bi bi-search search-icon"></i>

      <input
        type="search"
        value={value}
        placeholder={placeholder}
        className="input-secondary input-s"
        onChange={(e) =>
          onChange(e.target.value)
        }
      />
    </div>
  );
};
export default FriendSearch;