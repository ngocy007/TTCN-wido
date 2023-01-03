import "../styles/uploadmodal.scss";
import React, { useState, useRef } from "react";
import Button from "@mui/material/Button";
import useForm from "./UseForm";
import UploadFile from "./uploadfile";
import axios from "axios";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';

function UploadModal(props) {
  const { parentCallback, parentCallback2 } = props;

  const [selectedFiles, setSelectedFiles] = useState([]);
  const apiCreatePost = "http://localhost:8000/api/post/create";
  const headers = {
    "x-access-token": localStorage.getItem("token"),
  };
  //xu ly post
  //bien xu ly form
  const formElement = useRef(null);
  const [content, setContent] = useState("");
  const [isUp, setIsUp] = useState(false);

  const { handleSubmit, status, message } = useForm({
    form: formElement.current,
    endpointUrl: apiCreatePost,
  });

  //state cho status upload
  const [openStatus, setOpenStatus] = React.useState(false);

  const handleClickOpen = () => {
    setOpenStatus(true);
  };

  const handleCloseStatus = () => {
    setOpenStatus(false);
  };

  //state loading
  const [loading, setLoading] = React.useState(false);
  const [success, setSuccess] = React.useState(false);
  const timer = React.useRef();

  // Ham on submit
  const handleupload = (event) => {
    event.preventDefault();
    setOpenStatus(true);
    setLoading(true);
    let formdata = new FormData();
    formdata.append("content", content);
    const files = event.target.multiple.files;
    console.log("files", files);
    console.log("event len", event.target.multiple.files.length);
    let l = event.target.multiple.files.length;
    for (let i = 0; i < l; i++) {
      console.log("runed", i);
      formdata.append("multiple", event.target.multiple.files[i]);
    }

    fetch("http://localhost:8000/api/post/create", {
      method: "POST",
      headers: headers,
      body: formdata,
    })
      .then((res) => res.json())
      .then((data) => {
        setIsUp(true);
        setLoading(false);
        setSuccess(true);
        console.log("worked");
      })
      .catch((err) => {
        setSuccess(false);
      });
  };
  //xu ly change anh
  const handleImageChange = (e) => {
    // console.log(e.target.files[])
    if (e.target.files) {
      const filesArray = Array.from(e.target.files).map((file) =>
        URL.createObjectURL(file)
      );

      // console.log("filesArray: ", filesArray);

      setSelectedFiles((prevImages) => prevImages.concat(filesArray));
      Array.from(e.target.files).map(
        (file) => URL.revokeObjectURL(file) // avoid memory leak
      );
    }
  };
  //textarea
  const handleTextChange = (event) => {
    setContent(event.target.value);
  };

  const renderPhotos = (source) => {
    //console.log("source: ", source);
    return source.map((photo) => {
      return <img className="imgUp" src={photo} alt="" key={photo} />;
    });
  };

  const handleCloseFinish = () => {
    setOpenStatus(false);
    parentCallback();
  };

  return (
    <div className="upload">
      <form className="form__signup" onSubmit={handleupload} action="">
        <div className="result">{renderPhotos(selectedFiles)}</div>
        <div className="form__group" style={{display:"flex", justifyContent:"center"}}>
          <textarea
            className="form__field"
            name="content"
            rows="4"
            cols="50"
            onChange={handleTextChange}
            style={{width:"50%"}}
          ></textarea>
        </div>
        <div className="form__group">
          <input
            className="form__field"
            id="file"
            type="file"
            name="multiple"
            multiple
            onChange={handleImageChange}
            required
          />
          <div className="label-holder">
            <label htmlFor="file" className="label">
              {/* <i className="material-icons">add_a_photo</i> */}
              <AddAPhotoIcon color="primary" sx={{cursor:'pointer'}}></AddAPhotoIcon>
            </label>
          </div>
        </div>

        {/* <Button className="btn-signup">Upload</Button> */}
        {status !== "loading" && (
          <div className="formButton">
            <button className="post_comment" type="submit">
              Upload
            </button>
          </div>
        )}
      </form>
      {/* DIalog status */}
      <Dialog
        open={openStatus}
        onClose={success ? handleCloseFinish : handleCloseStatus}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <Box sx={{ alignItems: "center" }}>
          <DialogTitle id="alert-dialog-title">
            {success
              ? "Upload thành công vui lòng đóng hiển thị này"
              : "Đang xử lý đăng bài vui lòng không đóng hiển thị này"}
          </DialogTitle>
          <DialogContent sx={{ alignItems: "center" }}>
            <Box sx={{ alignItems: "center", paddingLeft: "205px" }}>
              {loading && (
                <CircularProgress
                  size={68}
                  sx={{
                    color: "green",
                    zIndex: 3,
                  }}
                />
              )}
            </Box>
            <DialogContentText
              id="alert-dialog-description"
              sx={{ textAlign: "center" }}
            >
              {loading
                ? "Đang xử lý"
                : success
                ? "Upload thành công"
                : "Upload thất bại"}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            {success ? (
              <Button onClick={handleCloseFinish}>Đóng</Button>
            ) : loading ? (
              ""
            ) : (
              "Upload thất bại"
            )}
          </DialogActions>
        </Box>
      </Dialog>
    </div>
  );
}
export default UploadModal;
