import React, { useState } from "react";
import PropTypes from "prop-types";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { Divider } from "primereact/divider";
import { Button } from "primereact/button";
import DialogSignUp from "../components/DialogSignUp";

export default function DialogLogin({ visible, onHide }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [visibleLogout, setVisibleLogout] = useState(false);

  const header = <div className="font-bold mb-3">Pick a password</div>;
  const footer = (
    <>
      <Divider />
      <p className="mt-2">Suggestions</p>
      <ul className="pl-2 ml-2 mt-0 line-height-3">
        <li>At least one lowercase</li>
        <li>At least one uppercase</li>
        <li>At least one numeric</li>
        <li>Minimum 8 characters</li>
      </ul>
    </>
  );

  const load = () => {
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };

  const handleSignUp = () => {
    onHide(); // Menyembunyikan dialog login
    setVisibleLogout(true); // Menampilkan dialog logout
  };

  const handleHideDialog = () => {
    setVisibleLogout(false);
  };

  return (
    <>
      <Dialog
        header="Sign In"
        visible={visible}
        draggable={false}
        style={{ width: "30vw" }}
        onHide={onHide}>
        <div className="container-dialog">
          <p>Enter your email and password to Sign In.</p>

          <div className="form-group">
            <div className="form-input">
              <h4>Username</h4>
              <InputText
                id="username"
                placeholder="username"
                value={username}
                onChange={e => setUsername(e.target.value)}
              />
            </div>

            <div className="form-input">
              <h4>Password</h4>
              <Password
                inputId="password"
                placeholder="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                header={header}
                footer={footer}
                toggleMask
              />
            </div>

            <div className="form-button">
              <Button label="Sign In" loading={loading} onClick={load} />
              <p>
                Don't have an account?{" "}
                <span className="signup" onClick={handleSignUp}>
                  Sign Up
                </span>
              </p>
            </div>
          </div>
        </div>
      </Dialog>

      {/* DIALOG */}
      <DialogSignUp visible={visibleLogout} onHide={handleHideDialog} />
    </>
  );
}

DialogLogin.propTypes = {
  visible: PropTypes.bool.isRequired,
  onHide: PropTypes.func.isRequired,
};
