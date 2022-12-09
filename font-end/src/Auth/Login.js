import React, { Component } from "react";
import "./Login.scss";
import { Link } from "react-router-dom";
import axios, * as others from "axios";
import PropTypes from "prop-types";
class Login extends Component {
  static contextTypes = {
    router: PropTypes.object,
  };
  // eslint-disable-next-line no-useless-constructor
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      ishowpassword: false,
    };
  }
  handleonChangeEmail = (event) => {
    this.setState({
      email: event.target.value,
    });
  };
  handleonPass = (event) => {
    this.setState({
      password: event.target.value,
    });
  };
  handleLogin = (email, password) => {
    console.log("email: ", this.state.email, "password: ", this.state.password);
    console.log("all state", this.state);

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    axios
      .post("http://192.168.2.121:8000/api/user/login", {
        email: this.state.email,
        password: this.state.password,
        config,
      })
      .then(function (response) {
        console.log(response.status);
        //if (response.status === 200) {
        window.location.assign("/Home");
        //}
      })
      .catch(function (error) {
        console.log(error);
        alert("email hoặc mật khẩu không đúng");
      });
  };
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
            <div className="col-12 text-center text-login">ĐĂNG NHẬP</div>
            <div className="col-12 form-group">
              <lable>Tên đăng nhập:</lable>
              <br></br>
              <input
                className="form-control input-login"
                type="text"
                placeholder="email hoặc số điện thoại"
                value={this.state.email}
                onChange={(event) => this.handleonChangeEmail(event)}
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
            <div className="col-12">
              <button className="btn-login">
                <Link style={{ textDecoration: "none" }} to="/register">
                  Đăng Ký
                </Link>
              </button>
              <button
                className="btn-login"
                onClick={() => {
                  this.handleLogin();
                }}
              >
                Đăng Nhập
              </button>
            </div>
            <div className="col-12">
              <span className="forgot-password">Quên mật khẩu?</span>
            </div>
            <div className="col-12">
              <span>Đăng nhập với: </span>
              <Link style={{ textDecoration: "none" }} to="/login_github">
                <i className="fab fa-github"></i>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default Login;
