import "../styles/App.scss";
import { Navigation } from "./userprofile/navigation";
import Cards from "./Cards";
import Sidebar from "./Sidebar";
import Stories from "./Stories";
import { Gallery } from "./userprofile/gallery";
import { KeyNumbers } from "./userprofile/key-numbers";
import { Profile } from "./userprofile/profile";
import { Story } from "./userprofile/story";
import { Tabs } from "./userprofile/tabs";
import { MobileOnly } from "./userprofile//mobile";
import styled from "styled-components";
import { ThemeSwitcher } from "../theme";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
const ThemeWrap = styled.div`
  background: var(--ins-background-primary);
`;
const Main = styled.main`
  padding: 30px 20px 0px 20px;
  max-width: 935px;
  margin: 0 auto;
  @media only screen and (max-width: 735px) {
    padding: 0;
  }
`;
function ProfilePage(props) {
  const [theme, setTheme] = useState("light");
  // const { id_user } = props;
  const location = useLocation();

  // get userId
  const saved = localStorage.getItem("info");
  const userData = JSON.parse(saved);
  const userId = location.state.userId || userData?.user?.id_user;
  //State cho fetch detailuser
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [userdetail, setItems] = useState([]);
  const headers = {
    "x-access-token": localStorage.getItem("token"),
  };
  //Lay api detail
  useEffect(() => {
    fetch("http://localhost:8000/api/user/info/" + userId, { headers })
      .then((res) => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setItems(result);
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
  // console.log("here are fetach user");
  // console.log(userdetail?.user);
  const array = userdetail?.user?.Posts;
  const length = array?.length;
  return (
    <ThemeWrap className={`__insta-${theme}-mode`}>
      <Navigation />
      <Main>
        <Profile
          image={userdetail?.user?.image}
          userName={userdetail?.user?.name}
          countFollower={userdetail?.user?.countFollower}
          countFollowee={userdetail?.user?.countFollowee}
          countPost={length}
        />
        <Story />
        <MobileOnly>
          <KeyNumbers
            countFollower={userdetail?.user?.countFollower}
            countFollowee={userdetail?.user?.countFollowee}
            countPost={length}
          />
        </MobileOnly>
        <Tabs />
        <Gallery  Posts={userdetail?.user?.Posts}/>
      </Main>
    </ThemeWrap>
  );
}

export default ProfilePage;
