import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { FaStar } from "react-icons/fa";
import { IoLocationOutline } from "react-icons/io5";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import DialogDetail from "../components/DialogDetail";
import { supabase } from "../../utils/supabase";

export default function Home() {
  const [hotel, setHotels] = useState([]);
  const [visibleLogin, setVisibleLogin] = useState(false);
  const [visibleDetail, setVisibleDetail] = useState(false);

  let navigate = useNavigate();

  useEffect(() => {
    getHotels();
  }, []);

  async function getHotels() {
    const { data } = await supabase
      .from("hotels")
      .select()
      .eq("status_booking", "READY");
    setHotels(data);
  }

  const getImg = imgName => {
    return require(`../../resources/img/room/${imgName}.png`);
  };

  const handleHideDialog = () => {
    setVisibleLogin(false);
    setVisibleDetail(false);
  };

  const handleBooking = async () => {
    const { data, error } = await supabase
      .from("hotel_login")
      .select("status_login")
      .eq("status_login", "LOGIN");

    if (error) {
      console.error("Error checking login status:", error);
      return;
    }

    if (data && data.length > 0) {
      // Jika ada status_login yang LOGIN
      setVisibleLogin(true); // Munculkan dialog sukses
    } else {
      // Jika tidak ada yang LOGIN
      navigate("/login"); // Arahkan ke halaman login
    }
  };

  return (
    <>
      <div className="home">
        <div className="filter">Bob Hotel</div>
      </div>

      <div className="hotels">
        <h1>Daftar Hotel</h1>
        <div className="hotel-list">
          {hotel.map(country => (
            <div className="card" key={country.id}>
              <div className="image-container">
                <img src={getImg(country.name_img)} alt="hotel" />
              </div>
              <div className="content-container">
                <div className="header">
                  <h3>{country.name_hotel}</h3>
                  <span>
                    {country.rating}/5
                    <FaStar />
                  </span>
                </div>
                <div className="location">
                  <IoLocationOutline />
                  <p>{country.location}</p>
                </div>
                <div className="feature"></div>
                <div className="button">
                  <div className="booking">
                    <Button
                      label="Booking"
                      icon="pi pi-external-link"
                      onClick={handleBooking}
                    />
                  </div>
                  <div className="detail">
                    <Button
                      label="Detail"
                      icon="pi pi-external-link"
                      onClick={() => setVisibleDetail(true)}
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* DIALOG */}
      <DialogDetail visible={visibleDetail} onHide={handleHideDialog} />
      <Dialog visible={visibleLogin} onHide={handleHideDialog}>
        <p>Anda telah berhasil booking hotel.</p>
      </Dialog>
    </>
  );
}
