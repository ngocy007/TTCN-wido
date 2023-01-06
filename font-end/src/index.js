import React from "react";
import ReactDOM from "react-dom/client";

import App from "./components/App";
import Login from "./components/Auth/Login";
import ForgotPass from "./components/Auth/FogotPass";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Register from "./components/Auth/Register";
import Github from "./components/Auth/Login_github";
import Admin_Index from "./components/Admin/Admin_Index";
import UserProfile from "./components/Userprofile";
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
        <Route
          path="/Home"
          element={localStorage.getItem("token") ? <App /> : <Login />}
        />
        <Route
          path="/Admin"
          element={
            localStorage.getItem("token") && localStorage.getItem("isadmin") ? (
              <Admin_Index />
            ) : (
              <Login />
            )
          }
        />
        <Route
          path="/user"
          element={localStorage.getItem("token") ? <UserProfile /> : <Login />}
        />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
