import "../styles/sidebar.scss";
import Sticky from "react-sticky-el";
import Profile from "./Profile";
import Suggestions from "./Suggestions";
import Footer from "./Footer";
import image from "../images/profile.jpg";
import React from "react";
class Sidebar extends React.Component {
  // Constructor
  constructor(props) {
    super(props);

    this.state = {
      items: [],
      DataisLoaded: false,
    };
  }

  // ComponentDidMount is used to
  // execute the code
  componentDidMount() {
    fetch("http://192.168.2.121:8000/api/post").then((res) => res.json())
      .then((json) => {
        this.setState({
          items: json,
          DataisLoaded: true
      });
        console.log(json)
      
      });
  }
  render() {
    // const { DataisLoaded, items } = this.state;
    // if (!DataisLoaded)
    //   return (
    //     <div>
    //       <h1> Pleses wait some time.... </h1>{" "}
    //     </div>
    //   );

    return (
      <div className="container">
        <Sticky topOffset={-80}>
          <div className="sidebar">
            <Profile
              username="aleks.popovic"
              caption="Aleksandar Popović"
              urlText="Switch"
              iconSize="big"
              image={image}
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
