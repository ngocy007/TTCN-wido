import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./components/App";
import Login from "./components/Auth/Login";
import ForgotPass from "./components/Auth/FogotPass";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Register from "./components/Auth/Register";
import Github from "./components/Auth/Login_github";
import Thongke from "./components/Admin/Thongke";
import Profiles from "./components/Admin/Adminprofile";
import UserAdmin from "./components/Admin/User";
import UserProfile from "./components/Userprofile";
import PostAdmin from "./components/Admin/Post";

const login = ReactDOM.createRoot(document.getElementById("login"));
let headers = new Headers();

headers.append("Content-Type", "application/json");
headers.append("Accept", "application/json");

headers.append("Access-Control-Allow-Origin", "*");
headers.append("Access-Control-Allow-Credentials", "true");

headers.append("GET", "POST", "OPTIONS");
login.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login_github" element={<Github />} />
        <Route path="/fogotpass" element={<ForgotPass />} />
        <Route path="/Home" element={<App />} />
        <Route path="/Admin" element={<Thongke />} />
        <Route path="/Admin/profile" element={<Profiles />} />
        <Route path="/user" element={<UserProfile />} />
        <Route path="/Admin/user" element={<UserAdmin />} />
        <Route path="/Admin/post" element={<PostAdmin />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
reportWebVitals();
