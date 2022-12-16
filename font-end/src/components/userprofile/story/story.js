import React from "react";
import styled from "styled-components";
import { DesktopOnly } from "../../userprofile/mobile";
import { StoryItem } from "./story-item";
// import * as data from "./data.json";
import { data } from "./data";
import * as Icons from "../icons";

const Stories = styled.div`
  display: flex;
  justify-content: start;
  padding: 0 24px;
  overflow-x: scroll;
  position: relative;
  margin-bottom: 44px;
  background: var(--ins-background-primary);
  @media only screen and (max-width: 735px) {
    padding: 0;
    margin-bottom: 21px;
  }
`;

const NextButton = styled.button`
  all: unset;
  position: sticky;
  right: 0;
  cursor: pointer;
`;

export function Story() {
  // const storyItems = data.default
  const storyItems = data;
  return (
    <Stories>
      {storyItems.map((item, id) => (
        <StoryItem key={id} title={item.title} imagePath={item.imagePath} />
      ))}
      {/* <StoryItem imagePath="/images/story-1.jpg" title="IDPWD" />
      <StoryItem imagePath="/images/story-2.jpg" title="🎈🧪" />
      <StoryItem imagePath="/images/story-3.jpg" title="Diwali" />
      <StoryItem imagePath="/images/story-4.jpg" title="Masked" />
      <StoryItem imagePath="/images/story-5.jpg" title="Dark Universe" />
      <StoryItem imagePath="/images/story-6.jpg" title="📱12 Pro 🎥 Test" />
      <StoryItem imagePath="/images/story-7.jpg" title="Shot and Edited" />
      <StoryItem imagePath="/images/story-8.jpg" title="Vertical Cinema" />
      <StoryItem imagePath="/images/story-9.jpg" title="Hermitage 🎨" />
      <StoryItem imagePath="/images/story-10.jpg" title="🐌💗" />
      <StoryItem imagePath="/images/story-11.jpg" title="💧+💡" /> */}

      <NextButton>
        <DesktopOnly>
          <Icons.ArrowRight />
          {/* <div className="arrow-right-icon"></div> */}
        </DesktopOnly>
      </NextButton>
    </Stories>
  );
}
