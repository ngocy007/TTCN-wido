import "../styles/card.scss";
import Profile from "./Profile";
import { ReactComponent as CardButton } from "../images/cardButton.svg";
import CardMenu from "./CardMenu";
import Comment from "./Comment";
import React, { useState } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import CommentModal from "./CommentModal";

function Card(props) {
  const { storyBorder, image, comments, likedByText, likedByNumber, hours } =
    props;
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
  // <CommentModal
  //   accountName="rafagrassetti"
  //   storyBorder={storyBorder}
  //   image={image}
  //   comments={comments}
  //   likedByText={likedByText}
  //   likedByNumber={likedByNumber}
  //   hours={hours}
  //   handleOpen={true}
  // />;

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
  const test = false;
  return (
    <div className="card">
      <header>
        <Profile iconSize="medium" storyBorder={storyBorder} />
        <CardButton className="cardButton" />
      </header>
      <img
        className="cardImage"
        src={image}
        alt="card content"
        onClick={handleOpen}
      />
      <CardMenu />
      <div className="likedBy">
        <Profile iconSize="small" hideAccountName={true} />
        <span>
          Liked by <strong>{likedByText}</strong> and{" "}
          <strong>{likedByNumber} others</strong>
        </span>
      </div>
      <div className="comments">
        {comments.map((comment) => {
          return (
            <Comment
              key={comment.id}
              accountName={comment.user}
              comment={comment.text}
            />
          );
        })}
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
            <button className="post_comment">
              Đăng
            </button>
          </div>
        </form>
      </div>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <CommentModal
            accountName="rafagrassetti"
            storyBorder={storyBorder}
            image={image}
            comments={comments}
            likedByText={likedByText}
            likedByNumber={likedByNumber}
            hours={hours}
          />
        </Box>
      </Modal>
    </div>
  );
}

export default Card;
