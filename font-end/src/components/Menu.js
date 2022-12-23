import "../styles/menu.scss";
import { ReactComponent as Home } from "../images/home.svg";
import { ReactComponent as Inbox } from "../images/inbox.svg";
import { ReactComponent as Explore } from "../images/explore.svg";
import { ReactComponent as Notifications } from "../images/notifications.svg";
import { ReactComponent as Upload } from "../images/upload.svg";
import ProfileIcon from "./ProfileIcon";
import image from "../images/profile.jpg";
import React, { useState } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import UploadModal from "./uploadModal";


function Menu() {
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
  return (
    <div className="menu">
      <Home className="icon" onclick="location.href='https://google.com';"></Home>
      {/* <Inbox className="icon" />
      <Explore className="icon" /> */}
      <Notifications className="icon" />
      <Upload className="icon" onClick={handleOpen}/>
      <ProfileIcon iconSize="small" image={image} />
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <UploadModal></UploadModal>
        </Box>
      </Modal>
    </div>
  );
}

export default Menu;
