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

export function Gallery({ Posts }) {
  console.log("get all img item here");
  console.log(Posts);
  return (
    <Grid>

      {Posts?.map((items) => (
          <div>
            {items?.Photos.map((item) => (
              <GalleryItem imagePath={item.url} id_post={items.id_post}/>
            ))}
          </div>
      ))}
      {/* {Posts?.map((items) => (
          console.log("here",items.Photos)
      ))} */}
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
