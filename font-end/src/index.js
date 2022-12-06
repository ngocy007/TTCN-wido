import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Login from './Auth/Login';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter ,Route,Routes } from "react-router-dom";
import Register from './Auth/Register';
import Github from './Auth/Login_github'

const login = ReactDOM.createRoot(document.getElementById('login'));
login.render(
  <React.StrictMode>
    <BrowserRouter>
    <Routes>
      <Route  path='/' element={<Login />}/>
      <Route path='/register' element={<Register />} />
      <Route path='/login_github' element={<Github />} />
    </Routes>
    
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
