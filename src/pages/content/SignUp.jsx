import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../utils/supabase";

import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { Divider } from "primereact/divider";
import { Button } from "primereact/button";

export default function Login() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  let navigate = useNavigate();

  async function doSignup() {
    setLoading(true);

    if (confirmPassword !== password) {
      alert("Password and Confirm Password must be the same!");
      setLoading(false);
      return;
    }

    try {
      const { data, error } = await supabase
        .from("hotel_login")
        .insert([
          {
            created_at: new Date(),
            username: username,
            email: email,
            password: password,
            status_login: "LOGIN",
          },
        ])
        .select();

      if (error) {
        console.error("Error inserting data:", error);
        alert(`Error creating account: ${error.message}`);
      } else {
        alert("Account successfully created!");
        console.log("Inserted data:", data);
        // Redirect to login page
        navigate("/login");
      }
    } catch (err) {
      console.error("Unexpected error:", err);
      alert("An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  }

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
        <h1 className="align-center title">REGISTER</h1>
        <p>Buat akun Anda dengan mengisi informasi di bawah ini.</p>

        <div className="form-group">
          <div className="form-input">
            <h4>Username</h4>
            <InputText
              id="username"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div className="form-input">
            <h4>Email</h4>
            <InputText
              id="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="form-input">
            <h4>Password</h4>
            <Password
              inputId="password"
              placeholder="Password"
              value={password}
              header={header}
              footer={footer}
              onChange={(e) => setPassword(e.target.value)}
              toggleMask
            />
          </div>

          <div className="form-input">
            <h4>Confirm Password</h4>
            <Password
              inputId="confirmPassword"
              placeholder="Confirm Password"
              value={confirmPassword}
              header={header}
              footer={footer}
              onChange={(e) => setConfirmPassword(e.target.value)}
              toggleMask
            />
          </div>

          <div className="form-button">
            <Button
              label="Sign Up"
              loading={loading}
              onClick={doSignup}
              className="mt-2"
            />
            <p>
              Already have an account?{" "}
              <span className="signup" onClick={() => navigate("/login")}>
                Login
              </span>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
