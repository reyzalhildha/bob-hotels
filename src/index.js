import React from "react";
import ReactDOM from "react-dom/client";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter, Routes, Route } from "react-router";

import "./resources/css/main.css";
import "./resources/css/components.css";
import "./resources/css/override-primereact.css";
import "primereact/resources/themes/lara-light-blue/theme.css";

import Navbar from "./pages/layout/Navbar";
import Footer from "./pages/layout/Footer";
import Login from "./pages/content/Login";
import SignUp from "./pages/content/SignUp";
import Home from "./pages/content/Home";
import HotelDetail from "./pages/content/HotelDetail";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Index />);
export default function Index() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<SignUp />} />
          <Route path="details" element={<HotelDetail />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
