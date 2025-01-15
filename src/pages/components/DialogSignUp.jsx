import React, { useState } from "react";
import PropTypes from "prop-types";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { Button } from "primereact/button";
import DialogLogin from "../components/DialogLogin";

export default function DialogSignUp({ visible, onHide }) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  // const [visibleLogin, setVisibleLogin] = useState(false);

  const handleSignUp = () => {
    setLoading(true);

    // Simulate API request
    setTimeout(() => {
      setLoading(false);
      alert("Account successfully created!");
      onHide(); // Close the dialog after sign-up is complete
    }, 2000);
  };

  return (
    <>
      <Dialog
        header="Sign Up"
        visible={visible}
        draggable={false}
        style={{ width: "30vw" }}
        onHide={onHide}>
        <div className="container-dialog">
          <p>Buat akun Anda dengan mengisi informasi di bawah ini.</p>

          <div className="form-group">
            <div className="form-input">
              <h4>Username</h4>
              <InputText
                id="username"
                placeholder="Username"
                value={username}
                onChange={e => setUsername(e.target.value)}
              />
            </div>

            <div className="form-input">
              <h4>Email</h4>
              <InputText
                id="email"
                placeholder="Email"
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
            </div>

            <div className="form-input">
              <h4>Password</h4>
              <Password
                inputId="password"
                placeholder="Password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                toggleMask
              />
            </div>

            <div className="form-input">
              <h4>Confirm Password</h4>
              <Password
                inputId="confirmPassword"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={e => setConfirmPassword(e.target.value)}
                toggleMask
              />
            </div>

            <div className="form-button">
              <Button
                label="Sign Up"
                loading={loading}
                onClick={handleSignUp}
                className="mt-2"
              />
              <p>
                Already have an account? <span className="signup">Login</span>
              </p>
            </div>
          </div>
        </div>
      </Dialog>
    </>
  );
}

DialogLogin.propTypes = {
  visible: PropTypes.bool.isRequired,
  onHide: PropTypes.func.isRequired,
  onSignInClick: PropTypes.func.isRequired,
};
