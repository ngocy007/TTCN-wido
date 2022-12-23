import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Admin_Index from "./Admin_Index";

// import "./Profile.css";

const Profiles = ({ history }) => {
  const { user, loading, isAuthenticated } = useSelector((state) => state.user);

  useEffect(() => {
    if (isAuthenticated === false) {
      history.push("/login");
    }
  }, [history, isAuthenticated]);

  return (
    <div>
      <Admin_Index />
      <div className="profile">
        <div className="profileContainer">
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
            }}
          >
            <img
              src={user.avatar.url}
              alt={user.name}
              className="profile__img"
            />
            <Link to="/me/update/info" className="edit__profile">
              Chỉnh sửa
            </Link>
          </div>
        </div>
        <div className="information">
          <div className="middle">
            <div className="info">
              <h4
                style={{
                  padding: "0px 5px",
                }}
              >
                Tên:
              </h4>
              <p>{user.name}</p>
            </div>
            <div className="info">
              <h4
                style={{
                  padding: "0px 5px",
                }}
              >
                Email:
              </h4>
              <p>{user.email}</p>
            </div>
            <div className="info">
              <h4
                style={{
                  padding: "0px 5px",
                }}
              >
                Tham gia ngày:
              </h4>
              <p>
                {String(user.createdAt)
                  .substr(0, 10)
                  .split("-")
                  .reverse()
                  .join("-")}
              </p>
            </div>

            <div className="change__info">
              <Link to="/me/update" className="settings">
                Đổi mật khẩu
              </Link>
            </div>
          </div>
        </div>
        fghjk
      </div>
    </div>
  );
};

export default Profiles;
