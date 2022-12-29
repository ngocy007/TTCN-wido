import React from "react";
import "./Login.scss";
import { Link } from "react-router-dom";
import axios, * as others from "axios";

class Login_github extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      ishowpassword: false,
    };
  }
  handleonChangeUname = (event) => {
    this.setState({
      username: event.target.value,
    });
  };
  handleonPass = (event) => {
    this.setState({
      password: event.target.value,
    });
  };
  //check tài khoản github
  async handleLogin() {
    const git = true;
    await axios
      .get("http://api.github.com/users", {})
      .then(function (response) {})
      .catch(function (error) {
        console.log(error);
        git = false;
        alert("tên đăng nhập hoặc mật khẩu không đúng");
      });
    return git;
  }
  //đăng kí vào database and login
  async register() {
    if (await this.handleLogin()) {
      await axios
        .post("http://localhost:8000/api/user/register", {
          name: this.state.username,
          email: this.state.username + "@gmail.com",
          password: this.state.password,
        })
        .then(function (response) {
          alert("thành công");
        })
        .catch(function (error) {});
      axios
        .post("http://localhost:8000/api/user/login", {
          email: this.state.username + "@gmail.com",
          password: this.state.password,
        })
        .then(function (response) {
          localStorage.setItem("token", response.data.token);
          localStorage.setItem("info", JSON.stringify(response.data));
          const check = JSON.parse(localStorage.getItem("info"));
          if (check.user.role === 2) {
            localStorage.setItem("isadmin", "true");
            window.location.assign("/Admin");
          } else {
            window.location.assign("/Home");
          }
        })
        .catch(function (error) {});
    }
  }
  ishowpass = () => {
    this.setState({
      ishowpassword: !this.state.ishowpassword,
    });
  };
  render() {
    return (
      <div className="login-background">
        <div className="login-container">
          <div className="login-contain">
            <i
              style={{ margin: "10px 40%" }}
              className="fab fa-github github"
            ></i>
            <div className="col-12 text-center text-login">
              ĐĂNG NHẬP VỚI GITHUB
            </div>
            <div className="col-12 form-group">
              <lable>Tên đăng nhập:</lable>
              <br></br>
              <input
                className="form-control input-login"
                type="text"
                placeholder="email hoặc số điện thoại"
                value={this.state.username}
                onChange={(event) => this.handleonChangeUname(event)}
              />
            </div>
            <div className="col-12 form-group">
              <lable>Mật Khẩu:</lable>
              <br></br>
              <input
                className="form-control input-login"
                type={this.state.ishowpassword ? "text" : "password"}
                placeholder="nhập mật khẩu"
                value={this.state.password}
                onChange={(event) => this.handleonPass(event)}
              />
            </div>
            <div>
              <input
                type="checkbox"
                id="checkbox"
                className="form-check-input"
                onClick={() => this.ishowpass()}
              />
              <span className="forgot-password">Hiện mật khẩu</span>
            </div>
            <div className="col-12" style={{ margin: "10px 25%" }}>
              <button
                className="btn-login"
                onClick={() => {
                  this.register();
                }}
              >
                Đăng Nhập
              </button>
            </div>
            <div className="col-12">
              <Link style={{ textDecoration: "none" }} to="/">
                Trở về
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default Login_github;
