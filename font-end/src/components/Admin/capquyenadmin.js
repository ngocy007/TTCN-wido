import React, { Component } from "react";

import axios from "axios";

function ConfimRole() {
  const userId = this.state.id;
  console.log(userId);
  const config = console.log(localStorage.getItem("token"));
  axios
    .post("http://localhost:8000/api/admin/grantPermission/" + userId, {
      headers: {
        "x-access-token": config,
      },
    })
    .then((res) => {
      alert("thành công");
      this.setState((prevState) => ({}));
    })
    .catch((error) => console.log(error));
}
export default ConfimRole;
