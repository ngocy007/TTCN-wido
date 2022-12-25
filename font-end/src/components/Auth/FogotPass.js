import React, { Component } from "react";
import "./Login.scss";
import { Link } from "react-router-dom";
import axios, * as others from "axios";

class ForgotPass extends Component {
  constructor(props) {
    super(props);
    this.state = {
      input: {},
      ishowpassword: false,
      checkedmail: true,
      checkedcode: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.showdiv = this.showdiv.bind(this);
  }

  handleChange(event) {
    let input = this.state.input;
    input[event.target.name] = event.target.value;
    this.setState({
      input,
    });
  }
  showdiv(event) {
    switch (event) {
      case "checkedpass":
        this.setState({
          checkedpass: !this.state.checkedpass,
          checkedcode: !this.state.checkedcode,
        });
        break;
      case "checkedcode":
        this.setState({
          checkedmail: !this.state.checkedmail,
          checkedcode: !this.state.checkedcode,
        });
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
                  name="emai"
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
                  <button
                    className="btn-login"
                    onClick={() => this.showdiv("confim")}
                  >
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