import React, { Component } from "react";
import axios, * as others from "axios";
import Admin_Index from "./Admin_Index";

class Post extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
    };
  }

  componentDidMount() {
    axios
      .get("http://localhost:8000/api/post")
      .then((res) => {
        const post = res.data;
        this.setState({ posts: post.posts });
      })
      .catch((error) => console.log(error));
  }
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
              <td className="col-2">nội dung</td>
              <td className="col-2">ngày đăng</td>
            </tr>
            {this.state.posts.map((item) => (
              <tr key={item.id_post} className="col-9">
                <td className="col-2">{item.id_post}</td>
                <td className="col-2 content">{item.content}</td>
                <td className="col-2">{item.created_At}</td>
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

export default Post;
