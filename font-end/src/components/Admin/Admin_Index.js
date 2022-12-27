import React, { Component } from "react";
import "../../styles/navigation.scss";
import "../../styles/admin_nav.scss";
import { Link } from "react-router-dom";
import Dropdown from "react-bootstrap/Dropdown";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import axios from "axios";

class Admin_Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      user: JSON.parse(localStorage.getItem("info")),
    };
    this.handleLogout = this.handleLogout.bind(this);
  }
  handleLogout() {
    axios
      .get("http://localhost:8000/api/user/logout")
      .then(() => {
        window.location.assign("/");
        localStorage.removeItem("token");
        localStorage.removeItem("info");
      })
      .catch((error) => console.log(error));
  }
  render() {
    return (
      <div>
        <nav className="nav-admin">
          <div class="brand">
            <h2>Admin-Nhóm 1</h2>
          </div>
          <ul>
            <li>
              <Link to="/Admin">
                <i class="fa fa-home" aria-hidden="true"></i> Trang Chủ
              </Link>
            </li>
            <li id="dropdown">
              <div>
                <img
                  class="img-xs rounded-circle avata"
                  src={this.state.user.user.image}
                  alt="Profile"
                ></img>
                <NavDropdown
                  id="nav-dropdown"
                  title="trang cá nhân"
                  menuVariant="White"
                >
                  <NavDropdown.Item>
                    <Link to="/Admin/profile">Profile</Link>
                  </NavDropdown.Item>
                  <NavDropdown.Item onClick={() => this.handleLogout()}>
                    logout
                  </NavDropdown.Item>
                </NavDropdown>
              </div>
              {/* <Dropdown>
                <Dropdown.Toggle
                  variant="secondary"
                  id="nav-dropdown-dark-example"
                >
                  <img
                    class="img-xs rounded-circle avata"
                    src="../../images/gallery-1.jpg"
                    alt="Profile"
                  ></img>{" "}
                  Trang cá nhân
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item href="#/action-1">profile</Dropdown.Item>
                  <Dropdown.Item href="#/action-2">logout</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown> */}
            </li>
            <li>
              <Link to="">
                <i class="fa fa-telegram" aria-hidden="true"></i>Thông tin
              </Link>
            </li>
          </ul>
          <div className="navigation2">
            <div className="div-left">
              <Link to="/Admin/user">
                <i className="nav-text fa fa-user">Người dùng</i>
              </Link>
            </div>
            <div className="div-left">
              <Link to="/Admin/post">
                <i className="nav-text fa fa-book">Bài viết</i>
              </Link>
            </div>
          </div>
        </nav>
      </div>
    );
  }
}
export default Admin_Index;
