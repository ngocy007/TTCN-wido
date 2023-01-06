import "../styles/comment.scss";
import ProfileIcon from "./ProfileIcon";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import { ReactComponent as CardButton } from "../images/cardButton.svg";
import React, { useState, useEffect } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

function Comment(props) {
  const {
    accountName,
    comment,
    image,
    id_user,
    id_com,
    id_post,
    parentCallback,
  } = props;
  const headers = {
    "x-access-token": localStorage.getItem("token"),
  };
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
  //hadnle aleart xoa bai
  const [openAleart, setOpenAleart] = React.useState(false);

  const handleClickOpenAleart = () => {
    setOpenAleart(true);
  };

  const handleCloseAleart = () => {
    setOpenAleart(false);
  };
  //state cho xu ly delete
  const [isDelete, setIsDelete] = useState(false);
  const HandleDelete = () => {
    parentCallback();
    handleCloseAleart();
    fetch("http://localhost:8000/api/comment/" + id_com, {
      method: "DELETE",
      headers: headers,
    })
      .then((res) => res.json())
      .then((data) => setIsDelete(data.success))
      .catch((err) => console.log("hey"));
  };
  return (
    <div className="commentContainer">
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
              {id_user == userData?.user?.id_user ? (
                <MenuItem onClick={handleClickOpenAleart}>Xóa comment</MenuItem>
              ) : (
                ""
              )}
              <MenuItem onClick={handleCloseMenu}>Cancel</MenuItem>
            </Menu>
            <Dialog
              open={openAleart}
              onClose={handleCloseAleart}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogTitle id="alert-dialog-title">
                {"Xác nhận xóa bài"}
              </DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                  Bạn có muốn xóa bài này không?
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleCloseAleart}>Disagree</Button>
                <Button onClick={HandleDelete} autoFocus>
                  Agree
                </Button>
              </DialogActions>
            </Dialog>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Comment;
