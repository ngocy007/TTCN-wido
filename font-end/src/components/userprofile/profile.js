import React from "react";
import styled from "styled-components";
import { DesktopOnly, MobileOnly } from "../userprofile/mobile";
// import { Button } from "./button";
import { KeyNumbers } from "./key-numbers";
import * as Icons from "./icons";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListSubheader from "@mui/material/ListSubheader";
import { useState, useEffect, useRef } from "react";
import { BsFillEyeFill } from "react-icons/bs";
import Button from "@mui/material/Button";
import Profile from "../Profile";

const Header = styled.header`
  margin-top: 100px;
  margin-bottom: 44px;
  background: var(--ins-background-primary);
  color: var(--ins-content-primary);
  @media only screen and (max-width: 735px) {
    display: block;
    margin-bottom: 0px;
  }
`;
const ProfileDetailUl = styled.ul`
  display: flex;
  @media only screen and (max-width: 735px) {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    padding: 12px 0;
    border-top: 1px solid var(--ins-border-primary);
  }
`;
const ProfileDetailLi = styled.li`
  font-size: 16px;
  font-weight: 400;
  margin-right: 55px;
  list-style-type: none;
  @media only screen and (max-width: 735px) {
    font-size: 14px;
    font-weight: 400;
    color: rgb(142, 142, 142);
    line-height: 18px;
    text-align: center;
    margin-right: 0;
  }
`;
const ProfileDetailLi2 = styled.li`
  font-size: 16px;
  font-weight: 400;
  margin-right: 100px;
  list-style-type: none;
  @media only screen and (max-width: 735px) {
    font-size: 14px;
    font-weight: 400;
    color: rgb(142, 142, 142);
    line-height: 18px;
    text-align: center;
    margin-right: 0;
  }
`;
const HeaderWrap = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr;
  column-gap: 30px;
  @media only screen and (max-width: 735px) {
    display: flex;
    padding: 14px;
    column-gap: 0px;
  }
`;
const ProfilePic = styled.div`
  height: 160px;
  display: flex;
  justify-content: center;
  align-items: center;
  @media only screen and (max-width: 735px) {
    width: 77px;
    height: 77px;
    margin-right: 28px;
  }
`;
const ProfileImg = styled.img`
  width: 150px;
  height: 150px;
  border-radius: 1000px;
  border: 1px solid var(--ins-border-primary);
  @media only screen and (max-width: 735px) {
    width: 100%;
    height: 100%;
  }
`;
const ProfileH2 = styled.h2`
  font-size: 28px;
  font-weight: 300;
  @media only screen and (max-width: 735px) {
    display: inline-block;
    margin-bottom: 12px;
  }
`;
const ProfileIcon = styled.span`
  margin-left: 8px;
  @media only screen and (max-width: 735px) {
    display: inline-block;
  }
`;
const ProfileButtonWrap = styled.div`
  margin-left: 20px;
  @media only screen and (max-width: 735px) {
    display: block;
    margin-left: 0px;
  }
`;
const ProfileTitle = styled.div`
  display: flex;
  align-items: center;
  @media only screen and (max-width: 735px) {
    display: block;
  }
`;

const ProfileDescriptionH1 = styled.h1`
  font-weight: 600;
  line-height: 24px;
  @media only screen and (max-width: 735px) {
    line-height: 20px;
  }
`;
const ProfileDescriptionSpan = styled.span`
  font-weight: 400;
  line-height: 24px;
  @media only screen and (max-width: 735px) {
    line-height: 20px;
  }
`;
const ProfileDescriptionA = styled.a`
  color: var(--ins-content-blue);
`;
const ProfileDescriptions = styled.div`
  @media only screen and (max-width: 735px) {
    padding-left: 16px;
    padding-bottom: 21px;
    font-size: 14px;
    margin-bottom: 0px !important;
  }
`;
const ProfileRow = styled.div`
  margin-bottom: 20px;
