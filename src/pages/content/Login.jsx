import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { Divider } from "primereact/divider";
import { Button } from "primereact/button";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [visibleLogout, setVisibleLogout] = useState(false);

  let navigate = useNavigate();

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

  return (
    <>
      <div className="container-login">
        <h1 className="align-center title">LOGIN</h1>
        <p>Masukkan email dan kata sandi Anda untuk Masuk.</p>

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
            <Button label="Sign In" loading={loading} onClick={loading} />
            <p>
              Don't have an account?{" "}
              <span className="signup" onClick={() => navigate("/signup")}>
                Sign Up
              </span>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
