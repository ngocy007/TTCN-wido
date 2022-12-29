import React, { Component } from "react";
import axios from "axios";
class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: JSON.parse(localStorage.getItem("info")),
      name: "",
      email: "",
      gender: "",
      dob: "",
      image: "",
      content: "",
      input: "",
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
        const user = res.data;

        this.state.name = user.user.name;
        this.state.email = user.user.email;
        this.state.gender = user.user.gender;
        this.state.dob = user.user.dob;
        this.state.image = user.user.image;
        this.state.content = user.user.content;
        this.setState({});
      });
  }
  async uploadImage(e) {
    console.log(e.target.files);
    const file = e.target.files[0];
    const base64 = await this.convertBase64(file);
  }
  convertBase64(file) {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  }
  render() {
    return (
      <div>
        <section className="section2">
          <form className="form-admin detail">
            <div className="img-profile">
              <img
                className="img-xs rounded-circle profile-admin"
                src={this.state.image}
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
            <div>
              <h3>Thông tin cá nhân</h3>
              <table>
                <tr>
                  <td>Username:</td>
                  <td>{this.state.name}</td>
                </tr>
                <tr>
                  <td>Email:</td>
                  <td>{this.state.email}</td>
                </tr>
                <tr>
                  <td>Giới tính:</td>
                  <td>{this.state.gender}</td>
                </tr>
                <tr>
                  <td>Ngày sinh:</td>
                  <td>{this.state.dob}</td>
                </tr>
                <tr>
                  <td>Mô Tả</td>
                  <td>{this.state.content}</td>
                </tr>
              </table>
            </div>
            <div className=""></div>
            <div className="clear"></div>
          </form>
        </section>
      </div>
    );
  }
}
export default Profile;
