import "../styles/navigation.scss";
import Menu from "./Menu";
import logo from "../images/instagramLogo.png";
//import searchIcon from "../images/searchIcon.png";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { TextField } from "@mui/material";
import Box from "@mui/material/Box";
import Popper from "@mui/material/Popper";
import Profile from "./Profile";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListSubheader from "@mui/material/ListSubheader";
import Button from "@mui/material/Button";
import SearchIcon from '@mui/icons-material/Search';

function Navigation(props) {
  const { input } = props;
  const [text, setText] = useState("");
  const [users, setUser] = useState([]);
  //state pop over
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClickClose = (event) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const openPop = Boolean(anchorEl);
  const id = openPop ? "simple-popper" : undefined;
  //
  const handleChangeInput = (event) => {
    setAnchorEl(event.currentTarget);
    setText(event.target.value);
    if (event.target.value == "") setAnchorEl(anchorEl ? null : event.currentTarget);
    axios
      .get("http://localhost:8000/api/user/search?q=" + text, {
        headers: {
          "x-access-token": localStorage.getItem("token"),
        },
      })
      .then((res) => {
        setUser(res.data.users);
        console.log(users);
        console.log(typeof users);
      });
  };
  const de = 1;
  return (
    <div className="navigation">
      <div className="container">
        <img className="logo" src={logo} alt="instagram logo" />
        <div className="search">
          <input
            aria-describedby={id}
            onChange={handleChangeInput}
            type="text"
            value={text}
            style={{ width: "100%" }}
          />
          <SearchIcon></SearchIcon>
          
          <Popper
            id={id}
            open={openPop}
            anchorEl={anchorEl}
            className="search"
            sx={{ zIndex: 3, width: "275px" }}
          >
            <Box sx={{ border: 1, p: 1, bgcolor: "background.paper" ,marginLeft:"30px",marginTop:"3px"}}>
              {Object.keys(users).length === 0 ? (
                <Button onClick={handleClickClose} size="small">
                  Không có kết quả giống
                </Button>
              ) : (
                <List
                  sx={{
                    width: "100%",
                    maxWidth: 360,
                    bgcolor: "background.paper",
                    position: "relative",
                    overflow: "auto",
                    maxHeight: 300,
                    "& ul": { padding: 0 },
                    overflowX:"hidden"
                  }}
                  subheader={<li />}
                >
                  <li key={`likedby`}>
                    <ul>
                      {users?.map((user) => {
                        return (
                          <div style={{ display: "flex" }}>
                            <Profile
                              iconSize="medium"
                              storyBorder={true}
                              username={user.name}
                              image={user.image}
                              id_user={user.id_user}
                            />
                          </div>
                        );
                      })}
                    </ul>
                  </li>
                </List>
              )}
            </Box>
          </Popper>
        </div>
        <Menu />
      </div>
    </div>
  );
}

export default Navigation;