`;

export function ProfileUser(props) {
  const {
    storyBorder,
    image,
    userName,
    profileIcon,
    id_post,
    id_user,
    content,
    countPost,
    countFollowee,
    countFollower,
    parentCallback
  } = props;
  let btnRef = useRef();
  //header xac thuc
  const headers = {
    "x-access-token": localStorage.getItem("token"),
  };
  // state debug
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  //handle cho following modal
  const [opening, setOpenIng] = React.useState(false);
  const handleOpenIng = () => setOpenIng(true);
  const handleCloseIng = () => setOpenIng(false);

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

  //handle cho follower modal
  const [opener, setOpenEr] = React.useState(false);
  const handleOpenEr = () => setOpenEr(true);
  const handleCloseEr = () => setOpenEr(false);

  //State cho fetch check follow
  const [checkfollow, setCheck] = useState(false);

  //State cho fetch get following va follower
  const [following, setIng] = useState([]);
  const [follower, setEr] = useState([]);
  // console.log("current user id: ", id_user);

  //State cho xu ly check following
  //let countlike = postdetail?.post?.countLike;

  // const [countLike, setCLike] = useState(null);
  // useEffect(() => {
  //   setCLike(1);
  // }, [countLike]);
  // const [isLike, setIsLike] = useState(1);
  // useEffect(() => {
  //   setIsLike(check);
  // }, [check]);
  // const [isLike2, setIsLike2] = useState(true);

  //xu ly fetch check follow
  useEffect(() => {
    fetch("http://localhost:8000/api/user/" + id_user, {
      method: "GET",
      headers: headers,
    })
      .then((res) => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setCheck(result.status);
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      );
  }, [checkfollow,id_user]);

  //xu ly fetch following
  useEffect(() => {
    fetch("http://localhost:8000/api/user/listfollowing/" + id_user, {
      headers,
    })
      .then((res) => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setIng(result);
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      );
  }, [checkfollow,id_user]);

  //Xu ly cho fetch get follower
  useEffect(() => {
    fetch("http://localhost:8000/api/user/listfollower/" + id_user, { headers })
      .then((res) => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setEr(result);
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      );
  }, [checkfollow,id_user]);
  // xu ly fetch button follow
  const HandleFollow = (e) => {
    console.log(e);
    //e.preventDefault();
    //setIsLike2((prevLike) => !prevLike);
    if (btnRef.current) {
      btnRef.current.setAttribute("disabled", "disabled");
    }
    fetch("http://localhost:8000/api/user/" + id_user, {
      method: "POST",
      headers: headers,
    })
      .then((res) => res.json())
      .then((data) => {
        
        setCheck(data.isFollowed);
        parentCallback();
      })
      .catch((err) => console.log("hey"));
    // if (isLike) setCLike(countLike - 1);
    // else setCLike(countLike + 1);
  };

  // get userId
  const saved = localStorage.getItem("info");
  const userData = JSON.parse(saved);
  const userId = userData?.user?.id_user;

  return (
    <Header>
      <HeaderWrap>
        <ProfilePic>
          <ProfileImg src={image} alt="profile-logo" />
        </ProfilePic>
        <div>
          <ProfileRow>
            <ProfileTitle>
              <ProfileH2>{userName}</ProfileH2>
              <ProfileIcon>
                <Icons.Verified />
              </ProfileIcon>
              <ProfileButtonWrap>
                {userId==id_user ? "" :checkfollow ? (
                  <Button primary onClick={HandleFollow}>
                    Followed
                  </Button>
                ) : (
                  <Button primary onClick={HandleFollow}>
                    Follow
                  </Button>
                )}
              </ProfileButtonWrap>
            </ProfileTitle>
          </ProfileRow>
          <DesktopOnly>
            <ProfileRow>
              <KeyNumbers
                countPost={countPost}
                countFollowee={countFollowee}
                countFollower={countFollower}
              />
            </ProfileRow>
            <ProfileRow>
              <ProfileDetailUl>
                <ProfileDetailLi2></ProfileDetailLi2>
                <ProfileDetailLi>
                  <Button
                    variant="text"
                    size="small"
                    sx={{
                      marginBottom: 0.2,
                    }}
                    onClick={handleOpenEr}
                  >
                    <BsFillEyeFill />
                  </Button>
                </ProfileDetailLi>
                <ProfileDetailLi>
                  <Button
                    variant="text"
                    size="small"
                    sx={{
                      marginBottom: 0.2,
                    }}
                    onClick={handleOpenIng}
                  >
                    <BsFillEyeFill />
                  </Button>
                </ProfileDetailLi>
              </ProfileDetailUl>
            </ProfileRow>
            {/* <ProfileDescriptions
            // class="row last"
            >
              <ProfileDescriptionH1>apple h1</ProfileDescriptionH1>
              <ProfileDescriptionSpan>
                Everyone has a story to tell.
                <br />
                Tag <ProfileDescriptionA>#ShotoniPhone</ProfileDescriptionA> to
                take part.
              </ProfileDescriptionSpan>
            </ProfileDescriptions> */}
          </DesktopOnly>
        </div>
      </HeaderWrap>
      <MobileOnly>
        <ProfileRow>
          {/* <ProfileDescriptions>
            <ProfileDescriptionH1>apple</ProfileDescriptionH1>
            <ProfileDescriptionSpan>
              Everyone has a story to tell 222222.
              <br />
              Tag <ProfileDescriptionA>#ShotoniPhone</ProfileDescriptionA> to
              take part.
            </ProfileDescriptionSpan>
          </ProfileDescriptions> */}
        </ProfileRow>
      </MobileOnly>
      {/*Modal popup following*/}
      <Modal
        open={opening}
        onClose={handleCloseIng}
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
                <ListSubheader>{`Following`}</ListSubheader>
                {following?.users?.map((user) => {
                  return (
                    <Profile
                      iconSize="medium"
                      storyBorder={true}
                      username={user.followee.name}
                      image={user.followee.image}
                      id_user={user.followee.id_user}
                    />
                  );
                })}
              </ul>
            </li>
          </List>
        </Box>
      </Modal>
      {/*Modal popup follower*/}
      <Modal
        open={opener}
        onClose={handleCloseEr}
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
                <ListSubheader>{`Follower`}</ListSubheader>
                {follower?.users?.map((user) => {
                  return (
                    <Profile
                      iconSize="medium"
                      storyBorder={true}
                      username={user.follower.name}
                      image={user.follower.image}
                      id_user={user.follower.id_user}
                    />
                  );
                })}
              </ul>
            </li>
          </List>
        </Box>
      </Modal>
    </Header>
  );
}
Profile.defaultProps = {
  profileImage: "../../images/profile-logo.jpg",
};
