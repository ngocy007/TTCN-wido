import "../styles/card.scss";
import Profile from "./Profile";
import { ReactComponent as CardButton } from "../images/cardButton.svg";
import CardMenu from "./CardMenu";
import Comment from "./Comment";
import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import CommentModal from "./CommentModal";
import Carousel from "react-bootstrap/Carousel";
import ShowMoreText from "react-show-more-text";

function Card(props) {
  const {
    storyBorder,
    image,
    commentsdummy,
    likedByText,
    likedByNumber,
    hours,
    userName,
    profileIcon,
    id_post,
    id_user,
    content,
  } = props;
  const [modalOpen, setModalOpen] = useState(false);
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

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const commentsOne = [
    {
      user: "raffagrassetti",
      text: "Woah dude, this is awesome! 🔥",
      id: 1,
    },
    {
      user: "therealadamsavage",
      text: "Like!",
      id: 2,
    },
    {
      user: "mapvault",
      text: "Niceeeee!",
      id: 3,
    },
  ];
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [postdetail, setItems] = useState([]);
  const headers = {
    "x-access-token": localStorage.getItem("token"),
  };
  useEffect(() => {
    fetch("http://localhost:8000/api/post/" + id_post, { headers })
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
  function executeOnClick(isExpanded) {
    console.log(isExpanded);
  }
  return (
    <div className="card">
      <header>
        <Profile
          iconSize="medium"
          storyBorder={storyBorder}
          username={userName}
          image={profileIcon}
        />
        <CardButton className="cardButton" />
      </header>
      {/* <img
        className="cardImage"
        src={image}
        alt="card content"
        onClick={handleOpen}
      /> */}
      <Carousel interval={null}>
        {image.map((img) => {
          return (
            <Carousel.Item>
              <img
                className="cardImage"
                src={img.url}
                alt="Third slide"
                onClick={handleOpen}
              />
            </Carousel.Item>
          );
        })}
      </Carousel>
      <CardMenu />
      <div className="likedBy">
        <span>
          Liked by <strong>{likedByText}</strong> and{" "}
          <strong>{likedByNumber} others</strong>
        </span>
      </div>
      <div className="comments">
        {/* {postdetail.posts?.Comments.map((comment) => {
          return (
            <Comment
              key={comment.id_con}
              accountName="Holder"
              comment={comment.content}
            />
          );
        })} */}
        <div className="postContainer">
          {/* <div className="postComment">{content}</div> */}
          <ShowMoreText
            lines={3}
            more="Show more"
            less="Show less"
            className="postComment"
            anchorClass="show-more-less-clickable"
            onClick={executeOnClick}
            expanded={false}
            width={280}
            truncatedEndingComponent={"... "}
          >
            {content}
          </ShowMoreText>
        </div>
      </div>
      <div className="timePosted">{hours} HOURS AGO</div>
      <div className="post__comment">
        <form className="form">
          <div className="addComment">
            <div className="commentText">
              <input
                text="text"
                className="post__commentbox"
                placeholder="Add a comment..."
              />
            </div>
            {/* <div className="postText">Post</div> */}
            <button className="post_comment">Đăng</button>
          </div>
        </form>
      </div>
      {/* {postdetail.posts.map((item) => {
          return (
            console.log("HERE2","HERE 3")
          );
        })} */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <CommentModal
            accountName={userName}
            storyBorder={storyBorder}
            image={image}
            likedByText={likedByText}
            likedByNumber={likedByNumber}
            hours={hours}
            id_post={id_post}
            id_user={id_user}
            comments={postdetail.posts?.Comments}
            userName={userName}
            profileIcon={profileIcon}
          />
        </Box>
      </Modal>
    </div>
  );
}

export default Card;
