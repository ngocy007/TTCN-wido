import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./components/App";
import Login from "./Auth/Login";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Register from "./Auth/Register";
import Github from "./Auth/Login_github";
import AdminIndex from "./Admin/Admin_Index";
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
        <Route path="/Admin_Index" element={<AdminIndex />} />
        <Route path="/Home" element={<App />} />
        <Route path="/user" element={<UserProfile />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
