import React from "react";
import styled from "styled-components";
import { data } from "./data";
import { GalleryItem } from "./gallery-item";

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 28px;
  @media only screen and (max-width: 735px) {
    gap: 3px;
  }
`;

export function Gallery() {
  return (
    <Grid>
      {data.map((item, id) => (
        <GalleryItem key={id} imagePath={item.imagepath} icon={item.icon} />
      ))}
      {/* <GalleryItem>
        <Img alt="gallery-post" src="/images/gallery-1.jpg" />
        <Icon>
          <span className="media-icon"></span>
        </Icon>
      </GalleryItem>
      <GalleryItem>
        <Img alt="gallery-post" src="/images/gallery-2.jpg" />
        <Icon>
          <span className="media-icon"></span>
        </Icon>
      </GalleryItem>
      <GalleryItem>
        <Img alt="gallery-post" src="/images/gallery-3.jpg" />
        <Icon>
          <span className="media-icon"></span>
        </Icon>
      </GalleryItem>
      <GalleryItem>
        <Img alt="gallery-post" src="/images/gallery-4.jpg" />
      </GalleryItem>
      <GalleryItem>
        <Img alt="gallery-post" src="/images/gallery-5.jpg" />
      </GalleryItem>
      <GalleryItem>
        <Img alt="gallery-post" src="/images/gallery-6.jpg" />
        <Icon>
          <span className="media-icon"></span>
        </Icon>
      </GalleryItem> */}
    </Grid>
  );
}
