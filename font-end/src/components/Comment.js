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
    callRep,
    isCall
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
  //state show rep
  const [isShow, setIsShow] = useState(false);
  const [count, setCount] = useState(0);
  const [itemRep, setRep] = useState([]);

  //state truyen id cho post
  const [idRep, setIdRep] = useState("");

  const HandleShow = () => {
    parentCallback();
    fetch("http://localhost:8000/api/comment/more/" + id_com, {
      method: "GET",
      headers: headers,
    })
      .then((res) => res.json())
      .then((data) => {
        setRep(data.replies);
        setIsShow(true);
        console.log("lay comment thanh cong");
      })
      .catch((err) => console.log("hey"));
  };
  const HandleCloseShow = () => {
    setIsShow(false);
  };

  //Dem rep
  useEffect(() => {
    fetch("http://localhost:8000/api/comment/more/" + id_com, {
      method: "GET",
      headers: headers,
    })
      .then((res) => res.json())
      .then(
        (result) => {
          let c = result.replies.length;
          setCount(c);
          console.log("length", c);
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          console.log("Loi get length");
        }
      );
  }, [isCall]);
  useEffect(() => {
    setIsShow();
  }, [isCall])
  //phan hoi
  const handleRep = (id) => {
    callRep(id);
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
      <div className="profile" style={{ marginTop: "9.6px" }}>
        <div style={{ marginBottom: "auto" }}>
          <ProfileIcon
            iconSize="small"
            storyBorder={true}
            image={image}
            id_user={id_user}
          />
        </div>

        <div className="textContainer">
          <div className="comment" style={{ display: "flex" }}>
            <div
              className="accountName"
              style={{
                fontWeight: "550",
              }}
            >
              {accountName}
            </div>
            <span>&nbsp;&nbsp;</span>
            <div style={{ wordWrap: "break-word", width: "200px" }}>
              <p>{comment}</p>
            </div>
          </div>
          <div
            className={`caption small`}
            style={{
              marginTop: "-30px",
              "&:hover": { backgroundColor: "transparent" },
            }}
            disableRipple
            disableFocusRipple
          >
            {" "}
            <Button onClick={() => handleRep(id_com)}>
              <p
                style={{
                  color: "black",
                  fontSize: "9px",
                  textAlign: "center",
                  marginTop: "18px",
                  fontWeight: "550",
                }}
              >
                Phản hồi
              </p>
            </Button>
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
          <div className={`caption small`} style={{ marginTop: "-30px" }}>
            {" "}
            {count > 0 ? (
              <Button
                sx={{ height: "40px" }}
                onClick={isShow ? HandleCloseShow : HandleShow}
              >
                <p
                  style={{
                    color: "black",
                    fontSize: "9px",
                    textAlign: "center",
                    marginTop: "18px",
                    fontWeight: "550",
                  }}
                >
                  {isShow ? "Ẩn phản hồi" : "Xem phản hồi (" + count + ")"}
                </p>
              </Button>
            ) : (
              ""
            )}
          </div>
          {itemRep?.map((comment) =>
            isShow ? (
              <div className="profile" style={{ marginTop: "9.6px" }}>
                <div style={{ marginBottom: "auto" }}>
                  <ProfileIcon
                    iconSize="small"
                    storyBorder={true}
                    image={comment.User.image}
                    id_user={comment.User.id_user}
                  />
                </div>

                <div className="textContainer">
                  <div
                    className="comment"
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <div
                      className="accountName"
                      style={{
                        fontSize: "9.6px",
                        fontWeight: "550",
                      }}
                    >
                      {comment.User.name}
                    </div>
                    <span>&nbsp;&nbsp;</span>
                    <div style={{ wordWrap: "break-word", width: "200px" }}>
                      <p
                        style={{
                          fontSize: "9.6px",
                        }}
                      >
                        {comment.content}
                      </p>
                    </div>
                  </div>
                  <div
                    className={`caption small`}
                    style={{ marginTop: "-15px" }}
                  >
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
                        <MenuItem onClick={handleClickOpenAleart}>
                          Xóa comment
                        </MenuItem>
                      ) : (
                        ""
                      )}
                      <MenuItem onClick={handleCloseMenu}>Cancel</MenuItem>
                    </Menu>
                  </div>
                </div>
              </div>
            ) : (
              ""
            )
          )}
        </div>
      </div>
    </div>
  );
}

export default Comment;
