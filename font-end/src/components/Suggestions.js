import "../styles/suggestions.scss";
import Profile from "./Profile";
import { useEffect, useState } from "react";

function Suggestions() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);
  const [itemsC, setItemsC] = useState(0);
  const headers = {
    "x-access-token": localStorage.getItem("token"),
  };
  //call back
  const [isCall, setCall] = useState([]);
  const handleCallBack = () => setCall(!isCall);
  useEffect(() => {
    fetch("http://localhost:8000/api/user/", { headers })
      .then((res) => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setItems(result.users);
          let c = result.users.length;
          setItemsC(c);
          console.log("length", c);
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      );
  }, []);
  return (
    <div className="suggestions">
      <div className="titleContainer">
        <div className="title">Suggestions For You</div>
      </div>
      {itemsC >= 5 ? (
        items?.slice(0, 5).map((user) => {
          return (
            <div style={{ display: "flex" }}>
              <Profile
                iconSize="medium"
                storyBorder={true}
                username={user.name}
                image={user.image}
                id_user={user.id_user}
              />
            </div>
          );
        })
      ) : (
        <div>
          <Profile
            caption="Followed by mapvault + 3 more"
            iconSize="medium"
            captionSize="small"
            storyBorder={true}
          />
          <Profile
            caption="Followed by dadatlacak + 1 more"
            iconSize="medium"
            captionSize="small"
          />
          <Profile
            caption="Follows you"
            iconSize="medium"
            captionSize="small"
          />
          <Profile
            caption="Followed by dadatlacak + 7 more"
            iconSize="medium"
            captionSize="small"
            storyBorder={true}
          />
          <Profile
            caption="Followed by mapvault + 4 more"
            iconSize="medium"
            captionSize="small"
          />
        </div>
      )}
    </div>
  );
}

export default Suggestions;
