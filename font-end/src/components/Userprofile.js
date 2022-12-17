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
import { useState } from "react";

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
function ProfilePage() {
  const [theme, setTheme] = useState("light");

  return (
    <ThemeWrap className={`__insta-${theme}-mode`}>
    <Navigation />
    <Main>
      <Profile />
      <Story />
      <MobileOnly>
        <KeyNumbers />
      </MobileOnly>
      <Tabs />
      <Gallery />
    </Main>
  </ThemeWrap>
  );
}

export default ProfilePage;
