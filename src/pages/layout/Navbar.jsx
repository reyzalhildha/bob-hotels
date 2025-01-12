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
        <div className="nav-list">
          <button
            className="login"
            href="/login"
            onClick={() => setVisibleLogin(true)}>
            Login
          </button>
          <button
            className="login"
            href="/logout"
            onClick={() => setVisibleLogout(true)}>
            Logout
          </button>
        </div>
      </div>

      {/* DIALOG */}
      <DialogLogin visible={visibleLogin} onHide={handleHideDialog} />
      <DialogLogout visible={visibleLogout} onHide={handleHideDialog} />
    </>
  );
}
