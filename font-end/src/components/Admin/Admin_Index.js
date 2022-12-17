import React, { Component } from "react";
import "../../styles/navigation.scss";
import "../../styles/admin_nav.scss";
import { Link } from "react-router-dom";
class Admin_Index extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div>
        <nav>
          <div class="brand">
            <h2>Admin-Nhóm 1</h2>
          </div>
          <ul>
            <li>
              <Link to="/Admin">
                <i class="fa fa-home" aria-hidden="true"></i> Trang Chủ
              </Link>
            </li>
            <li>
              <Link to="/Admin/profile">
                <i class="fa fa-info" aria-hidden="true"></i> trang cá nhân
              </Link>
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
              <Link>
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
