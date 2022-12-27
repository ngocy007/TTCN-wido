import React from "react";
import styled from "styled-components";
import { KeyNumber } from "./key-number";

const ProfileDetailUl = styled.ul`
  display: flex;
  @media only screen and (max-width: 735px) {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    padding: 12px 0;
    border-top: 1px solid var(--ins-border-primary);
  }
`;
export function KeyNumbers(props) {
  const {
    countPost,
    countFollowee,
    countFollower,
    id_user
  } = props;
  return (
    <ProfileDetailUl>
      <KeyNumber label="posts" number={countPost} id_user={id_user} />
      <KeyNumber label="followers" number={countFollower} />
      <KeyNumber label="following" number={countFollowee} />
    </ProfileDetailUl>
  );
}
