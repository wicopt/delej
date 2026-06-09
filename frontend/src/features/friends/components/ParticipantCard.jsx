import Card from "../../../shared/ui/Card";
import default_profile_picture from "../../../shared/assets/icons/default_profile_picture.svg";
import Button from "../../../shared/ui/Button";

const ParticipantCard = ({ friend, onRemove, className }) => {
  return (
    <Card className={className}>
        <div
          className={` d-flex flex-column gap-2 align-items-center justify-content-between w-100`}
        >
          <img
            src={friend.picture || default_profile_picture}
            alt="фото профиля"
            width="36"
            height="36"
            style={{ borderRadius: "50%" }}
          />
          <div>
            <p className="mb-0">{friend.name}</p>
            {friend.username && (
              <small className="text-muted">@{friend.username}</small>
            )}
          </div>
          <div>
          <Button onClick={() => onRemove(friend.userId)} variant="danger" className="p-0"><i class="bi bi-x-circle custom-danger-danger"></i></Button>

          </div>
        </div>
    </Card>
  );
};
export default ParticipantCard