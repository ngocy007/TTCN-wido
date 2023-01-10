import React, { Component } from "react";
import Kiet from "../../images/kiet.jpg";
import Tho from "../../images/tho.JPG";
import Y from "../../images/y.jpg";
import Viet from "../../images/viet.jpg";
class Info extends Component {
  render() {
    return (
      <section className="section2">
        <div>
          <h2>Thông tin Nhóm</h2>
          <div className="infodiv1">
            <p>
              Website mạng xã hội là một trang web hướng tới sự tiện lợi giao
              tiếp thông minh giữa người dùng thông qua internet. ở đây chúng
              tôi cung cấp môi trường để các người dùng có thể thoải mái tương
              tác với nhau, chia sẽ những khoảnh khắc đặc biệt thông qua website
              của chúng tôi.
            </p>
            <p>
              website sẽ cớ các chức năng cơ bản như xem bài viết, bình luận bài
              viết, theo dõi người dùng,....
            </p>
            <p>
              Nhóm được lập vào tháng 12/2022 với mục đích là hoàn thành một
              website mạng xã hội đưa vào sử dụng và có thêm kiến thức cũng như
              kinh nghiệm về văn hóa công ty thực tập và bổ sung kiến thức học
              tập Các thành viên đến từ trường đại học nha trang và gồm 4 thành
              viên
            </p>
          </div>
          <div className="infodiv2">
            <table>
              <tr className="col-9 th">
                <td className="col-2">Họ tên</td>
                <td className="col-2">Ảnh</td>
              </tr>
              <tr className="col-9">
                <td className="col-2">Cao hào kiệt</td>
                <td className="col-2">
                  <img className="infoava" src={Kiet} />
                </td>
              </tr>
              <tr className="col-9">
                <td className="col-2">Nguyễn Ngọc Ý</td>
                <td className="col-2">
                  <img className="infoava" src={Y} />
                </td>
              </tr>
              <tr className="col-9">
                <td className="col-2">Nguyễn Phan Hữu Thọ</td>
                <td className="col-2">
                  <img className="infoava" src={Tho} />
                </td>
              </tr>
              <tr className="col-9">
                <td className="col-2">Nguyễn Huỳnh Hoàng Việt</td>
                <td className="col-2">
                  <img className="infoava" src={Viet} />
                </td>
              </tr>
            </table>
          </div>
        </div>
      </section>
    );
  }
}
export default Info;
