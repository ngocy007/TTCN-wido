import React, { Component } from "react";
import Admin_Index from "./Admin_Index";
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
      data: [
        { name: "Người dùng", uv: 5000 },
        { name: "bài viết", uv: 3000 },
        { name: "Bình luận", uv: 2000 },
        { name: "Tin Nhắn", uv: 2780 },
      ],
    };
  }
  render() {
    const { data } = this.state;
    return (
      <div>
        <Admin_Index />
        <section className="section2">
          <div>
            <div className="thongke-contain">
              <h3>số lượng người dùng</h3>
              <p className="text-thongke">{5000}</p>
            </div>
            <div className="thongke-contain">
              <h3>số lượng bài viết</h3>
              <p className="text-thongke"></p>
            </div>
            <div className="thongke-contain">
              <h3>số lượng bình luận</h3>
              <p className="text-thongke"></p>
            </div>
            <div className="thongke-contain">
              <h3>số lượng tin nhắn</h3>
              <p className="text-thongke"></p>
            </div>
          </div>
          <div className="Adminchart">
            <ResponsiveContainer className="chart" height={300}>
              <LineChart
                width={600}
                height={300}
                data={data}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <XAxis dataKey="name" />
                <YAxis />
                <CartesianGrid strokeDasharray="3 3" />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
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
