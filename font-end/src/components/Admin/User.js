import React, { Component } from "react";
import axios, * as others from "axios";
import Admin_Index from "./Admin_Index";

class User extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
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
  }

  handleDetail = (item) => {
    const userId = {
      id: item.id_user,
    };
    axios
      .post("http://localhost:8000/api/user/info/{id_uesr}", userId)
      .then((res) => {
        this.setState((prevState) => ({
          news: prevState.news.filter((el) => el.id !== item.id_user),
        }));
      })
      .catch((error) => console.log(error));
  };
  handleDelete = (item) => {
    const newsId = {
      id: item.id,
    };

    axios
      .post("", newsId)
      .then((res) => {
        this.setState((prevState) => ({
          news: prevState.news.filter((el) => el.id !== item.id),
        }));
      })
      .catch((error) => console.log(error));
  };
  render() {
    return (
      <div>
        <Admin_Index />
        <section className="section2">
          <table className="table">
            <tr className="col-9">
              <td className="col-2">id</td>
              <td className="col-2">name</td>
              <td className="col-2">email</td>
            </tr>
            {this.state.users.map((item) => (
              <tr key={item.id_user} className="col-9">
                <td className="col-2">{item.id_user}</td>
                <td className="col-2">{item.name}</td>
                <td className="col-2">{item.email}</td>
                <td className="col-1">
                  <button onClick={() => this.handleDetail(item)}>
                    chi tiết
                  </button>
                </td>
                <td className="col-1">
                  <button onClick={() => this.handleDelete(item)}>xóa</button>
                </td>
              </tr>
            ))}
          </table>
        </section>
      </div>
    );
  }
}

export default User;
