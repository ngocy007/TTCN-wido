import "../styles/commentmodal.scss";

import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Profile from "./Profile";
import { ReactComponent as CardButton } from "../images/cardButton.svg";
import CardMenu from "./CardMenu";
import Comment from "./Comment";
import ListItem from "@mui/material/ListItem";

import Carousel from "react-bootstrap/Carousel";
import Button from "@mui/material/Button";
import { ReactComponent as Notifications } from "../images/notifications.svg";
import { ReactComponent as Notifications2 } from "../images/notifications2.svg";
import { ReactComponent as Comments } from "../images/comments.svg";
import List from "@mui/material/List";
import ListSubheader from "@mui/material/ListSubheader";
import "../styles/cardMenu.scss";
import useForm from "./UseForm";
import { useRef } from "react";
function CommentModal(props) {
  const {
    storyBorder,
    image,
    comments,
    likedByText,
    likedByNumber,
    hours,
    userName,
    profileIcon,
    id_post,
    id_user,
    isLiked,
    countLiked,
    postLiked,
    parentCallback,
    parentCallback2,
  } = props;
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
  //require
  //api creat comment
  const apiCreate = "http://localhost:8000/api/comment/create";
  const headers = {
    "x-access-token": localStorage.getItem("token"),
  };
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

  // get userId
  const saved = localStorage.getItem("info");
  const userData = JSON.parse(saved);

  //bien xu ly form
  const formElement = useRef(null);
  const additionalData = {
    id_post: id_post,
    endpointUrl: apiCreate,
  };
  //xu ly handle call back
  //state call back
  const [isCall, setCallBack] = useState(false);
  const handleCallBackClear = (e) => {
    setCallBack(!isCall);
    parentCallback2();
  };

  //call back rep
  //state truyen id cho post
  const [idRep, setIdRep] = useState("");
  const [isRep, setIsRep] = useState(false);

  const handleCallBackRep = (id) => {
    setIsRep(!isRep);
    setIdRep(id);
  };

  //xu ly post
  const { handleSubmit, status, message } = useForm({
    form: formElement.current,
    additionalData,
    callbackfield: handleCallBackClear,
  });

  // xu ly clear comment
  const [text, setText] = useState("");
  const handleChangeInput = (event) => {
    setText(event.target.value);
  };

  useEffect(() => {
    setText("");
    setIsRep(isRep);
  }, [isCall]);
  //call over

  //handle cho like modal
  const [openLike, setOpenLike] = React.useState(false);
  // const handleOpenLike = () => setOpenLike(true);
  const handleOpenLike = () => setOpenLike(true);
  const handleCloseLike = () => setOpenLike(false);

  //State cho xu ly check like
  const [isLike, setIsLike] = useState(false);
  //let countlike = postdetail?.post?.countLike;
  const ccc = countLiked;
  const check = isLiked;
  const [countLike, setCLike] = useState(ccc);

  //State cho fetch get all like
  const [postLike, setLike] = useState([]);

  useEffect(() => {
    setCLike(ccc);
  }, [check]);
  useEffect(() => {
    setIsLike(check);
  }, [check]);
  const [isLike2, setIsLike2] = useState(true);
  //setIsLike(postdetail?.post?.isLike);
  //lay like post
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
  }, [id_post, isLike]);
  const HandleLike = () => {
    setIsLike2((prevLike) => !prevLike);
    parentCallback();
    //setIsLike(check);
    // useEffect(() => {
    //   const requestOptions = {
    //     method: "POST",
    //     headers: { headers },
    //   };
    //   fetch("https://reqres.in/api/posts" + id_post, requestOptions)
    //     .then((response) => response.json())
    //     .then((data) => setIsLike(data.like));

    // }, []);
    fetch("http://localhost:8000/api/like/post/" + id_post, {
      method: "POST",
      headers: headers,
    })
      .then((res) => res.json())
      .then((data) => setIsLike(data.like))
      .catch((err) => console.log("hey"));
    // setItems({
    //   ...postdetail,
    //   isLike: isLike,
    // });
    if (isLike) setCLike(countLike - 1);
    else setCLike(countLike + 1);
  };
  const length = comments.length;

  return (
    <div className="cardModal">
      <div className="cardcontainer">
        <div className="img1">
          <Carousel interval={null}>
            {image.map((img) => {
              return (
                <Carousel.Item>
                  <img
                    className="cardImageModal"
                    src={img.url}
                    alt="card content"
                  />
                </Carousel.Item>
              );
            })}
          </Carousel>
        </div>
        <div className="menuModal">
          <header>
            <Profile
              iconSize="medium"
              storyBorder={storyBorder}
              username={userName}
              image={profileIcon}
              id_user={id_user}
            />
            {/* <CardButton className="cardButton" /> */}
          </header>
          <div className="commentsModal">
            {/* <AutoSizer>
              {({ height, width }) => (
                <FixedSizeList
                  height={height}
                  width={width}
                  itemSize={10}
                  itemCount={length}
                >
                </FixedSizeList>
                
              )
              }
            </AutoSizer> */}
            <List
              sx={{
                width: "100%",
                width: "100%",
                maxWidth: 360,
                bgcolor: "background.paper",
                position: "relative",
                overflow: "auto",
                overflowX: "hidden",
                maxHeight: 320,
                "& ul": { padding: 0 },
              }}
              subheader={<li />}
            >
              <li key={`likedby`}>
                <ul>
                  {comments?.map((comment) => (
                    <Comment
                      key={comment.id_com}
                      accountName={comment.User.name}
                      comment={comment.content}
                      image={comment.User.image}
                      id_user={comment.User.id_user}
                      id_com={comment.id_com}
                      id_post={comment.id_post}
                      parentCallback={parentCallback}
                      callRep={handleCallBackRep}
                      isCall={isCall}
                    ></Comment>
                  ))}
                </ul>
              </li>
            </List>
          </div>

          <div className="cardMenu">
            <div className="interactions">
              {
                <Button onClick={HandleLike}>
                  {isLike ? (
                    <Notifications2 className="icon" />
                  ) : (
                    <Notifications className="icon" />
                  )}
                </Button>
              }
              <Button>
                <Comments className="icon" />
              </Button>

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
              <strong>{countLike}</strong>
            </span>
          </div>
          <div className="timePosted">{hours} HOURS AGO</div>
          {/* <div className="addComment">
            <div className="commentText">Add a comment...</div>
            <div className="postText">Post</div>
          </div> */}
          <div className="post__comment">
            <form
              className="form"
              action={apiCreate}
              onSubmit={handleSubmit}
              method="POST"
              ref={formElement}
            >
              <div className="addComment">
                {/* <div className="commentText">
                  <input
                    text="textarea"
                    className="post__modalcommentbox"
                    placeholder="Add a comment..."
                  />
                </div> */}
                <div className="commentText">
                  <textarea
                    className="post__modalcommentbox"
                    name="content"
                    rows="4"
                    cols="50"
                    onChange={handleChangeInput}
                    value={text}
                    placeholder={isRep ? "Thêm phản hồi" : "Thêm bình luận"}
                    required
                  ></textarea>
                  {isRep ? (
                    <input
                      name="reply"
                      value={idRep}
                      style={{ display: "none" }}
                    ></input>
                  ) : (
                    ""
                  )}
                </div>
                {/* <div className="postText">Post</div> */}
                {status !== "loading" && (
                  <button className="post_comment" type="submit">
                    Đăng
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
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

export default CommentModal;
