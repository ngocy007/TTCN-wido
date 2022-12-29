import React, { Component } from "react";
import axios, * as others from "axios";
import Box from "@mui/material/Box";
class User extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      id: "",
      name: "",
      email: "",
      gender: "",
      dob: "",
      image: "",
      content: "",
      post: "",
      follow: "",
      role: "",
      isshowdetail: false,
      isshowdelete: false,
    };
  }

  componentDidMount() {
    axios
      .get("http://localhost:8000/api/user")
      .then((res) => {
        const user = res.data;
        this.setState({ users: user.users });
      })
      .catch((error) => console.log(error));
    this.setState({});
  }
  // xem chi tiết user
  handleDetail = (item) => {
    const userId = item.id_user;
    this.state.id = userId;
    axios
      .get("http://localhost:8000/api/user/info/" + userId, {
        headers: {
          "x-access-token": localStorage.getItem("token"),
        },
      })
      .then((res) => {
        const user = res.data;
        console.log(user);
        this.state.name = user.user.name;
        this.state.email = user.user.email;
        this.state.dob = user.user.dob;
        this.state.gender = user.user.gender;
        this.state.post = user.user.Posts.length;
        this.state.image = user.user.image;
        this.state.content = user.user.content;
        this.state.role = user.user.role;
        this.setState({
          isshowdetail: !this.state.isshowdetail,
        });
      })
      .catch((error) => console.log(error));
    axios
      .get("http://localhost:8000/api/user/listfollower/" + userId, {
        headers: {
          "x-access-token": localStorage.getItem("token"),
        },
      })
      .then((res) => {
        const folow = res.data;
        this.state.follow = folow.users.length;
      })
      .catch((error) => console.log(error));
  };
  back() {
    this.setState({
      isshowdetail: !this.state.isshowdetail,
    });
  }

  // xóa user
  showBoxdelete(item, event) {
    const newsId = item.id_user;
    const newsname = item.name;
    this.state.id = newsId;
    this.state.name = newsname;
    console.log(this.state.id);
    switch (event) {
      case "isshowdelete":
        this.setState({
          isshowdelete: !this.state.isshowdelete,
        });
        break;
      case "hidedelete":
        this.setState({
          isshowdelete: !this.state.isshowdelete,
        });
        break;
    }
  }
  handleDelete() {
    const newsId = this.state.id;

    console.log(newsId);
    axios
      .delete("http://localhost:8000/api/admin/" + newsId, {
        headers: {
          "x-access-token": localStorage.getItem("token"),
        },
      })
      .then((res) => {
        this.setState((prevState) => ({
          isshowdelete: !this.state.isshowdelete,
        }));
        this.componentDidMount();
      })
      .catch((error) => console.log(error));
  }
  //cấp quyền
  ConfimRole() {
    const userId = this.state.id;
    axios
      .post(
        "http://localhost:8000/api/admin/grantPermission/" + userId,
        {},
        {
          headers: {
            "x-access-token": localStorage.getItem("token"),
          },
        }
      )
      .then((res) => {
        alert("thành công");
        const role = res.data;
        this.state.role = role.user.role;
        this.setState((prevState) => ({}));
      })
      .catch((error) => {
        alert(error.response.data.message);
      });
  }
  render() {
    const { isshowdetail, isshowdelete } = this.state;
    const checkuser = JSON.parse(localStorage.getItem("info"));
    const styledetail = {
      position: "fixed",
      top: "50%",
      left: "56%",
      transform: "translate(-50%, -50%)",
      width: 900,
      bgcolor: "background.paper",
      border: "2px solid #000",
      boxShadow: 24,
      p: 2,
    };
    const styledelete = {
      position: "fixed",
      top: "50%",
      left: "56%",
      transform: "translate(-50%, -50%)",
      width: 500,
      bgcolor: "background.paper",
      border: "2px solid #000",
      boxShadow: 24,
      p: 2,
    };
    return (
      <div>
        <section className="section2">
          <table className="table">
            <tr className="col-9">
              <td className="col-2 th">mã người dùng</td>
              <td className="col-2 th">Tên người dùng</td>
              <td className="col-2 th">email</td>
            </tr>
            {this.state.users.map((item) => (
              <tr key={item.id_user} className="col-9">
                <td className="col-2">{item.id_user}</td>
                <td className="col-2">{item.name}</td>
                <td className="col-2">{item.email}</td>
                <td className="col-1">
                  <button onClick={() => this.handleDetail(item)}>
                    <i class="fa fa-eye">chi tiết</i>
                  </button>
                </td>
                <td className="col-1">
                  <button
                    onClick={() => this.showBoxdelete(item, "isshowdelete")}
                  >
                    <i class="fa fa-trash">xóa</i>
                  </button>
                </td>
              </tr>
            ))}
          </table>
          {isshowdetail && (
            <Box sx={styledetail}>
              <div className="detail">
                <form className="form-admin">
                  <div className="img-profile">
                    <img
                      className="img-xs rounded-circle profile-admin"
                      src={this.state.image}
                    ></img>
                    <br></br>
                  </div>
                  <div>
                    <h3>Thông tin {this.state.name} </h3>
                    <table>
                      <tr className="col-9">
                        <td className="col-2 th">Email:</td>
                        <td className="col-2">{this.state.email}</td>
                      </tr>
                      <tr className="col-9">
                        <td className="col-2 th">Giới tính:</td>
                        <td className="col-2">{this.state.gender}</td>
                      </tr>
                      <tr className="col-9">
                        <td className="col-2 th">Ngày sinh:</td>
                        <td className="col-2">{this.state.dob}</td>
                      </tr>
                      <tr className="col-9">
                        <td className="col-2 th">Quyền :</td>
                        <td className="col-2">
                          {this.state.role === 2 ? "Admin" : "user"}
                        </td>
                      </tr>
                      <tr className="col-9">
                        <td className="col-2 th">số bài viết</td>
                        <td className="col-2">{this.state.post}</td>
                      </tr>
                      <tr className="col-9">
                        <td className="col-2 th">lượt theo dõi</td>
                        <td className="col-2">{this.state.post}</td>
                      </tr>
                      <tr className="col-9">
                        <td className="col-2 th">mô tả</td>
                        <td className="col-2">{this.state.content}</td>
                      </tr>
                    </table>
                  </div>
                  <div className=""></div>
                  <div className="clear"></div>
                </form>
              </div>

              <button className="btn-detail" onClick={() => this.back()}>
                trở về
              </button>
              {checkuser.user.id_user !== this.state.id ? (
                <button
                  className="btn-detail"
                  onClick={() => this.ConfimRole()}
                >
                  {this.state.role === 1 ? "Quyền Admin" : "Hạ Quyền"}
                </button>
              ) : (
                ""
              )}
            </Box>
          )}
          {isshowdelete && (
            <Box sx={styledelete}>
              <div className="detail">
                bạn xác nhận xóa người dùng {this.state.name} ?
              </div>

              <button
                className="btn-detail"
                onClick={() => this.showBoxdelete("", "hidedelete")}
              >
                no
              </button>
              <button
                className="btn-detail"
                onClick={() => this.handleDelete()}
              >
                yes
              </button>
            </Box>
          )}
        </section>
      </div>
    );
  }
}

export default User;
