import React, { Component } from "react";
import axios from "axios";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
class Thongke extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: "",
      comment: "",
      post: "",
      mess: "",
      data: [
        { name: "Người dùng", value: "" },
        { name: "bài viết", value: "" },
        { name: "Bình luận", value: "" },
        { name: "Tin Nhắn", value: "" },
      ],
    };
  }
  componentDidMount(event) {
    axios
      .get("http://localhost:8000/api/admin/statistic", {
        headers: {
          "x-access-token": localStorage.getItem("token"),
        },
      })
      .then((res) => {
        const thongke = res.data;
        this.state.user = thongke.statistic.sum_user;
        this.state.post = thongke.statistic.sum_post;
        this.state.comment = thongke.statistic.sum_comment;
        this.state.mess = thongke.statistic.sum_mess;
        this.setState({
          data: [
            { name: "Người dùng", value: this.state.user },
            { name: "bài viết", value: this.state.post },
            { name: "Bình luận", value: this.state.comment },
            { name: "Tin Nhắn", value: this.state.mess },
          ],
        });
      });
  }
  render() {
    const { data } = this.state;
    return (
      <div>
        <section className="section2">
          <div>
            <div className="thongke-contain">
              <h3>số người dùng</h3>
              <p className="text-thongke">{this.state.user}</p>
            </div>
            <div className="thongke-contain">
              <h3>số lượng bài viết</h3>
              <p className="text-thongke">{this.state.post}</p>
            </div>
            <div className="thongke-contain">
              <h3>số lượng bình luận</h3>
              <p className="text-thongke">{this.state.comment}</p>
            </div>
            <div className="thongke-contain">
              <h3>số lượng tin nhắn</h3>
              <p className="text-thongke">{this.state.mess}</p>
            </div>
          </div>
          <div className="Adminchart">
            <ResponsiveContainer className="chart" height={300}>
              <LineChart
                width={600}
                height={400}
                data={data}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <XAxis dataKey="name" />
                <YAxis />
                <CartesianGrid strokeDasharray="3 3" />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="value" stroke="#82ca9d" />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="clear"></div>
        </section>
      </div>
    );
  }
}
export default Thongke;
