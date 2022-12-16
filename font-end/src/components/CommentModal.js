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
  console.log(data.comment)
  return (
    <ListItem style={style} key={index} component="div" disablePadding>
      <ListItemButton>
      <ListItemText primary={`Item ${index + 1}`} />
    
      </ListItemButton>
    </ListItem>

  );
}
function CommentModal(props) {
  const { storyBorder, image, comments, likedByText, likedByNumber, hours } =
    props;
  return (
    <div className="card">
      <div className="cardcontainer">
        <div className="img1">
          <img className="cardImage" src={image} alt="card content" />
        </div>
        <div>
          <header>
            <Profile iconSize="medium" storyBorder={storyBorder} />
            <CardButton className="cardButton" />
          </header>
          {/* <div className="comments">
              <FixedSizeList
                height={400}
                width={360}
                itemSize={46}
                itemCount={200}
                overscanCount={5}
              >
                {comments.map((comment) => {
                  return (
                    <Comment
                      key={comment.id}
                      accountName={comment.user}
                      comment={comment.text}
                    />
                  );
                })}
              </FixedSizeList>
          </div> */}
          <div className="comments">
          <FixedSizeList
              height={200}
              width={360}
              itemSize={10}
              itemCount={comments.length}
              overscanCount={5}
              itemData={{comments:"123"}}
            >
            {renderRow}
            </FixedSizeList>
          </div>
         

          <CardMenu />
          <div className="likedBy">
            <Profile iconSize="small" hideAccountName={true} />
            <span>
              Liked by <strong>{likedByText}</strong> and{" "}
              <strong>{likedByNumber} others</strong>
            </span>
          </div>
          <div className="timePosted">{hours} HOURS AGO</div>
          <div className="addComment">
            <div className="commentText">Add a comment...</div>
            <div className="postText">Post</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CommentModal;
