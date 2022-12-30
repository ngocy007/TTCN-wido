import "../styles/comment.scss";
import ProfileIcon from "./ProfileIcon";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import { ReactComponent as CardButton } from "../images/cardButton.svg";
import React, { useState, useEffect } from "react";
function Comment(props) {
  const { accountName, comment, image, id_user, id_com, id_post } = props;
  // get userId
  const saved = localStorage.getItem("info");
  const userData = JSON.parse(saved);
  //handle cho menu button
  const [anchorEl, setAnchorEl] = React.useState(null);
  const openMenu = Boolean(anchorEl);
  const handleClickMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseMenu = () => {
    setAnchorEl(null);
  };
  return (
    <div className="commentContainer">
      {/* <div className="">HOLDER</div>
      <div className="comment">
        <div className="accountName">{accountName}</div>
        <p>{comment}</p>
      </div> */}
      <div className="profile">
        <div style={{ marginBottom: "auto" }}>
          <ProfileIcon
            iconSize="small"
            storyBorder={true}
            image={image}
            id_user={id_user}
          />
        </div>

        <div className="textContainer">
          <div
            className="comment"
            style={{ display: "flex", justifyContent: "space-between" }}
          >
            <div className="accountName">{accountName}</div>
            <span>&nbsp;&nbsp;</span>
            <div style={{ wordWrap: "break-word", width: "200px" }}>
              <p>{comment}</p>
            </div>
          </div>
          <div className={`caption small`}>
            {" "}
            <Button
              id="basic-button"
              aria-controls={openMenu ? "basic-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={openMenu ? "true" : undefined}
              onClick={handleClickMenu}
            >
              <CardButton className="cardButton" />
            </Button>
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={openMenu}
              onClose={handleCloseMenu}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}
            >           
              { id_user == userData?.user?.id_user ? <MenuItem onClick={handleCloseMenu}>Xóa comment</MenuItem> : "adadadadadad"}
              <MenuItem onClick={handleCloseMenu}>Cancel</MenuItem>
            </Menu>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Comment;
