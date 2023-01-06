import React, { Component } from "react";
import "../../styles/navigation.scss";
import "../../styles/admin_nav.scss";
import { Link } from "react-router-dom";
import NavDropdown from "react-bootstrap/NavDropdown";
import axios from "axios";
import Thongke from "./Thongke";
import User from "./User";
import Profile from "./Adminprofile";
import Post from "./Post";
import Info from "./Info";

class Admin_Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: JSON.parse(localStorage.getItem("info")),
      img: "",
      isshowuser: false,
      isshowpost: false,
      isshowindex: true,
      isshowprofile: false,
      isshowinfo: false,
    };
    this.handleLogout = this.handleLogout.bind(this);
  }
  componentDidMount(event) {
    axios
      .get(
        "http://localhost:8000/api/user/info/" + this.state.user.user.id_user,
        {
          headers: {
            "x-access-token": localStorage.getItem("token"),
          },
        }
      )
      .then((res) => {
        const user = res.data;

        this.state.img = user.user.image;
        this.setState({
          img: this.state.img,
        });
      });
  }
  handleLogout() {
    axios.get("http://localhost:8000/api/user/logout").then(() => {
      window.location.assign("/");
      localStorage.removeItem("token");
      localStorage.removeItem("info");
      localStorage.removeItem("isadmin");
    });
  }
  showdiv(event) {
    switch (event) {
      case "isshowuser":
        this.setState({
          isshowuser: (this.state.isshowuser = true),
          isshowindex: (this.state.isshowindex = false),
          isshowpost: (this.state.isshowpost = false),
          isshowprofile: (this.state.isshowprofile = false),
        });
        break;
      case "isshowindex":
        this.setState({
          isshowuser: (this.state.isshowuser = false),
          isshowindex: (this.state.isshowindex = true),
          isshowpost: (this.state.isshowpost = false),
          isshowprofile: (this.state.isshowprofile = false),
          isshowinfo: (this.state.isshowinfo = false),
        });
        break;
      case "isshowprofile":
        this.setState({
          isshowuser: (this.state.isshowuser = false),
          isshowindex: (this.state.isshowindex = false),
          isshowpost: (this.state.isshowpost = false),
          isshowprofile: (this.state.isshowprofile = true),
          isshowinfo: (this.state.isshowinfo = false),
        });
        break;
      case "isshowpost":
        this.setState({
          isshowuser: (this.state.isshowuser = false),
          isshowindex: (this.state.isshowindex = false),
          isshowpost: (this.state.isshowpost = true),
          isshowprofile: (this.state.isshowprofile = false),
          isshowinfo: (this.state.isshowinfo = false),
        });
        break;
      case "isshowinfo":
        this.setState({
          isshowuser: (this.state.isshowuser = false),
          isshowindex: (this.state.isshowindex = false),
          isshowpost: (this.state.isshowpost = false),
          isshowprofile: (this.state.isshowprofile = false),
          isshowinfo: (this.state.isshowinfo = true),
        });
        break;
      default:
    }
  }
  render() {
    const { isshowindex, isshowpost, isshowuser, isshowprofile, isshowinfo } =
      this.state;
    return (
      <div>
        <nav className="nav-admin">
          <div class="brand">
            <h2>Admin-Nhóm 1</h2>
          </div>
          <ul>
            <li>
              <i
                class="fa fa-home nav-text-top"
                aria-hidden="true"
                onClick={() => this.showdiv("isshowindex")}
              >
                Trang Chủ
              </i>
            </li>
            <li id="dropdown">
              <div>
                <img
                  class="img-xs rounded-circle avata"
                  src={this.state.img}
                  alt="Profile"
                ></img>
                <NavDropdown
                  id="nav-dropdown"
                  title="trang cá nhân"
                  menuVariant="White"
                >
                  <NavDropdown.Item>
                    <i onClick={() => this.showdiv("isshowprofile")}>Profile</i>
                  </NavDropdown.Item>
                  <NavDropdown.Item onClick={() => this.handleLogout()}>
                    logout
                  </NavDropdown.Item>
                </NavDropdown>
              </div>
            </li>
            <li>
              <i
                class="fa fa-telegram nav-text-top"
                aria-hidden="true"
                onClick={() => this.showdiv("isshowinfo")}
              >
                Thông Tin
              </i>
            </li>
          </ul>
          <div className="navigation2">
            <div className="div-left">
              <i
                className="nav-text fa fa-user"
                onClick={() => this.showdiv("isshowuser")}
              >
                Người dùng
              </i>
            </div>
            <div className="div-left">
              <i
                className="nav-text fa fa-book"
                onClick={() => this.showdiv("isshowpost")}
              >
                Bài viết
              </i>
            </div>
          </div>
        </nav>
        {isshowindex && <Thongke />}
        {isshowuser && <User />}
        {isshowprofile && <Profile />}
        {isshowpost && <Post />}
        {isshowinfo && <Info />}
      </div>
    );
  }
}
export default Admin_Index;
