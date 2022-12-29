import React from "react";
import "./Register.scss";
import axios, * as others from "axios";
import { Link } from "react-router-dom";
class Register extends React.Component {
  constructor() {
    super();
    this.state = {
      input: {},
      errors: {},
      ishowpassword: false,
      checkedmail: true,
      checkedcode: false,
      checkedFirt: true,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.showdiv = this.showdiv.bind(this);
    this.handleSubmitEmail = this.handleSubmitEmail.bind(this);
  }
  ishowpass = () => {
    this.setState({
      ishowpassword: !this.state.ishowpassword,
    });
  };
  handleChange(event) {
    let input = this.state.input;
    input[event.target.name] = event.target.value;
    this.setState({
      input,
    });
  }
  handleSubmit(event) {
    event.preventDefault();
    if (this.validate()) {
      console.log(this.state);
      let input = {};
      input["username"] = "";
      input["email"] = "";
      input["password"] = "";
      input["confirm_password"] = "";
      this.setState({ input: input });
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      axios
        .post("http://localhost:8000/api/user/register", {
          name: this.state.input.username,
          email: this.state.input.email,
          password: this.state.input.password,
          config,
        })
        .then(function (response) {
          alert("Đăng ký thành công");
          window.location.assign("/");
        })
        .catch(function (error) {});
    }
  }
  validateEmail() {
    let input = this.state.input;
    let errors = {};
    let isValid = true;
    if (!input["email"]) {
      isValid = false;
      errors["email"] = "hãy nhập email";
    }
    if (typeof input["email"] !== "undefined") {
      var pattern = new RegExp(
        /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i
      );

      if (!pattern.test(input["email"])) {
        isValid = false;
        errors["email"] = "email không hợp lệ.";
      }
    }
    this.setState({
      errors: errors,
    });
    return isValid;
  }
  handleSubmitEmail(event) {
    event.preventDefault();

    if (this.validateEmail()) {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      axios
        .post("http://localhost:8000/api/user/sendOTP/Create", {
          email: this.state.input.email,
          config,
        })
        .then(function (response) {
          alert(response.data.message);
        })
        .catch(function (error) {
          alert("email đã tồn tại");
        });
    }
  }
  async showdiv(event) {
    switch (event) {
      case "checkedcode":
        if (await this.validotp()) {
          this.setState({
            checkedmail: !this.state.checkedmail,
            checkedcode: !this.state.checkedcode,
          });
        }
        break;
      case "confim":
        this.setState({});
      default:
    }
  }
  async validotp() {
    let input = this.state.input;
    let errors = {};
    let isValid = true;
    if (!input["code"]) {
      isValid = false;
      errors["code"] = "hãy nhập mã xác nhận";
    }
    if (typeof input["code"] !== "undefined") {
      if (input["code"].length < 6 || input["code"].length > 6) {
        isValid = false;

        errors["code"] = "mã không hợp lệ";
      }
    }
    await axios
      .post("http://localhost:8000/api/user/isOTP", {
        email: this.state.input.email,
        otp: this.state.input.code,
      })
      .then(function (response) {})
      .catch(function (error) {
        isValid = false;
        errors["code"] = "mã không hợp lệ";
      });
    this.setState({
      errors: errors,
    });
    return isValid;
  }
  validate() {
    let input = this.state.input;
    let errors = {};
    let isValid = true;
    if (!input["username"]) {
      isValid = false;
      errors["username"] = "hãy nhập họ tên";
    }
    if (typeof input["username"] !== "undefined") {
      const re = /^\S*$/;
      if (input["username"].length < 6 || !re.test(input["username"])) {
        isValid = false;
        errors["username"] = "nhập không hợp lệ.";
      }
    }

    if (!input["password"]) {
      isValid = false;
      errors["password"] = "hãy nhập mật khẩu.";
    }
    if (!input["confirm_password"]) {
      isValid = false;
      errors["confirm_password"] = "hãy nhập lại mật khẩu.";
    }
    if (typeof input["password"] !== "undefined") {
      if (input["password"].length < 8) {
        isValid = false;

        errors["password"] = "mật khẩu ít nhất 8 kí tự.";
      }
    }

    if (
      typeof input["password"] !== "undefined" &&
      typeof input["confirm_password"] !== "undefined"
    ) {
      if (input["password"] !== input["confirm_password"]) {
        isValid = false;
        errors["password"] = "không khớp mật khẩu.";
      }
    }
    this.setState({
      errors: errors,
    });
    return isValid;
  }
  render() {
    const { checkedmail, checkedcode, checkedpass, checkedFirt } = this.state;
    return (
      <div className="register-background">
        <form onSubmit={this.handleSubmit} className="login-container">
          <div className="login-contain">
            <div className="col-12 text-center text-login">ĐĂNG KÝ</div>

            <div className="form-group col-12">
              {checkedmail && (
                <div>
                  <div>
                    <lable>Nhập email:</lable>
                    <br></br>
                    <input
                      className="form-control input-login"
                      type="text"
                      placeholder="email hoặc số điện thoại"
                      name="email"
                      id="email"
                      value={this.state.input.email}
                      onChange={this.handleChange}
                    />
                    <div className="text-danger err">
                      {this.state.errors.email}
                    </div>
                  </div>

                  <div className="col-12">
                    <button
                      className="btn-login"
                      onClick={this.handleSubmitEmail}
                    >
                      gửi yêu cầu
                    </button>
                  </div>
                  <label htmlFor="Code">nhập code:</label>
                  <input
                    type="text"
                    name="code"
                    value={this.state.input.code}
                    onChange={this.handleChange}
                    className="form-control input-login"
                    placeholder="nhập code"
                    id="code"
                  />
                  <div className="text-danger err">
                    {this.state.errors.code}
                  </div>
                  <button
                    className="btn-login"
                    onClick={() => this.showdiv("checkedcode")}
                  >
                    gửi
                  </button>
                  <button className="btn-login">
                    <Link to="/" style={{ color: "white " }}>
                      trở về
                    </Link>
                  </button>
                </div>
              )}
            </div>

            {checkedcode && (
              <div>
                <div className="form-group col-12">
                  <label htmlFor="username">Tên tài khoản:</label>
                  <input
                    type="text"
                    name="username"
                    value={this.state.input.username}
                    onChange={this.handleChange}
                    className="form-control input-login"
                    placeholder="nhập tên người dùng"
                    id="username"
                  />
                  <div className="text-danger err">
                    {this.state.errors.username}
                  </div>
                </div>

                <div className="form-group col-12">
                  <label htmlFor="password">Mật khẩu:</label>
                  <input
                    type={this.state.ishowpassword ? "text" : "password"}
                    name="password"
                    value={this.state.input.password}
                    onChange={this.handleChange}
                    className="form-control input-login"
                    placeholder="nhập mật khẩu"
                    id="password"
                  />
                  <div className="text-danger err">
                    {this.state.errors.password}
                  </div>
                </div>
                <div className="form-group col-12">
                  <label htmlFor="password">Xác nhận mật khẩu:</label>
                  <input
                    type={this.state.ishowpassword ? "text" : "password"}
                    name="confirm_password"
                    value={this.state.input.confirm_password}
                    onChange={this.handleChange}
                    className="form-control input-login"
                    placeholder="nhập lại mật khẩu "
                    id="confirm_password"
                  />
                  <div className="text-danger err">
                    {this.state.errors.confirm_password}
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
                  <div>
                    <input
                      type="submit"
                      value="Đăng ký"
                      className=" btn-login"
                    />
                    <button className="btn-login">
                      <Link
                        style={{ textDecoration: "none", color: "white" }}
                        to="/"
                      >
                        Đăng Nhập
                      </Link>
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </form>
      </div>
    );
  }
}
export default Register;
