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

  render() {
    return (
      <div>
        <Admin_Index />
        <section className="section2">
          <table className="table">
            <tr className="col-12">
              <td className="col-6">id</td>
              <td className="col-6">name</td>
              <td className="col-6">email</td>
            </tr>
            {this.state.users.map((item) => (
              <tr key={item.id_user} className="col-12">
                <td className="col-6">{item.id_user}</td>
                <td className="col-6">{item.name}</td>
                <td className="col-6">{item.email}</td>
              </tr>
            ))}
          </table>
        </section>
      </div>
    );
  }
}

export default User;
