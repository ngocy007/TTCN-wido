import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./components/App";
import Login from "./components/Auth/Login";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Register from "./components/Auth/Register";
import Github from "./components/Auth/Login_github";
import Thongke from "./components/Admin/Thongke";
import Profiles from "./components/Admin/profile";
import UserAdmin from "./components/Admin/User";
import UserProfile from "./components/Userprofile";

const login = ReactDOM.createRoot(document.getElementById("login"));
let headers = new Headers();

headers.append("Content-Type", "application/json");
headers.append("Accept", "application/json");

headers.append(
  "Access-Control-Allow-Origin",
  "http://192.168.2.121:8000/api/user/login"
);
headers.append("Access-Control-Allow-Credentials", "true");

headers.append("GET", "POST", "OPTIONS");
login.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login_github" element={<Github />} />
        <Route path="/Home" element={<App />} />
        <Route path="/Admin" element={<Thongke />} />
        <Route path="/Admin/profile" element={<Profiles />} />
        <Route path="/user" element={<UserProfile />} />
        <Route path="/Admin/user" element={<UserAdmin />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
reportWebVitals();
