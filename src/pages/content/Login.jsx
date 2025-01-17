import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../utils/supabase";

import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { Divider } from "primereact/divider";
import { Button } from "primereact/button";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

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

  async function handleLogin() {
    setLoading(true);

    try {
      // Memeriksa apakah username dan password cocok
      const { data, error } = await supabase
        .from("hotel_login")
        .select("*")
        .eq("username", username)
        .eq("password", password)
        .single();

      if (error || !data) {
        alert("Invalid username or password.");
      } else {
        // Jika login berhasil, update status_login menjadi "LOGIN"
        const { updateError } = await supabase
          .from("hotel_login")
          .update({ status_login: "LOGIN" })
          .eq("username", username);

        if (updateError) {
          console.error("Error updating status_login:", updateError);
          alert("Error updating login status.");
        } else {
          alert("Login successful!");
          navigate("/"); // Arahkan ke halaman utama setelah login berhasil
          window.location.reload(); // Refresh halaman setelah login berhasil
        }
      }
    } catch (error) {
      console.error("Login failed:", error.message);
      alert("An error occurred during login.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <div className="container-login">
        <h1 className="align-center title">LOGIN</h1>
        <p>Masukkan username dan kata sandi Anda untuk masuk.</p>

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
            <h4>Password</h4>
            <Password
              inputId="password"
              placeholder="Password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              header={header}
              footer={footer}
              toggleMask
            />
          </div>

          <div className="form-button">
            <Button
              label="Sign In"
              loading={loading}
              onClick={handleLogin}
              className="mt-2"
            />
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
