import React, { useState } from "react";
import Logo from "../../resources/img/logo/logo-hotel.png";

import DialogLogin from "../components/DialogLogin";
import DialogLogout from "../components/DialogLogout";

export default function Navbar() {
  const [visibleLogin, setVisibleLogin] = useState(false);
  const [visibleLogout, setVisibleLogout] = useState(false);

  const handleHideDialog = () => {
    setVisibleLogin(false);
    setVisibleLogout(false);
  };

  return (
    <>
      <div className="navbar">
        <div className="logo">
          <a href="/">
            <img src={Logo} alt="logo" />
          </a>
        </div>
        <div className="menu">
          <a href="/">Home</a>
        </div>
        <div className="nav-list">
          <a className="login" href="/login">
            Login
          </a>
          <a className="login" href="/logout">
            Logout
          </a>
        </div>
      </div>

      {/* DIALOG */}
      <DialogLogin visible={visibleLogin} onHide={handleHideDialog} />
      <DialogLogout visible={visibleLogout} onHide={handleHideDialog} />
    </>
  );
}
