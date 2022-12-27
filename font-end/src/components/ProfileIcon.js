import "../styles/profileIcon.scss";
import {useNavigate} from 'react-router-dom';
import ProfilePage from "./Userprofile";
function ProfileIcon(props) {
  const { iconSize, storyBorder, image, id_user } = props;

  function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  let randomId = getRandomInt(1, 70);

  let profileImage = image
    ? image
    : `https://i.pravatar.cc/150?img=${randomId}`;
    const navigate = useNavigate();
    const navigateUser = () => {
      // 👇️ navigate to /
      navigate('/user', {
        state: {
          userId: id_user,
        }
      });
    };

  return (
    <div className={storyBorder ? "storyBorder" : ""}>
      <img
        className={`profileIcon ${iconSize}`}
        src={profileImage}
        alt="profile"
        onClick={navigateUser}
      />
    </div>
  );
}

export default ProfileIcon;
