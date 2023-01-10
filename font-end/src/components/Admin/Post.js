import React, { Component } from "react";
import axios, * as others from "axios";
import Box from "@mui/material/Box";
import { Zoom } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";

class Post extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      postdetail: [],
      limit: "",
      isshowdelete: false,
      isshowdetail: false,
      id: "",
      name: "",
    };
  }
  //show danh sách các bài viết dạng bảng
  async componentDidMount() {
    //lấy tổng bài viết
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
    //lấy danh sách bài viết
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
  showBoxdelete(item, event) {
    switch (event) {
      case "isshowdelete":
        this.setState({
          isshowdelete: !this.state.isshowdelete,
        });
        this.state.name = item.User.name;
        this.state.id = item.id_post;
        break;
      case "hidedelete":
        this.setState({
          isshowdelete: !this.state.isshowdelete,
        });
        break;
    }
  }
  //chi iết bài viết
  handleDetail(item) {
    const newsId = item.id_post;
    this.state.id = newsId;
    axios
      .get("http://localhost:8000/api/post/" + newsId, {
        headers: {
          "x-access-token": localStorage.getItem("token"),
        },
      })
      .then((res) => {
        this.setState({
          postdetail: res.data.post,
          isshowdetail: !this.state.isshowdetail,
        });
        console.log(this.state.postdetail);
      });
  }
  back() {
    this.setState({
      isshowdetail: !this.state.isshowdetail,
    });
  }
  handleDelete(item) {
    const newsId = this.state.id;
    axios
      .delete("http://localhost:8000/api/post/" + newsId, {
        headers: {
          "x-access-token": localStorage.getItem("token"),
        },
      })
      .then((res) => {
        this.setState((prevState) => ({
          isshowdelete: !this.state.isshowdelete,
        }));
        this.componentDidMount();
      });
  }
  render() {
    const { isshowdetail, isshowdelete } = this.state;
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
              <td className="col-2 th">Mã bài viết</td>
              <td className="col-2 th">nội dung</td>
              <td className="col-2 th">ngày đăng</td>
              <td className="col-2 th">người đăng</td>
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
                    <Zoom scale={0.4}>
                      {this.state.postdetail.Photos.map((each, index) => (
                        <img
                          className="Fade-admin"
                          key={index}
                          style={{ width: "100%" }}
                          src={each.url}
                        />
                      ))}
                    </Zoom>
                    <br></br>
                  </div>
                  <div>
                    <h3>Thông tin {this.state.name} </h3>
                    <table>
                      <tr className="col-9">
                        <td className="col-2 th">Nội dung:</td>
                        <td className="col-2">
                          {this.state.postdetail.content}
                        </td>
                      </tr>
                      <tr className="col-9">
                        <td className="col-2 th">chủ bài viết:</td>
                        <td className="col-2">
                          {this.state.postdetail.User.name}
                        </td>
                      </tr>
                      <tr className="col-9">
                        <td className="col-2 th">Ngày đăng:</td>
                        <td className="col-2">
                          {this.state.postdetail.createdAt}
                        </td>
                      </tr>
                      <tr className="col-9">
                        <td className="col-2 th">Cập nhật cuối:</td>
                        <td className="col-2">
                          {this.state.postdetail.updatedAt}
                        </td>
                      </tr>
                      <tr className="col-9">
                        <td className="col-2 th">Lượt thích</td>
                        <td className="col-2">
                          {this.state.postdetail.countLike}
                        </td>
                      </tr>
                      <tr className="col-9">
                        <td className="col-2 th">Lượt bình luận</td>
                        <td className="col-2">
                          {this.state.postdetail.Comments.length}
                        </td>
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
            </Box>
          )}
          {isshowdelete && (
            <Box sx={styledelete}>
              <div className="detail">
                bạn xác nhận xóa bài viết của người dùng {this.state.name} ?
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

export default Post;
