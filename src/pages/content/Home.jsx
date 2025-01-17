import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { FaStar, FaCheck } from "react-icons/fa";
import { IoLocationOutline } from "react-icons/io5";
import { IoIosPricetags } from "react-icons/io";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import DialogDetail from "../components/DialogDetail";
import { supabase } from "../../utils/supabase";

export default function Home() {
  const [hotel, setHotels] = useState([]);
  const [visibleBooking, setVisibleBooking] = useState(false);
  const [visibleDetail, setVisibleDetail] = useState(false);
  const [visibleConfirm, setVisibleConfirm] = useState(false); // Dialog konfirmasi booking
  const [visibleLoginConfirm, setVisibleLoginConfirm] = useState(false); // Dialog konfirmasi login
  const [selectedHotelId, setSelectedHotelId] = useState(null); // Hotel yang dipilih
  const [bookingStatus, setBookingStatus] = useState(""); // Status booking

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

  const getImg = (imgName) => {
    return require(`../../resources/img/room/${imgName}.png`);
  };

  const handleHideDialog = () => {
    setVisibleBooking(false);
    setVisibleDetail(false);
    setVisibleConfirm(false);
    setVisibleLoginConfirm(false); // Tutup dialog login
    setBookingStatus(""); // Reset status
  };

  const handleConfirmBooking = async (hotelId) => {
    const { data, error } = await supabase
      .from("hotel_login")
      .select("status_login")
      .eq("status_login", "LOGIN");

    if (error) {
      console.error("Error checking login status:", error);
      return;
    }

    if (data && data.length > 0) {
      // Jika status LOGIN, tampilkan dialog booking
      setSelectedHotelId(hotelId);
      setVisibleConfirm(true);
    } else {
      // Jika status LOGOUT, tampilkan dialog login
      setVisibleLoginConfirm(true);
    }
  };

  const handleBooking = async () => {
    const { error: updateError } = await supabase
      .from("hotels")
      .update({ status_booking: "BOOKED" })
      .eq("id", selectedHotelId);

    if (updateError) {
      console.error("Error updating hotel status:", updateError);
      setBookingStatus("Gagal memesan hotel. Silakan coba lagi.");
    } else {
      setBookingStatus("Hotel berhasil dipesan!");
      setVisibleBooking(true); // Tampilkan dialog sukses
      getHotels(); // Refresh daftar hotel

      setTimeout(() => {
        setVisibleBooking(false);
      }, 2000);
    }

    setVisibleConfirm(false);
  };

  const handleLoginRedirect = () => {
    setVisibleLoginConfirm(false);
    navigate("/login"); // Alihkan ke halaman login
  };

  const handleHotelDetail = (id) => {
    setSelectedHotelId(id);
    setVisibleDetail(true);
  };

  return (
    <>
      <div className="home">
        <div className="filter">Bob Hotel</div>
      </div>

      <div className="hotels">
        <h1>Daftar Hotel</h1>
        <div className="hotel-list">
          {hotel.map((country) => (
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
                <div className="location">
                  <IoIosPricetags />
                  <p>{new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(country.price)}</p>
                </div>
                <div className="feature"></div>
                <div className="button">
                  <div className="booking">
                    <Button
                      label="Booking"
                      icon="pi pi-external-link"
                      onClick={() => handleConfirmBooking(country.id)}
                    />
                  </div>
                  <div className="detail">
                    <Button
                      label="Detail"
                      icon="pi pi-external-link"
                      onClick={() => handleHotelDetail(country.id)}
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* DIALOG DETAIL */}
      <DialogDetail
        visible={visibleDetail}
        onHide={handleHideDialog}
        hotelId={selectedHotelId}
      />

      {/* DIALOG BOOKING SUCCESS */}
      <Dialog
        className="dialog-booking"
        visible={visibleBooking}
        onHide={handleHideDialog}
        modal
        closable={false}>
        <FaCheck
          style={{
            display: "flex",
            justifyContent: "center",
            width: "100%",
            marginBottom: ".5em",
            fontSize: "2em",
            color: "#3b82f6",
          }}
        />
        <p>{bookingStatus}</p>
      </Dialog>

      {/* DIALOG CONFIRM BOOKING */}
      <Dialog
        visible={visibleConfirm}
        onHide={handleHideDialog}
        header="Konfirmasi Booking"
        footer={
          <div>
            <Button
              label="Tidak"
              className="p-button-text"
              onClick={handleHideDialog}
            />
            <Button
              label="Ya"
              className="p-button-primary"
              onClick={handleBooking}
            />
          </div>
        }>
        <p>Apakah Anda yakin ingin booking hotel ini?</p>
      </Dialog>

      {/* DIALOG LOGIN REQUIRED */}
      <Dialog
        visible={visibleLoginConfirm}
        onHide={handleHideDialog}
        header="Login Diperlukan"
        footer={
          <div>
            <Button
              label="Tidak"
              className="p-button-text"
              onClick={handleHideDialog}
            />
            <Button
              label="Ya"
              className="p-button-primary"
              onClick={handleLoginRedirect}
            />
          </div>
        }>
        <p>Anda harus login untuk booking hotel. Apakah Anda ingin login sekarang?</p>
      </Dialog>
    </>
  );
}
