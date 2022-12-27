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
import { ReactComponent as Comments } from "../images/comments.svg";
import { ReactComponent as Notifications } from "../images/notifications.svg";
import "../styles/cardMenu.scss";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListSubheader from "@mui/material/ListSubheader";
import Button from "@mui/material/Button";

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
  const styleLike = {
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 450,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  //handle cho comment modal
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  //handle cho like modal
  const [openLike, setOpenLike] = React.useState(false);
  const handleOpenLike = () => setOpenLike(true);
  const handleCloseLike = () => setOpenLike(false);

  //State cho fetch detailpost
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [postdetail, setItems] = useState([]);
  const headers = {
    "x-access-token": localStorage.getItem("token"),
  };
  //Lay api detail
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
  //State cho fetch get all like
  const [postLike, setLike] = useState([]);
  useEffect(() => {
    fetch("http://localhost:8000/api/like/post/" + id_post, { headers })
      .then((res) => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setLike(result);
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
  console.log("HERE are all like fetch");
  console.log(postLike?.users);
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
          id_user={id_user}
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
      {/* <CardMenu /> */}
      <div className="cardMenu">
        <div className="interactions">
          <Notifications className="icon" />
          <Comments className="icon" onClick={handleOpen} />
          {/* <Inbox className="icon" /> */}
        </div>
        {/* <Bookmark className="icon" /> */}
      </div>
      <div className="likedBy">
        <span>
          <Button
            variant="text"
            size="small"
            sx={{
              marginBottom: 0.2,
            }}
            onClick={handleOpenLike}
          >
            Liked By
          </Button>{" "}
          <strong>{likedByNumber}</strong>
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
      {/*Modal popup comment*/}
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
      {/*Modal popup like*/}
      <Modal
        open={openLike}
        onClose={handleCloseLike}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={styleLike}>
          <List
            sx={{
              width: "100%",
              maxWidth: 360,
              bgcolor: "background.paper",
              position: "relative",
              overflow: "auto",
              maxHeight: 300,
              "& ul": { padding: 0 },
            }}
            subheader={<li />}
          >
            <li key={`likedby`}>
              <ul>
                <ListSubheader>{`Liked By`}</ListSubheader>
                {postLike?.users?.map((user) => {
                  return (
                    <Profile
                      iconSize="medium"
                      storyBorder={true}
                      username={user.User.name}
                      image={user.User.image}
                      id_user={user.User.id_user}
                    />
                  );
                })}
              </ul>
            </li>
          </List>
        </Box>
      </Modal>
    </div>
  );
}

export default Card;
