import React from "react";
import styled from "styled-components";
import { DesktopOnly } from "../userprofile/mobile";
import { Button } from "./button";
import * as Icons from "./icons";
import Menu from "../Menu";
import logo from "../../images/instagramLogo.png";
import searchIcon from "../../images/searchIcon.png";
import "../../styles/navigation.scss";

const Logo = styled.img`
  height: 29px;
`;
const NavContent = styled.div`
  max-width: 935px;
  margin: 0 auto;
  height: 54px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  @media only screen and (max-width: 735px) {
    padding: 0 20px;
  }
`;
const SearchGuide = styled.div`
  width: 215px;
  background: var(--ins-background-secondary);
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 6px 26px;
  border-radius: 3px;
  border: 1px solid var(--ins-border-primary);
`;
const SearchPlaceholder = styled.span`
  color: var(--ins-mono-700);
  font-size: 14px;
  margin-left: 6px;
`;
const Mock = styled.div`
  height: 54px;
`;
const Fixed = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background: var(--ins-background-primary);
  border-bottom: 1px solid var(--ins-border-primary);
  z-index: 1;
`;

export function Navigation() {
  return (
    <nav>
      <Mock></Mock>
      <Fixed>
        <NavContent>
          <div className="light-theme-only">
            <Logo alt="logo" src={logo} />
          </div>
          <DesktopOnly>
            <SearchGuide>
              <Icons.Search />
              {/* <span className="search-icon"></span> */}
              <SearchPlaceholder>Search</SearchPlaceholder>
            </SearchGuide>
          </DesktopOnly>
          <div></div>
        </NavContent>
      </Fixed>
      <div className="navigation">
        <div className="container">
          <img className="logo" src={logo} alt="instagram logo" />
          <div className="search">
            <img className="searchIcon" src={searchIcon} alt="search icon" />
            <span className="searchText">Search</span>
          </div>
          <Menu />
        </div>
      </div>
    </nav>
  );
}

