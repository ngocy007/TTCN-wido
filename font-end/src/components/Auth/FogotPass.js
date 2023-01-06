import React, { Component } from "react";
import "./Login.scss";
import { Link } from "react-router-dom";
import axios, * as others from "axios";

class ForgotPass extends Component {
  constructor(props) {
    super(props);
    this.state = {
      input: {},
      errors: {},
      ishowpassword: false,
      checkedmail: true,
      checkedcode: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.showdiv = this.showdiv.bind(this);
    this.handelsubmit = this.handelsubmit.bind(this);
  }

  handleChange(event) {
    let input = this.state.input;
    input[event.target.name] = event.target.value;
    this.setState({
      input,
    });
    console.log(this.state.input.email);
  }
  //kiểm tra mail trong database và gửi mã
  async handelcheckmail() {
    let checkmail = false;

    await axios
      .post(
        "http://localhost:8000/api/user/sendOTP/ForgotPW",
        {
          email: this.state.input.email,
        },
        {}
      )
      .then(function (response) {
        checkmail = true;
      })
      .catch(function (error) {});
    return checkmail;
  }

  //kiểm tra mã otp
  async handelcheckcode() {
    let checkcode = false;

    await axios
      .post(
        "http://localhost:8000/api/user/isOTP",
        {
          email: this.state.input.email,
          otp: this.state.input.code,
        },
        {}
      )
      .then(function (response) {
        checkcode = true;
      })
      .catch(function (error) {});
    return checkcode;
  }
  //kiểm tra mật khẩu
  validate() {
    let input = this.state.input;
    let errors = {};
    let isValid = true;
    if (!input["newpassword"]) {
      isValid = false;
      errors["newpassword"] = "hãy nhập mật khẩu.";
    }
    if (!input["confimpassword"]) {
      isValid = false;
      errors["confimpassword"] = "hãy nhập lại mật khẩu.";
    }
    if (typeof input["newpassword"] !== "undefined") {
      if (input["newpassword"].length < 8) {
        isValid = false;

        errors["newpassword"] = "mật khẩu ít nhất 8 kí tự.";
      }
    }

    if (
      typeof input["newpassword"] !== "undefined" &&
      typeof input["confimpassword"] !== "undefined"
    ) {
      if (input["newpassword"] !== input["confimpassword"]) {
        isValid = false;
        errors["newpassword"] = "không khớp mật khẩu.";
      }
    }
    this.setState({
      errors: errors,
    });
    return isValid;
  }
  //đổi mật khẩu
  handelsubmit() {
    if (this.validate()) {
      axios
        .post(
          "http://localhost:8000/api/user/forgotPassword",
          {
            email: this.state.input.email,
            password: this.state.input.newpassword,
          },
          {}
        )
        .then(function (response) {
          alert("thành công");
          window.location.assign("/");
        })
        .catch(function (error) {});
    }
  }
  //hiệu ứng ẩn hiện
  async showdiv(event) {
    switch (event) {
      case "checkedpass":
        if (await this.handelcheckcode()) {
          this.setState({
            checkedpass: !this.state.checkedpass,
            checkedcode: !this.state.checkedcode,
          });
        } else {
          alert("mã không hợp lệ");
        }
        break;
      case "checkedcode":
        if (await this.handelcheckmail()) {
          this.setState({
            checkedmail: !this.state.checkedmail,
            checkedcode: !this.state.checkedcode,
          });
          alert("đã gửi mail");
        } else {
          alert("tài khoản không tồn tại");
        }
        break;
      case "confim":
        this.setState({});
      default:
    }
  }
  ishowpass = () => {
    this.setState({
      ishowpassword: !this.state.ishowpassword,
    });
  };
  render() {
    const { checkedmail, checkedcode, checkedpass } = this.state;
    return (
      <div className="login-background">
        <div className="login-container">
          <div className="login-contain">
            <div className="col-12 text-center text-login">QUÊN MẬT KHẨU</div>
            {checkedmail && (
              <div className="col-12 form-group">
                <lable>Email:</lable>
                <br></br>
                <input
                  className="form-control input-login"
                  type="text"
                  placeholder="email"
                  value={this.state.input.email}
                  onChange={this.handleChange}
                  name="email"
                  id="email"
                />
                <div className="col-12">
                  <button
                    className="btn-login"
                    onClick={() => this.showdiv("checkedcode")}
                  >
                    gửi yêu cầu
                  </button>
                </div>
              </div>
            )}

            {checkedcode && (
              <div className="col-12 form-group">
                <lable>mã xác nhận:</lable>
                <br></br>
                <input
                  className="form-control input-login"
                  type="text"
                  placeholder="mã xác nhận"
                  value={this.state.input.code}
                  onChange={this.handleChange}
                  name="code"
                  id="code"
                />
                <div className="col-12">
                  <button
                    className="btn-login"
                    onClick={() => this.showdiv("checkedpass")}
                  >
                    xác nhận
                  </button>
                </div>
              </div>
            )}
            {checkedpass && (
              <div>
                <div className="col-12 form-group">
                  <lable checked={this.state.checked}>mật khẩu mới:</lable>
                  <br></br>
                  <input
                    checked={this.state.checked}
                    className="form-control input-login"
                    type={this.state.ishowpassword ? "text" : "password"}
                    placeholder="mật khẩu mới"
                    value={this.state.input.newpassword}
                    onChange={this.handleChange}
                    name="newpassword"
                    id="newpassword"
                  />
                  <div className="text-danger err">
                    {this.state.errors.newpassword}
                  </div>
                </div>
                <div className="col-12 form-group">
                  <lable>nhập lại mật khẩu mới:</lable>
                  <br></br>
                  <input
                    className="form-control input-login"
                    type={this.state.ishowpassword ? "text" : "password"}
                    placeholder="nhập lại mật khẩu mới"
                    value={this.state.input.confimpassword}
                    onChange={this.handleChange}
                    name="confimpassword"
                    id="confimpassword"
                  />
                  <div className="text-danger err">
                    {this.state.errors.confimpassword}
                  </div>
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
                  <button className="btn-login" onClick={this.handelsubmit}>
                    đổi mật khẩu
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}
export default ForgotPass;
