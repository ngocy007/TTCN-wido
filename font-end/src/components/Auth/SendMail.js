import React, { Component } from "react";
import "./Login.scss";
import { Link } from "react-router-dom";
import axios, * as others from "axios";
//import PropTypes from "prop-types";
class Code extends Component {
  // static contextTypes = {
  //   router: PropTypes.object,
  // };
  // eslint-disable-next-line no-useless-constructor
  constructor(props) {
    super(props);
    this.state = {
      input: {},
      errors: {},
    };
    this.handleChangeEmail = this.handleChangeEmail.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChangeEmail(event) {
    let input = this.state.input;
    input[event.target.name] = event.target.value;
    this.setState({
      input,
    });
  }
  handleSubmit(event) {
    event.preventDefault();

    if (this.validateEmail()) {
      console.log("email: ", this.state.input.email);
      console.log("all state", this.state);

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
          console.log(response.status);
          if (response.status === 200) {
            //console.log(response.data.token);
            alert("thành công");
            //return response.json();
          }
        })
        .catch(function (error) {
          console.log(error);
          alert("email  không đúng");
        });
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
  render() {
    return (
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
            onChange={this.handleChangeEmail}
          />
          <div className="text-danger err">{this.state.errors.email}</div>
        </div>

        <div className="col-12">
          <button className="btn-login" onClick={this.handleSubmit}>
            gửi yêu cầu
          </button>
        </div>
      </div>
    );
  }
}
export default Code;
