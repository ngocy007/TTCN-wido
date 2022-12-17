import "../styles/commentmodal.scss";
import Card from "./Card";
import React, { useState } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Profile from "./Profile";
import { ReactComponent as CardButton } from "../images/cardButton.svg";
import CardMenu from "./CardMenu";
import Comment from "./Comment";
import ListItem from "@mui/material/ListItem";
import { FixedSizeList } from "react-window";
import AutoSizerProps from "react-virtualized-auto-sizer";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
function renderRow(props) {
  const { data, index, style } = props;
  console.log(data.comment);
  return (
    <ListItem style={style} key={index} component="div" disablePadding>
      <ListItemButton>
        <ListItemText primary={`Item ${index + 1}`} />
        {console.log(index)}
      </ListItemButton>
    </ListItem>
  );
}
function CommentModal(props) {
  const { storyBorder, image, comments, likedByText, likedByNumber, hours } =
    props;

  console.log(
    comments.map((comment) => {
      console.log("pointer");
      return comment;
    })
  );
  return (
    <div className="cardModal">
      <div className="cardcontainer">
        <div className="img1">
          <img className="cardImageModal" src={image} alt="card content" />
        </div>
        <div className="menuModal">
          <header>
            <Profile iconSize="medium" storyBorder={storyBorder} />
            <CardButton className="cardButton" />
          </header>
          <div className="commentsModal">
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
          {/* <div className="comments">
          <FixedSizeList
              height={200}
              width={360}
              itemSize={10}
              itemCount={comments.length}
              overscanCount={5}
              itemData={{comments:"123"}}
            >
            {renderRow}
            {console.log(comments,"sdfsgfrf")}
            </FixedSizeList>
          </div> */}

          <CardMenu />
          <div className="likedBy">
            <Profile iconSize="small" hideAccountName={true} />
            <span>
              Liked by <strong>{likedByText}</strong> and{" "}
              <strong>{likedByNumber} others</strong>
            </span>
          </div>
          <div className="timePosted">{hours} HOURS AGO</div>
          {/* <div className="addComment">
            <div className="commentText">Add a comment...</div>
            <div className="postText">Post</div>
          </div> */}
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
        </div>
      </div>
    </div>
  );
}

export default CommentModal;
