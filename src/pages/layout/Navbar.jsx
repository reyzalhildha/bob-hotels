import React, { useState, useEffect } from "react";
import { supabase } from "../../utils/supabase";
import Logo from "../../resources/img/logo/logo-hotel.png";
import { Dialog } from "primereact/dialog";

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Menyimpan status login pengguna
  const [dialogVisible, setDialogVisible] = useState(false); // Menyimpan status dialog
  const [dialogMessage, setDialogMessage] = useState(""); // Menyimpan pesan dialog

  // Fungsi untuk menangani logout
  const handleLogout = async () => {
    try {
      // Update status_login menjadi "LOGOUT"
      const { error: updateError } = await supabase
        .from("hotel_login")
        .update({ status_login: "LOGOUT" })
        .eq("status_login", "LOGIN");

      if (updateError) {
        console.error("Error updating status_login:", updateError);
        alert("Error during logout.");
      } else {
        // Tampilkan dialog logout berhasil
        setDialogMessage("Anda telah berhasil logout.");
        setDialogVisible(true);

        // Setelah 2 detik, tutup dialog dan set isLoggedIn ke false
        setTimeout(() => {
          setDialogVisible(false);
          setIsLoggedIn(false);
        }, 2000);
      }
    } catch (error) {
      console.error("Logout failed:", error.message);
      alert("An error occurred during logout.");
    }
  };

  const refreshPage = async () => {
    const reloadCount = sessionStorage.getItem("reloadCount");
    if (reloadCount < 2) {
      sessionStorage.setItem("reloadCount", String(reloadCount + 1));
      window.location.reload();
    } else {
      sessionStorage.removeItem("reloadCount");
    }
  };

  // Cek status login saat komponen dimuat
  useEffect(() => {
    refreshPage();

    const checkLoginStatus = async () => {
      const { data, error } = await supabase
        .from("hotel_login")
        .select("*")
        .eq("status_login", "LOGIN");

      if (error) {
        console.error("Error checking login status:", error);
      } else if (data && data.length > 0) {
        setIsLoggedIn(true); // Ada pengguna dengan status LOGIN
      } else {
        setIsLoggedIn(false); // Tidak ada pengguna dengan status LOGIN
      }
    };

    checkLoginStatus();
  }, []);

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
          {isLoggedIn ? (
            <a
              className="login"
              href="/logout"
              onClick={(e) => {
                e.preventDefault(); // Mencegah navigasi ke /logout
                handleLogout(); // Menangani logout
              }}
            >
              Logout
            </a>
          ) : (
            <a className="login" href="/login">
              Login
            </a>
          )}
        </div>
      </div>

      {/* Dialog untuk menampilkan pesan logout */}
      <Dialog
        visible={dialogVisible}
        onHide={() => setDialogVisible(false)}
        modal
        closable={false}
        footer={null}
        className="dialog-status"
      >
        <p>{dialogMessage}</p>
      </Dialog>
    </>
  );
}
