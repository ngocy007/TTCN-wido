import "../styles/sidebar.scss";
import Sticky from "react-sticky-el";
import Profile from "./Profile";
import Suggestions from "./Suggestions";
import Footer from "./Footer";
import image from "../images/profile.jpg";
import React from "react";
import axios from "axios";
class Sidebar extends React.Component {
  // Constructor
  constructor(props) {
    super(props);

    this.state = {
      items: [],
      info: JSON.parse(localStorage.getItem("info")),
    };
  }
  componentDidMount(event) {
    axios
      .get(
        "http://localhost:8000/api/user/info/" + this.state.info.user.id_user,
        {
          headers: {
            "x-access-token": localStorage.getItem("token"),
          },
        }
      )
      .then((res) => {
        this.state.items = res.data;
        this.setState({});
      })
      .catch((error) => console.log(error));
  }

  render() {
    return (
      <div className="container">
        <Sticky topOffset={-80}>
          <div className="sidebar">
            <Profile
              username={this.state.items?.user?.name}
              caption=""
              urlText="Switch"
              iconSize="big"
              image={this.state.items?.user?.image}
              id_user={this.state.items?.user?.id_user}
            />
            <Suggestions />
            <Footer />
          </div>
        </Sticky>
        {/* {items.map((item) => (
          <ol key={item.id}>
            User_Name: {item.username}, Full_Name: {item.name}, User_Email:{" "}
            {item.email}
          </ol>
        ))} */}
      </div>
    );
  }
}
// function Sidebar() {
//   function componentDidMount() {
//     fetch("http://192.168.2.121:8000/api/user/me")
//       .then((res) => res.json())
//       .then((json) => {
//         this.setState({
//           items: json,
//           DataisLoaded: true,
//         });
//       });
//   }
//   componentDidMount();
//   return (
// <Sticky topOffset={-80}>
//   <div className="sidebar">
//     <Profile
//       username="aleks.popovic"
//       caption="Aleksandar Popović"
//       urlText="Switch"
//       iconSize="big"
//       image={image}
//     />
//     <Suggestions />
//     <Footer />
//   </div>
// </Sticky>
//   );
// }

export default Sidebar;
