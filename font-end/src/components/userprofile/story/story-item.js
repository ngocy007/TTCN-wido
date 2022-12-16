import React from "react";
import styled from "styled-components";

const Wrap = styled.li`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px 15px;
  color: var(--ins-content-primary);
  @media only screen and (max-width: 735px) {
    padding: 0px 5px;
  }
`;

const ImageWrap = styled.div`
  padding: 3px;
  border-radius: 1000px;
  border: 1px solid var(--ins-border-secondary);
`;
const Image = styled.img`
  border-radius: 1000px;
  width: 77px;
  height: 77px;
  display: block;
  @media only screen and (max-width: 735px) {
    width: 56px;
    height: 56px;
  }
`;
const Title = styled.div`
  padding-top: 15px;
  font-size: 14px;
  font-weight: 600;
  text-align: center;
  white-space: nowrap;
  width: 80px;
  overflow: hidden;
  text-overflow: ellipsis;
  @media only screen and (max-width: 735px) {
    font-size: 12px;
    padding-top: 8px;
    font-weight: 400;
    width: 65px;
  }
`;

export function StoryItem(props) {
  return (
    <Wrap>
      <ImageWrap>
        <Image src={props.imagePath} />
      </ImageWrap>
      <Title>{props.title}</Title>
    </Wrap>
  );
}

StoryItem.defaultProps = {
  imagePath: "/images/story-1.jpg",
  title: "IDPWD"
};
