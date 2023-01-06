import React, { Component } from "react";
import axios from "axios";
class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: JSON.parse(localStorage.getItem("info")),
      input: [],
      isshowupdate: false,
      isshowcontent: true,
      newinput: [],
    };
  }
  componentDidMount(event) {
    axios
      .get(
        "http://localhost:8000/api/user/info/" + this.state.user.user.id_user,
        {
          headers: {
            "x-access-token": localStorage.getItem("token"),
          },
        }
      )
      .then((res) => {
        const inputs = res.data;
        this.setState({ input: inputs.user });
      });
  }
  //update avata
  async uploadImage(e) {
    const file = e.target.files[0];
    console.log(file);

    let formdata = new FormData();
    formdata.append("image", file);

    let bodyContent = formdata;

    let reqOptions = {
      url: "http://localhost:8000/api/user/update",
      method: "PUT",
      headers: { "x-access-token": localStorage.getItem("token") },
      data: bodyContent,
    };

    await axios.request(reqOptions);
    this.componentDidMount();
  }
  handlechange(event) {
    event.preventDefault();
    let inputs = this.state.input;
    inputs[event.target.name] = event.target.value;
    this.setState({ inputs });
    console.log(inputs);
  }
  //update user
  handleupdate() {
    let formdata = new FormData();
    formdata.append("name", this.state.input.name);
    formdata.append("dob", this.state.input.dob);
    formdata.append("content", this.state.input.content);
    console.log(formdata);
    axios
      .put("http://localhost:8000/api/user/update", formdata, {
        headers: {
          "x-access-token": localStorage.getItem("token"),
        },
      })
      .then((res) => {
        this.setState({
          isshowcontent: !this.state.isshowcontent,
          isshowupdate: !this.state.isshowupdate,
        });
        this.componentDidMount();
      });
  }
  //an hien chinh sua
  showdiv(event, e) {
    switch (event) {
      case "ishowupdate":
        this.setState({
          isshowcontent: !this.state.isshowcontent,
          isshowupdate: !this.state.isshowupdate,
        });
        break;
      case "hideupdate":
        break;
    }
  }
  render() {
    const { isshowcontent, isshowupdate } = this.state;
    return (
      <div>
        <section className="section2">
          <form className="form-admin detail">
            <div className="img-profile">
              <img
                className="img-xs rounded-circle profile-admin"
                src={this.state.input.image}
              ></img>
              <br></br>
              <div>
                <input
                  type="file"
                  name="file"
                  className="btn-adprofile"
                  onChange={(e) => this.uploadImage(e)}
                ></input>
              </div>
            </div>
            {isshowcontent && (
              <div>
                <div>
                  <h3>Thông tin cá nhân</h3>
                  <table>
                    <tr>
                      <td>Username:</td>
                      <td>{this.state.input.name}</td>
                    </tr>
                    <tr>
                      <td>Email:</td>
                      <td>{this.state.input.email}</td>
                    </tr>
                    <tr>
                      <td>Giới tính:</td>
                      <td>{this.state.input.gender}</td>
                    </tr>
                    <tr>
                      <td>Ngày sinh:</td>
                      <td>{this.state.input.dob}</td>
                    </tr>
                    <tr>
                      <td>Mô Tả</td>
                      <td>{this.state.input.content}</td>
                    </tr>
                  </table>
                </div>
                <div className="">
                  <button onClick={() => this.showdiv("ishowupdate")}>
                    chỉnh sửa
                  </button>
                </div>
              </div>
            )}
            {isshowupdate && (
              <div>
                <div>
                  <h3>chỉnh sửa Thông tin cá nhân</h3>
                  <table>
                    <tr>
                      <td>Username:</td>
                      <td>
                        <input
                          type="text"
                          name="name"
                          onChange={(event) => this.handlechange(event)}
                          value={this.state.input.name}
                        ></input>
                      </td>
                    </tr>
                    <tr>
                      <td>Email:</td>
                      <td>
                        <input
                          type="text"
                          name="email"
                          onChange={(event) => this.handlechange(event)}
                          value={this.state.input.email}
                        ></input>
                      </td>
                    </tr>
                    <tr>
                      <td>Ngày sinh:</td>
                      <td>
                        <input
                          type="date"
                          name="dob"
                          onChange={(event) => this.handlechange(event)}
                          value={this.state.input.dob}
                        ></input>
                      </td>
                    </tr>
                    <tr>
                      <td>Mô Tả</td>
                      <td>
                        <input
                          type="text"
                          name="content"
                          onChange={(event) => this.handlechange(event)}
                          value={this.state.input.content}
                        ></input>
                      </td>
                    </tr>
                  </table>
                </div>
                <div className="">
                  <button onClick={() => this.handleupdate()}>xác nhận</button>
                </div>
              </div>
            )}
            <div className="clear"></div>
          </form>
        </section>
      </div>
    );
  }
}
export default Profile;
