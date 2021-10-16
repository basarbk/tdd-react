import defaultProfileImage from '../assets/profile.png';

const ProfileCard = (props) => {
  const { user, auth } = props;

  return (
    <div className="card text-center">
      <div className="card-header">
        <img
          src={defaultProfileImage}
          alt="profile"
          width="200"
          height="200"
          className="rounded-circle shadow"
        />
      </div>
      <div className="card-body">
        <h3>{user.username}</h3>
      </div>
      {auth && user.id === auth.id && <button>Edit</button>}
    </div>
  );
};
export default ProfileCard;
