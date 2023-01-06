
import styled from "styled-components";
import * as Icons from "../icons";
import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import CommentModal from "../../CommentModal";
import Carousel from "react-bootstrap/Carousel";

const Wrap = styled.div`
  position: relative;
`;
const Img = styled.img`
  width: 100%;
  height: 300px;
  display: block;
`;
const Icon = styled.span`
  position: absolute;
  top: 0px;
  right: 0px;
`;

export function GalleryItem({ imagePath, icon, id_post }) {
  //handle cho comment modal
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const style = {
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 900,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  const IconComp = Icons[icon];

  //State cho fetch detailpost
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [userpostdetail, setItems] = useState([]);
  const headers = {
    "x-access-token": localStorage.getItem("token"),
  };
  //Lay api detail
  useEffect(() => {
    fetch("http://localhost:8000/api/post/"+id_post , { headers })
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
  //console.log("imagePath - GalleryItem", imagePath);
  return (
    <Wrap>
      <Img alt="gallery-post" src={imagePath} onClick={handleOpen} />
      {/* <Icon>
        {icon && <IconComp />}
        { <span className="media-icon"></span> }
      </Icon> */}
       {/*Modal popup comment*/}
       <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <CommentModal
            storyBorder={true}
            image={userpostdetail?.post?.Photos}
            hours={13}
            id_post={id_post}
            id_user={userpostdetail?.post?.id_user}
            comments={userpostdetail?.post?.Comments}
            userName={userpostdetail?.post?.User?.name}
            profileIcon={userpostdetail?.post?.User?.image}
            likedByNumber={20}
          />
        </Box>
      </Modal>
    </Wrap>
    
    
  );
}
GalleryItem.defaultProps = {
  imagePath: "/images/transparent.png",
  icon: "",
};
