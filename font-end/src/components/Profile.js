import "../styles/profile.scss";
import ProfileIcon from "./ProfileIcon";
import users from "../data/users";

function Profile(props) {
  const {
    username,
    caption,
    urlText,
    iconSize,
    captionSize,
    storyBorder,
    hideAccountName,
    image,
    id_user,
  } = props;
  const handleSwitch = () => {
    window.location.assign("/");
    localStorage.removeItem("token");
    localStorage.removeItem("info");
    localStorage.removeItem("isadmin");
  };
  let accountName = username
    ? username
    : users[Math.floor(Math.random() * users.length)].username;

  return (
    <div className="profile">
      <ProfileIcon
        iconSize={iconSize}
        storyBorder={storyBorder}
        image={image}
        id_user={id_user}
      />
      {(accountName || caption) && !hideAccountName && (
        <div className="textContainer">
          <span className="accountName">{accountName}</span>
          <span className={`caption ${captionSize}`}>{caption}</span>
        </div>
      )}
      <a href="#" onClick={handleSwitch}>{urlText}</a>
    </div>
  );
}

export default Profile;
