import React, { Component } from "react";
import axios, * as others from "axios";

class Post extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      limit: "",
    };
  }

  async componentDidMount() {
    await axios
      .get("http://localhost:8000/api/admin/statistic", {
        headers: {
          "x-access-token": localStorage.getItem("token"),
        },
      })
      .then((res) => {
        const sum_post = res.data;
        this.state.limit = sum_post.statistic.sum_post;
      });
    axios
      .get(
        "http://localhost:8000/api/post/home?_limit=" +
          this.state.limit +
          "&_page=0",
        {
          headers: {
            "x-access-token": localStorage.getItem("token"),
          },
        }
      )
      .then((res) => {
        const post = res.data;
        this.setState({ posts: post.posts });
      });
  }
  //xóa bài viết
  handleDelete = (item) => {
    const newsId = item.id_post;

    axios
      .delete("http://localhost:8000/api/post/" + newsId, {
        headers: {
          "x-access-token": localStorage.getItem("token"),
        },
      })
      .then((res) => {
        this.setState((prevState) => ({
          posts: prevState.posts.filter((el) => el.id !== item.id_post),
        }));
        this.componentDidMount();
      });
  };
  render() {
    return (
      <div>
        <section className="section2">
          <table className="table">
            <tr className="col-9">
              <td className="col-2">id</td>
              <td className="col-2">nội dung</td>
              <td className="col-2">ngày đăng</td>
              <td className="col-2">người đăng</td>
            </tr>
            {this.state.posts.map((item) => (
              <tr key={item.id_post} className="col-9">
                <td className="col-2">{item.id_post}</td>
                <td className="col-2 content">{item.content}</td>
                <td className="col-2">{item.createdAt}</td>
                <td className="col-2">{item.User.name}</td>
                <td className="col-1">
                  <button onClick={() => this.handleDetail(item)}>
                    chi tiết
                  </button>
                </td>
                <td className="col-1">
                  <button onClick={() => this.handleDelete(item)}>
                    <i class="fa fa-trash">xóa</i>
                  </button>
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
