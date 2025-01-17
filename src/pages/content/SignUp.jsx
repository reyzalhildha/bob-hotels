import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../utils/supabase";

import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { Divider } from "primereact/divider";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";

export default function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [dialogVisible, setDialogVisible] = useState(false);
  const [dialogMessage, setDialogMessage] = useState("");

  let navigate = useNavigate();

  async function doSignup(event) {
    event.preventDefault(); // Mencegah reload halaman default
    setLoading(true);

    if (password !== confirmPassword) {
      setDialogMessage("Password dan Confirm Password harus sama!");
      setDialogVisible(true);
      setLoading(false);
      return;
    }

    try {
      const { error } = await supabase
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
        setDialogMessage(`Error membuat akun: ${error.message}`);
        setDialogVisible(true);
      } else {
        setDialogMessage("Anda telah berhasil daftar akun!");
        setDialogVisible(true);

        // Tunggu 2 detik sebelum mengalihkan ke halaman login
        setTimeout(() => {
          setDialogVisible(false);
          navigate("/login");
        }, 2000);
      }
    } catch (err) {
      console.error("Unexpected error:", err);
      setDialogMessage("Terjadi kesalahan tidak terduga.");
      setDialogVisible(true);
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

        <form onSubmit={doSignup}>
          <div className="form-group">
            <div className="form-input">
              <h4>Username</h4>
              <InputText
                id="username"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>

            <div className="form-input">
              <h4>Email</h4>
              <InputText
                id="email"
                placeholder="Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
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
                required
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
                required
              />
            </div>

            <div className="form-button">
              <Button
                label="Sign Up"
                loading={loading}
                type="submit"
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
        </form>
      </div>

      {/* Dialog untuk menampilkan pesan */}
      <Dialog
        visible={dialogVisible}
        onHide={() => setDialogVisible(false)}
        modal
        closable={true}
        draggable={false}
        footer={null}
        className="dialog-status"
      >
        <p>{dialogMessage}</p>
      </Dialog>
    </>
  );
}
